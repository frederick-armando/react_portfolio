import { useMemo } from 'react';
import { useLanguage } from '../i18n/LanguageContext.jsx';
import { useSEO } from '../hooks/useSEO.js';
import { useTheme } from '../theme/ThemeContext.jsx';
import Button from '../components/Button.jsx';
import {
  IconSettings,
  IconLibraryBig,
  IconBotMessageSquare,
  IconClose,
  IconMessagesSquare,
} from '../components/icons.jsx';
import '../styles/pages.css';

// System versions source of truth for the Changelog
const changelogData = [
  { version: '1.9.3', date: '2026-07-16', note: 'Ajout du Design System stable (v1.9.3), refonte du panel d\'accessibilité et mise à jour du CV.' },
  { version: '1.9.2', date: '2026-07-15', note: 'Optimisation SEO/GEO avancée, structured data enrichi avec abstract sémantique et seeks.' },
  { version: '1.9.1', date: '2026-07-10', note: 'Résolution des conflits d\'initialisation du carrousel de projets sur mobile.' },
  { version: '1.9.0', date: '2026-07-04', note: 'Intégration du système de pré-rendu statique postbuild.js et configuration du routage SPA Apache.' }
];

export default function DesignSystem() {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const currentVersion = __APP_VERSION__ || '1.9.3';

  // Translations object
  const t = useMemo(() => {
    return {
      fr: {
        title: 'Design System',
        subtitle: 'ds.frederickarmando.fr',
        introTitle: 'Introduction & Philosophie',
        introText: 'Un système conçu pour supporter une expérience mobile-first, minimaliste et accessible. Orienté vers l’impact produit (Lead Product Design) et structuré pour la future intégration d’agents intelligents et de modules conversationnels (GenUI).',
        tokensTitle: 'Tokens Visuels',
        tokensText: 'Les variables CSS définies à la racine de l’application (`tokens.css`). Elles s’adaptent dynamiquement en fonction du thème (Clair / Sombre).',
        colors: 'Palette de Couleurs',
        typography: 'Typographie',
        spacing: 'Système d’Espacement (Grid 8pt)',
        spacingText: 'Espacements réguliers basés sur un multiple de 8 pixels.',
        componentsTitle: 'Catalogue de Composants Atomiques',
        componentsText: 'Les blocs de construction de base (Atomes et Molécules) développés de manière accessible et sémantique.',
        futureProofingTitle: 'Future-proofing: Chatbot & IA (GenUI)',
        futureProofingText: 'Spécifications prêtes pour les futurs composants d’interface conversationnelle, de suivi de prompts et d’états d’agents IA.',
        waitingState: 'État d’attente / Réflection',
        feedbackState: 'Système de Feedback',
        flowState: 'Flux de conversation',
        changelogTitle: 'Changelog & Suivi de Version',
        currentVer: 'Version active',
        backToHome: 'Retour au Portfolio'
      },
      en: {
        title: 'Design System',
        subtitle: 'ds.frederickarmando.fr',
        introTitle: 'Introduction & Philosophy',
        introText: 'A design system designed to power a mobile-first, minimalist, and accessible experience. Aimed at product impact (Lead Product Design) and structured for the future integration of AI agents and conversational modules (GenUI).',
        tokensTitle: 'Visual Tokens',
        tokensText: 'CSS variables defined in the application root (`tokens.css`). They adapt dynamically based on the current theme (Light / Dark).',
        colors: 'Color Palette',
        typography: 'Typography',
        spacing: 'Spacing System (8pt Grid)',
        spacingText: 'Regular spacing values based on multiples of 8 pixels.',
        componentsTitle: 'Atomic Components Catalog',
        componentsText: 'Basic building blocks (Atoms and Molecules) built with accessiblity and semantics in mind.',
        futureProofingTitle: 'Future-proofing: Chatbot & AI (GenUI)',
        futureProofingText: 'Specifications ready for upcoming conversational components, prompt logs, and AI agent states.',
        waitingState: 'Thinking / Waiting State',
        feedbackState: 'Feedback Mechanism',
        flowState: 'Conversational Flow',
        changelogTitle: 'Changelog & Version History',
        currentVer: 'Active Version',
        backToHome: 'Back to Portfolio'
      }
    }[language] ?? fr;
  }, [language]);

  useSEO({
    title: `Design System | Frederick Armando`,
    description: `Spécifications et catalogue de composants du design system du portfolio de Frederick Armando.`,
    image: '/assets/OG_Main.png',
    urlPath: '/design-system'
  });

  return (
    <section className="section design-system-page">
      <div className="section__header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <IconLibraryBig />
          <h1>{t.title}</h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '4px' }}>
          <span className="chip" style={{ background: 'var(--color-primary-100)', color: 'var(--color-primary)', fontWeight: '600' }}>
            {t.currentVer} v{currentVersion}
          </span>
          <Button variant="tertiary" to="/" icon={IconClose} iconOnly={true} title={t.backToHome} />
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '48px', marginTop: '32px' }}>
        {/* Intro */}
        <div className="ds-card" style={{ padding: '24px', background: 'var(--color-surface)', borderRadius: '16px', border: '1px solid var(--color-border)' }}>
          <h3 style={{ marginBottom: '12px', fontSize: 'var(--font-size-2xl)' }}>{t.introTitle}</h3>
          <p style={{ color: 'var(--color-body)', lineHeight: '1.6' }}>{t.introText}</p>
        </div>

        {/* Visual Tokens */}
        <div>
          <h2 style={{ fontSize: 'var(--font-size-3xl)', marginBottom: '16px', borderBottom: '1px solid var(--color-border)', paddingBottom: '8px' }}>{t.tokensTitle}</h2>
          <p style={{ color: 'var(--color-muted)', marginBottom: '24px' }}>{t.tokensText}</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {/* Colors */}
            <div className="ds-card" style={{ padding: '20px', background: 'var(--color-surface)', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
              <h4 style={{ marginBottom: '16px' }}>{t.colors}</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'var(--color-primary)' }} />
                  <div>
                    <strong style={{ display: 'block' }}>Primary Blue</strong>
                    <code style={{ fontSize: '11px' }}>--color-primary (#385AF9)</code>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'var(--color-ink)' }} />
                  <div>
                    <strong style={{ display: 'block' }}>Ink (Text / Dark Bg)</strong>
                    <code style={{ fontSize: '11px' }}>--color-ink (#12131a)</code>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'var(--color-body)' }} />
                  <div>
                    <strong style={{ display: 'block' }}>Body Text</strong>
                    <code style={{ fontSize: '11px' }}>--color-body (#3e4250)</code>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'var(--color-border)', border: '1px solid var(--color-muted)' }} />
                  <div>
                    <strong style={{ display: 'block' }}>Border</strong>
                    <code style={{ fontSize: '11px' }}>--color-border (#e6e8ef)</code>
                  </div>
                </div>
              </div>
            </div>

            {/* Typography */}
            <div className="ds-card" style={{ padding: '20px', background: 'var(--color-surface)', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
              <h4 style={{ marginBottom: '16px' }}>{t.typography}</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <span style={{ fontSize: '11px', color: 'var(--color-muted)' }}>Font Family</span>
                  <p style={{ fontFamily: 'var(--font-family)', fontWeight: '600' }}>Core Sans C, sans-serif</p>
                </div>
                <div>
                  <span style={{ fontSize: '11px', color: 'var(--color-muted)' }}>Title Size (H1)</span>
                  <p style={{ fontSize: 'var(--font-size-4xl)', fontWeight: '800' }}>H1 Title: 1.5rem (Mobile) / 2.6rem+</p>
                </div>
                <div>
                  <span style={{ fontSize: '11px', color: 'var(--color-muted)' }}>Body Size</span>
                  <p style={{ fontSize: 'var(--font-size-md)' }}>Body text size: 0.875rem</p>
                </div>
              </div>
            </div>

            {/* Spacing */}
            <div className="ds-card" style={{ padding: '20px', background: 'var(--color-surface)', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
              <h4 style={{ marginBottom: '16px' }}>{t.spacing}</h4>
              <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-muted)', marginBottom: '12px' }}>{t.spacingText}</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px', textAlign: 'center' }}>
                <div style={{ background: 'var(--color-primary-100)', padding: '8px', borderRadius: '4px' }}>
                  <strong>4px</strong>
                  <div style={{ height: '4px', background: 'var(--color-primary)', marginTop: '8px' }} />
                </div>
                <div style={{ background: 'var(--color-primary-100)', padding: '8px', borderRadius: '4px' }}>
                  <strong>8px</strong>
                  <div style={{ height: '8px', background: 'var(--color-primary)', marginTop: '8px' }} />
                </div>
                <div style={{ background: 'var(--color-primary-100)', padding: '8px', borderRadius: '4px' }}>
                  <strong>16px</strong>
                  <div style={{ height: '16px', background: 'var(--color-primary)', marginTop: '8px' }} />
                </div>
                <div style={{ background: 'var(--color-primary-100)', padding: '8px', borderRadius: '4px' }}>
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

        {/* Components */}
        <div>
          <h2 style={{ fontSize: 'var(--font-size-3xl)', marginBottom: '16px', borderBottom: '1px solid var(--color-border)', paddingBottom: '8px' }}>{t.componentsTitle}</h2>
          <p style={{ color: 'var(--color-muted)', marginBottom: '24px' }}>{t.componentsText}</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Buttons */}
            <div className="ds-card" style={{ padding: '24px', background: 'var(--color-surface)', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
              <h4 style={{ marginBottom: '16px' }}>Buttons</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
                <div>
                  <Button variant="primary">Primary Cta</Button>
                  <code style={{ display: 'block', marginTop: '8px', fontSize: '11px', textAlign: 'center' }}>variant="primary"</code>
                </div>
                <div>
                  <Button variant="secondary">Secondary Button</Button>
                  <code style={{ display: 'block', marginTop: '8px', fontSize: '11px', textAlign: 'center' }}>variant="secondary"</code>
                </div>
                <div>
                  <Button variant="tertiary">Tertiary Link</Button>
                  <code style={{ display: 'block', marginTop: '8px', fontSize: '11px', textAlign: 'center' }}>variant="tertiary"</code>
                </div>
                <div>
                  <Button variant="secondary" icon={IconSettings} iconOnly={true} title="Settings" />
                  <code style={{ display: 'block', marginTop: '8px', fontSize: '11px', textAlign: 'center' }}>iconOnly={true}</code>
                </div>
              </div>
            </div>

            {/* Chips */}
            <div className="ds-card" style={{ padding: '24px', background: 'var(--color-surface)', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
              <h4 style={{ marginBottom: '16px' }}>Chips / Badges</h4>
              <div style={{ display: 'flex', gap: '12px' }}>
                <span className="chip">Lead Product Designer</span>
                <span className="chip" style={{ background: 'var(--color-purple-100)', color: 'var(--color-purple-500)' }}>Artificial Intelligence</span>
                <span className="chip">B2C Product</span>
              </div>
            </div>
          </div>
        </div>

        {/* Future Proofing IA */}
        <div style={{ background: 'rgba(56, 90, 249, 0.03)', border: '1px dashed var(--color-primary)', padding: '32px', borderRadius: '16px' }}>
          <h2 style={{ fontSize: 'var(--font-size-3xl)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--color-primary)' }}>
            <IconBotMessageSquare />
            {t.futureProofingTitle}
          </h2>
          <p style={{ color: 'var(--color-muted)', marginBottom: '24px' }}>{t.futureProofingText}</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
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

        {/* Changelog */}
        <div id="changelog" className="ds-card" style={{ padding: '28px', background: 'var(--color-surface)', borderRadius: '16px', border: '1px solid var(--color-border)' }}>
          <h3 style={{ marginBottom: '20px', fontSize: 'var(--font-size-2xl)', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <IconMessagesSquare />
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
      </div>
    </section>
  );
}
