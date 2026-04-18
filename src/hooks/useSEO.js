import { useEffect } from 'react';

export const useSEO = ({ title, description, image, urlPath = '' }) => {
  useEffect(() => {
    // Ensure the URL is absolute for Open Graph
    const baseUrl = window.location.origin;
    const fullUrl = `${baseUrl}${urlPath}`;
    const absoluteImage = image?.startsWith('http') ? image : `${baseUrl}${image}`;

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

    // Standard SEO
    updateMeta('description', null, description);

    // Open Graph
    updateMeta(null, 'og:title', title);
    updateMeta(null, 'og:description', description);
    updateMeta(null, 'og:image', absoluteImage);
    updateMeta(null, 'og:url', fullUrl);
    updateMeta(null, 'og:type', 'website');

    // Twitter Card
    updateMeta('twitter:card', null, 'summary_large_image');
    updateMeta('twitter:title', null, title);
    updateMeta('twitter:description', null, description);
    updateMeta('twitter:image', null, absoluteImage);

  }, [title, description, image, urlPath]);
};
