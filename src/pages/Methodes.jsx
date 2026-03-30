import { useState } from 'react';
import { IconBarChartBig } from '../components/icons.jsx';
import MethodsWave from '../components/MethodsWave.jsx';
import '../styles/pages.css';
import { pagesContent } from '../i18n/content/pages.jsx';
import { useLanguage } from '../i18n/LanguageContext.jsx';

export default function Methodes() {
  const { language } = useLanguage();
  const content = pagesContent[language].methods;
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section className="section">
      <div className="section__header">
        <IconBarChartBig />
        <h2>{content.title}</h2>
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
