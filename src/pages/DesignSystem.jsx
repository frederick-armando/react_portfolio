import { useMemo, useState, useRef, useEffect } from 'react';
import { useLanguage } from '../i18n/LanguageContext.jsx';
import { useSEO } from '../hooks/useSEO.js';
import { useTheme } from '../theme/ThemeContext.jsx';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button.jsx';
import {
  IconClose,
  IconMessagesSquare,
  IconHome,
  IconProfile,
  IconChartArea,
  IconFolderOpen,
  IconDownload,
} from '../components/icons-shell.jsx';
import {
  IconSettings,
  IconLibraryBig,
  IconBotMessageSquare,
  IconBuilding,
  IconPhone,
  IconMail,
  IconArrowLeft,
  IconCode,
} from '../components/icons.jsx';
import '../styles/pages.css';
import '../styles/shell-home.css';
import '../styles/Accessibility.css';

// System versions source of truth for the Changelog
const changelogData = [
  { version: '1.9.4', date: '2026-07-22', note: 'Rationalisation des badges et tags en une structure unique (.chip / .project-tag), suppression des bordures superflues sur boutons avec badge, mutualisation des boutons d\'accessibilité avec le composant Button principal et affichage exhaustif des palettes light/dark.' },
  { version: '1.9.3', date: '2026-07-16', note: 'Ajout du Design System stable (v1.9.3), refonte du panel d\'accessibilité et mise à jour du CV.' },
  { version: '1.9.2', date: '2026-07-15', note: 'Optimisation SEO/GEO avancée, structured data enrichi avec abstract sémantique et seeks.' },
  { version: '1.9.1', date: '2026-07-10', note: 'Résolution des conflits d\'initialisation du carrousel de projets sur mobile.' },
  { version: '1.9.0', date: '2026-07-04', note: 'Intégration du système de pré-rendu statique postbuild.js et configuration du routage SPA Apache.' }
];

export default function DesignSystem({ isModal = false }) {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const currentVersion = __APP_VERSION__ || '1.9.4';

  // Modal swipe-down drag state
  const [translateY, setTranslateY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startYRef = useRef(0);
  const modalRef = useRef(null);
  const shellRef = useRef(null);

  // Active filter state for auditing ProjectFilter real component
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    if (!isModal) return undefined;

    const previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        navigate(-1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModal, navigate]);

  const handlePointerDown = (e) => {
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

  const dragHandlers = {
    onPointerDown: handlePointerDown,
    onPointerMove: handlePointerMove,
    onPointerUp: handlePointerUp,
    onPointerCancel: handlePointerUp,
  };

  const t = useMemo(() => {
    return {
      fr: {
        title: 'Design System',
        subtitle: 'ds.frederickarmando.fr',
        introTitle: 'Philosophie & Architecture Code',
        introText: 'Documentation technique exacte du code source du site Frederick Armando. Extraction directe des tokens CSS rattachés aux racines de l\'application (`tokens.css`), des composants atomiques React réels (`Button`, `BottomNav`, `ProjectFilter`) et des spécifications d\'accessibilité.',
        tokensTitle: 'Tokens Visuels (tokens.css)',
        tokensText: 'Les variables CSS natives déclarées sur `:root` et adaptées au mode sombre (`[data-theme="dark"]`).',
        colorsLight: 'Palette Mode Clair (Light)',
        colorsDark: 'Palette Mode Sombre (Dark)',
        typography: 'Typographie (Core Sans C)',
        spacing: 'Grille d\'Espacement (8pt Grid)',
        spacingText: 'Valeurs régulières d\'espacement basées sur la grille 8pt.',
        componentsTitle: 'Catalogue de Composants Réels',
        componentsText: 'Les composants React authentiques extraits du codebase sans altération.',
        futureProofingTitle: 'Future-proofing: Chatbot & IA (GenUI)',
        futureProofingText: 'Spécifications techniques pour l\'intégration future de modules conversationnels et d\'agents IA.',
        waitingState: 'État d\'attente / Réflection (Pulse)',
        feedbackState: 'Retour utilisateur (Rating & Copy)',
        flowState: 'Flux conversationnel (User/Bot)',
        changelogTitle: 'Changelog System',
        currentVer: 'Version active',
        backToHome: 'Retour au Portfolio',
        closeModal: 'Fermer le Design System'
      },
      en: {
        title: 'Design System',
        subtitle: 'ds.frederickarmando.fr',
        introTitle: 'Philosophy & Code Architecture',
        introText: 'Strict technical documentation of the actual source code of Frederick Armando portfolio website. Direct extraction of root CSS tokens (`tokens.css`), authentic React components (`Button`, `BottomNav`, `ProjectFilter`), and accessibility specifications.',
        tokensTitle: 'Visual Tokens (tokens.css)',
        tokensText: 'Native CSS variables attached to `:root` and adapted for dark mode (`[data-theme="dark"]`).',
        colorsLight: 'Light Mode Palette',
        colorsDark: 'Dark Mode Palette',
        typography: 'Typography (Core Sans C)',
        spacing: 'Spacing System (8pt Grid)',
        spacingText: 'Regular spacing values based on the 8pt grid.',
        componentsTitle: 'Real Components Catalog',
        componentsText: 'Authentic React components extracted directly from the existing codebase.',
        futureProofingTitle: 'Future-proofing: Chatbot & AI (GenUI)',
        futureProofingText: 'Technical specifications ready for upcoming conversational modules and AI agents.',
        waitingState: 'Thinking State (Pulsing Indicator)',
        feedbackState: 'User Feedback System (Rating & Copy)',
        flowState: 'Conversational Stream (User/Bot)',
        changelogTitle: 'System Changelog',
        currentVer: 'Active Version',
        backToHome: 'Back to Portfolio',
        closeModal: 'Close Design System'
      }
    }[language] ?? fr;
  }, [language]);

  useSEO({
    title: `Design System | Frederick Armando`,
    description: `Spécifications et catalogue de composants réels du design system du portfolio de Frederick Armando.`,
    image: '/assets/OG_Main.png',
    urlPath: '/design-system'
  });

  const contentMarkup = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', paddingBottom: '32px' }}>
      {/* Introduction */}
      <div>
        <h2 style={{ fontSize: 'var(--font-size-3xl)', marginBottom: '16px', borderBottom: '1px solid var(--color-border)', paddingBottom: '8px' }}>{t.introTitle}</h2>
        <p style={{ color: 'var(--color-body)', lineHeight: '1.6' }}>{t.introText}</p>
      </div>

      {/* Visual Tokens */}
      <div>
        <h2 style={{ fontSize: 'var(--font-size-3xl)', marginBottom: '16px', borderBottom: '1px solid var(--color-border)', paddingBottom: '8px' }}>{t.tokensTitle}</h2>
        <p style={{ color: 'var(--color-muted)', marginBottom: '24px' }}>{t.tokensText}</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          {/* Colors Light */}
          <div className="ds-card" style={{ padding: '20px', background: '#ffffff', color: '#12131a', borderRadius: 'var(--radius-lg)', border: '1px solid #e6e8ef' }}>
            <h4 style={{ marginBottom: '16px', color: '#12131a' }}>{t.colorsLight}</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#385AF9' }} />
                <div>
                  <strong style={{ display: 'block', fontSize: 'var(--font-size-md)', color: '#12131a' }}>Primary Blue</strong>
                  <code style={{ fontSize: '11px', color: '#7a8192' }}>--color-primary (#385AF9)</code>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#12131a' }} />
                <div>
                  <strong style={{ display: 'block', fontSize: 'var(--font-size-md)', color: '#12131a' }}>Ink Text</strong>
                  <code style={{ fontSize: '11px', color: '#7a8192' }}>--color-ink (#12131a)</code>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#3e4250' }} />
                <div>
                  <strong style={{ display: 'block', fontSize: 'var(--font-size-md)', color: '#12131a' }}>Body Text</strong>
                  <code style={{ fontSize: '11px', color: '#7a8192' }}>--color-body (#3e4250)</code>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#e6e8ef', border: '1px solid #7a8192' }} />
                <div>
                  <strong style={{ display: 'block', fontSize: 'var(--font-size-md)', color: '#12131a' }}>Border Color</strong>
                  <code style={{ fontSize: '11px', color: '#7a8192' }}>--color-border (#e6e8ef)</code>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#ede9ff', border: '1px solid #6f5cff' }} />
                <div>
                  <strong style={{ display: 'block', fontSize: 'var(--font-size-md)', color: '#12131a' }}>Purple Accent</strong>
                  <code style={{ fontSize: '11px', color: '#7a8192' }}>--color-purple-500 (#6f5cff)</code>
                </div>
              </div>
            </div>
          </div>

          {/* Colors Dark */}
          <div className="ds-card" style={{ padding: '20px', background: '#14151f', color: '#e4e5ed', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <h4 style={{ marginBottom: '16px', color: '#e4e5ed' }}>{t.colorsDark}</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#8DA2FF' }} />
                <div>
                  <strong style={{ display: 'block', fontSize: 'var(--font-size-md)', color: '#e4e5ed' }}>Primary Blue</strong>
                  <code style={{ fontSize: '11px', color: '#7c809a' }}>--color-primary (#8DA2FF)</code>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#e4e5ed' }} />
                <div>
                  <strong style={{ display: 'block', fontSize: 'var(--font-size-md)', color: '#e4e5ed' }}>Ink Text</strong>
                  <code style={{ fontSize: '11px', color: '#7c809a' }}>--color-ink (#e4e5ed)</code>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#b0b3c4' }} />
                <div>
                  <strong style={{ display: 'block', fontSize: 'var(--font-size-md)', color: '#e4e5ed' }}>Body Text</strong>
                  <code style={{ fontSize: '11px', color: '#7c809a' }}>--color-body (#b0b3c4)</code>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(255, 255, 255, 0.08)', border: '1px solid #7c809a' }} />
                <div>
                  <strong style={{ display: 'block', fontSize: 'var(--font-size-md)', color: '#e4e5ed' }}>Border Color</strong>
                  <code style={{ fontSize: '11px', color: '#7c809a' }}>--color-border (rgba white 8%)</code>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(111, 92, 255, 0.12)', border: '1px solid #8a7aff' }} />
                <div>
                  <strong style={{ display: 'block', fontSize: 'var(--font-size-md)', color: '#e4e5ed' }}>Purple Accent</strong>
                  <code style={{ fontSize: '11px', color: '#7c809a' }}>--color-purple-500 (#8a7aff)</code>
                </div>
              </div>
            </div>
          </div>

          {/* Typography */}
          <div className="ds-card" style={{ padding: '20px', background: 'var(--color-surface)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
            <h4 style={{ marginBottom: '16px' }}>{t.typography}</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <span style={{ fontSize: '11px', color: 'var(--color-muted)' }}>Font Family</span>
                <p style={{ fontFamily: 'var(--font-family)', fontWeight: '600' }}>'Core Sans C', sans-serif</p>
              </div>
              <div>
                <span style={{ fontSize: '11px', color: 'var(--color-muted)' }}>H1 Title</span>
                <p style={{ fontSize: 'var(--font-size-4xl)', fontWeight: '800', margin: 0 }}>H1 Title 1.5rem</p>
              </div>
              <div>
                <span style={{ fontSize: '11px', color: 'var(--color-muted)' }}>H2 Subtitle</span>
                <p style={{ fontSize: 'var(--font-size-3xl)', fontWeight: '700', margin: 0 }}>H2 Subtitle 1.25rem</p>
              </div>
              <div>
                <span style={{ fontSize: '11px', color: 'var(--color-muted)' }}>Body Regular</span>
                <p style={{ fontSize: 'var(--font-size-md)', color: 'var(--color-body)', margin: 0 }}>Body regular text 0.875rem</p>
              </div>
            </div>
          </div>

          {/* Spacing Grid (using grid-template-columns: auto) */}
          <div className="ds-card" style={{ padding: '20px', background: 'var(--color-surface)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
            <h4 style={{ marginBottom: '16px' }}>{t.spacing}</h4>
            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-muted)', marginBottom: '12px' }}>{t.spacingText}</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'auto auto auto auto auto', gap: '8px', textAlign: 'center' }}>
              <div style={{ background: 'var(--color-primary-100)', padding: '8px', borderRadius: '6px' }}>
                <strong>4px</strong>
                <div style={{ height: '4px', background: 'var(--color-primary)', marginTop: '8px' }} />
              </div>
              <div style={{ background: 'var(--color-primary-100)', padding: '8px', borderRadius: '6px' }}>
                <strong>8px</strong>
                <div style={{ height: '8px', background: 'var(--color-primary)', marginTop: '8px' }} />
              </div>
              <div style={{ background: 'var(--color-primary-100)', padding: '8px', borderRadius: '6px' }}>
                <strong>16px</strong>
                <div style={{ height: '16px', background: 'var(--color-primary)', marginTop: '8px' }} />
              </div>
              <div style={{ background: 'var(--color-primary-100)', padding: '8px', borderRadius: '6px' }}>
                <strong>24px</strong>
                <div style={{ height: '24px', background: 'var(--color-primary)', marginTop: '8px' }} />
              </div>
              <div style={{ background: 'var(--color-primary-100)', padding: '8px', borderRadius: '4px' }}>
                <strong>32px</strong>
                <div style={{ height: '32px', background: 'var(--color-primary)', marginTop: '8px' }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Real Codebase Components Catalog */}
      <div>
        <h2 style={{ fontSize: 'var(--font-size-3xl)', marginBottom: '16px', borderBottom: '1px solid var(--color-border)', paddingBottom: '8px' }}>{t.componentsTitle}</h2>
        <p style={{ color: 'var(--color-muted)', marginBottom: '24px' }}>{t.componentsText}</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* 1. Button Component (<Button />) */}
          <div className="ds-card" style={{ padding: '24px', background: 'var(--color-surface)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
            <h4 style={{ marginBottom: '8px' }}>Composant &lt;Button /&gt; (src/components/Button.jsx)</h4>
            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-muted)', marginBottom: '16px' }}>
              Le composant bouton principal supportant le ripple effect, les icônes, les badges d'action et la déclinaison sous forme de lien sans bordure superflue.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
              <div>
                <Button variant="primary" icon={IconMail}>Primary Button</Button>
                <code style={{ display: 'block', marginTop: '8px', fontSize: '11px', textAlign: 'center', color: 'var(--color-muted)' }}>variant="primary"</code>
              </div>
              <div>
                <Button variant="secondary" icon={IconPhone}>Secondary Button</Button>
                <code style={{ display: 'block', marginTop: '8px', fontSize: '11px', textAlign: 'center', color: 'var(--color-muted)' }}>variant="secondary"</code>
              </div>
              <div>
                <Button variant="tertiary">Tertiary Button</Button>
                <code style={{ display: 'block', marginTop: '8px', fontSize: '11px', textAlign: 'center', color: 'var(--color-muted)' }}>variant="tertiary"</code>
              </div>
              <div>
                <Button variant="primary" badge={3}>With Badge</Button>
                <code style={{ display: 'block', marginTop: '8px', fontSize: '11px', textAlign: 'center', color: 'var(--color-muted)' }}>badge=&#123;3&#125;</code>
              </div>
              <div>
                <Button variant="secondary" icon={IconSettings} iconOnly={true} title="Settings" />
                <code style={{ display: 'block', marginTop: '8px', fontSize: '11px', textAlign: 'center', color: 'var(--color-muted)' }}>iconOnly=&#123;true&#125;</code>
              </div>
            </div>
          </div>

          {/* 2. Rationalised Badge/Tag (.chip & .project-tag) */}
          <div className="ds-card" style={{ padding: '24px', background: 'var(--color-surface)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
            <h4 style={{ marginBottom: '8px' }}>&lt;Badge /&gt; (.chip / .project-tag)</h4>
            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-muted)', marginBottom: '16px' }}>
              Structure unifiée pour les étiquettes d'information de l'application (.chip et .project-tag).
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
              <span className="chip">Lead Product Designer</span>
              <span className="project-tag"><IconBuilding /> Michelin</span>
            </div>
          </div>

          {/* 3. Project Filter (.project-filter) */}
          <div className="ds-card" style={{ padding: '24px', background: 'var(--color-surface)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
            <h4 style={{ marginBottom: '8px' }}>Filtres Projets (.project-filter)</h4>
            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-muted)', marginBottom: '16px' }}>
              Boutons d'onglets de filtrage utilisés sur la page Projets avec état sélectionné `aria-pressed="true"`.
            </p>
            <div className="project-filters__list" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {[
                { id: 'all', label: 'Tous les projets', count: 6 },
                { id: 'b2c', label: 'B2C', count: 3 },
                { id: 'ai', label: 'IA & Chatbot', count: 2 },
              ].map((f) => (
                <button
                  key={f.id}
                  className={`project-filter${activeFilter === f.id ? ' project-filter--active' : ''}`}
                  type="button"
                  aria-pressed={activeFilter === f.id}
                  onClick={() => setActiveFilter(f.id)}
                >
                  <span>{f.label}</span>
                  <span className="project-filter__count">({f.count})</span>
                </button>
              ))}
            </div>
          </div>

          {/* 4. Bottom Nav Items (.nav-item) */}
          <div className="ds-card" style={{ padding: '24px', background: 'var(--color-surface)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
            <h4 style={{ marginBottom: '8px' }}>Barre de Navigation Mobile (.bottom-nav & .nav-item)</h4>
            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-muted)', marginBottom: '16px' }}>
              Composants de la barre de navigation inférieure mobile (src/components/BottomNav.jsx).
            </p>
            <div style={{ display: 'flex', gap: '24px', alignItems: 'center', background: 'var(--color-surface)', padding: '16px', borderRadius: '18px', border: '1px solid var(--color-border)' }}>
              <div className="nav-item nav-item--active">
                <span className="nav-item__icon"><IconHome /></span>
                <span className="nav-item__label">Accueil</span>
              </div>
              <div className="nav-item">
                <span className="nav-item__icon"><IconProfile /></span>
                <span className="nav-item__label">Profil</span>
              </div>
              <div className="nav-item">
                <span className="nav-item__icon"><IconFolderOpen /></span>
                <span className="nav-item__badge">6</span>
                <span className="nav-item__label">Projets</span>
              </div>
              <div className="nav-item">
                <span className="nav-item__icon"><IconMessagesSquare /></span>
                <span className="nav-item__label">Contact</span>
              </div>
            </div>
          </div>

          {/* 5. TL;DR / Executive Summary (.case-study-section--summary) */}
          <div className="ds-card" style={{ padding: '24px', background: 'var(--color-surface)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
            <h4 style={{ marginBottom: '8px' }}>TL;DR – Résumé Exécutif (.case-study-section--summary)</h4>
            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-muted)', marginBottom: '16px' }}>
              Bloc de synthèse utilisé en tête de chaque étude de cas (src/pages/ProjectCaseStudy.jsx → ExecutiveSummary).
            </p>
            <section className="case-study-section case-study-section--summary">
              <h3 className="case-study-summary__title">TL;DR</h3>
              <p className="case-study-summary__body">
                Refonte de l'expérience de commande en ligne pour 3 000 points de vente professionnels — réduction du temps de commande de <strong>40 %</strong> et hausse du taux de satisfaction de <strong>+18 pts NPS</strong>.
              </p>
            </section>
          </div>

          {/* 6. Metric Cards (.case-study-metrics / .case-study-metric) */}
          <div className="ds-card" style={{ padding: '24px', background: 'var(--color-surface)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
            <h4 style={{ marginBottom: '8px' }}>Cards Métriques (.case-study-metrics / .case-study-metric)</h4>
            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-muted)', marginBottom: '16px' }}>
              Grille de 4 colonnes de cartes de contexte projet (src/pages/ProjectCaseStudy.jsx). Utilisées pour rôle, durée, méthode et technologie.
            </p>
            <section className="case-study-metrics">
              <article className="case-study-metric">
                <IconLibraryBig />
                <h3>Lead Product Designer</h3>
                <p>Stratégie UX, research utilisateur, prototypage et tests</p>
              </article>
              <article className="case-study-metric">
                <IconBuilding />
                <h3>Michelin · B2B</h3>
                <p>Secteur automobile & pneumatiques</p>
              </article>
              <article className="case-study-metric">
                <IconSettings />
                <h3>Figma · Design System</h3>
                <p>Prototypes haute-fidélité, documentation composants</p>
              </article>
              <article className="case-study-metric">
                <IconMail />
                <h3>8 mois · 2023–2024</h3>
                <p>Discovery → Delivery, sprints bi-hebdomadaires</p>
              </article>
            </section>
          </div>

          {/* 7. Tooltip ([data-tooltip]) */}
          <div className="ds-card" style={{ padding: '24px', background: 'var(--color-surface)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
            <h4 style={{ marginBottom: '8px' }}>Tooltip ([data-tooltip])</h4>
            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-muted)', marginBottom: '16px' }}>
              Tooltip CSS pur via l'attribut <code>data-tooltip</code> et le pseudo-élément <code>::before</code> (shell-home.css). Déclenché au survol et au focus clavier. Aussi natif sur les boutons iconOnly via <code>title</code>.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', alignItems: 'center' }}>
              <button
                type="button"
                data-tooltip="Tooltip sur un bouton"
                style={{ padding: '10px 20px', borderRadius: '999px', background: 'var(--color-surface)', border: '1px solid var(--color-border)', cursor: 'pointer', fontSize: 'var(--font-size-sm)', color: 'var(--color-ink)' }}
              >
                Survole-moi
              </button>
              <Button variant="secondary" icon={IconSettings} iconOnly={true} title="Paramètres (tooltip natif via title)" />
            </div>
          </div>
        </div>
      </div>

      {/* Future Proofing IA */}
      <div style={{ background: 'rgba(56, 90, 249, 0.03)', border: '1px dashed var(--color-primary)', padding: '32px', borderRadius: 'var(--radius-lg)' }}>
        <h2 style={{ fontSize: 'var(--font-size-3xl)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--color-primary)' }}>
          <IconBotMessageSquare />
          {t.futureProofingTitle}
        </h2>
        <p style={{ color: 'var(--color-muted)', marginBottom: '24px' }}>{t.futureProofingText}</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
          <div style={{ background: 'var(--color-surface)', padding: '20px', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
            <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-primary)', display: 'inline-block' }} />
              {t.waitingState}
            </h4>
            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-body)', lineHeight: '1.5' }}>
              Structure d’état d’attente pour l’agent (Pensée, recherche d’API). Prévu avec une micro-animation de pulsation sur le contour du widget et l’intégration de Skeleton loaders conversationnels.
            </p>
          </div>

          <div style={{ background: 'var(--color-surface)', padding: '20px', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
            <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-primary)', display: 'inline-block' }} />
              {t.feedbackState}
            </h4>
            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-body)', lineHeight: '1.5' }}>
              Composants de retour d’informations utilisateurs (Pouce levé / baissé, copier-coller) à implémenter directement sous les blocs de réponse textuels de l’IA.
            </p>
          </div>

          <div style={{ background: 'var(--color-surface)', padding: '20px', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
            <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-primary)', display: 'inline-block' }} />
              {t.flowState}
            </h4>
            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-body)', lineHeight: '1.5' }}>
              Gestionnaire de flux conversationnel alternant entre les messages utilisateur (`user-bubble` alignée à droite) et les réponses de l’agent (`bot-bubble` alignée à gauche avec avatar).
            </p>
          </div>
        </div>
      </div>

      {/* System Changelog */}
      <div id="changelog" className="ds-card" style={{ padding: '28px', background: 'var(--color-surface)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', marginBottom: '32px' }}>
        <h3 style={{ marginBottom: '20px', fontSize: 'var(--font-size-2xl)', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <IconMessagesSquare style={{ width: '24px', height: '24px', flexShrink: 0, color: 'var(--color-primary)' }} />
          {t.changelogTitle}
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {changelogData.map((item) => (
            <div key={item.version} style={{ display: 'flex', gap: '16px', borderLeft: '2px solid var(--color-primary-100)', paddingLeft: '16px' }}>
              <div style={{ minWidth: '80px' }}>
                <strong style={{ color: 'var(--color-primary)', fontSize: 'var(--font-size-lg)' }}>v{item.version}</strong>
                <span style={{ display: 'block', fontSize: 'var(--font-size-xs)', color: 'var(--color-muted)' }}>{item.date}</span>
              </div>
              <p style={{ color: 'var(--color-body)', fontSize: 'var(--font-size-md)', lineHeight: '1.5' }}>{item.note}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Footer (Structure Case Studies) */}
      <div style={{ marginTop: 'var(--space-8)' }}>
        <div className="case-study__next-projects">
          <div className="case-study__next-projects-left">
            <div className="case-study__next-projects-tertiary">
              <Button
                variant="tertiary"
                icon={IconArrowLeft}
                to="/"
                state={isModal ? location.state : undefined}
              >
                Retour au portfolio
              </Button>
              <Button
                variant="tertiary"
                to="/404-secret"
              >
                Découvre un dernier secret
              </Button>
            </div>
          </div>

          <div className="case-study__next-projects-right">
            <div className="case-study__next-projects-right-secondary">
              <Button
                variant="secondary"
                icon={IconCode}
                href="https://github.com/frederick-armando/react_portfolio"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub Repository
              </Button>
            </div>

            <div className="case-study__next-projects-right-primary">
              <Button
                variant="primary"
                icon={IconMail}
                to="/contact"
              >
                Contact Me
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (isModal) {
    return (
      <div className="case-study-backdrop" onClick={() => navigate(-1)}>
        <div
          ref={modalRef}
          className="case-study-modal case-study-modal--entering"
          role="dialog"
          aria-modal="true"
          style={{
            transform: `translateY(${translateY}px)`,
            transition: isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="case-study__header case-study__header--modal">
            <div className="case-study__handle-area" {...dragHandlers}>
              <div className="case-study__handle" />
            </div>
            <div className="case-study__header-content">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <IconLibraryBig />
                <h2 className="case-study__title" style={{ margin: 0 }}>{t.title}</h2>
                <span className="chip" style={{ background: 'var(--color-primary-100)', color: 'var(--color-primary)', fontWeight: '600', marginLeft: '4px' }}>
                  v{currentVersion}
                </span>
              </div>
              <Button variant="tertiary" onClick={() => navigate(-1)} icon={IconClose} iconOnly={true} className="case-study__close-btn" title={t.closeModal} />
            </div>
          </div>
          <div ref={shellRef} className="case-study-shell case-study-shell--scrollable">
            {contentMarkup}
          </div>
        </div>
      </div>
    );
  }

  // Standalone Page Mode
  return (
    <section className="section design-system-page">
      <div className="section__header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <IconLibraryBig />
          <h1>{t.title}</h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span className="chip" style={{ background: 'var(--color-primary-100)', color: 'var(--color-primary)', fontWeight: '600' }}>
            v{currentVersion}
          </span>
          <Button variant="tertiary" onClick={() => navigate(-1)} icon={IconClose} iconOnly={true} title={t.backToHome} />
        </div>
      </div>
      {contentMarkup}
    </section>
  );
}
