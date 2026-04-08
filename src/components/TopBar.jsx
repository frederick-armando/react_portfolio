import { Link } from 'react-router-dom';
import ThemeToggleButton from './ThemeToggleButton.jsx';
import LanguageToggleButton from './LanguageToggleButton.jsx';
import Button from './Button.jsx';
import BookmarkButton from './BookmarkButton.jsx';
import { IconDownload } from './icons-shell.jsx';
import { uiContent } from '../i18n/content/ui.js';
import { useLanguage } from '../i18n/LanguageContext.jsx';
import logoWhiteMobile from '../assets/Logo_White_V3.svg';

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
          <img src={logoWhiteMobile} alt="Frederick Armando" className="brand__logo" />
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
