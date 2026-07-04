import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getLocalizedProjects, getProjectBySlug } from '../src/data/projects.js';
import {
  createHomeStructuredData,
  createPageStructuredData,
  createProjectStructuredData,
  createProjectsStructuredData,
  normalizeAbsoluteUrl,
  serializeStructuredData,
  stripHtml,
} from '../src/config/structuredData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.resolve(__dirname, '../dist');
const htmlFile = path.join(distDir, 'index.html');
const assetsDir = path.join(distDir, 'assets');
const ogAssetsDir = path.resolve(__dirname, '../src/assets/opengraph');

const homeMeta = {
  title: 'Frederick Armando | Lead Product Designer',
  description:
    'Portfolio de Frederick Armando, Lead Product Designer spécialisé en produits complexes, IA, mobile, B2B/B2C, accessibilité et stratégie produit.',
  image: '/assets/OG_Main.png',
  path: '/',
};

const profileMeta = {
  title: 'Profil | Frederick Armando',
  description:
    'Parcours, compétences clés et positionnement produit de Frederick Armando, Lead Product Designer basé en France.',
  image: '/assets/OG_Main.png',
  path: '/profil',
  type: 'ProfilePage',
};

const methodsMeta = {
  title: 'Méthodes | Frederick Armando',
  description:
    'Approche de design produit de Frederick Armando : cadrer, aligner, concevoir, livrer et mesurer des expériences utiles.',
  image: '/assets/OG_Main.png',
  path: '/methodes',
};

const projectsMeta = {
  title: 'Projets & études de cas | Frederick Armando',
  description:
    "Sélection d'études de cas produit menées par Frederick Armando sur des expériences IA, mobile, B2B/B2C et SaaS.",
  image: '/assets/OG_Main.png',
  path: '/projets',
};

const contactMeta = {
  title: 'Contact | Frederick Armando',
  description:
    "Contacter Frederick Armando pour échanger autour du design produit, de l'IA, du mobile et des expériences B2B/B2C.",
  image: '/assets/OG_Main.png',
  path: '/contact',
  type: 'ContactPage',
};

const staticPageRoutes = [profileMeta, methodsMeta, contactMeta];

const projectRoutes = [
  { slug: 'tire-assistant', image: '/assets/OG_Michelin_TireAssistant.png' },
  { slug: 'myxpert', image: '/assets/OG_Michelin_MyXpert.png' },
  { slug: 'masteos', image: '/assets/OG_Masteos.png' },
  { slug: 'helios', image: '/assets/OG_Helios.png' },
  { slug: 'kirrk', image: '/assets/OG_Kirrk.png' },
  { slug: 'mobioos', image: '/assets/OG_Mobioos.png' },
];

const staticSeoAssets = [
  'OG_Main.png',
  'OG_Michelin_TireAssistant.png',
  'OG_Michelin_MyXpert.png',
  'OG_Masteos.png',
  'OG_Helios.png',
  'OG_Kirrk.png',
  'OG_Mobioos.png',
];

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function escapeAttribute(value) {
  return escapeHtml(value).replace(/"/g, '&quot;');
}

function resolveBuiltAsset(assetPath) {
  if (!fs.existsSync(assetsDir)) return assetPath;

  const assetName = path.parse(assetPath).name;
  const matchedFile = fs
    .readdirSync(assetsDir)
    .find((file) => file.startsWith(assetName) && file.endsWith(path.extname(assetPath)));

  return matchedFile ? `/assets/${matchedFile}` : assetPath;
}

function copyStaticSeoAssets() {
  fs.mkdirSync(assetsDir, { recursive: true });

  staticSeoAssets.forEach((fileName) => {
    const source = path.join(ogAssetsDir, fileName);
    const target = path.join(assetsDir, fileName);

    if (fs.existsSync(source)) {
      fs.copyFileSync(source, target);
    }
  });
}

function cleanHeadSeo(html) {
  return html
    .replace(/\s*<meta name="description"[^>]*>\n?/gi, '')
    .replace(/\s*<meta property="og:[^"]+"[^>]*>\n?/gi, '')
    .replace(/\s*<meta (?:name|property)="twitter:[^"]+"[^>]*>\n?/gi, '')
    .replace(/\s*<link rel="canonical"[^>]*>\n?/gi, '')
    .replace(
      /\s*<script(?=[^>]*id="portfolio-structured-data")(?=[^>]*type="application\/ld\+json")[^>]*>[\s\S]*?<\/script>\n?/gi,
      '',
    );
}

function forceAbsoluteAssetPaths(html) {
  return html
    .replace(/(src|href)="(\.\/)(.*?)"/g, '$1="/$3"')
    .replace(/(src|href)="(assets\/.*?)"/g, '$1="/$2"');
}

function createHeadTags({ title, description, url, image, structuredData }) {
  const safeTitle = escapeAttribute(title);
  const safeDescription = escapeAttribute(description);
  const safeUrl = escapeAttribute(url);
  const safeImage = escapeAttribute(image);
  const safeOgType = escapeAttribute(structuredData?.['@graph']?.some((item) => item?.['@type'] === 'CreativeWork') ? 'article' : 'website');

  return `
  <meta name="description" content="${safeDescription}">
  <link rel="canonical" href="${safeUrl}">
  <meta property="og:type" content="${safeOgType}">
  <meta property="og:url" content="${safeUrl}">
  <meta property="og:title" content="${safeTitle}">
  <meta property="og:description" content="${safeDescription}">
  <meta property="og:image" content="${safeImage}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:url" content="${safeUrl}">
  <meta name="twitter:title" content="${safeTitle}">
  <meta name="twitter:description" content="${safeDescription}">
  <meta name="twitter:image" content="${safeImage}">
  <script id="portfolio-structured-data" type="application/ld+json">${serializeStructuredData(structuredData)}</script>
`;
}

function injectPageSeo(html, meta) {
  const resolvedImage = resolveBuiltAsset(meta.image);
  const absoluteImage = normalizeAbsoluteUrl(resolvedImage);
  const url = normalizeAbsoluteUrl(meta.path);
  const title = escapeHtml(meta.title);
  const headTags = createHeadTags({
    ...meta,
    url,
    image: absoluteImage,
  });

  return cleanHeadSeo(html)
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${title}</title>`)
    .replace('</head>', `${headTags}</head>`);
}

function writeStaticRoute(baseHtml, meta) {
  const folderPath = path.join(distDir, meta.path.replace(/^\//, ''));
  const resolvedImage = resolveBuiltAsset(meta.image);
  const routeHtml = forceAbsoluteAssetPaths(
    injectPageSeo(baseHtml, {
      ...meta,
      structuredData: createPageStructuredData({
        ...meta,
        image: resolvedImage,
      }),
    }),
  );

  fs.mkdirSync(folderPath, { recursive: true });
  fs.writeFileSync(path.join(folderPath, 'index.html'), routeHtml);
  console.log(`✅ Généré: ${meta.path}/index.html`);
}

function writeSitemap(routes) {
  const today = new Date().toISOString().slice(0, 10);
  const uniqueRoutes = Array.from(new Set(routes));
  const urls = uniqueRoutes
    .map((route) => `  <url>
    <loc>${normalizeAbsoluteUrl(route)}</loc>
    <lastmod>${today}</lastmod>
  </url>`)
    .join('\n');

  fs.writeFileSync(
    path.join(distDir, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`,
  );
  console.log('✅ Généré: /sitemap.xml');
}

try {
  if (!fs.existsSync(htmlFile)) {
    console.error('⚠️ Fichier index.html introuvable dans /dist.');
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(htmlFile, 'utf8');
  copyStaticSeoAssets();

  staticPageRoutes.forEach((meta) => {
    writeStaticRoute(baseHtml, meta);
  });

  projectRoutes.forEach((route) => {
    const project = getProjectBySlug(route.slug, 'fr');
    if (!project) return;

    const folderPath = path.join(distDir, 'projets', route.slug);
    fs.mkdirSync(folderPath, { recursive: true });

    const meta = {
      title: `${project.name || project.title} | ${project.company} Case Study`,
      description: stripHtml(project.detailSummary || project.description),
      image: route.image,
      path: `/projets/${route.slug}`,
    };

    const resolvedImage = resolveBuiltAsset(meta.image);
    const newHtml = forceAbsoluteAssetPaths(
      injectPageSeo(baseHtml, {
        ...meta,
        structuredData: createProjectStructuredData({
          project,
          title: meta.title,
          description: meta.description,
          image: resolvedImage,
        }),
      }),
    );

    fs.writeFileSync(path.join(folderPath, 'index.html'), newHtml);
    console.log(`✅ Généré: /projets/${route.slug}/index.html`);
  });

  const parentFolder = path.join(distDir, 'projets');
  fs.mkdirSync(parentFolder, { recursive: true });

  const localizedProjects = getLocalizedProjects('fr');
  const projectsImage = resolveBuiltAsset(projectsMeta.image);
  const projectsHtml = forceAbsoluteAssetPaths(
    injectPageSeo(baseHtml, {
      ...projectsMeta,
      structuredData: createProjectsStructuredData({
        ...projectsMeta,
        image: projectsImage,
        projects: localizedProjects,
      }),
    }),
  );
  fs.writeFileSync(path.join(parentFolder, 'index.html'), projectsHtml);
  console.log('✅ Généré parent: /projets/index.html');

  const homeImage = resolveBuiltAsset(homeMeta.image);
  const homeHtml = injectPageSeo(baseHtml, {
    ...homeMeta,
    structuredData: createHomeStructuredData({
      ...homeMeta,
      image: homeImage,
    }),
  });
  fs.writeFileSync(htmlFile, homeHtml);

  writeSitemap([
    '/',
    '/profil',
    '/methodes',
    '/projets',
    '/contact',
    ...projectRoutes.map((route) => `/projets/${route.slug}`),
  ]);

  const phpFile = path.join(distDir, 'index.php');
  if (fs.existsSync(phpFile)) {
    fs.unlinkSync(phpFile);
  }

  console.log('🚀 Static Generation Fallback terminé avec succès !');
} catch (err) {
  console.error('❌ Erreur lors du postbuild:', err);
  process.exit(1);
}
