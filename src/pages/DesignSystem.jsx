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
  IconWandSparkles,
  IconEclipse,
} from '../components/icons.jsx';
import '../styles/pages.css';
import '../styles/shell-home.css';
import '../styles/Accessibility.css';

// System versions source of truth for the Changelog
const changelogData = [
  {
    version: '1.9.5',
    date: '2026-07-29',
    noteFr: 'Badge pill dans les filtres projets, tooltip long-press global (mobile), et ajout du sous-domaine ds.frederickarmando.fr.',
    noteEn: 'Badge pill inside project filters, global long-press tooltip (mobile), and ds.frederickarmando.fr subdomain redirect.'
  },
  {
    version: '1.9.4',
    date: '2026-07-22',
    noteFr: 'Refonte complète du catalogue du Design System : rationalisation des badges et tags (<Badge />), intégration des blocs TL;DR, cards métriques et tooltips, mise à jour de la navigation footer selon la structure des cas d\'études, et internationalisation bilingue intégrale (FR/EN).',
    noteEn: 'Complete Design System catalog revamp: badge/tag rationalization (<Badge />), integration of TL;DR blocks, metric cards, tooltips, footer CTA navigation matching case study layout, and full bilingual i18n support (FR/EN).'
  },
  {
    version: '1.9.3',
    date: '2026-07-16',
    noteFr: 'Ajout du Design System stable (v1.9.3), refonte du panel d\'accessibilité et mise à jour du CV.',
    noteEn: 'Added stable Design System (v1.9.3), revamped accessibility panel, and updated resume.'
  },
  {
    version: '1.9.2',
    date: '2026-07-15',
    noteFr: 'Optimisation SEO/GEO avancée, structured data enrichi avec abstract sémantique et seeks.',
    noteEn: 'Advanced SEO/GEO optimization, enriched structured data with semantic abstract and seeks.'
  },
  {
    version: '1.9.1',
    date: '2026-07-10',
    noteFr: 'Résolution des conflits d\'initialisation du carrousel de projets sur mobile.',
    noteEn: 'Fixed project carousel initialization conflicts on mobile devices.'
  },
  {
    version: '1.9.0',
    date: '2026-07-04',
    noteFr: 'Intégration du système de pré-rendu statique postbuild.js et configuration du routage SPA Apache.',
    noteEn: 'Integrated postbuild.js static pre-rendering system and configured Apache SPA routing.'
  }
];

function TooltipDemo({ t }) {
  return (
    <div className="ds-card" style={{ padding: '24px', background: 'var(--color-surface)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
      <h4 style={{ marginBottom: '8px' }}>{t.tooltipTitle}</h4>
      <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-muted)', marginBottom: '16px' }}>
        {t.tooltipDesc}
      </p>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Button
          variant="secondary"
          icon={IconSettings}
          iconOnly={true}
          title={t.tooltipNativeTitle}
        />
      </div>
    </div>
  );
}

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
    const dict = {
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
        
        btnTitle: 'Composant <Button /> (src/components/Button.jsx)',
        btnDesc: 'Le composant bouton principal supportant le ripple effect, les icônes, les badges d\'action et la déclinaison sous forme de lien sans bordure superflue.',
        btnPrimary: 'Bouton Primaire',
        btnSecondary: 'Bouton Secondaire',
        btnTertiary: 'Bouton Tertiaire',
        btnWithBadge: 'Avec Badge',
        
        badgeTitle: '<Badge /> (.chip / .project-tag)',
        badgeDesc: 'Structure unifiée pour les étiquettes d\'information de l\'application (.chip et .project-tag).',
        badgeRole: 'Lead Product Designer',
        badgeCompany: 'Michelin',
        
        filterTitle: 'Filtres Projets (.project-filter)',
        filterDesc: 'Boutons d\'onglets de filtrage utilisés sur la page Projets avec état sélectionné `aria-pressed="true"`.',
        filterAll: 'Tous les projets',
        filterB2C: 'B2C',
        filterAI: 'IA & Chatbot',
        
        navTitle: 'Barre de Navigation Mobile (.bottom-nav & .nav-item)',
        navDesc: 'Composants de la barre de navigation inférieure mobile (src/components/BottomNav.jsx).',
        navHome: 'Accueil',
        navProfile: 'Profil',
        navProjects: 'Projets',
        navContact: 'Contact',

        tldrTitle: 'TL;DR – Résumé Exécutif (.case-study-section--summary)',
        tldrDesc: 'Bloc de synthèse utilisé en tête de chaque étude de cas (src/pages/ProjectCaseStudy.jsx → ExecutiveSummary).',
        tldrBody: 'Refonte de l\'expérience de commande en ligne pour 3 000 points de vente professionnels — réduction du temps de commande de <strong>40 %</strong> et hausse du taux de satisfaction de <strong>+18 pts NPS</strong>.',

        metricsTitle: 'Cards Métriques (.case-study-metrics / .case-study-metric)',
        metricsDesc: 'Grille de 4 colonnes de cartes de contexte projet (src/pages/ProjectCaseStudy.jsx). Utilisées pour rôle, durée, méthode et technologie.',
        metricRoleTitle: 'Lead Product Designer',
        metricRoleDetail: 'Stratégie UX, research utilisateur, prototypage et tests',
        metricCompanyTitle: 'Michelin · B2B',
        metricCompanyDetail: 'Secteur automobile & pneumatiques',
        metricTechTitle: 'Figma · Design System',
        metricTechDetail: 'Prototypes haute-fidélité, documentation composants',
        metricDurationTitle: '8 mois · 2023–2024',
        metricDurationDetail: 'Discovery → Delivery, sprints bi-hebdomadaires',

        tooltipTitle: 'Tooltip ([data-tooltip])',
        tooltipDesc: 'Tooltip CSS pur via l\'attribut `data-tooltip` et le pseudo-élément `::before` (shell-home.css). Déclenché au survol et au focus clavier. Aussi natif sur les boutons iconOnly via `title`.',
        tooltipBtnText: 'Survole-moi',
        tooltipBtnTooltip: 'Tooltip sur un bouton',
        tooltipNativeTitle: 'Paramètres (tooltip natif via title)',

        futureProofingTitle: 'Future-proofing: Chatbot & IA (GenUI)',
        futureProofingText: 'Spécifications techniques pour l\'intégration future de modules conversationnels et d\'agents IA.',
        waitingState: 'État d\'attente / Réflexion (Pulse)',
        waitingDesc: 'Structure d’état d’attente pour l’agent (Pensée, recherche d’API). Prévu avec une micro-animation de pulsation sur le contour du widget et l’intégration de Skeleton loaders conversationnels.',
        feedbackState: 'Retour utilisateur (Rating & Copy)',
        feedbackDesc: 'Composants de retour d’informations utilisateurs (Pouce levé / baissé, copier-coller) à implémenter directement sous les blocs de réponse textuels de l’IA.',
        flowState: 'Flux conversationnel (User/Bot)',
        flowDesc: 'Gestionnaire de flux conversationnel alternant entre les messages utilisateur (`user-bubble` alignée à droite) et les réponses de l’agent (`bot-bubble` alignée à gauche avec avatar).',
        
        changelogTitle: 'Changelog System',
        currentVer: 'Version active',
        backToHome: 'Dépôt GitHub',
        secretBtn: 'Le côté obscur',
        projectsBtn: 'Découvrir mes projets',
        githubBtn: 'Dépôt GitHub',
        contactBtn: 'Me contacter',
        closeModal: 'Fermer le Design System',
        seoDescription: 'Spécifications et catalogue de composants réels du design system du portfolio de Frederick Armando.'
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
        
        btnTitle: '<Button /> Component (src/components/Button.jsx)',
        btnDesc: 'Main button component supporting ripple effect, icons, action badges, and link variants without extra borders.',
        btnPrimary: 'Primary Button',
        btnSecondary: 'Secondary Button',
        btnTertiary: 'Tertiary Button',
        btnWithBadge: 'With Badge',

        badgeTitle: '<Badge /> (.chip / .project-tag)',
        badgeDesc: 'Unified structure for application tags and chips (.chip and .project-tag).',
        badgeRole: 'Lead Product Designer',
        badgeCompany: 'Michelin',

        filterTitle: 'Project Filters (.project-filter)',
        filterDesc: 'Filter tab buttons used on Projects page with selected state `aria-pressed="true"`.',
        filterAll: 'All projects',
        filterB2C: 'B2C',
        filterAI: 'AI & Chatbot',

        navTitle: 'Mobile Navigation Bar (.bottom-nav & .nav-item)',
        navDesc: 'Mobile bottom navigation components (src/components/BottomNav.jsx).',
        navHome: 'Home',
        navProfile: 'Profile',
        navProjects: 'Projects',
        navContact: 'Contact',

        tldrTitle: 'TL;DR – Executive Summary (.case-study-section--summary)',
        tldrDesc: 'Summary block placed at the top of each case study (src/pages/ProjectCaseStudy.jsx → ExecutiveSummary).',
        tldrBody: 'Redesigning the online ordering experience for 3,000 professional stores — <strong>40%</strong> ordering time reduction and <strong>+18 pts NPS</strong> increase.',

        metricsTitle: 'Metrics Cards (.case-study-metrics / .case-study-metric)',
        metricsDesc: '4-column project context grid (src/pages/ProjectCaseStudy.jsx). Used for role, duration, methodology, and tech stack.',
        metricRoleTitle: 'Lead Product Designer',
        metricRoleDetail: 'UX strategy, user research, prototyping and testing',
        metricCompanyTitle: 'Michelin · B2B',
        metricCompanyDetail: 'Automotive & tyre industry',
        metricTechTitle: 'Figma · Design System',
        metricTechDetail: 'High-fidelity prototypes, component specs',
        metricDurationTitle: '8 months · 2023–2024',
        metricDurationDetail: 'Discovery → Delivery, bi-weekly sprints',

        tooltipTitle: 'Tooltip ([data-tooltip])',
        tooltipDesc: 'Pure CSS tooltip via `data-tooltip` attribute and `::before` pseudo-element (shell-home.css). Triggered on hover and keyboard focus. Also native on iconOnly buttons via `title`.',
        tooltipBtnText: 'Hover me',
        tooltipBtnTooltip: 'Tooltip on a button',
        tooltipNativeTitle: 'Settings (native tooltip via title)',

        futureProofingTitle: 'Future-proofing: Chatbot & AI (GenUI)',
        futureProofingText: 'Technical specifications ready for upcoming conversational modules and AI agents.',
        waitingState: 'Thinking State (Pulse)',
        waitingDesc: 'Agent waiting state structure (Thinking, API querying). Designed with pulsing border micro-animations and conversational Skeleton loaders.',
        feedbackState: 'User Feedback System (Rating & Copy)',
        feedbackDesc: 'User feedback components (Thumbs up/down, copy to clipboard) ready for insertion under AI text responses.',
        flowState: 'Conversational Stream (User/Bot)',
        flowDesc: 'Conversational stream manager alternating user messages (`user-bubble` aligned right) and agent responses (`bot-bubble` aligned left with avatar).',

        changelogTitle: 'System Changelog',
        currentVer: 'Active Version',
        backToHome: 'GitHub Repository',
        secretBtn: 'The Dark Side',
        projectsBtn: 'Discover my projects',
        githubBtn: 'GitHub Repository',
        contactBtn: 'Contact Me',
        closeModal: 'Close Design System',
        seoDescription: 'Specifications and real component catalog of Frederick Armando\'s portfolio design system.'
      }
    };
    return dict[language] ?? dict.fr;
  }, [language]);

  useSEO({
    title: `Design System | Frederick Armando`,
    description: t.seoDescription,
    image: '/assets/OG_Main.png',
    urlPath: '/design-system'
  });

  const contentMarkup = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
      {/* Introduction */}
      <div>
        <h2 style={{ fontSize: 'var(--font-size-3xl)', marginBottom: '16px', borderBottom: '1px solid var(--color-border)', paddingBottom: '8px' }}>{t.introTitle}</h2>
        <p style={{ color: 'var(--color-body)', lineHeight: '1.6' }}>{t.introText}</p>
      </div>

      {/* Visual Tokens */}
      <div>
        <h2 style={{ fontSize: 'var(--font-size-3xl)', marginBottom: '16px', borderBottom: '1px solid var(--color-border)', paddingBottom: '8px' }}>{t.tokensTitle}</h2>
        <p style={{ color: 'var(--color-muted)', marginBottom: '24px' }}>{t.tokensText}</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px' }}>
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
            <h4 style={{ marginBottom: '8px' }}>{t.btnTitle}</h4>
            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-muted)', marginBottom: '16px' }}>
              {t.btnDesc}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
              <div>
                <Button variant="primary" icon={IconMail}>{t.btnPrimary}</Button>
                <code style={{ display: 'block', marginTop: '8px', fontSize: '11px', textAlign: 'center', color: 'var(--color-muted)' }}>variant="primary"</code>
              </div>
              <div>
                <Button variant="secondary" icon={IconPhone}>{t.btnSecondary}</Button>
                <code style={{ display: 'block', marginTop: '8px', fontSize: '11px', textAlign: 'center', color: 'var(--color-muted)' }}>variant="secondary"</code>
              </div>
              <div>
                <Button variant="tertiary">{t.btnTertiary}</Button>
                <code style={{ display: 'block', marginTop: '8px', fontSize: '11px', textAlign: 'center', color: 'var(--color-muted)' }}>variant="tertiary"</code>
              </div>
              <div>
                <Button variant="primary" badge={3}>{t.btnWithBadge}</Button>
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
            <h4 style={{ marginBottom: '8px' }}>{t.badgeTitle}</h4>
            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-muted)', marginBottom: '16px' }}>
              {t.badgeDesc}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
              <span className="chip">{t.badgeRole}</span>
              <span className="project-tag"><IconBuilding /> {t.badgeCompany}</span>
            </div>
          </div>

          {/* 3. Project Filter (.project-filter) */}
          <div className="ds-card" style={{ padding: '24px', background: 'var(--color-surface)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
            <h4 style={{ marginBottom: '8px' }}>{t.filterTitle}</h4>
            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-muted)', marginBottom: '16px' }}>
              {t.filterDesc}
            </p>
            <div className="project-filters__list" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {[
                { id: 'all', label: t.filterAll, count: 6 },
                { id: 'b2c', label: t.filterB2C, count: 3 },
              ].map((f) => (
                <button
                  key={f.id}
                  className={`project-filter${activeFilter === f.id ? ' project-filter--active' : ''}`}
                  type="button"
                  aria-pressed={activeFilter === f.id}
                  onClick={() => setActiveFilter(f.id)}
                >
                  <span>{f.label}</span>
              <span className="project-filter__badge">{f.count}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 4. Bottom Nav Items (.nav-item) */}
          <div className="ds-card" style={{ padding: '24px', background: 'var(--color-surface)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
            <h4 style={{ marginBottom: '8px' }}>{t.navTitle}</h4>
            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-muted)', marginBottom: '16px' }}>
              {t.navDesc}
            </p>
            <div style={{ display: 'flex', gap: '24px', alignItems: 'center', background: 'var(--color-surface)', padding: '16px', borderRadius: '18px', border: '1px solid var(--color-border)' }}>
              <div className="nav-item nav-item--active">
                <span className="nav-item__icon"><IconHome /></span>
                <span className="nav-item__label">{t.navHome}</span>
              </div>
              <div className="nav-item">
                <span className="nav-item__icon"><IconFolderOpen /></span>
                <span className="nav-item__badge">6</span>
                <span className="nav-item__label">{t.navProjects}</span>
              </div>
            </div>
          </div>

          {/* 5. TL;DR / Executive Summary (.case-study-section--summary) */}
          <div className="ds-card" style={{ padding: '24px', background: 'var(--color-surface)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
            <h4 style={{ marginBottom: '8px' }}>{t.tldrTitle}</h4>
            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-muted)', marginBottom: '16px' }}>
              {t.tldrDesc}
            </p>
            <section className="case-study-section case-study-section--summary" style={{ marginTop: 0, marginBottom: 0 }}>
              <h3 className="case-study-summary__title">TL;DR</h3>
              <p className="case-study-summary__body" dangerouslySetInnerHTML={{ __html: t.tldrBody }} />
            </section>
          </div>

          {/* 6. Metric Cards (.case-study-metrics / .case-study-metric) */}
          <div className="ds-card" style={{ padding: '24px', background: 'var(--color-surface)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
            <h4 style={{ marginBottom: '8px' }}>{t.metricsTitle}</h4>
            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-muted)', marginBottom: '16px' }}>
              {t.metricsDesc}
            </p>
            <section className="case-study-metrics">
              <article className="case-study-metric">
                <IconLibraryBig />
                <h3>{t.metricRoleTitle}</h3>
                <p>{t.metricRoleDetail}</p>
              </article>
              <article className="case-study-metric">
                <IconBuilding />
                <h3>{t.metricCompanyTitle}</h3>
                <p>{t.metricCompanyDetail}</p>
              </article>
              <article className="case-study-metric">
                <IconSettings />
                <h3>{t.metricTechTitle}</h3>
                <p>{t.metricTechDetail}</p>
              </article>
              <article className="case-study-metric">
                <IconMail />
                <h3>{t.metricDurationTitle}</h3>
                <p>{t.metricDurationDetail}</p>
              </article>
            </section>
          </div>

          {/* 7. Tooltip ([data-tooltip]) */}
          <TooltipDemo t={t} />
        </div>
      </div>

      {/* Future Proofing IA */}
      <div style={{ background: 'rgba(56, 90, 249, 0.03)', border: '1px dashed var(--color-primary)', padding: '32px', borderRadius: 'var(--radius-lg)' }}>
        <h2 style={{ fontSize: 'var(--font-size-3xl)', marginBottom: '12px', color: 'var(--color-primary)' }}>
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
              {t.waitingDesc}
            </p>
          </div>

          <div style={{ background: 'var(--color-surface)', padding: '20px', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
            <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-primary)', display: 'inline-block' }} />
              {t.feedbackState}
            </h4>
            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-body)', lineHeight: '1.5' }}>
              {t.feedbackDesc}
            </p>
          </div>

          <div style={{ background: 'var(--color-surface)', padding: '20px', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
            <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-primary)', display: 'inline-block' }} />
              {t.flowState}
            </h4>
            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-body)', lineHeight: '1.5' }}>
              {t.flowDesc}
            </p>
          </div>
        </div>
      </div>

      {/* System Changelog */}
      <div id="changelog" className="ds-card" style={{ padding: '28px', background: 'var(--color-surface)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
        <h3 style={{ marginBottom: '20px', fontSize: 'var(--font-size-2xl)' }}>
          {t.changelogTitle}
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {changelogData.map((item) => (
            <div key={item.version} style={{ display: 'flex', gap: '16px', borderLeft: '2px solid var(--color-primary-100)', paddingLeft: '16px' }}>
              <div style={{ minWidth: '80px' }}>
                <strong style={{ color: 'var(--color-primary)', fontSize: 'var(--font-size-lg)' }}>v{item.version}</strong>
                <span style={{ display: 'block', fontSize: 'var(--font-size-xs)', color: 'var(--color-muted)' }}>{item.date}</span>
              </div>
              <p style={{ color: 'var(--color-body)', fontSize: 'var(--font-size-md)', lineHeight: '1.5' }}>
                {language === 'fr' ? item.noteFr : item.noteEn}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Footer (Structure Case Studies) */}
      <div className="case-study__next-projects" style={{ marginTop: 0 }}>
          <div className="case-study__next-projects-left">
            <div className="case-study__next-projects-tertiary">
              <Button
                variant="tertiary"
                icon={IconCode}
                href="https://github.com/frederick-armando/react_portfolio"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t.githubBtn}
              </Button>
              <Button
                variant="tertiary"
                icon={IconEclipse}
                to="/404"
              >
                {t.secretBtn}
              </Button>
            </div>
          </div>

          <div className="case-study__next-projects-right">
            <div className="case-study__next-projects-right-secondary">
              <Button
                variant="secondary"
                icon={IconFolderOpen}
                to="/projets"
              >
                {t.projectsBtn}
              </Button>
            </div>

            <div className="case-study__next-projects-right-primary">
              <Button
                variant="primary"
                icon={IconMessagesSquare}
                to="/contact"
              >
                {t.contactBtn}
              </Button>
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
      <div className="section__header" style={{ marginTop: '32px', marginBottom: 0 }}>
        <IconLibraryBig />
        <h1>{t.title}</h1>
        <span className="chip" style={{ background: 'var(--color-primary-100)', color: 'var(--color-primary)', fontWeight: '600', marginLeft: '4px' }}>
          v{currentVersion}
        </span>
      </div>
      {contentMarkup}
    </section>
  );
}
