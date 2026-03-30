import Button from '../components/Button.jsx';
import { IconArchive, IconMessagesSquare } from '../components/icons-shell.jsx';

import { homeContent } from '../i18n/content/home.jsx';
import { useLanguage } from '../i18n/LanguageContext.jsx';

export default function Home() {
  const { language } = useLanguage();
  const content = homeContent[language];

  return (
    <section className="hero">
      <div className="hero__header">
        <div className="hero__avatar">
          <div className="hero__avatar-ring">
            <picture>
              <source
                type="image/avif"
                srcSet="/images/avatar-88.avif 1x, /images/avatar-176.avif 2x"
                sizes="88px"
              />
              <source
                type="image/webp"
                srcSet="/images/avatar-88.webp 1x, /images/avatar-176.webp 2x"
                sizes="88px"
              />
              <img
                src="/images/avatar-88.png"
                alt="Frederick Armando" 
                className="hero__avatar-image" 
                width="88"
                height="88"
                draggable="false"
                fetchpriority="high"
                decoding="async"
              />
            </picture>
          </div>
        </div>

        <h1 className="hero__name">
          <span className="hero__name-first">FREDERICK</span>
          <span className="hero__name-last">ARMANDO</span>
        </h1>
      </div>

      <div className="hero__chips">
        {content.chips.map((chip) => (
          <span className="chip" key={chip}>
            {chip}
          </span>
        ))}
      </div>

      <p className="hero__lead">{content.lead}</p>

      <div className="hero__actions">
        <Button variant="primary" to="/projets" icon={IconArchive}>
          {content.projectsCta}
        </Button>
        <Button variant="secondary" to="/contact" icon={IconMessagesSquare}>
          {content.contactCta}
        </Button>
      </div>
    </section>
  );
}
