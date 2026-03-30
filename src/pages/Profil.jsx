import { m } from 'framer-motion';
import { IconProfile } from '../components/icons.jsx';
import '../styles/pages.css';

import { pagesContent } from '../i18n/content/pages.jsx';
import { useLanguage } from '../i18n/LanguageContext.jsx';

export default function Profil() {
  const { language } = useLanguage();
  const content = pagesContent[language].profile;

  return (
    <section className="section">
      <div className="section__header">
        <IconProfile />
        <h2>{content.title}</h2>
      </div>

      <div className="profile">
        <div className="profile__text">
          <h3>{content.introTitle}</h3>
          {content.introParagraphs.map((paragraph, index) => (
            <p key={`intro-${index}`}>{paragraph}</p>
          ))}
        </div>

        <div className="profile__skills">
          <h3>{content.skillsTitle}</h3>
          <div className="chip-list">
            {content.skills.map((skill) => (
              <m.span 
                className="chip" 
                key={skill}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                {skill}
              </m.span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
