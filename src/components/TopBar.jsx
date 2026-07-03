import { Link } from 'react-router-dom';
import ThemeToggleButton from './ThemeToggleButton.jsx';
import LanguageToggleButton from './LanguageToggleButton.jsx';
import Button from './Button.jsx';
import BookmarkButton from './BookmarkButton.jsx';
import { IconDownload } from './icons-shell.jsx';
import { uiContent } from '../i18n/content/ui.js';
import { useLanguage } from '../i18n/LanguageContext.jsx';
import logoWhiteMobile from '../assets/Logo_White_V3.svg';

const Logo = (props) => (
  <svg width="270" height="147" viewBox="0 0 270 147" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M237.8 36.4998H160.5H157.5L159 39.0997L181.3 78.4998L181.8 79.3998H182.8H213.6H181.8L157.5 36.4998H237.8ZM259.9 8.19971H108.3L184.1 139.6L221.6 74.6998H184.8L165.5 41.2997H240.8L259.9 8.19971Z" fill="currentColor"/>
    <path d="M86.3498 100.9H108L127.9 134.6L108.5 101.8L108 100.9H107H65.6998H64.6998L64.1998 101.8L44.7998 135.6L64.6998 100.9H86.3498ZM85.6998 8L9.7998 139.3H47.6998H48.6998L67.5998 106.6H104.9L123.8 139.3H161.4L85.6998 8Z" fill="currentColor"/>
  </svg>
);

export default function TopBar() {
  const { language } = useLanguage();
  const content = uiContent[language].topBar;
  const resumeHref =
    language === 'fr'
      ? '/cv/fr_cv_frederick_armando.pdf'
      : '/cv/en_cv_frederick_armando.pdf';

  return (
    <header className="topbar">
      <div className="topbar__inner container">
        <Link to="/" className="brand" aria-label={content.brandLabel}>
          <Logo className="brand__logo" />
        </Link>
        <div className="topbar__actions">
          <ThemeToggleButton />
          <LanguageToggleButton />
          <Button
            variant="tertiary"
            reverse={true}
            href={resumeHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={content.downloadLabel}
            icon={IconDownload}
            iconOnly={true}
            title={content.downloadTooltip}
          />
          <BookmarkButton />
        </div>
      </div>
    </header>
  );
}
