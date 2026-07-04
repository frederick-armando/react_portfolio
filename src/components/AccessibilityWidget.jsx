import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
  IconClose,
  IconContrast,
  IconKeyboard,
  IconLink,
  IconMousePointer2,
  IconMousePointerClick,
  IconPersonStanding,
  IconPlay,
  IconRotateCcw,
  IconSun,
  IconText,
  IconZoomIn,
  IconZoomOut,
} from './icons-shell.jsx';
import Button from './Button.jsx';
import { useLanguage } from '../i18n/LanguageContext.jsx';
import '../styles/Accessibility.css';

const ACCESSIBILITY_STORAGE_KEY = 'portfolio-accessibility-preferences';

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

  // Drag states for mobile bottom sheet
  const [translateY, setTranslateY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isEntering, setIsEntering] = useState(false);
  const startYRef = useRef(0);
  const panelRef = useRef(null);
  const previouslyFocusedElementRef = useRef(null);

  const updateSetting = (key, value) => {
    setSettings((current) => ({
      ...current,
      [key]: typeof value === 'function' ? value(current[key]) : value,
    }));
  };

  const openPanel = () => {
    previouslyFocusedElementRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setIsOpen(true);
    setIsEntering(true);
    setTranslateY(0);
  };

  const closePanel = () => {
    setIsOpen(false);
    setTranslateY(0);
  };

  // Toggle Panel
  const togglePanel = () => {
    if (!isOpen) {
      openPanel();
    } else {
      closePanel();
    }
  };

  const handleAnimationEnd = (e) => {
    if (e.target === e.currentTarget) {
      setIsEntering(false);
    }
  };

  // Text Size Handlers
  const increaseTextSize = () => updateSetting('textSize', (prev) => Math.min(prev + 10, 200));
  const decreaseTextSize = () => updateSetting('textSize', (prev) => Math.max(prev - 10, 80));

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

  useEffect(() => {
    if (!isOpen) return undefined;

    const panel = panelRef.current;
    if (!panel) return undefined;

    const focusableSelector = [
      'a[href]',
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ].join(',');

    const getFocusableElements = () =>
      Array.from(panel.querySelectorAll(focusableSelector)).filter((element) => {
        if (!(element instanceof HTMLElement)) return false;
        const style = window.getComputedStyle(element);
        return style.display !== 'none' && style.visibility !== 'hidden';
      });

    const focusInitialElement = () => {
      const closeButton = panel.querySelector('.a11y-panel-close');
      const target =
        closeButton instanceof HTMLElement ? closeButton : getFocusableElements()[0] ?? panel;
      target.focus({ preventScroll: true });
    };

    const rafId = window.requestAnimationFrame(focusInitialElement);

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closePanel();
        return;
      }

      if (event.key !== 'Tab') return;

      const focusableElements = getFocusableElements();
      if (focusableElements.length === 0) {
        event.preventDefault();
        panel.focus({ preventScroll: true });
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

    panel.addEventListener('keydown', handleKeyDown);

    return () => {
      window.cancelAnimationFrame(rafId);
      panel.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  // Drag Handlers
  const handlePointerDown = (e) => {
    if (window.innerWidth > 768) return; // Only drag on mobile
    if (e.target.closest('button, a, input, select, textarea')) return;

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
    if (!isDragging) return;
    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
    if (translateY > 100) {
      setIsOpen(false);
    }
    setTranslateY(0); // Reset after close animation or if not far enough
  };

  const overlayRoot = typeof document === 'undefined' ? null : document.body;
  const panelOverlay = isOpen ? (
    <>
      <div className="a11y-backdrop" onClick={closePanel} aria-hidden="true" />
      <div id="a11y-widget-container" className="a11y-panel-layer">
        <div
          ref={panelRef}
          id="a11y-panel"
          className={`a11y-panel ${isEntering ? 'a11y-panel--entering' : ''}`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="a11y-panel-title"
          tabIndex="-1"
          onAnimationEnd={handleAnimationEnd}
          style={{
            transform: translateY > 0 ? `translateY(${translateY}px)` : '',
            transition: isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1)'
          }}
        >
            <div
              className="a11y-panel-header-wrapper"
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
            >
              <div className="a11y-handle-area" aria-hidden="true">
                <div className="a11y-handle" />
              </div>
              <div className="a11y-panel-header">
                <h3 id="a11y-panel-title">{t.title}</h3>
                <Button
                  variant="tertiary"
                  icon={IconClose}
                  iconOnly={true}
                  className="a11y-panel-close"
                  onClick={closePanel}
                  title={t.closePanel}
                />
              </div>
            </div>

            <div className="a11y-panel-content">
              <div className="a11y-section">
                <div className="a11y-section-title">
                  <IconText size={16} /> {t.textSize} ({textSize}%)
                </div>
                <div className="a11y-button-group">
                  <Button
                    variant="tertiary"
                    className="a11y-btn"
                    icon={IconZoomOut}
                    onClick={decreaseTextSize}
                    disabled={textSize <= 80}
                    aria-label={t.decreaseText}
                  >
                    A-
                  </Button>
                  <Button
                    variant="tertiary"
                    className="a11y-btn"
                    icon={IconZoomIn}
                    onClick={increaseTextSize}
                    disabled={textSize >= 200}
                    aria-label={t.increaseText}
                  >
                    A+
                  </Button>
                </div>
              </div>

              <div className="a11y-section">
                <div className="a11y-section-title">
                  <IconText size={16} /> {t.readability}
                </div>
                <div className="a11y-button-group">
                  <Button
                    variant={readableFont ? 'primary' : 'tertiary'}
                    className={`a11y-btn ${readableFont ? 'active' : ''}`}
                    onClick={() => updateSetting('readableFont', !readableFont)}
                    aria-pressed={readableFont}
                  >
                    {t.dyslexicFont}
                  </Button>
                </div>
              </div>

              <div className="a11y-section">
                <div className="a11y-section-title">
                  <IconContrast size={16} /> {t.contrasts}
                </div>
                <div className="a11y-button-group">
                  <Button
                    variant={contrastMode === 'high' ? 'primary' : 'tertiary'}
                    className={`a11y-btn ${contrastMode === 'high' ? 'active' : ''}`}
                    icon={IconContrast}
                    onClick={() => updateSetting('contrastMode', contrastMode === 'high' ? 'none' : 'high')}
                    aria-pressed={contrastMode === 'high'}
                  >
                    {t.highContrast}
                  </Button>
                  <Button
                    variant={contrastMode === 'grayscale' ? 'primary' : 'tertiary'}
                    className={`a11y-btn ${contrastMode === 'grayscale' ? 'active' : ''}`}
                    icon={IconSun}
                    onClick={() => updateSetting('contrastMode', contrastMode === 'grayscale' ? 'none' : 'grayscale')}
                    aria-pressed={contrastMode === 'grayscale'}
                  >
                    {t.grayscale}
                  </Button>
                </div>
              </div>

              <div className="a11y-section">
                <div className="a11y-section-title">
                  <IconLink size={16} /> {t.visualCues}
                </div>
                <div className="a11y-button-group">
                  <Button
                    variant={highlightLinks ? 'primary' : 'tertiary'}
                    className={`a11y-btn ${highlightLinks ? 'active' : ''}`}
                    onClick={() => updateSetting('highlightLinks', !highlightLinks)}
                    aria-pressed={highlightLinks}
                  >
                    {t.highlightLinks}
                  </Button>
                </div>
              </div>

              <div className="a11y-section">
                <div className="a11y-section-title">
                  <IconPlay size={16} /> {t.animations}
                </div>
                <div className="a11y-button-group">
                  <Button
                    variant={stopAnimations ? 'primary' : 'tertiary'}
                    className={`a11y-btn ${stopAnimations ? 'active' : ''}`}
                    onClick={() => updateSetting('stopAnimations', !stopAnimations)}
                    aria-pressed={stopAnimations}
                  >
                    {t.stopAnimations}
                  </Button>
                </div>
              </div>

              <div className="a11y-section">
                <div className="a11y-section-title">
                  <IconMousePointerClick size={16} /> {t.interaction}
                </div>
                <div className="a11y-button-group a11y-button-group--stacked">
                  <Button
                    variant={bigCursor ? 'primary' : 'tertiary'}
                    className={`a11y-btn ${bigCursor ? 'active' : ''}`}
                    icon={IconMousePointer2}
                    onClick={() => updateSetting('bigCursor', !bigCursor)}
                    aria-pressed={bigCursor}
                  >
                    {t.bigCursor}
                  </Button>
                  <Button
                    variant={enhancedFocus ? 'primary' : 'tertiary'}
                    className={`a11y-btn ${enhancedFocus ? 'active' : ''}`}
                    icon={IconKeyboard}
                    onClick={() => updateSetting('enhancedFocus', !enhancedFocus)}
                    aria-pressed={enhancedFocus}
                  >
                    {t.enhancedFocus}
                  </Button>
                </div>
              </div>
            </div>

            <div className="a11y-panel-footer">
              <Button
                variant="tertiary"
                className="a11y-btn a11y-btn-reset"
                icon={IconRotateCcw}
                onClick={handleReset}
                aria-label={t.resetAll}
              >
                {t.reset}
              </Button>
            </div>
        </div>
      </div>
    </>
  ) : null;

  return (
    <>
      {overlayRoot && createPortal(panelOverlay, overlayRoot)}
      <Button
        variant="tertiary"
        reverse={true}
        icon={IconPersonStanding}
        iconOnly={true}
        className="a11y-header-trigger"
        onClick={togglePanel}
        title={t.openMenu}
        aria-controls="a11y-panel"
        aria-expanded={isOpen}
      />
    </>
  );
};

export default AccessibilityWidget;
