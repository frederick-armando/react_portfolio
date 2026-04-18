import { useMemo, useState, useRef, useEffect } from 'react';
import { Navigate, useParams, useNavigate, useLocation } from 'react-router-dom';
import {
  IconArrowLeft,
  IconBriefcase,
  IconBotMessageSquare,
  IconBuilding,
  IconCalendar,
  IconCar,
  IconCloud,
  IconClipboardType,
  IconCode,
  IconClose,
  IconCog,
  IconDatabase,
  IconFigma,
  IconHammer,
  IconKeySquare,
  IconLibraryBig,
  IconMethod,
  IconMic,
  IconMobile,
  IconMessagesSquare,
  IconNote,
  IconBookCheck,
  IconPencilRuler,
  IconKanban,
  IconSearch,
  IconSquareKanban,
  IconStickyNote,
  IconTicket,
  IconTruck,
  IconUsers,
  IconWaypoints,
  IconWebcam,
} from '../components/icons.jsx';
import Button from '../components/Button.jsx';
import ProjectArtwork from '../components/ProjectArtwork.jsx';
import heliosMockup1 from '../assets/projects/helios/helios-mockup-1.png';
import heliosMockup2 from '../assets/projects/helios/helios-mockup-2.png';
import heliosWireframe1 from '../assets/projects/helios/helios-wireframe-1.png';
import heliosWireframe2 from '../assets/projects/helios/helios-wireframe-2.png';
import kirrkDashboard from '../assets/projects/kirrk/kirrk-dashboard.png';
import kirrkMockupFull from '../assets/projects/kirrk/kirrk-mockup-full.png';
import kirrkWireframe1 from '../assets/projects/kirrk/kirrk-wireframe-1.png';
import kirrkWireframe2 from '../assets/projects/kirrk/kirrk-wireframe-2.png';
import masteosLaunch1 from '../assets/projects/masteos/masteos-launch-1.png';
import masteosLaunch2 from '../assets/projects/masteos/masteos-launch-2.png';
import masteosSitemap from '../assets/projects/masteos/masteos-sitemap.png';
import masteosValidation1 from '../assets/projects/masteos/masteos-validation-1.png';
import masteosValidation2 from '../assets/projects/masteos/masteos-validation-2.png';
import mobioosDashboard from '../assets/projects/mobioos/mobioos-dashboard.png';
import mobioosFull from '../assets/projects/mobioos/mobioos-full.png';
import mobioosMockup1 from '../assets/projects/mobioos/mobioos-mockup-1.png';
import mobioosMockup2 from '../assets/projects/mobioos/mobioos-mockup-2.png';
import myxpertFlow from '../assets/projects/myxpert/MyXpert Flow.png';
import myxpertLegacyVsNew from '../assets/projects/myxpert/MyTechXpert vs MyXpert.png';
import myxpertLegacyVsNew2x from '../assets/projects/myxpert/MyTechXpert vs MyXpert@2x.png';
import myxpertLegacyVsNew3x from '../assets/projects/myxpert/MyTechXpert vs MyXpert@3x.png';
import tireAssistantABTest from '../assets/projects/tire-assistant/Chatbot ABTest AU.png';
import tireAssistantHighFidelity from '../assets/projects/tire-assistant/Welcome Pop-in, Contextual Notification & Tire Snap.png';
import tireAssistantHighFidelity2x from '../assets/projects/tire-assistant/Welcome Pop-in, Contextual Notification & Tire Snap@2x.png';
import tireAssistantHighFidelity3x from '../assets/projects/tire-assistant/Welcome Pop-in, Contextual Notification & Tire Snap@3x.png';
import { getLocalizedProjects, getProjectBySlug } from '../data/projects.js';
import { caseStudyContent } from '../i18n/content/caseStudies.js';
import { useLanguage } from '../i18n/LanguageContext.jsx';
import { useSEO } from '../hooks/useSEO.js';
import { seoConfig } from '../config/seo.js';
import '../styles/pages.css';

const metricIcons = {
  calendar: IconCalendar,
  briefcase: IconBriefcase,
  method: IconMethod,
  code: IconCode,
  mic: IconMic,
  ticket: IconTicket,
  note: IconNote,
  mobile: IconMobile,
  users: IconUsers,
  'pencil-ruler': IconPencilRuler,
  'square-dashed-kanban': IconKanban,
  'square-kanban': IconSquareKanban,
  'sticky-note': IconStickyNote,
  database: IconDatabase,
  webcam: IconWebcam,
  figma: IconFigma,
  waypoints: IconWaypoints,
  'clipboard-type': IconClipboardType,
  search: IconSearch,
  'code-xml': IconCode,
  'library-big': IconLibraryBig,
  'book-open-check': IconBookCheck,
};

const tagIcons = {
  building: IconBuilding,
  users: IconUsers,
  cloud: IconCloud,
};

const ExecutiveSummary = ({ content }) => {
  if (!content.summary) return null;
  return (
    <section 
      className="case-study-section case-study-section--summary" 
      style={{ 
        backgroundColor: 'rgba(109, 147, 255, 0.12)', 
        padding: '1.5rem', 
        borderLeft: '4px solid var(--color-primary)', 
        borderRadius: '0 28px 28px 0',
        marginBottom: '2rem',
        marginTop: '3rem'
      }}
    >
      <h3 style={{ marginTop: 0, marginBottom: '0.5rem', color: 'var(--color-primary)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>TL;DR</h3>
      <p 
        style={{ margin: 0, fontSize: '1.1rem', lineHeight: '1.6' }}
        dangerouslySetInnerHTML={{ __html: content.summary }}
      />
    </section>
  );
};

function ProjectTag({ tag }) {
  const Icon = tagIcons[tag.icon] ?? IconBuilding;

  return (
    <span className="project-tag">
      <Icon />
      {tag.label}
    </span>
  );
}

function CaseStudyHeader({ project, content, isModal, dragHandlers, titleId, closeButtonRef }) {
  const navigate = useNavigate();
  const { language } = useLanguage();
  return (
    <div className={`case-study__header ${isModal ? 'case-study__header--modal' : ''}`}>
      {isModal && (
        <div className="case-study__handle-area" {...dragHandlers}>
          <div className="case-study__handle" />
        </div>
      )}
      <div className="case-study__header-content">
        <h2 id={titleId} className="case-study__title">{content.currentStudy(project.company, project.name || (project.slug.charAt(0).toUpperCase() + project.slug.slice(1)))}</h2>
        {isModal ? (
          <Button ref={closeButtonRef} variant="tertiary" onClick={() => navigate(-1)} icon={IconClose} iconOnly={true} className="case-study__close-btn" title={language === 'fr' ? 'Fermer' : 'Close'} />
        ) : (
          <div className="case-study__actions">
            <Button variant="tertiary" to="/projets" icon={IconArrowLeft}>
              {content.backToProjects}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

const projectConnections = {
  'tire-assistant': { primary: 'myxpert', secondaries: ['masteos', 'kirrk'] },
  myxpert: { primary: 'tire-assistant', secondaries: ['masteos', 'kirrk'] },
  masteos: { primary: 'helios', secondaries: ['tire-assistant', 'kirrk'] },
  helios: { primary: 'masteos', secondaries: ['tire-assistant', 'kirrk'] },
  kirrk: { primary: 'mobioos', secondaries: ['tire-assistant', 'masteos'] },
  mobioos: { primary: 'kirrk', secondaries: ['tire-assistant', 'masteos'] }
};

function NextProjectsFooter({ currentSlug, projects, isModal, onNavigateToProject }) {
  const location = useLocation();
  const connection = projectConnections[currentSlug];
  if (!connection) return null;

  const primaryProj = projects.find(p => p.slug === connection.primary);
  const secondaryProjs = connection.secondaries.map(s => projects.find(p => p.slug === s)).filter(Boolean);
  const contactProj = projects.find(p => p.slug === 'upcoming-case-studies');

  if (!primaryProj && secondaryProjs.length === 0 && !contactProj) return null;

  const handleNavigation = (slug) => {
    if (onNavigateToProject) {
      onNavigateToProject(slug);
    }
  };

  const footerIcons = {
    'cog': IconCog,
    'car': IconCar,
    'car-front': IconCar,
    'hammer': IconHammer,
    'key-square': IconKeySquare,
    'messages-square': IconMessagesSquare,
    'bot-message-square': IconBotMessageSquare,
    'mobile': IconMobile,
    'truck': IconTruck,
  };

  return (
    <div className="case-study__next-projects">
      {secondaryProjs.length > 0 && (
        <div className="case-study__next-projects-left">
          <div className="case-study__next-projects-tertiary">
            {secondaryProjs.map(proj => {
              const SecondaryIcon = footerIcons[proj.ctaIcon];
              return onNavigateToProject ? (
                <Button key={proj.slug} variant="tertiary" icon={SecondaryIcon} onClick={() => handleNavigation(proj.slug)}>
                  {proj.ctaLabel}
                </Button>
              ) : (
                <Button key={proj.slug} variant="tertiary" icon={SecondaryIcon} to={`/projets/${proj.slug}`} state={isModal ? location.state : undefined}>
                  {proj.ctaLabel}
                </Button>
              );
            })}
          </div>
        </div>
      )}

      <div className="case-study__next-projects-right">
        {primaryProj && (() => {
          const PrimaryIcon = footerIcons[primaryProj.ctaIcon];
          return (
            <div className="case-study__next-projects-right-secondary">
              {onNavigateToProject ? (
                <Button variant="secondary" icon={PrimaryIcon} onClick={() => handleNavigation(primaryProj.slug)}>
                  {primaryProj.ctaLabel}
                </Button>
              ) : (
                <Button variant="secondary" icon={PrimaryIcon} to={`/projets/${primaryProj.slug}`} state={isModal ? location.state : undefined}>
                  {primaryProj.ctaLabel}
                </Button>
              )}
            </div>
          );
        })()}

        {contactProj && (
          <div className="case-study__next-projects-right-primary">
            <Button
              variant="primary"
              icon={footerIcons[contactProj.ctaIcon]}
              to={contactProj.ctaTo ?? '/contact'}
              state={undefined}
            >
              {contactProj.ctaLabel}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

function MasteosCaseStudy({ project, projects, content, isModal, onNavigateToProject }) {
  return (
    <>
      <section className="case-study-hero">
        <div className="case-study-hero__copy">
          <div className="case-study-hero__eyebrow">
            {project.tags.map((tag) => (
              <ProjectTag key={tag.label} tag={tag} />
            ))}
          </div>
          <h1>{project.detailTitle}</h1>
          <p dangerouslySetInnerHTML={{ __html: project.detailSummary }} />
        </div>
        <div className="case-study-hero__stage">
          <div className="case-study-hero__frame">
            <ProjectArtwork project={project} mode="detail" />
          </div>
        </div>
      </section>

      <ExecutiveSummary content={content} />

      <section className="case-study-section">
        <h2>{content.sections.intro.title}</h2>
        {content.sections.intro.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>

      <section className="case-study-section">
        <h2>{content.sections.challenges.title}</h2>
        {content.sections.challenges.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>

      <section className="case-study-metrics">
        {content.metrics.map(({ iconKey, title, detail }) => {
          const Icon = metricIcons[iconKey] ?? IconNote;
          return (
            <article className="case-study-metric" key={title}>
              <Icon />
              <h3>{title}</h3>
              <p>{detail}</p>
            </article>
          );
        })}
      </section>

      <section className="case-study-section">
        <h2>{content.sections.research.title}</h2>
        {content.sections.research.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>

      <section className="case-study-section">
        <h2>{content.sections.sitemap.title}</h2>
        {content.sections.sitemap.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>

      <div className="case-study-image case-study-image--full" style={{ padding: '0 var(--space-4)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <figure className="case-study-device-mockup" style={{ width: '100%', margin: 0 }}>
          <img src={masteosSitemap} alt={content.captions.userJourney} draggable="false" style={{ maxWidth: '100%', height: 'auto', borderRadius: 'var(--case-study-asset-radius)' }} />
          <figcaption>{content.captions.userJourney}</figcaption>
        </figure>
      </div>

      <section className="case-study-section">
        <h2>{content.sections.obstacles.title}</h2>
        {content.sections.obstacles.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>

      <section className="case-study-section">
        <h2>{content.sections.launch.title}</h2>
        {content.sections.launch.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>

      <section className="case-study-device-pair">
        <figure className="case-study-device-mockup">
          <img src={masteosLaunch1} alt={content.captions.rentalWireframe} draggable="false" />
          <figcaption>{content.captions.rentalWireframe}</figcaption>
        </figure>
        <figure className="case-study-device-mockup">
          <img src={masteosLaunch2} alt={content.captions.financeWireframe} draggable="false" />
          <figcaption>{content.captions.financeWireframe}</figcaption>
        </figure>
      </section>

      <section className="case-study-section">
        <h2>{content.sections.results.title}</h2>
        {content.sections.results.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>

      <section className="case-study-section">
        <h2>{content.sections.validation.title}</h2>
        {content.sections.validation.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>

      <section className="case-study-device-pair">
        <figure className="case-study-device-mockup">
          <img src={masteosValidation1} alt={content.captions.rentalHighFid} draggable="false" />
          <figcaption>{content.captions.rentalHighFid}</figcaption>
        </figure>
        <figure className="case-study-device-mockup">
          <img src={masteosValidation2} alt={content.captions.financeHighFid} draggable="false" />
          <figcaption>{content.captions.financeHighFid}</figcaption>
        </figure>
      </section>

      <section className="case-study-section">
        <h2>{content.sections.future.title}</h2>
        {content.sections.future.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>

      <section className="case-study-section">
        <h2>{content.sections.learnings.title}</h2>
        {content.sections.learnings.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>

      {false && (
        <section className="case-study-process">
          <div className="case-study-process__header">
            <h2>{content.sections.process.title}</h2>
            <p>{content.sections.process.description}</p>
          </div>

          <div className="case-study-process__grid">
            {content.processColumns.map((column, columnIndex) => (
              <div className="case-study-process__column" key={`column-${columnIndex}`}>
                {column.map((step) => (
                  <div className="case-study-process__node" key={step}>
                    {step}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="case-study-metrics case-study-metrics--tools">
        {content.learningCards.map(({ iconKey, title, detail }) => {
          const Icon = metricIcons[iconKey] ?? IconNote;
          return (
            <article className="case-study-metric" key={title}>
              <Icon />
              <h3>{title}</h3>
              <p>{detail}</p>
            </article>
          );
        })}
      </section>

      <section className="case-study-section">
        <h2>{content.sections.conclusion.title}</h2>
        {content.sections.conclusion.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>

      <div style={{ marginTop: 'var(--space-8)' }}>
        <NextProjectsFooter currentSlug={project.slug} projects={projects} isModal={isModal} onNavigateToProject={onNavigateToProject} />
      </div>
    </>
  );
}


function PlaceholderCaseStudy({ project, projects, content, isModal, onNavigateToProject }) {
  return (
    <>
      <section className="case-study-hero">
        <div className="case-study-hero__copy">
          <div className="case-study-hero__eyebrow">
            {project.tags.map((tag) => (
              <ProjectTag key={tag.label} tag={tag} />
            ))}
          </div>
          <h1>{project.detailTitle}</h1>
          <p dangerouslySetInnerHTML={{ __html: project.detailSummary }} />
          <div className="case-study-placeholder__actions">
            <Button variant="primary" to={project.ctaTo ?? '/contact'} state={undefined}>
              {project.ctaLabel}
            </Button>
          </div>
          <div style={{ marginTop: 'var(--space-8)' }}>
            <NextProjectsFooter currentSlug={project.slug} projects={projects} isModal={isModal} onNavigateToProject={onNavigateToProject} />
          </div>
        </div>
        <div className="case-study-hero__stage">
          <div className="case-study-hero__frame">
            <ProjectArtwork project={project} mode="detail" />
          </div>
        </div>
      </section>

      <section className="case-study-section case-study-section--placeholder">
        <h2>{content.placeholder.title}</h2>
        <p>{content.placeholder.body(project.company)}</p>
      </section>
    </>
  );
}


function HeliosCaseStudy({ project, projects, content, isModal, onNavigateToProject }) {
  return (
    <>
      <section className="case-study-hero">
        <div className="case-study-hero__copy">
          <div className="case-study-hero__eyebrow">
            {project.tags.map((tag) => (
              <ProjectTag key={tag.label} tag={tag} />
            ))}
          </div>
          <h1>{project.detailTitle}</h1>
          <p dangerouslySetInnerHTML={{ __html: project.detailSummary }} />
        </div>
        <div className="case-study-hero__stage">
          <div className="case-study-hero__frame">
            <ProjectArtwork project={project} mode="detail" />
          </div>
        </div>
      </section>

      <ExecutiveSummary content={content} />

      <section className="case-study-section">
        <h2>{content.sections.intro.title}</h2>
        {content.sections.intro.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>

      <section className="case-study-section">
        <h2>{content.sections.users.title}</h2>
        {content.sections.users.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>

      <section className="case-study-metrics">
        {content.metrics.slice(0, 4).map(({ iconKey, title, detail }) => {
          const Icon = metricIcons[iconKey] ?? metricIcons.note;
          return (
            <article className="case-study-metric" key={title}>
              <Icon />
              <h3>{title}</h3>
              <p>{detail}</p>
            </article>
          );
        })}
      </section>

      <section className="case-study-section">
        <h2>{content.sections.challenge.title}</h2>
        {content.sections.challenge.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>

      <section className="case-study-section">
        <h2>{content.sections.daily.title}</h2>
        {content.sections.daily.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>

      <section className="case-study-metrics">
        {content.metrics.slice(4, 8).map(({ iconKey, title, detail }) => {
          const Icon = metricIcons[iconKey] ?? metricIcons.note;
          return (
            <article className="case-study-metric" key={title}>
              <Icon />
              <h3>{title}</h3>
              <p>{detail}</p>
            </article>
          );
        })}
      </section>

      <section className="case-study-section">
        <h2>{content.sections.questions.title}</h2>
        {content.sections.questions.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>

      <section className="case-study-section">
        <h2>{content.sections.workshop.title}</h2>
        {content.sections.workshop.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>

      <section className="case-study-device-pair case-study-device-pair--stack">
        <figure className="case-study-device-mockup">
          <img src={heliosWireframe1} alt={content.captions.profileBefore} draggable="false" />
          <figcaption>{content.captions.profileBefore}</figcaption>
        </figure>
        <figure className="case-study-device-mockup">
          <img src={heliosWireframe2} alt={content.captions.documentBefore} draggable="false" />
          <figcaption>{content.captions.documentBefore}</figcaption>
        </figure>
      </section>

      <section className="case-study-section">
        <h2>{content.sections.battleground.title}</h2>
        {content.sections.battleground.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>

      <section className="case-study-section">
        <h2>{content.sections.launch.title}</h2>
        {content.sections.launch.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>

      <section className="case-study-device-pair case-study-device-pair--stack">
        <figure className="case-study-device-mockup">
          <img src={heliosMockup1} alt={content.captions.profileAfter} draggable="false" />
          <figcaption>{content.captions.profileAfter}</figcaption>
        </figure>
        <figure className="case-study-device-mockup">
          <img src={heliosMockup2} alt={content.captions.documentAfter} draggable="false" />
          <figcaption>{content.captions.documentAfter}</figcaption>
        </figure>
      </section>

      <section className="case-study-section">
        <h2>{content.sections.success.title}</h2>
        {content.sections.success.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>

      <section className="case-study-section">
        <h2>{content.sections.evolution.title}</h2>
        {content.sections.evolution.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>

      <section className="case-study-metrics case-study-metrics--tools">
        {content.tools.map(({ iconKey, title, detail }) => {
          const Icon = metricIcons[iconKey] ?? metricIcons.note;
          return (
            <article className="case-study-metric" key={title}>
              <Icon />
              <h3>{title}</h3>
              <p>{detail}</p>
            </article>
          );
        })}
      </section>

      <section className="case-study-section">
        <h2>{content.sections.innovation.title}</h2>
        {content.sections.innovation.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>

      <section className="case-study-section">
        <h2>{content.sections.design.title}</h2>
        {content.sections.design.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>

      <div style={{ marginTop: 'var(--space-8)' }}>
        <NextProjectsFooter currentSlug={project.slug} projects={projects} isModal={isModal} onNavigateToProject={onNavigateToProject} />
      </div>
    </>
  );
}

function KirrkCaseStudy({ project, projects, content, isModal, onNavigateToProject }) {
  return (
    <>
      <section className="case-study-hero">
        <div className="case-study-hero__copy">
          <div className="case-study-hero__eyebrow">
            {project.tags.map((tag) => (
              <ProjectTag key={tag.label} tag={tag} />
            ))}
          </div>
          <h1>{project.detailTitle}</h1>
          <p dangerouslySetInnerHTML={{ __html: project.detailSummary }} />
        </div>
        <div className="case-study-hero__stage">
          <div className="case-study-hero__frame">
            <ProjectArtwork project={project} mode="detail" />
          </div>
        </div>
      </section>

      <ExecutiveSummary content={content} />

      <section className="case-study-section">
        <h2>{content.sections.intro.title}</h2>
        {content.sections.intro.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>

      <section className="case-study-section">
        <h2>{content.sections.ambition.title}</h2>
        {content.sections.ambition.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>

      <section className="case-study-metrics">
        {content.metrics.map(({ iconKey, title, detail }) => {
          const Icon = metricIcons[iconKey] ?? metricIcons.note;
          return (
            <article className="case-study-metric" key={title}>
              <Icon />
              <h3>{title}</h3>
              <p>{detail}</p>
            </article>
          );
        })}
      </section>

      <section className="case-study-section">
        <h2>{content.sections.challenges.title}</h2>
        {content.sections.challenges.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>

      <section className="case-study-section">
        <h2>{content.sections.daily.title}</h2>
        {content.sections.daily.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>

      <section className="case-study-device-pair case-study-device-pair--stack">
        <figure className="case-study-device-mockup">
          <img src={kirrkMockupFull} alt={content.captions.b2c} draggable="false" />
          <figcaption>{content.captions.b2c}</figcaption>
        </figure>
      </section>

      <section className="case-study-section">
        <h2>{content.sections.moment.title}</h2>
        {content.sections.moment.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>

      <section className="case-study-section">
        <h2>{content.sections.features.title}</h2>
        {content.sections.features.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>

      <section className="case-study-device-pair case-study-device-pair--stack">
        <figure className="case-study-device-mockup">
          <img src={kirrkDashboard} alt={content.captions.fleet} draggable="false" />
          <figcaption>{content.captions.fleet}</figcaption>
        </figure>
      </section>

      <section className="case-study-section">
        <h2>{content.sections.path.title}</h2>
        {content.sections.path.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>

      <section className="case-study-section">
        <h2>{content.sections.learnings.title}</h2>
        {content.sections.learnings.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>

      <section className="case-study-device-pair">
        <figure className="case-study-device-mockup">
          <img src={kirrkWireframe1} alt={content.captions.booking} draggable="false" />
          <figcaption>{content.captions.booking}</figcaption>
        </figure>
        <figure className="case-study-device-mockup">
          <img src={kirrkWireframe2} alt={content.captions.b2b} draggable="false" />
          <figcaption>{content.captions.b2b}</figcaption>
        </figure>
      </section>


      <section className="case-study-section">
        <h2>{content.sections.future.title}</h2>
        {content.sections.future.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>

      <div style={{ marginTop: 'var(--space-8)' }}>
        <NextProjectsFooter currentSlug={project.slug} projects={projects} isModal={isModal} onNavigateToProject={onNavigateToProject} />
      </div>
    </>
  );
}
function TireAssistantCaseStudy({ project, projects, content, isModal, onNavigateToProject }) {
  return (
    <>
      <section className="case-study-hero">
        <div className="case-study-hero__copy">
          <div className="case-study-hero__eyebrow">
            {project.tags.map((tag) => (
              <ProjectTag key={tag.label} tag={tag} />
            ))}
          </div>
          <h1 dangerouslySetInnerHTML={{ __html: project.detailTitle }} />
          <p dangerouslySetInnerHTML={{ __html: project.detailSummary }} />
        </div>
        <div className="case-study-hero__stage">
          <div className="case-study-hero__frame">
            <ProjectArtwork project={project} mode="detail" />
          </div>
        </div>
      </section>

      <ExecutiveSummary content={content} />

      <section className="case-study-section">
         <h2 dangerouslySetInnerHTML={{ __html: content.sections.intro.title }} />
         {content.sections.intro.paragraphs.map((p, i) => (
           <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
         ))}
      </section>

      <section className="case-study-section">
         <h2 dangerouslySetInnerHTML={{ __html: content.sections.challenge.title }} />
         {content.sections.challenge.paragraphs.map((p, i) => (
           <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
         ))}
      </section>

      <section className="case-study-metrics">
        {content.metrics.map(({ iconKey, title, detail }) => {
          const Icon = metricIcons[iconKey] ?? metricIcons.note;
          return (
            <article className="case-study-metric" key={title}>
              <Icon />
              <h3>{title}</h3>
              <p>{detail}</p>
            </article>
          );
        })}
      </section>

      <section className="case-study-section">
         <h2 dangerouslySetInnerHTML={{ __html: content.sections.advocacy.title }} />
         {content.sections.advocacy.paragraphs.map((p, i) => (
           <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
         ))}
      </section>

      <section className="case-study-section">
         <h2 dangerouslySetInnerHTML={{ __html: content.sections.ux.title }} />
         {content.sections.ux.paragraphs.map((p, i) => (
           <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
         ))}
      </section>

      <section className="case-study-device-pair case-study-device-pair--stack">
        <figure className="case-study-device-mockup">
          <img 
            src={tireAssistantABTest} 
            alt={content.captions.abTest} 
            draggable="false" 
            style={{ borderRadius: 'var(--case-study-asset-radius)' }}
          />
          <figcaption>{content.captions.abTest}</figcaption>
        </figure>
      </section>

      <section className="case-study-section">
         <h2 dangerouslySetInnerHTML={{ __html: content.sections.expert.title }} />
         {content.sections.expert.paragraphs.map((p, i) => (
           <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
         ))}
      </section>

      <section className="case-study-section">
         <h2 dangerouslySetInnerHTML={{ __html: content.sections.business.title }} />
         {content.sections.business.paragraphs.map((p, i) => (
           <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
         ))}
      </section>

      <section className="case-study-device-pair case-study-device-pair--stack">
        <figure className="case-study-device-mockup">
          <img 
            src={tireAssistantHighFidelity} 
            srcSet={`${tireAssistantHighFidelity2x} 2x, ${tireAssistantHighFidelity3x} 3x`}
            alt={content.captions.highFidelity} 
            draggable="false" 
            style={{ display: 'block', width: '100%' }}
          />
          <figcaption>{content.captions.highFidelity}</figcaption>
        </figure>
      </section>

      <section className="case-study-section">
         <h2 dangerouslySetInnerHTML={{ __html: content.sections.seo.title }} />
         {content.sections.seo.paragraphs.map((p, i) => (
           <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
         ))}
      </section>

      <section className="case-study-section">
         <h2 dangerouslySetInnerHTML={{ __html: content.sections.future.title }} />
         {content.sections.future.paragraphs.map((p, i) => (
           <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
         ))}
      </section>

      <section className="case-study-metrics case-study-metrics--tools">
        {content.tools.map(({ iconKey, title, detail }) => {
          const Icon = metricIcons[iconKey] ?? metricIcons.note;
          return (
            <article className="case-study-metric" key={title}>
              <Icon />
              <h3>{title}</h3>
              <p>{detail}</p>
            </article>
          );
        })}
      </section>

      <section className="case-study-section">
         <h2 dangerouslySetInnerHTML={{ __html: content.sections.learnings.title }} />
         {content.sections.learnings.paragraphs.map((p, i) => (
           <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
         ))}
      </section>

      <div style={{ marginTop: 'var(--space-8)' }}>
        <NextProjectsFooter currentSlug={project.slug} projects={projects} isModal={isModal} onNavigateToProject={onNavigateToProject} />
      </div>
    </>
  );
}


function MyxpertCaseStudy({ project, projects, content, isModal, onNavigateToProject }) {
  return (
    <>
      <section className="case-study-hero">
        <div className="case-study-hero__copy">
          <div className="case-study-hero__eyebrow">
            {project.tags.map((tag) => (
              <ProjectTag key={tag.label} tag={tag} />
            ))}
          </div>
          <h1 dangerouslySetInnerHTML={{ __html: project.detailTitle }} />
          <p dangerouslySetInnerHTML={{ __html: project.detailSummary }} />
        </div>
        <div className="case-study-hero__stage">
          <div className="case-study-hero__frame">
            <ProjectArtwork project={project} mode="detail" />
          </div>
        </div>
      </section>

      <ExecutiveSummary content={content} />

      <section className="case-study-section">
         <h2 dangerouslySetInnerHTML={{ __html: content.sections.intro.title }} />
         {content.sections.intro.paragraphs.map((p, i) => (
           <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
         ))}
      </section>

      <section className="case-study-section">
         <h2 dangerouslySetInnerHTML={{ __html: content.sections.legacy.title }} />
         {content.sections.legacy.paragraphs.map((p, i) => (
           <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
         ))}
      </section>

      <section className="case-study-metrics">
        {content.metrics.map(({ iconKey, title, detail }) => {
          const Icon = metricIcons[iconKey] ?? metricIcons.note;
          return (
            <article className="case-study-metric" key={title}>
              <Icon />
              <h3>{title}</h3>
              <p>{detail}</p>
            </article>
          );
        })}
      </section>

      <section className="case-study-section">
         <h2 dangerouslySetInnerHTML={{ __html: content.sections.localNeeds.title }} />
         {content.sections.localNeeds.paragraphs.map((p, i) => (
           <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
         ))}
      </section>

      <section className="case-study-section">
         <h2 dangerouslySetInnerHTML={{ __html: content.sections.pivot.title }} />
         {content.sections.pivot.paragraphs.map((p, i) => (
           <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
         ))}
      </section>

      <section className="case-study-device-pair case-study-device-pair--stack">
        <figure className="case-study-device-mockup">
          <img 
            src={myxpertFlow} 
            alt={content.captions.flow} 
            draggable="false" 
            style={{ borderRadius: 'var(--case-study-asset-radius)' }}
          />
          <figcaption>{content.captions.flow}</figcaption>
        </figure>
      </section>

      <section className="case-study-section">
         <h2 dangerouslySetInnerHTML={{ __html: content.sections.agile.title }} />
         {content.sections.agile.paragraphs.map((p, i) => (
           <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
         ))}
      </section>

      <section className="case-study-section">
         <h2 dangerouslySetInnerHTML={{ __html: content.sections.jargon.title }} />
         {content.sections.jargon.paragraphs.map((p, i) => (
           <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
         ))}
      </section>

      <section className="case-study-device-pair case-study-device-pair--stack">
        <figure className="case-study-device-mockup">
          <img 
            src={myxpertLegacyVsNew} 
            srcSet={`${myxpertLegacyVsNew2x} 2x, ${myxpertLegacyVsNew3x} 3x`} 
            alt={content.captions.legacyVsNew} 
            draggable="false" 
            style={{ borderRadius: 'var(--case-study-asset-radius)' }}
          />
          <figcaption>{content.captions.legacyVsNew}</figcaption>
        </figure>
      </section>

      <section className="case-study-section">
         <h2 dangerouslySetInnerHTML={{ __html: content.sections.launch.title }} />
         {content.sections.launch.paragraphs.map((p, i) => (
           <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
         ))}
      </section>

      <section className="case-study-section">
         <h2 dangerouslySetInnerHTML={{ __html: content.sections.future.title }} />
         {content.sections.future.paragraphs.map((p, i) => (
           <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
         ))}
      </section>

      <section className="case-study-metrics case-study-metrics--tools">
        {content.tools.map(({ iconKey, title, detail }) => {
          const Icon = metricIcons[iconKey] ?? metricIcons.note;
          return (
            <article className="case-study-metric" key={title}>
              <Icon />
              <h3>{title}</h3>
              <p>{detail}</p>
            </article>
          );
        })}
      </section>

      <section className="case-study-section">
         <h2 dangerouslySetInnerHTML={{ __html: content.sections.learnings.title }} />
         {content.sections.learnings.paragraphs.map((p, i) => (
           <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
         ))}
      </section>

      <div style={{ marginTop: 'var(--space-8)' }}>
        <NextProjectsFooter currentSlug={project.slug} projects={projects} isModal={isModal} onNavigateToProject={onNavigateToProject} />
      </div>
    </>
  );
}

function MobioosCaseStudy({ project, projects, content, isModal, onNavigateToProject }) {
  return (
    <>
      <section className="case-study-hero">
        <div className="case-study-hero__copy">
          <div className="case-study-hero__eyebrow">
            {project.tags.map((tag) => (
              <ProjectTag key={tag.label} tag={tag} />
            ))}
          </div>
          <h1>{project.detailTitle}</h1>
          <p dangerouslySetInnerHTML={{ __html: project.detailSummary }} />
        </div>
        <div className="case-study-hero__stage">
          <div className="case-study-hero__frame">
            <ProjectArtwork project={project} mode="detail" />
          </div>
        </div>
      </section>

      <ExecutiveSummary content={content} />

      <section className="case-study-section">
        <h2>{content.sections.intro.title}</h2>
        {content.sections.intro.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>

      <section className="case-study-section">
        <h2>{content.sections.playground.title}</h2>
        {content.sections.playground.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>

      <section className="case-study-metrics">
        {content.metrics.map(({ iconKey, title, detail }) => {
          const Icon = metricIcons[iconKey] ?? metricIcons.note;
          return (
            <article className="case-study-metric" key={title}>
              <Icon />
              <h3>{title}</h3>
              <p>{detail}</p>
            </article>
          );
        })}
      </section>

      <section className="case-study-section">
        <h2>{content.sections.juggling.title}</h2>
        {content.sections.juggling.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>

      <section className="case-study-section">
        <h2>{content.sections.challenges.title}</h2>
        {content.sections.challenges.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>

      <section className="case-study-device-pair case-study-device-pair--stack">
        <figure className="case-study-device-mockup">
          <img src={mobioosFull} alt={content.captions.showcase1} draggable="false" />
          <figcaption>{content.captions.showcase1}</figcaption>
        </figure>
      </section>

      <section className="case-study-section">
        <h2>{content.sections.moment.title}</h2>
        {content.sections.moment.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>

      <section className="case-study-section">
        <h2>{content.sections.impact.title}</h2>
        {content.sections.impact.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>

      <section className="case-study-device-pair case-study-device-pair--stack">
        <figure className="case-study-device-mockup">
          <img src={mobioosDashboard} alt={content.captions.dashboard} draggable="false" />
          <figcaption>{content.captions.dashboard}</figcaption>
        </figure>
      </section>

      <section className="case-study-section">
        <h2>{content.sections.synergy.title}</h2>
        {content.sections.synergy.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>

      <section className="case-study-section">
        <h2>{content.sections.launch.title}</h2>
        {content.sections.launch.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>

      <section className="case-study-device-pair">
        <figure className="case-study-device-mockup">
          <img src={mobioosMockup1} alt={content.captions.showcase2} draggable="false" />
          <figcaption>{content.captions.showcase2}</figcaption>
        </figure>
        <figure className="case-study-device-mockup">
          <img src={mobioosMockup2} alt={content.captions.showcase3} draggable="false" />
          <figcaption>{content.captions.showcase3}</figcaption>
        </figure>
      </section>

      <section className="case-study-section">
        <h2>{content.sections.learnings.title}</h2>
        {content.sections.learnings.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>

      <section className="case-study-section">
        <h2>{content.sections.future.title}</h2>
        {content.sections.future.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>

      <div style={{ marginTop: 'var(--space-8)' }}>
        <NextProjectsFooter currentSlug={project.slug} projects={projects} isModal={isModal} onNavigateToProject={onNavigateToProject} />
      </div>
    </>
  );
}


export default function ProjectCaseStudy({ isModal }) {
  const { slug } = useParams();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const localizedProjects = useMemo(() => getLocalizedProjects(language), [language]);

  const [displaySlug, setDisplaySlug] = useState(slug);
  const [isExiting, setIsExiting] = useState(false);
  const [isEntering, setIsEntering] = useState(true);

  if (slug !== displaySlug && !isExiting) {
    setIsExiting(true);
  }

  const currentProject = getProjectBySlug(displaySlug, language);
  const globalContent = caseStudyContent[language];
  const projectContent = globalContent[displaySlug] || {};

  const [translateY, setTranslateY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startYRef = useRef(0);
  const shellRef = useRef(null);
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);
  const previousFocusedElementRef = useRef(null);
  const modalTitleId = `case-study-modal-title-${displaySlug}`;

  useEffect(() => {
    if (shellRef.current) {
      shellRef.current.scrollTop = 0;
    }
  }, [displaySlug]);

  const seoData = seoConfig[displaySlug] || seoConfig.home;
  useSEO({
    title: seoData.title,
    description: seoData.description,
    image: seoData.image,
    urlPath: `/projets/${displaySlug}`
  });

  useEffect(() => {
    if (!isModal || !currentProject) {
      return undefined;
    }

    const modalElement = modalRef.current;
    if (!modalElement) {
      return undefined;
    }

    const backgroundApp = document.querySelector('.app');
    const previousBodyOverflow = document.body.style.overflow;
    const previousAriaHidden = backgroundApp?.getAttribute('aria-hidden') ?? null;
    const hadInert = backgroundApp?.hasAttribute('inert') ?? false;

    previousFocusedElementRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;

    document.body.style.overflow = 'hidden';
    if (backgroundApp) {
      backgroundApp.setAttribute('aria-hidden', 'true');
      backgroundApp.setAttribute('inert', '');
    }

    const focusableSelector = [
      'a[href]',
      'button:not([disabled])',
      'textarea:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ].join(',');

    const getFocusableElements = () =>
      Array.from(modalElement.querySelectorAll(focusableSelector)).filter((element) => {
        if (!(element instanceof HTMLElement)) return false;
        if (element.getAttribute('aria-hidden') === 'true') return false;
        return element.offsetParent !== null || element === document.activeElement;
      });

    const focusInitialElement = () => {
      const preferredTarget = closeButtonRef.current ?? getFocusableElements()[0] ?? modalElement;
      preferredTarget.focus({ preventScroll: true });
    };

    const rafId = window.requestAnimationFrame(focusInitialElement);

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        navigate(-1);
        return;
      }

      if (event.key !== 'Tab') {
        return;
      }

      const focusableElements = getFocusableElements();
      if (focusableElements.length === 0) {
        event.preventDefault();
        modalElement.focus({ preventScroll: true });
        return;
      }

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus({ preventScroll: true });
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus({ preventScroll: true });
      }
    };

    modalElement.addEventListener('keydown', handleKeyDown);

    return () => {
      window.cancelAnimationFrame(rafId);
      modalElement.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousBodyOverflow;

      if (backgroundApp) {
        if (previousAriaHidden === null) {
          backgroundApp.removeAttribute('aria-hidden');
        } else {
          backgroundApp.setAttribute('aria-hidden', previousAriaHidden);
        }

        if (!hadInert) {
          backgroundApp.removeAttribute('inert');
        }
      }

      const previousFocusedElement = previousFocusedElementRef.current;
      if (previousFocusedElement && previousFocusedElement.isConnected) {
        previousFocusedElement.focus({ preventScroll: true });
      }
    };
  }, [currentProject, isModal, navigate]);

  if (!currentProject) {
    return <Navigate replace to="/projets" />;
  }

  const handlePointerDown = (e) => {
    setIsEntering(false);
    setIsDragging(true);
    startYRef.current = e.clientY - translateY;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const newY = Math.max(0, e.clientY - startYRef.current);
    setTranslateY(newY);
  };

  const handlePointerUp = (e) => {
    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
    if (translateY > window.innerHeight * 0.25) {
      navigate(-1);
    } else {
      setTranslateY(0);
    }
  };

  const handleNavigateToProject = isModal ? (nextSlug) => {
    navigate(`/projets/${nextSlug}`, {
      state: location.state,
      replace: true
    });
  } : undefined;

  const dragHandlers = {
    onPointerDown: handlePointerDown,
    onPointerMove: handlePointerMove,
    onPointerUp: handlePointerUp,
    onPointerCancel: handlePointerUp,
  };

  const handleAnimationEnd = (e) => {
    if (e.target !== e.currentTarget) return;
    
    if (isExiting) {
      setDisplaySlug(slug);
      setIsExiting(false);
      setIsEntering(true);
    } else if (isEntering) {
      setIsEntering(false);
    }
  };

  const contentBlock = (
    <div 
      ref={isModal ? modalRef : null}
      className={isModal ? `case-study-modal ${isEntering ? 'case-study-modal--entering' : ''} ${isExiting ? 'case-study-modal--exiting' : ''}` : "case-study-page"}
      role={isModal ? 'dialog' : undefined}
      aria-modal={isModal ? 'true' : undefined}
      aria-labelledby={isModal ? modalTitleId : undefined}
      tabIndex={isModal ? -1 : undefined}
      style={isModal ? { 
        transform: `translateY(${translateY}px)`, 
        transition: isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)' 
      } : {}}
      onClick={(e) => e.stopPropagation()}
      onAnimationEnd={handleAnimationEnd}
    >
      <CaseStudyHeader project={currentProject} content={globalContent} isModal={isModal} dragHandlers={dragHandlers} titleId={modalTitleId} closeButtonRef={closeButtonRef} />
      <div ref={shellRef} className={`case-study-shell ${isModal ? 'case-study-shell--scrollable' : ''}`}>
        {currentProject.slug === 'tire-assistant' ? (
          <TireAssistantCaseStudy project={currentProject} projects={localizedProjects} content={projectContent} isModal={isModal} onNavigateToProject={handleNavigateToProject} />
        ) : currentProject.slug === 'masteos' ? (
          <MasteosCaseStudy project={currentProject} projects={localizedProjects} content={projectContent} isModal={isModal} onNavigateToProject={handleNavigateToProject} />
        ) : currentProject.slug === 'helios' ? (
          <HeliosCaseStudy project={currentProject} projects={localizedProjects} content={projectContent} isModal={isModal} onNavigateToProject={handleNavigateToProject} />
        ) : currentProject.slug === 'kirrk' ? (
          <KirrkCaseStudy project={currentProject} projects={localizedProjects} content={projectContent} isModal={isModal} onNavigateToProject={handleNavigateToProject} />
        ) : currentProject.slug === 'mobioos' ? (
          <MobioosCaseStudy project={currentProject} projects={localizedProjects} content={projectContent} isModal={isModal} onNavigateToProject={handleNavigateToProject} />
        ) : currentProject.slug === 'myxpert' ? (
          <MyxpertCaseStudy project={currentProject} projects={localizedProjects} content={projectContent} isModal={isModal} onNavigateToProject={handleNavigateToProject} />
        ) : (
          <PlaceholderCaseStudy
            project={currentProject}
            projects={localizedProjects}
            content={globalContent}
            isModal={isModal}
            onNavigateToProject={handleNavigateToProject}
          />
        )}
      </div>
    </div>
  );

  return isModal ? (
    <div className="case-study-backdrop" onClick={() => navigate(-1)}>
      {contentBlock}
    </div>
  ) : (
    contentBlock
  );
}
