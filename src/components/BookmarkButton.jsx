import { useLanguage } from '../i18n/LanguageContext.jsx';
import { uiContent } from '../i18n/content/ui.js';
import Button from './Button.jsx';
import { IconBookmark } from './icons-shell.jsx';

export default function BookmarkButton({ className = '' }) {
  const { language } = useLanguage();
  const content = uiContent[language].bookmarkButton;

  return (
    <Button
      variant="tertiary"
      reverse={true}
      className={className}
      aria-label={content.ariaLabel}
      title={content.tooltip}
      href="https://uxvr.fr/"
      target="_blank"
      rel="noopener noreferrer"
      icon={IconBookmark}
      iconOnly={true}
    />
  );
}
