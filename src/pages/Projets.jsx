import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from '../components/Button.jsx';
import ProjectArtwork from '../components/ProjectArtwork.jsx';
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
  IconLinkOut,
  IconMail,
  IconMessagesSquare,
  IconBotMessageSquare,
  IconTruck,
  IconPause,
  IconPlay,
  IconSettings,
  IconUsers,
} from '../components/icons.jsx';
import { getLocalizedProjects, projects as projectEntries } from '../data/projects.js';
import { projectsPageContent } from '../i18n/content/projectsPage.js';
import { useLanguage } from '../i18n/LanguageContext.jsx';

const AUTOPLAY_DURATION = 10000;
const PROJECT_COUNT = projectEntries.length;
const LOOP_SET_COUNT = 3;
const MIDDLE_SET_OFFSET = PROJECT_COUNT;

const tagIcons = {
  building: IconBuilding,
  users: IconUsers,
  cloud: IconCloud,
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

function normalizeProjectIndex(index) {
  if (PROJECT_COUNT === 0) {
    return 0;
  }

  return ((index % PROJECT_COUNT) + PROJECT_COUNT) % PROJECT_COUNT;
}

function getLoopedRenderedIndex(renderedIndex) {
  if (PROJECT_COUNT === 0) {
    return 0;
  }

  if (renderedIndex < PROJECT_COUNT || renderedIndex >= PROJECT_COUNT * 2) {
    return normalizeProjectIndex(renderedIndex) + MIDDLE_SET_OFFSET;
  }

  return renderedIndex;
}

function ProjectTag({ tag }) {
  const Icon = tagIcons[tag.icon] ?? IconBuilding;

  return (
    <span className="project-tag">
      <Icon />
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
        <h2>{project.title}</h2>
        <p 
          className="project-showcase__description" 
          dangerouslySetInnerHTML={{ __html: project.description }}
        />
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
  const [activeRenderedIndex, setActiveRenderedIndex] = useState(MIDDLE_SET_OFFSET);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [autoplayProgress, setAutoplayProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isWheelScrolling, setIsWheelScrolling] = useState(false);
  const [isTouchInteracting, setIsTouchInteracting] = useState(false);
  const [isPageHidden, setIsPageHidden] = useState(
    typeof document !== 'undefined' ? document.hidden : false,
  );
  const stageScrollerRef = useRef(null);
  const slideRefs = useRef([]);
  const scrollFrameRef = useRef(null);
  const autoplayFrameRef = useRef(null);
  const hasInitializedRef = useRef(false);
  const suppressClickRef = useRef(false);
  const targetIndexRef = useRef(MIDDLE_SET_OFFSET);
  const wheelEndTimeoutRef = useRef(null);
  const wheelStartIndexRef = useRef(MIDDLE_SET_OFFSET);
  const wheelTravelRef = useRef(0);
  const autoplayCycleStartRef = useRef(null);
  const autoplayProgressRef = useRef(0);
  const dragStateRef = useRef({
    pointerId: null,
    startX: 0,
    startScrollLeft: 0,
    isPointerDown: false,
  });

  const projects = useMemo(() => getLocalizedProjects(language), [language]);
  const renderedProjects = useMemo(
    () =>
      Array.from({ length: PROJECT_COUNT * LOOP_SET_COUNT }, (_, renderedIndex) => {
        const normalizedIndex = renderedIndex % PROJECT_COUNT;

        return {
          key: `${Math.floor(renderedIndex / PROJECT_COUNT)}-${projects[normalizedIndex].slug}`,
          project: projects[normalizedIndex],
          renderedIndex,
        };
      }),
    [projects],
  );
  const activeIndex = normalizeProjectIndex(activeRenderedIndex);
  const activeProject = useMemo(
    () => projects[activeIndex] ?? projects[0],
    [activeIndex, projects],
  );
  const isAutoplayBlocked =
    isDragging || isWheelScrolling || isTouchInteracting || isPageHidden;

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

  function getAutoplayNextIndex() {
    if (PROJECT_COUNT <= 1) {
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
      if (scrollFrameRef.current) {
        window.cancelAnimationFrame(scrollFrameRef.current);
      }

      scrollFrameRef.current = window.requestAnimationFrame(() => {
        const nearestIndex = getNearestProjectIndex(scroller);
        const loopedRenderedIndex = getLoopedRenderedIndex(nearestIndex);

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
    updateActiveProjectFromScroll();

    return () => {
      scroller.removeEventListener('scroll', updateActiveProjectFromScroll);
      if (scrollFrameRef.current) {
        window.cancelAnimationFrame(scrollFrameRef.current);
      }
    };
  }, []);

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

    if (!hasInitializedRef.current) {
      const timeoutId = window.setTimeout(() => {
        alignProject(activeRenderedIndex, 'auto');
        hasInitializedRef.current = true;
      }, 0);

      window.addEventListener('resize', handleResize);

      return () => {
        window.clearTimeout(timeoutId);
        window.removeEventListener('resize', handleResize);
      };
    }

    window.addEventListener('resize', handleResize);

    return () => {
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
        ? getLoopedRenderedIndex(nextIndex)
        : nextIndex;

    alignProject(safeIndex);
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
        targetIndex = getLoopedRenderedIndex(baseIndex + direction);
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

  function handleStageKeyDown(event) {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      goToNextProject();
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      goToPreviousProject();
    }
  }

  return (
    <section className="project-showcase" aria-label={content.sectionLabel}>
      <div
        className={`project-autoplay-progress${isAutoPlaying ? '' : ' project-autoplay-progress--paused'}`}
        aria-hidden="true"
      >
        <span
          className="project-autoplay-progress__fill"
          style={{ transform: `scaleX(${autoplayProgress})` }}
        />
      </div>

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
            aria-roledescription="carousel"
            aria-label={content.stageLabel}
            tabIndex={0}
            onClickCapture={handleStageClickCapture}
            onKeyDown={handleStageKeyDown}
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
                >
                  {isCardLinked ? (
                    <Link
                      className="project-stage__card-link"
                      to={project.ctaTo ?? detailPath}
                      state={project.ctaTo ? undefined : { backgroundLocation: location }}
                      aria-label={content.openProjectLabel(project.title)}
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
    </section>
  );
}
