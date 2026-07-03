export const SITE_URL = 'https://frederickarmando.fr';

const PERSON_ID = `${SITE_URL}/#person`;
const WEBSITE_ID = `${SITE_URL}/#website`;

export function stripHtml(value = '') {
  return value.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
}

export function normalizeAbsoluteUrl(value = '') {
  if (!value) return SITE_URL;
  if (/^https?:\/\//i.test(value)) return value;
  return `${SITE_URL}${value.startsWith('/') ? value : `/${value}`}`;
}

export function serializeStructuredData(data) {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

function personData() {
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: 'Frederick Armando',
    alternateName: 'Frédérick Armando',
    jobTitle: 'Lead Product Designer',
    url: `${SITE_URL}/`,
    image: `${SITE_URL}/images/avatar-176.webp`,
  };
}

function websiteData() {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: `${SITE_URL}/`,
    name: 'Frederick Armando Portfolio',
    inLanguage: 'fr-FR',
    publisher: { '@id': PERSON_ID },
  };
}

export function createHomeStructuredData({ title, description, image }) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      personData(),
      websiteData(),
      {
        '@type': ['ProfilePage', 'WebPage'],
        '@id': `${SITE_URL}/#profile-page`,
        url: `${SITE_URL}/`,
        name: title,
        description,
        inLanguage: 'fr-FR',
        isPartOf: { '@id': WEBSITE_ID },
        about: { '@id': PERSON_ID },
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: normalizeAbsoluteUrl(image),
        },
      },
    ],
  };
}

export function createProjectsStructuredData({ title, description, image, projects = [] }) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      personData(),
      websiteData(),
      {
        '@type': ['CollectionPage', 'WebPage'],
        '@id': `${SITE_URL}/projets#collection-page`,
        url: `${SITE_URL}/projets`,
        name: title,
        description,
        inLanguage: 'fr-FR',
        isPartOf: { '@id': WEBSITE_ID },
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: normalizeAbsoluteUrl(image),
        },
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: projects
            .filter((project) => project.detailStatus !== 'placeholder')
            .map((project, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              url: `${SITE_URL}/projets/${project.slug}`,
              name: project.name || project.title,
            })),
        },
      },
    ],
  };
}

export function createProjectStructuredData({ project, title, description, image }) {
  const company = project?.company
    ? {
        '@type': 'Organization',
        name: project.company,
      }
    : undefined;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      personData(),
      websiteData(),
      {
        '@type': 'CreativeWork',
        '@id': `${SITE_URL}/projets/${project.slug}#case-study`,
        url: `${SITE_URL}/projets/${project.slug}`,
        name: project.detailTitle || project.title || title,
        headline: title,
        description: stripHtml(description || project.detailSummary || project.description),
        inLanguage: 'fr-FR',
        image: normalizeAbsoluteUrl(image),
        author: { '@id': PERSON_ID },
        creator: { '@id': PERSON_ID },
        publisher: { '@id': PERSON_ID },
        isPartOf: { '@id': WEBSITE_ID },
        about: company,
        keywords: project.tags?.map((tag) => tag.label).join(', '),
      },
    ],
  };
}
