import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from '../components/Button.jsx';
import ProjectArtwork from '../components/ProjectArtwork.jsx';
import RouteErrorBoundary from '../components/RouteErrorBoundary.jsx';
import '../styles/pages.css';
import {
  IconArrowLeft,
  IconArrowRight,
  IconBuilding,
  IconCar,
  IconCloud,
  IconCog,
  IconHammer,
  IconKeySquare,
  IconLibraryBig,
  IconLinkOut,
  IconMail,
  IconMessagesSquare,
  IconMobile,
  IconBotMessageSquare,
  IconTruck,
  IconPause,
  IconPlay,
  IconSettings,
  IconUsers,
} from '../components/icons.jsx';
import {
  getFilteredProjects,
  getLocalizedProjects,
  projectMatchesFilter,
  projectFilterDefinitions,
} from '../data/projects.js';
import { projectsPageContent } from '../i18n/content/projectsPage.js';
import { useLanguage } from '../i18n/LanguageContext.jsx';
import { useSEO } from '../hooks/useSEO.js';
import { seoConfig } from '../config/seo.js';
import { createProjectsStructuredData } from '../config/structuredData.js';

const AUTOPLAY_DURATION = 10000;
const LOOP_SET_COUNT = 3;

const tagIcons = {
  building: IconBuilding,
  users: IconUsers,
  cloud: IconCloud,
  ai: IconBotMessageSquare,
  mobile: IconMobile,
  'design-system': IconLibraryBig,
};

const ctaIcons = {
  link: IconLinkOut,
  car: IconCar,
  'car-front': IconCar,
  settings: IconSettings,
  mail: IconMail,
  hammer: IconHammer,
  'key-square': IconKeySquare,
  cog: IconCog,
  'messages-square': IconMessagesSquare,
  'bot-message-square': IconBotMessageSquare,
  truck: IconTruck,
};

const projectFallbackContent = {
  fr: {
    title: 'Chargement interrompu',
    text: 'Une erreur est survenue pendant le chargement de cette section.',
    retry: 'Réessayer',
  },
  en: {
    title: 'Loading interrupted',
    text: 'Something went wrong while loading this section.',
    retry: 'Try again',
  },
};

function ProjectCarouselFallback({ language, onRetry }) {
  const content = projectFallbackContent[language] ?? projectFallbackContent.fr;

  return (
    <section className="project-showcase project-showcase--fallback" role="alert">
      <div className="route-load-error__panel">
        <h1>{content.title}</h1>
        <p>{content.text}</p>
        <Button variant="primary" onClick={onRetry}>
          {content.retry}
        </Button>
      </div>
    </section>
  );
}

function normalizeProjectIndex(index, projectCount) {
  if (projectCount === 0) {
    return 0;
  }

  return ((index % projectCount) + projectCount) % projectCount;
}

function getLoopedRenderedIndex(renderedIndex, projectCount) {
  if (projectCount === 0) {
    return 0;
  }

  if (renderedIndex < projectCount || renderedIndex >= projectCount * 2) {
    return normalizeProjectIndex(renderedIndex, projectCount) + projectCount;
  }

  return renderedIndex;
}

function ProjectTag({ tag }) {
  const Icon = tagIcons[tag.icon] ?? IconBuilding;

  return (
    <span className="project-tag">
      {tag.image ? (
        <img className="project-tag__image" src={tag.image} alt="" aria-hidden="true" />
      ) : (
        <Icon />
      )}
      {tag.label}
    </span>
  );
}

function ProjectSlideCopy({ project, content }) {
  return (
    <div className="project-showcase__copy" key={project.slug}>
      <div className="project-showcase__tags" aria-label={content.tagsLabel}>
        {project.tags.map((tag) => (
          <ProjectTag key={`${project.slug}-${tag.label}`} tag={tag} />
        ))}
      </div>

      <div className="project-showcase__body">
        <h1>{project.title}</h1>
        <p 
          className="project-showcase__description" 
          dangerouslySetInnerHTML={{ __html: project.description }}
        />
      </div>

    </div>
  );
}

function ProjectFilters({ activeFilter, content, filterCounts, onFilterChange }) {
  return (
    <div className="project-filters" role="group" aria-label={content.filters.label}>
      <div className="project-filters__list">
        {projectFilterDefinitions.map((filter) => {
          const isActive = filter.id === activeFilter;
          const count = filterCounts[filter.id] ?? 0;

          return (
            <button
              key={filter.id}
              className={`project-filter${isActive ? ' project-filter--active' : ''}`}
              type="button"
              aria-pressed={isActive}
              onClick={() => onFilterChange(filter.id)}
            >
              <span>{content.filters.options[filter.id] ?? filter.id}</span>
              <span className="project-filter__badge" aria-hidden="true">
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function getArtworkMode(index, activeIndex) {
  if (index === activeIndex) {
    return 'main';
  }

  return index < activeIndex ? 'peek-left' : 'peek-right';
}

function ProjectControls({
  project,
  index,
  total,
  onPrevious,
  onNext,
  onToggleAutoPlay,
  isAutoPlaying,
  content,
  sticky = false,
}) {
  const CtaIcon = ctaIcons[project.ctaIcon] ?? IconLinkOut;
  const AutoPlayIcon = isAutoPlaying ? IconPause : IconPlay;
  const isSingleProject = total <= 1;
  const countLabel = `${String(index + 1).padStart(2, '0')} - ${String(total).padStart(2, '0')}`;
  const detailPath = `/projets/${project.slug}`;
  const ctaTo = project.ctaTo ?? detailPath;
  const location = useLocation();

  const isExternalRoute = project.ctaTo && !project.ctaTo.startsWith('/projets');

  return (
    <div className={`project-showcase__controls${sticky ? ' project-showcase__controls--sticky' : ''}`}>
      {!sticky && (
        <div className="project-pager" aria-label={content.pagerLabel}>
          <Button
            variant="secondary"
            aria-label={content.previousLabel}
            title={content.previousLabel}
            aria-disabled={isSingleProject}
            disabled={isSingleProject}
            onClick={onPrevious}
            icon={IconArrowLeft}
            iconOnly={true}
          />
          <Button
            variant="secondary"
            aria-label={content.nextLabel}
            title={content.nextLabel}
            aria-disabled={isSingleProject}
            disabled={isSingleProject}
            onClick={onNext}
            icon={IconArrowRight}
            iconOnly={true}
          />
          <Button
            variant="tertiary"
            aria-label={isAutoPlaying ? content.pauseLabel : content.resumeLabel}
            title={isAutoPlaying ? content.pauseLabel : content.resumeLabel}
            aria-pressed={isAutoPlaying}
            disabled={isSingleProject}
            onClick={onToggleAutoPlay}
            icon={AutoPlayIcon}
            iconOnly={true}
          />
          <span className="project-pager__count">{countLabel}</span>
        </div>
      )}

      <Button
        variant="primary"
        className="project-showcase__cta"
        to={ctaTo}
        state={isExternalRoute ? undefined : { backgroundLocation: location }}
        icon={CtaIcon}
        aria-label={content.openProjectLabel(project.title)}
      >
        {project.ctaLabel}
      </Button>
    </div>
  );
}

export default function Projets() {
  const location = useLocation();
  const { language } = useLanguage();
  const content = projectsPageContent[language];
  const [activeFilter, setActiveFilter] = useState('all');
  const allProjects = useMemo(() => getLocalizedProjects(language), [language]);
  const projects = useMemo(
    () => getFilteredProjects(allProjects, activeFilter),
    [activeFilter, allProjects],
  );
  const filterCounts = useMemo(() => {
    const counts = {};
    for (const filter of projectFilterDefinitions) {
      counts[filter.id] = allProjects.filter((project) =>
        project.detailStatus !== 'placeholder' && projectMatchesFilter(project, filter.id)
      ).length;
    }
    return counts;
  }, [allProjects]);
  const projectCount = projects.length;
  const middleSetOffset = projectCount;
  const [activeRenderedIndex, setActiveRenderedIndex] = useState(middleSetOffset);
  const [isAutoPlaying, setIsAutoPlaying] = useState(() => {
    if (typeof window === 'undefined') return true;
    return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });
  const [autoplayProgress, setAutoplayProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isWheelScrolling, setIsWheelScrolling] = useState(false);
  const [isTouchInteracting, setIsTouchInteracting] = useState(false);
  const [isPageHidden, setIsPageHidden] = useState(
    typeof document !== 'undefined' ? document.hidden : false,
  );
  const stageScrollerRef = useRef(null);
  const slideRefs = useRef([]);
  const slideLinkRefs = useRef([]);
  const scrollFrameRef = useRef(null);
  const autoplayFrameRef = useRef(null);
  const hasInitializedRef = useRef(false);
  const suppressClickRef = useRef(false);
  const targetIndexRef = useRef(middleSetOffset);
  const wheelEndTimeoutRef = useRef(null);
  const wheelStartIndexRef = useRef(middleSetOffset);
  const wheelTravelRef = useRef(0);
  const autoplayCycleStartRef = useRef(null);
  const autoplayProgressRef = useRef(0);
  const dragStateRef = useRef({
    pointerId: null,
    startX: 0,
    startScrollLeft: 0,
    isPointerDown: false,
  });

  const projectsSeoData = seoConfig.projects;
  const projectsStructuredData = useMemo(
    () => createProjectsStructuredData({ ...projectsSeoData, projects: allProjects }),
    [allProjects, projectsSeoData],
  );
  useSEO({
    title: projectsSeoData.title,
    description: projectsSeoData.description,
    image: projectsSeoData.image,
    urlPath: '/projets',
    structuredData: projectsStructuredData,
  });

  const renderedProjects = useMemo(
    () => {
      if (projectCount === 0) {
        return [];
      }

      return Array.from({ length: projectCount * LOOP_SET_COUNT }, (_, renderedIndex) => {
        const normalizedIndex = renderedIndex % projectCount;

        return {
          key: `${Math.floor(renderedIndex / projectCount)}-${projects[normalizedIndex].slug}`,
          project: projects[normalizedIndex],
          renderedIndex,
        };
      });
    },
    [projectCount, projects],
  );
  const activeIndex = normalizeProjectIndex(activeRenderedIndex, projectCount);
  const activeProject = useMemo(
    () => projects[activeIndex] ?? projects[0],
    [activeIndex, projects],
  );
  const activeProjectAnnouncement = activeProject
    ? content.currentProjectLabel(activeProject.title, activeIndex + 1, projects.length)
    : '';
  const isAutoplayBlocked =
    isDragging || isWheelScrolling || isTouchInteracting || isPageHidden || projectCount <= 1;

  function getProjectOffset(index) {
    const scroller = stageScrollerRef.current;
    const slide = slideRefs.current[index];

    if (!scroller || !slide) {
      return null;
    }

    return slide.offsetLeft - (scroller.clientWidth - slide.clientWidth) / 2;
  }

  function getNearestProjectIndex(scroller = stageScrollerRef.current) {
    if (!scroller) {
      return 0;
    }

    const scrollerCenter = scroller.scrollLeft + scroller.clientWidth / 2;
    let nearestIndex = 0;
    let nearestDistance = Number.POSITIVE_INFINITY;

    slideRefs.current.forEach((slide, index) => {
      if (!slide) {
        return;
      }

      const slideCenter = slide.offsetLeft + slide.clientWidth / 2;
      const distance = Math.abs(slideCenter - scrollerCenter);

      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = index;
      }
    });

    return nearestIndex;
  }

  function stopAutoplayFrame() {
    if (autoplayFrameRef.current) {
      window.cancelAnimationFrame(autoplayFrameRef.current);
      autoplayFrameRef.current = null;
    }
  }

  function restartAutoplayCycle() {
    autoplayCycleStartRef.current = window.performance.now();
    autoplayProgressRef.current = 0;
    setAutoplayProgress(0);
  }

  useEffect(() => {
    slideRefs.current = [];
    slideLinkRefs.current = [];
    const nextIndex = projectCount > 0 ? middleSetOffset : 0;

    targetIndexRef.current = nextIndex;
    wheelStartIndexRef.current = nextIndex;
    wheelTravelRef.current = 0;
    suppressClickRef.current = false;
    hasInitializedRef.current = false;
    setActiveRenderedIndex(nextIndex);
    setAutoplayProgress(0);
    autoplayProgressRef.current = 0;

    if (projectCount === 0) {
      stopAutoplayFrame();
      return undefined;
    }

    return () => {
      stopAutoplayFrame();
    };
  }, [activeFilter, language, middleSetOffset, projectCount]);

  function getAutoplayNextIndex() {
    if (projectCount <= 1) {
      return targetIndexRef.current;
    }

    return targetIndexRef.current + 1;
  }

  function toggleAutoPlay() {
    setIsAutoPlaying((current) => {
      const next = !current;

      if (next) {
        autoplayCycleStartRef.current =
          window.performance.now() - autoplayProgressRef.current * AUTOPLAY_DURATION;
      }

      return next;
    });
  }

  function stopWheelScrollSync() {
    if (wheelEndTimeoutRef.current) {
      window.clearTimeout(wheelEndTimeoutRef.current);
      wheelEndTimeoutRef.current = null;
    }

    wheelTravelRef.current = 0;
    setIsWheelScrolling(false);
  }

  function alignProject(index, behavior = 'smooth') {
    const scroller = stageScrollerRef.current;
    const left = getProjectOffset(index);

    if (!scroller || left === null) {
      return;
    }

    const resolvedBehavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ? 'auto'
      : behavior;

    targetIndexRef.current = index;
    scroller.scrollTo({
      left,
      behavior: resolvedBehavior,
    });
  }

  useEffect(() => {
    const scroller = stageScrollerRef.current;
    if (!scroller) {
      return undefined;
    }

    function updateActiveProjectFromScroll() {
      if (projectCount === 0 || !hasInitializedRef.current) {
        return;
      }

      if (scrollFrameRef.current) {
        window.cancelAnimationFrame(scrollFrameRef.current);
      }

      scrollFrameRef.current = window.requestAnimationFrame(() => {
        const nearestIndex = getNearestProjectIndex(scroller);
        const loopedRenderedIndex = getLoopedRenderedIndex(nearestIndex, projectCount);

        if (loopedRenderedIndex !== nearestIndex) {
          const loopedOffset = getProjectOffset(loopedRenderedIndex);

          if (loopedOffset !== null) {
            scroller.scrollTo({
              left: loopedOffset,
              behavior: 'auto',
            });
          }
        }

        targetIndexRef.current = loopedRenderedIndex;

        setActiveRenderedIndex((currentIndex) =>
          currentIndex === loopedRenderedIndex ? currentIndex : loopedRenderedIndex,
        );
      });
    }

    scroller.addEventListener('scroll', updateActiveProjectFromScroll, { passive: true });

    return () => {
      scroller.removeEventListener('scroll', updateActiveProjectFromScroll);
      if (scrollFrameRef.current) {
        window.cancelAnimationFrame(scrollFrameRef.current);
      }
    };
  }, [projectCount]);

  useEffect(() => {
    restartAutoplayCycle();
  }, [activeIndex]);

  useEffect(() => {
    function handleVisibilityChange() {
      setIsPageHidden(document.hidden);
    }

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    function handleReducedMotionChange(event) {
      if (event.matches) {
        setIsAutoPlaying(false);
        stopAutoplayFrame();
      }
    }

    if (reducedMotion.matches) {
      setIsAutoPlaying(false);
      stopAutoplayFrame();
    }

    reducedMotion.addEventListener('change', handleReducedMotionChange);

    return () => {
      reducedMotion.removeEventListener('change', handleReducedMotionChange);
    };
  }, []);

  useEffect(() => {
    stopAutoplayFrame();

    if (!isAutoPlaying || isAutoplayBlocked) {
      return undefined;
    }

    autoplayCycleStartRef.current =
      window.performance.now() - autoplayProgressRef.current * AUTOPLAY_DURATION;

    const tick = (now) => {
      const elapsed = now - autoplayCycleStartRef.current;
      const nextProgress = Math.min(elapsed / AUTOPLAY_DURATION, 1);

      autoplayProgressRef.current = nextProgress;
      setAutoplayProgress(nextProgress);

      if (nextProgress >= 1) {
        const nextIndex = getAutoplayNextIndex();
        moveToProject(nextIndex);
        return;
      }

      autoplayFrameRef.current = window.requestAnimationFrame(tick);
    };

    autoplayFrameRef.current = window.requestAnimationFrame(tick);

    return () => {
      stopAutoplayFrame();
    };
  }, [activeIndex, isAutoPlaying, isAutoplayBlocked]);

  useEffect(() => () => {
    if (wheelEndTimeoutRef.current) {
      window.clearTimeout(wheelEndTimeoutRef.current);
    }

    stopAutoplayFrame();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      alignProject(activeRenderedIndex, 'auto');
    };

    const timeoutId = window.setTimeout(() => {
      alignProject(activeRenderedIndex, 'auto');
      // Set to true after DOM positioning settles
      hasInitializedRef.current = true;
    }, 50);

    window.addEventListener('resize', handleResize);

    return () => {
      window.clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, [activeRenderedIndex]);

  useEffect(() => {
    if (!isDragging) {
      return undefined;
    }

    function handleWindowMouseMove(event) {
      const scroller = stageScrollerRef.current;
      const dragState = dragStateRef.current;

      if (!scroller || !dragState.isPointerDown) {
        return;
      }

      const deltaX = event.clientX - dragState.startX;

      if (Math.abs(deltaX) > 6) {
        suppressClickRef.current = true;
      }

      scroller.scrollLeft = dragState.startScrollLeft - deltaX;
      event.preventDefault();
    }

    function stopWindowMouseDrag() {
      const scroller = stageScrollerRef.current;
      if (!scroller) {
        return;
      }

      dragStateRef.current = {
        pointerId: null,
        startX: 0,
        startScrollLeft: scroller.scrollLeft,
        isPointerDown: false,
      };
      setIsDragging(false);
    }

    window.addEventListener('mousemove', handleWindowMouseMove);
    window.addEventListener('mouseup', stopWindowMouseDrag);
    window.addEventListener('mouseleave', stopWindowMouseDrag);

    return () => {
      window.removeEventListener('mousemove', handleWindowMouseMove);
      window.removeEventListener('mouseup', stopWindowMouseDrag);
      window.removeEventListener('mouseleave', stopWindowMouseDrag);
    };
  }, [isDragging]);

  function goToPreviousProject() {
    moveToProject(targetIndexRef.current - 1);
  }

  function goToNextProject() {
    moveToProject(targetIndexRef.current + 1);
  }

  function moveToProject(nextIndex) {
    if (renderedProjects.length === 0) {
      return;
    }

    stopWheelScrollSync();
    const safeIndex =
      nextIndex < 0 || nextIndex >= renderedProjects.length
        ? getLoopedRenderedIndex(nextIndex, projectCount)
        : nextIndex;

    alignProject(safeIndex);
  }

  function focusProjectLink(index) {
    const safeIndex =
      index < 0 || index >= renderedProjects.length
        ? getLoopedRenderedIndex(index, projectCount)
        : index;

    window.requestAnimationFrame(() => {
      slideLinkRefs.current[safeIndex]?.focus();
    });
  }

  function handleCardKeyDown(event, renderedIndex) {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      const nextIndex = renderedIndex + 1;
      moveToProject(nextIndex);
      focusProjectLink(nextIndex);
      return;
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      const previousIndex = renderedIndex - 1;
      moveToProject(previousIndex);
      focusProjectLink(previousIndex);
      return;
    }

    if (event.key === 'Home') {
      event.preventDefault();
      const firstIndex = middleSetOffset;
      moveToProject(firstIndex);
      focusProjectLink(firstIndex);
      return;
    }

    if (event.key === 'End') {
      event.preventDefault();
      const lastIndex = middleSetOffset + projectCount - 1;
      moveToProject(lastIndex);
      focusProjectLink(lastIndex);
    }
  }

  function handleStageWheel(event) {
    const scroller = stageScrollerRef.current;
    if (!scroller) {
      return;
    }

    if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) {
      return;
    }

    event.preventDefault();
    setIsWheelScrolling(true);

    if (!wheelEndTimeoutRef.current) {
      wheelStartIndexRef.current = targetIndexRef.current;
    }

    const deltaUnit =
      event.deltaMode === 1 ? 18 : event.deltaMode === 2 ? scroller.clientWidth : 1;
    const amplifiedDelta = event.deltaY * deltaUnit * 1.35;

    wheelTravelRef.current += amplifiedDelta;
    scroller.scrollLeft += amplifiedDelta;

    if (wheelEndTimeoutRef.current) {
      window.clearTimeout(wheelEndTimeoutRef.current);
    }

    wheelEndTimeoutRef.current = window.setTimeout(() => {
      const baseIndex = wheelStartIndexRef.current;
      const direction = Math.sign(wheelTravelRef.current);
      const nearestIndex = getNearestProjectIndex(scroller);
      const cardWidth = slideRefs.current[nearestIndex]?.clientWidth ?? scroller.clientWidth;
      const commitThreshold = cardWidth * 0.18;
      let targetIndex = nearestIndex;

      if (Math.abs(wheelTravelRef.current) > commitThreshold) {
        targetIndex = getLoopedRenderedIndex(baseIndex + direction, projectCount);
      }

      stopWheelScrollSync();
      alignProject(targetIndex);
    }, 140);
  }

  function handleStageMouseDown(event) {
    const scroller = stageScrollerRef.current;
    if (!scroller || event.button !== 0) {
      return;
    }

    stopWheelScrollSync();
    suppressClickRef.current = false;
    dragStateRef.current = {
      pointerId: 'mouse',
      startX: event.clientX,
      startScrollLeft: scroller.scrollLeft,
      isPointerDown: true,
    };

    setIsDragging(true);
  }

  function handleStageClickCapture(event) {
    if (!suppressClickRef.current) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    suppressClickRef.current = false;
  }

  return (
    <RouteErrorBoundary
      resetKey={`projects-${language}`}
      fallback={({ onRetry }) => <ProjectCarouselFallback language={language} onRetry={onRetry} />}
    >
      <section className="project-showcase" aria-label={content.sectionLabel}>
        <ProjectFilters
          activeFilter={activeFilter}
          content={content}
          filterCounts={filterCounts}
          onFilterChange={setActiveFilter}
        />

        {!activeProject ? (
          <div className="project-filter-empty" role="status">
            <p>{content.filters.empty}</p>
            <Button variant="tertiary" onClick={() => setActiveFilter('all')}>
              {content.filters.reset}
            </Button>
          </div>
        ) : (
          <>
            <div
              className={`project-autoplay-progress${isAutoPlaying ? '' : ' project-autoplay-progress--paused'}`}
              aria-hidden="true"
            >
              <span
                className="project-autoplay-progress__fill"
                style={{ transform: `scaleX(${autoplayProgress})` }}
              />
            </div>

            <p className="sr-only" aria-live="polite" aria-atomic="true">
              {activeProjectAnnouncement}
            </p>

            <div className="project-showcase__content">
              <div className="project-shell project-shell--copy">
                <ProjectSlideCopy
                  key={activeProject.slug}
                  project={activeProject}
                  content={content}
                />
              </div>

              <div className="project-shell project-shell--stage">
                <div
                  ref={stageScrollerRef}
                  className={`project-stage${isDragging ? ' project-stage--dragging' : ''}${isWheelScrolling ? ' project-stage--free-scroll' : ''}`}
                  role="region"
                  aria-roledescription="carousel"
                  aria-label={content.stageLabel}
                  onClickCapture={handleStageClickCapture}
                  onMouseDown={handleStageMouseDown}
                  onTouchStart={() => {
                    stopWheelScrollSync();
                    setIsTouchInteracting(true);
                  }}
                  onTouchEnd={() => {
                    setIsTouchInteracting(false);
                  }}
                  onTouchCancel={() => {
                    setIsTouchInteracting(false);
                  }}
                  onWheel={handleStageWheel}
                >
                  {renderedProjects.map(({ key, project, renderedIndex }) => {
                    const detailPath = `/projets/${project.slug}`;
                    const isActive = renderedIndex === activeRenderedIndex;
                    const isCardLinked = project.slug !== 'upcoming-case-studies';

                    return (
                      <article
                        key={key}
                        ref={(node) => {
                          slideRefs.current[renderedIndex] = node;
                        }}
                        className={`project-stage__item${isActive ? ' project-stage__item--active' : ''}`}
                        data-active={isActive ? 'true' : 'false'}
                        role="group"
                        aria-roledescription="slide"
                        aria-current={isActive ? 'true' : undefined}
                        aria-hidden={isActive ? undefined : 'true'}
                        aria-label={content.slideLabel(
                          project.title,
                          normalizeProjectIndex(renderedIndex, projectCount) + 1,
                          projects.length,
                        )}
                      >
                        {isCardLinked ? (
                          <Link
                            ref={(node) => {
                              slideLinkRefs.current[renderedIndex] = node;
                            }}
                            className="project-stage__card-link"
                            to={project.ctaTo ?? detailPath}
                            state={project.ctaTo ? undefined : { backgroundLocation: location }}
                            aria-label={content.openProjectLabel(project.title)}
                            tabIndex={isActive ? 0 : -1}
                            onKeyDown={(event) => handleCardKeyDown(event, renderedIndex)}
                          >
                            <div className="project-stage__card">
                              <div className="project-stage__surface">
                                <ProjectArtwork
                                  project={project}
                                  mode={getArtworkMode(renderedIndex, activeRenderedIndex)}
                                />
                              </div>
                            </div>
                          </Link>
                        ) : (
                          <div className="project-stage__card-link" aria-hidden="true">
                            <div className="project-stage__card">
                              <div className="project-stage__surface">
                                <ProjectArtwork
                                  project={project}
                                  mode={getArtworkMode(renderedIndex, activeRenderedIndex)}
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </article>
                    );
                  })}
                </div>

                <ProjectControls
                  project={activeProject}
                  index={activeIndex}
                  total={projects.length}
                  onPrevious={goToPreviousProject}
                  onNext={goToNextProject}
                  onToggleAutoPlay={toggleAutoPlay}
                  isAutoPlaying={isAutoPlaying}
                  content={content}
                />
              </div>
            </div>

            <ProjectControls
              project={activeProject}
              index={activeIndex}
              total={projects.length}
              onPrevious={goToPreviousProject}
              onNext={goToNextProject}
              onToggleAutoPlay={toggleAutoPlay}
              isAutoPlaying={isAutoPlaying}
              content={content}
              sticky
            />
          </>
        )}
      </section>
    </RouteErrorBoundary>
  );
}
