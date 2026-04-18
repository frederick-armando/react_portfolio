import { useState, useEffect, useRef, memo } from 'react';
import { useTheme } from '../theme/ThemeContext.jsx';
import { useLanguage } from '../i18n/LanguageContext.jsx';
import { uiContent } from '../i18n/content/ui.js';
import Button from './Button.jsx';

const IconMoon = ({ className }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
    tabIndex="-1"
    className={className}
  >
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
  </svg>
);

const IconSun = ({ className }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
    tabIndex="-1"
    className={className}
  >
    <circle cx="12" cy="12" r="4" />
    <g>
      <line x1="12" y1="2" x2="12" y2="4" />
      <line x1="12" y1="20" x2="12" y2="22" />
      <line x1="4.93" y1="4.93" x2="6.34" y2="6.34" />
      <line x1="17.66" y1="17.66" x2="19.07" y2="19.07" />
      <line x1="2" y1="12" x2="4" y2="12" />
      <line x1="20" y1="12" x2="22" y2="12" />
      <line x1="4.93" y1="19.07" x2="6.34" y2="17.66" />
      <line x1="17.66" y1="6.34" x2="19.07" y2="4.93" />
    </g>
  </svg>
);

const ThemeMoonIcon = memo(({ className }) => (
  <span className={`theme-toggle__icon theme-toggle__icon--moon ${className ?? ''}`.trim()}>
    <IconMoon className="btn__icon" />
  </span>
));

ThemeMoonIcon.displayName = 'ThemeMoonIcon';

const ThemeSunIcon = memo(({ className }) => (
  <span className={`theme-toggle__icon theme-toggle__icon--sun ${className ?? ''}`.trim()}>
    <IconSun className="btn__icon" />
  </span>
));

ThemeSunIcon.displayName = 'ThemeSunIcon';

export default function ThemeToggleButton({ className = '' }) {
  const { theme, toggleTheme } = useTheme();
  const { language } = useLanguage();
  const content = uiContent[language].themeToggle;
  const isDark = theme === 'dark';

  const [announcement, setAnnouncement] = useState('');
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    setAnnouncement(isDark ? content.announceDark : content.announceLight);
    const timer = setTimeout(() => setAnnouncement(''), 2000);
    return () => clearTimeout(timer);
  }, [isDark, content.announceDark, content.announceLight]);

  const ariaLabel = isDark ? content.ariaLabelDark : content.ariaLabelLight;
  const tooltip = isDark ? content.tooltipDark : content.tooltipLight;

  return (
    <>
      <Button
        variant="tertiary"
        reverse={true}
        className={className}
        aria-label={ariaLabel}
        aria-pressed={isDark}
        title={tooltip}
        onClick={toggleTheme}
        icon={isDark ? ThemeSunIcon : ThemeMoonIcon}
        iconOnly={true}
      />

      <span
        role="status"
        aria-live="polite"
        style={{
          position: 'absolute',
          width: '1px',
          height: '1px',
          padding: 0,
          margin: '-1px',
          overflow: 'hidden',
          clip: 'rect(0, 0, 0, 0)',
          whiteSpace: 'nowrap',
          border: 0,
        }}
      >
        {announcement}
      </span>
    </>
  );
}
