import { Archive, Home } from 'lucide-react';
import Button from '../components/Button.jsx';
import { useLanguage } from '../i18n/LanguageContext.jsx';
import '../styles/pages.css';

const notFoundContent = {
  fr: {
    chip: 'Erreur 404',
    title: 'Ce prototype\na un bug.',
    body: "On dirait que le parcours utilisateur s'arrête ici. Pas de panique, même les meilleurs systèmes ont besoin d'une petite itération.",
    primaryCta: "Retourner à l'accueil",
    secondaryCta: 'Voir mes projets',
  },
  en: {
    chip: 'Error 404',
    title: 'This prototype\nhas a bug.',
    body: "It looks like the user journey ends here. Don't worry, even the best systems need a little iteration sometimes.",
    primaryCta: 'Back to Home',
    secondaryCta: 'View my projects',
  },
};

export default function NotFound() {
  const { language } = useLanguage();
  const content = notFoundContent[language];

  return (
    <section className="not-found">
      <div className="not-found__bg-code" aria-hidden="true">404</div>

      <div className="not-found__inner">
        <div className="not-found__header">
          <span className="chip">{content.chip}</span>
        </div>

        <h1 className="not-found__title">
          {content.title.split('\n').map((line, i) => (
            <span key={i} className="not-found__title-line">{line}</span>
          ))}
        </h1>

        <p className="not-found__body">{content.body}</p>

        <div className="not-found__actions">
          <Button variant="secondary" to="/projets" icon={Archive}>
            {content.secondaryCta}
          </Button>
          <Button variant="primary" to="/" icon={Home}>
            {content.primaryCta}
          </Button>
        </div>
      </div>
    </section>
  );
}
