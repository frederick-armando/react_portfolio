import { m } from 'framer-motion';
import { IconProfile } from '../components/icons.jsx';
import '../styles/pages.css';

import { pagesContent } from '../i18n/content/pages.jsx';
import { useLanguage } from '../i18n/LanguageContext.jsx';

export default function Profil() {
  const { language } = useLanguage();
  const content = pagesContent[language].profile;
  const skillGroups = content.skillGroups ?? [
    {
      title: content.skillsTitle,
      skills: content.skills ?? [],
    },
  ];

  return (
    <section className="section">
      <div className="section__header">
        <IconProfile />
        <h1>{content.title}</h1>
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
          <div className="profile__skill-groups">
            {skillGroups.map((group) => (
              <section className="profile__skill-group" key={group.title}>
                <h4>{group.title}</h4>
                <div className="chip-list">
                  {group.skills.map((skill) => (
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
              </section>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
