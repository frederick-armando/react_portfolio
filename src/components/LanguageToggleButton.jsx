import { uiContent } from '../i18n/content/ui.js';
import { useLanguage } from '../i18n/LanguageContext.jsx';
import Button from './Button.jsx';
import { IconLanguages } from './icons-shell.jsx';

export default function LanguageToggleButton({ className = '' }) {
  const { language, toggleLanguage } = useLanguage();
  const content = uiContent[language].languageToggle;

  return (
    <Button
      variant="tertiary"
      reverse={true}
      className={className}
      aria-label={content.ariaLabel}
      title={content.tooltip}
      onClick={toggleLanguage}
      icon={IconLanguages}
      iconOnly={true}
    />
  );
}
