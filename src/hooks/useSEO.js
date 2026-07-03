import { useEffect } from 'react';
import { normalizeAbsoluteUrl, serializeStructuredData } from '../config/structuredData.js';

export const useSEO = ({ title, description, image, urlPath = '', structuredData }) => {
  useEffect(() => {
    const fullUrl = normalizeAbsoluteUrl(urlPath);
    const absoluteImage = image ? normalizeAbsoluteUrl(image) : null;

    // Update Document Title
    document.title = title;

    // Helper to add or update meta tags
    const updateMeta = (name, property, content) => {
      if (!content) return;
      
      let element = null;
      if (name) {
        element = document.querySelector(`meta[name="${name}"]`);
      } else if (property) {
        element = document.querySelector(`meta[property="${property}"]`);
      }

      if (!element) {
        element = document.createElement('meta');
        if (name) element.setAttribute('name', name);
        if (property) element.setAttribute('property', property);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    const updateCanonical = (href) => {
      let element = document.querySelector('link[rel="canonical"]');
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', 'canonical');
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
    };

    // Standard SEO
    updateCanonical(fullUrl);
    updateMeta('description', null, description);

    // Open Graph
    updateMeta(null, 'og:title', title);
    updateMeta(null, 'og:description', description);
    updateMeta(null, 'og:image', absoluteImage);
    updateMeta(null, 'og:url', fullUrl);
    updateMeta(null, 'og:type', 'website');

    // Twitter Card
    updateMeta('twitter:card', null, 'summary_large_image');
    updateMeta('twitter:url', null, fullUrl);
    updateMeta('twitter:title', null, title);
    updateMeta('twitter:description', null, description);
    updateMeta('twitter:image', null, absoluteImage);

    let structuredDataElement = document.getElementById('portfolio-structured-data');
    if (structuredData) {
      if (!structuredDataElement) {
        structuredDataElement = document.createElement('script');
        structuredDataElement.id = 'portfolio-structured-data';
        structuredDataElement.type = 'application/ld+json';
        document.head.appendChild(structuredDataElement);
      }
      structuredDataElement.textContent = serializeStructuredData(structuredData);
    } else if (structuredDataElement) {
      structuredDataElement.remove();
    }

  }, [title, description, image, urlPath, structuredData]);
};
