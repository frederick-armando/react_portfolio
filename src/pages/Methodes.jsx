import { useMemo, useState } from 'react';
import { IconChartArea } from '../components/icons-shell.jsx';
import MethodsWave from '../components/MethodsWave.jsx';
import '../styles/pages.css';
import { pagesContent } from '../i18n/content/pages.jsx';
import { useLanguage } from '../i18n/LanguageContext.jsx';
import { useSEO } from '../hooks/useSEO.js';
import { seoConfig } from '../config/seo.js';
import { createPageStructuredData } from '../config/structuredData.js';

export default function Methodes() {
  const { language } = useLanguage();
  const content = pagesContent[language].methods;
  const seoData = seoConfig.methods;
  const structuredData = useMemo(
    () =>
      createPageStructuredData({
        ...seoData,
        path: '/methodes',
      }),
    [seoData],
  );
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useSEO({
    title: seoData.title,
    description: seoData.description,
    image: seoData.image,
    urlPath: '/methodes',
    structuredData,
  });

  return (
    <section className="section">
      <div className="section__header">
        <IconChartArea />
        <h1>{content.title}</h1>
      </div>

      <MethodsWave hoveredIndex={hoveredIndex} onHover={setHoveredIndex} />

      <div className="methods-grid">
        {content.items.map((item, index) => (
          <div
            className={`methods-card${hoveredIndex !== null && hoveredIndex !== index ? ' methods-card--inactive' : ''}`}
            key={item.title}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
