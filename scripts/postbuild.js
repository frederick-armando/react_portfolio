import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getLocalizedProjects, getProjectBySlug } from '../src/data/projects.js';
import {
  createHomeStructuredData,
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

const homeMeta = {
  title: 'Frederick Armando | Lead Product Designer',
  description:
    'Portfolio de Frederick Armando, Lead Product Designer. Découvrez mes études de cas ROIstes et expériences UX.',
  image: '/assets/OG_Main.png',
  path: '/',
};

const projectsMeta = {
  title: 'Études de cas UX/UI | Frederick Armando',
  description:
    "Découvrez une sélection d'études de cas UX/UI menées par Frederick Armando pour Michelin, Masteos, Kirrk et Mobioos.",
  image: '/assets/OG_Main.png',
  path: '/projets',
};

const projectRoutes = [
  { slug: 'tire-assistant', image: '/assets/OG_Michelin_TireAssistant.png' },
  { slug: 'myxpert', image: '/assets/OG_Michelin_MyXpert.png' },
  { slug: 'masteos', image: '/assets/OG_Masteos.png' },
  { slug: 'helios', image: '/assets/OG_Helios.png' },
  { slug: 'kirrk', image: '/assets/OG_Kirrk.png' },
  { slug: 'mobioos', image: '/assets/OG_Mobioos.png' },
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

  return `
  <meta name="description" content="${safeDescription}">
  <link rel="canonical" href="${safeUrl}">
  <meta property="og:type" content="website">
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

try {
  if (!fs.existsSync(htmlFile)) {
    console.error('⚠️ Fichier index.html introuvable dans /dist.');
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(htmlFile, 'utf8');

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

  const phpFile = path.join(distDir, 'index.php');
  if (fs.existsSync(phpFile)) {
    fs.unlinkSync(phpFile);
  }

  console.log('🚀 Static Generation Fallback terminé avec succès !');
} catch (err) {
  console.error('❌ Erreur lors du postbuild:', err);
  process.exit(1);
}
