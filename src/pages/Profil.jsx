import { useMemo } from 'react';
import { IconProfile } from '../components/icons-shell.jsx';
import '../styles/pages.css';

import { pagesContent } from '../i18n/content/pages.jsx';
import { useLanguage } from '../i18n/LanguageContext.jsx';
import { useSEO } from '../hooks/useSEO.js';
import { seoConfig } from '../config/seo.js';
import { createPageStructuredData } from '../config/structuredData.js';

export default function Profil() {
  const { language } = useLanguage();
  const content = pagesContent[language].profile;
  const seoData = seoConfig.profile;
  const structuredData = useMemo(
    () =>
      createPageStructuredData({
        ...seoData,
        path: '/profil',
        type: 'ProfilePage',
      }),
    [seoData],
  );
  const skillGroups = content.skillGroups ?? [
    {
      title: content.skillsTitle,
      skills: content.skills ?? [],
    },
  ];

  useSEO({
    title: seoData.title,
    description: seoData.description,
    image: seoData.image,
    urlPath: '/profil',
    structuredData,
  });

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
                    <span
                      className="chip"
                      key={skill}
                    >
                      {skill}
                    </span>
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
