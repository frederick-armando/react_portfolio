import React, { useState, useEffect, useRef } from 'react';
import { 
  Accessibility, 
  ZoomIn, 
  ZoomOut, 
  Type, 
  Contrast, 
  Sun, 
  Link as LinkIcon, 
  Play, 
  RotateCcw 
} from 'lucide-react';
import Button from './Button.jsx';
import { IconClose } from './icons.jsx';
import { useLanguage } from '../i18n/LanguageContext.jsx';
import '../styles/Accessibility.css';

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
    openMenu: "Ouvrir le menu d'accessibilité"
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
    openMenu: "Open accessibility menu"
  }
};

const AccessibilityWidget = () => {
  const { language } = useLanguage();
  const t = translations[language] || translations.fr;

  const [isOpen, setIsOpen] = useState(false);
  const [textSize, setTextSize] = useState(100);
  const [readableFont, setReadableFont] = useState(false);
  const [contrastMode, setContrastMode] = useState('none'); // 'none', 'high', 'grayscale'
  const [highlightLinks, setHighlightLinks] = useState(false);
  const [stopAnimations, setStopAnimations] = useState(false);

  // Drag states for mobile bottom sheet
  const [translateY, setTranslateY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isEntering, setIsEntering] = useState(false);
  const startYRef = useRef(0);

  // Toggle Panel
  const togglePanel = () => {
    if (!isOpen) {
      setIsOpen(true);
      setIsEntering(true);
    } else {
      setIsOpen(false);
    }
    setTranslateY(0);
  };

  const handleAnimationEnd = (e) => {
    if (e.target === e.currentTarget) {
      setIsEntering(false);
    }
  };

  // Text Size Handlers
  const increaseTextSize = () => setTextSize((prev) => Math.min(prev + 10, 200));
  const decreaseTextSize = () => setTextSize((prev) => Math.max(prev - 10, 80));

  // Reset Handler
  const handleReset = () => {
    setTextSize(100);
    setReadableFont(false);
    setContrastMode('none');
    setHighlightLinks(false);
    setStopAnimations(false);
  };

  // Effect: Text Size
  useEffect(() => {
    document.body.style.zoom = `${textSize}%`;
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

  }, [readableFont, contrastMode, highlightLinks, stopAnimations]);

  // Drag Handlers
  const handlePointerDown = (e) => {
    if (window.innerWidth > 768) return; // Only drag on mobile
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

  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && (
        <div className="a11y-backdrop" onClick={togglePanel} aria-hidden="true" />
      )}
      <div id="a11y-widget-container">
        {isOpen && (
          <div 
            className={`a11y-panel ${isEntering ? 'a11y-panel--entering' : ''}`}
            role="dialog" 
            aria-labelledby="a11y-panel-title"
            onAnimationEnd={handleAnimationEnd}
            style={{ 
              transform: translateY > 0 ? `translateY(${translateY}px)` : '',
              transition: isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1)'
            }}
          >
            <div 
              className="a11y-handle-area"
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
            >
              <div className="a11y-handle" />
            </div>

            <div className="a11y-panel-header">
              <h3 id="a11y-panel-title">{t.title}</h3>
              <Button 
                variant="tertiary" 
                icon={IconClose} 
                iconOnly={true} 
                className="a11y-panel-close" 
                onClick={togglePanel} 
                title={t.closePanel} 
              />
            </div>

            <div className="a11y-section">
              <div className="a11y-section-title">
                <Type size={16} /> {t.textSize} ({textSize}%)
              </div>
              <div className="a11y-button-group">
                <button 
                  className="a11y-btn" 
                  onClick={decreaseTextSize}
                  disabled={textSize <= 80}
                  aria-label={t.decreaseText}
                >
                  <ZoomOut size={18} /> A-
                </button>
                <button 
                  className="a11y-btn" 
                  onClick={increaseTextSize}
                  disabled={textSize >= 200}
                  aria-label={t.increaseText}
                >
                  <ZoomIn size={18} /> A+
                </button>
              </div>
            </div>

            <div className="a11y-section">
              <div className="a11y-section-title">
                <Type size={16} /> {t.readability}
              </div>
              <div className="a11y-button-group">
                <button 
                  className={`a11y-btn ${readableFont ? 'active' : ''}`}
                  onClick={() => setReadableFont(!readableFont)}
                  aria-pressed={readableFont}
                >
                  {t.dyslexicFont}
                </button>
              </div>
            </div>

            <div className="a11y-section">
              <div className="a11y-section-title">
                <Contrast size={16} /> {t.contrasts}
              </div>
              <div className="a11y-button-group">
                <button 
                  className={`a11y-btn ${contrastMode === 'high' ? 'active' : ''}`}
                  onClick={() => setContrastMode(contrastMode === 'high' ? 'none' : 'high')}
                  aria-pressed={contrastMode === 'high'}
                >
                  <Contrast size={18} /> {t.highContrast}
                </button>
                <button 
                  className={`a11y-btn ${contrastMode === 'grayscale' ? 'active' : ''}`}
                  onClick={() => setContrastMode(contrastMode === 'grayscale' ? 'none' : 'grayscale')}
                  aria-pressed={contrastMode === 'grayscale'}
                >
                  <Sun size={18} /> {t.grayscale}
                </button>
              </div>
            </div>

            <div className="a11y-section">
              <div className="a11y-section-title">
                <LinkIcon size={16} /> {t.visualCues}
              </div>
              <div className="a11y-button-group">
                <button 
                  className={`a11y-btn ${highlightLinks ? 'active' : ''}`}
                  onClick={() => setHighlightLinks(!highlightLinks)}
                  aria-pressed={highlightLinks}
                >
                  {t.highlightLinks}
                </button>
              </div>
            </div>

            <div className="a11y-section">
              <div className="a11y-section-title">
                <Play size={16} /> {t.animations}
              </div>
              <div className="a11y-button-group">
                <button 
                  className={`a11y-btn ${stopAnimations ? 'active' : ''}`}
                  onClick={() => setStopAnimations(!stopAnimations)}
                  aria-pressed={stopAnimations}
                >
                  {t.stopAnimations}
                </button>
              </div>
            </div>

            <button 
              className="a11y-btn a11y-btn-reset" 
              onClick={handleReset}
              aria-label={t.resetAll}
            >
              <RotateCcw size={16} /> {t.reset}
            </button>
          </div>
        )}

        <Button 
          variant="primary" 
          icon={Accessibility} 
          iconOnly={true}
          className="a11y-fab" 
          onClick={togglePanel}
          title={t.openMenu}
          aria-expanded={isOpen}
          style={{ display: isOpen && window.innerWidth <= 768 ? 'none' : 'flex' }}
        />
      </div>
    </>
  );
};

export default AccessibilityWidget;
