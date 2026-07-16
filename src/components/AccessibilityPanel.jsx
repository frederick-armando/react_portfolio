import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { createPortal } from 'react-dom';
import {
  IconClose,
  IconContrast,
  IconKeyboard,
  IconLink,
  IconMousePointer2,
  IconMousePointerClick,
  IconPlay,
  IconRotateCcw,
  IconSun,
  IconText,
  IconZoomIn,
  IconZoomOut,
} from './icons-shell.jsx';
import Button from './Button.jsx';

export default function AccessibilityPanel({
  t,
  settings,
  updateSetting,
  onClose,
  onReset,
}) {
  const {
    textSize,
    readableFont,
    contrastMode,
    highlightLinks,
    stopAnimations,
    bigCursor,
    enhancedFocus,
  } = settings;

  const [translateY, setTranslateY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isEntering, setIsEntering] = useState(true);
  const startYRef = useRef(0);
  const panelRef = useRef(null);

  const increaseTextSize = () => updateSetting('textSize', (prev) => Math.min(prev + 10, 200));
  const decreaseTextSize = () => updateSetting('textSize', (prev) => Math.max(prev - 10, 80));

  const handleAnimationEnd = (event) => {
    if (event.target === event.currentTarget) {
      setIsEntering(false);
    }
  };

  useEffect(() => {
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
        onClose();
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
  }, [onClose]);

  const handlePointerDown = (event) => {
    if (window.innerWidth > 768) return;
    if (event.target.closest('button, a, input, select, textarea')) return;

    setIsDragging(true);
    startYRef.current = event.clientY - translateY;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event) => {
    if (!isDragging) return;
    const newY = Math.max(0, event.clientY - startYRef.current);
    setTranslateY(newY);
  };

  const handlePointerUp = (event) => {
    if (!isDragging) return;
    setIsDragging(false);
    event.currentTarget.releasePointerCapture(event.pointerId);
    if (translateY > 100) {
      onClose();
    }
    setTranslateY(0);
  };

  const overlayRoot = typeof document === 'undefined' ? null : document.body;
  if (!overlayRoot) return null;

  return createPortal(
    <>
      <div className="a11y-backdrop" onClick={onClose} aria-hidden="true" />
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
            transition: isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1)',
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
                onClick={onClose}
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
            <Link
              to="/design-system"
              state={{ backgroundLocation: window.location.pathname.startsWith('/design-system') ? { pathname: '/' } : window.location }}
              className="a11y-panel-version"
              style={{
                display: 'block',
                textDecoration: 'none',
                color: 'inherit',
                cursor: 'pointer'
              }}
              onClick={onClose}
            >
              v{__APP_VERSION__ || '1.9.3'}
            </Link>
          </div>

          <div className="a11y-panel-footer">
            <Button
              variant="tertiary"
              className="a11y-btn a11y-btn-reset"
              icon={IconRotateCcw}
              onClick={onReset}
              aria-label={t.resetAll}
            >
              {t.reset}
            </Button>
          </div>
        </div>
      </div>
    </>,
    overlayRoot,
  );
}
