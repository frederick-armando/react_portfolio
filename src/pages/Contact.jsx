import { useMemo } from 'react';
import { m } from 'framer-motion';
import {
  IconFigmaBrand,
  IconLinkedIn,
  IconGithub,
  IconYouTube,
  IconPhone,
  IconMessagesSquare,
  IconMail,
} from '../components/icons.jsx';
import Button from '../components/Button.jsx';
import '../styles/pages.css';
import { pagesContent } from '../i18n/content/pages.jsx';
import { useLanguage } from '../i18n/LanguageContext.jsx';
import { useSEO } from '../hooks/useSEO.js';
import { seoConfig } from '../config/seo.js';
import { createPageStructuredData } from '../config/structuredData.js';

const socialIcons = [
  {
    label: 'LinkedIn',
    icon: IconLinkedIn,
    href: 'https://www.linkedin.com/in/frederickarmando',
  },
  {
    label: 'Github',
    icon: IconGithub,
    href: 'https://github.com/frederick-armando',
  },
  {
    label: 'YouTube',
    icon: IconYouTube,
    href: 'https://www.youtube.com/channel/UC7TFv4Y5TEsn9yYFJmjRHvQ?view_as=subscriber',
  },
  {
    label: 'Figma',
    icon: IconFigmaBrand,
    href: 'https://www.figma.com/@Fred_Armando_UX',
  },
];

export default function Contact() {
  const { language } = useLanguage();
  const content = pagesContent[language].contact;
  const seoData = seoConfig.contact;
  const structuredData = useMemo(
    () =>
      createPageStructuredData({
        ...seoData,
        path: '/contact',
        type: 'ContactPage',
      }),
    [seoData],
  );

  useSEO({
    title: seoData.title,
    description: seoData.description,
    image: seoData.image,
    urlPath: '/contact',
    structuredData,
  });

  return (
    <section className="section contact-page">
      <div className="section__header">
        <m.div whileHover="animate">
          <IconMessagesSquare />
        </m.div>
        <h1>{content.title}</h1>
      </div>

      <div className="contact-layout">
        <div className="contact-layout__intro">
          <h3>{content.introTitle}</h3>
          {content.introParagraphs.map((paragraph, index) => (
            <p key={`contact-intro-${index}`}>{paragraph}</p>
          ))}

          <div className="contact-socials" aria-label={content.socialsAria}>
            {socialIcons.map(({ label, icon: Icon, href }) => (
              <Button
                variant="tertiary"
                key={label}
                aria-label={content.socialLinkLabel(label)}
                title={label}
                icon={Icon}
                iconOnly={true}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
              />
            ))}
          </div>
        </div>

        <div className="contact-layout__details">
          <div className="contact-detail">
            <h3>{content.contactTitle}</h3>
            <p>{content.contactBody}</p>
            <div className="contact-actions">
              <Button
                variant="secondary"
                icon={IconPhone}
                href="tel:+33659054369"
                className="contact-action-btn"
              >
                {content.callMe}
              </Button>
              <Button
                variant="primary"
                icon={IconMail}
                href="mailto:frederickarmando@gmail.com"
                className="contact-action-btn"
              >
                {content.mailMe}
              </Button>
            </div>
          </div>

          <div className="contact-detail">
            <h3>{content.locationTitle}</h3>
            <div className="contact-detail__line">
              <span>{content.locationAddress}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
