import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { IconPersonStanding } from './icons-shell.jsx';
import Button from './Button.jsx';
import { useLanguage } from '../i18n/LanguageContext.jsx';
import '../styles/Accessibility.css';

const ACCESSIBILITY_STORAGE_KEY = 'portfolio-accessibility-preferences';
const loadAccessibilityPanel = () => import('./AccessibilityPanel.jsx');
const AccessibilityPanel = lazy(loadAccessibilityPanel);

const DEFAULT_SETTINGS = {
  textSize: 100,
  readableFont: false,
  contrastMode: 'none',
  highlightLinks: false,
  stopAnimations: false,
  bigCursor: false,
  enhancedFocus: false,
};

function getInitialSettings() {
  if (typeof window === 'undefined') return DEFAULT_SETTINGS;

  try {
    const stored = window.localStorage.getItem(ACCESSIBILITY_STORAGE_KEY);
    if (!stored) return DEFAULT_SETTINGS;

    const parsed = JSON.parse(stored);
    return {
      ...DEFAULT_SETTINGS,
      ...parsed,
      textSize: Math.min(Math.max(Number(parsed.textSize) || 100, 80), 200),
      contrastMode: ['none', 'high', 'grayscale'].includes(parsed.contrastMode)
        ? parsed.contrastMode
        : 'none',
    };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

const translations = {
  fr: {
    title: "Accessibilité",
    closePanel: "Fermer le panneau d'accessibilité",
    textSize: "Taille du texte",
    decreaseText: "Diminuer la taille du texte",
    increaseText: "Augmenter la taille du texte",
    readability: "Lisibilité",
    dyslexicFont: "Police Dyslexie",
    contrasts: "Contrastes",
    highContrast: "Élevé",
    grayscale: "Gris",
    visualCues: "Repères visuels",
    highlightLinks: "Surligner les liens",
    animations: "Animations",
    stopAnimations: "Stopper animations",
    reset: "Réinitialiser",
    resetAll: "Réinitialiser tous les paramètres",
    openMenu: "Ouvrir les réglages d'accessibilité",
    interaction: "Interaction",
    bigCursor: "Pointeur Agrandi",
    enhancedFocus: "Focus Clavier Visible"
  },
  en: {
    title: "Accessibility",
    closePanel: "Close accessibility panel",
    textSize: "Text Size",
    decreaseText: "Decrease text size",
    increaseText: "Increase text size",
    readability: "Readability",
    dyslexicFont: "Dyslexic Font",
    contrasts: "Contrasts",
    highContrast: "High",
    grayscale: "Grayscale",
    visualCues: "Visual Cues",
    highlightLinks: "Highlight links",
    animations: "Animations",
    stopAnimations: "Stop animations",
    reset: "Reset",
    resetAll: "Reset all settings",
    openMenu: "Open accessibility settings",
    interaction: "Interaction",
    bigCursor: "Big Cursor",
    enhancedFocus: "Enhanced Focus"
  }
};

const AccessibilityWidget = () => {
  const { language } = useLanguage();
  const t = translations[language] || translations.fr;

  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState(getInitialSettings);
  const {
    textSize,
    readableFont,
    contrastMode,
    highlightLinks,
    stopAnimations,
    bigCursor,
    enhancedFocus,
  } = settings;

  const previouslyFocusedElementRef = useRef(null);

  const updateSetting = useCallback((key, value) => {
    setSettings((current) => ({
      ...current,
      [key]: typeof value === 'function' ? value(current[key]) : value,
    }));
  }, []);

  const openPanel = () => {
    previouslyFocusedElementRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    loadAccessibilityPanel();
    setIsOpen(true);
  };

  const closePanel = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Toggle Panel
  const togglePanel = () => {
    if (!isOpen) {
      openPanel();
    } else {
      closePanel();
    }
  };

  // Reset Handler
  const handleReset = () => {
    setSettings(DEFAULT_SETTINGS);
  };

  useEffect(() => {
    try {
      window.localStorage.setItem(ACCESSIBILITY_STORAGE_KEY, JSON.stringify(settings));
    } catch {
      // Ignore storage errors in private or restricted browser contexts.
    }
  }, [settings]);

  // Effect: Text Size
  useEffect(() => {
    const root = document.documentElement;

    if (textSize === 100) {
      root.style.removeProperty('font-size');
      return undefined;
    }

    root.style.fontSize = `${textSize}%`;

    return () => {
      root.style.removeProperty('font-size');
    };
  }, [textSize]);

  // Effect: Body Classes
  useEffect(() => {
    const body = document.body;

    if (readableFont) body.classList.add('a11y-readable-font');
    else body.classList.remove('a11y-readable-font');

    body.classList.remove('a11y-high-contrast', 'a11y-grayscale');
    if (contrastMode === 'high') body.classList.add('a11y-high-contrast');
    if (contrastMode === 'grayscale') body.classList.add('a11y-grayscale');

    if (highlightLinks) body.classList.add('a11y-highlight-links');
    else body.classList.remove('a11y-highlight-links');

    if (stopAnimations) body.classList.add('a11y-no-animations');
    else body.classList.remove('a11y-no-animations');

    if (bigCursor) body.classList.add('a11y-big-cursor');
    else body.classList.remove('a11y-big-cursor');

    if (enhancedFocus) body.classList.add('a11y-enhanced-focus');
    else body.classList.remove('a11y-enhanced-focus');

    return () => {
      body.classList.remove(
        'a11y-readable-font',
        'a11y-high-contrast',
        'a11y-grayscale',
        'a11y-highlight-links',
        'a11y-no-animations',
        'a11y-big-cursor',
        'a11y-enhanced-focus',
      );
    };
  }, [readableFont, contrastMode, highlightLinks, stopAnimations, bigCursor, enhancedFocus]);

  useEffect(() => {
    if (isOpen) return;

    const previous = previouslyFocusedElementRef.current;
    previouslyFocusedElementRef.current = null;

    if (previous?.isConnected) {
      previous.focus({ preventScroll: true });
    }
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <Suspense fallback={null}>
          <AccessibilityPanel
            t={t}
            settings={settings}
            updateSetting={updateSetting}
            onClose={closePanel}
            onReset={handleReset}
          />
        </Suspense>
      )}
      <Button
        variant="tertiary"
        reverse={true}
        icon={IconPersonStanding}
        iconOnly={true}
        className="a11y-header-trigger"
        onClick={togglePanel}
        onFocus={loadAccessibilityPanel}
        onMouseEnter={loadAccessibilityPanel}
        title={t.openMenu}
        aria-controls="a11y-panel"
        aria-expanded={isOpen}
      />
    </>
  );
};

export default AccessibilityWidget;
