import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.resolve(__dirname, '../dist');
const htmlFile = path.join(distDir, 'index.html');

// 1. Définition des routes et de leur contenu Open Graph
const routes = [
  {
    path: 'projets/tire-assistant',
    title: 'From passive chatbot to proactive sales engine | Michelin Case Study',
    desc: '+18% open rate and 21.3% purchase intent.',
    image: '/assets/OG_Michelin_TireAssistant.png'
  },
  {
    path: 'projets/masteos-b2c',
    title: 'Democratizing turnkey real estate investing | Masteos B2C',
    desc: 'Led the UX/UI redesign resulting in a 32% increase in finalized investments.',
    image: '/assets/OG_Masteos.png'
  },
  {
    path: 'projets/masteos-b2e',
    title: 'Reinventing the employee experience | Masteos B2E',
    desc: 'Co-created an enterprise tool streamlining daily workflows. Internal NPS boosted from 6.5 to 8.7.',
    image: '/assets/OG_Helios.png'
  },
  {
    path: 'projets/kirrk',
    title: 'Designing an autonomous rental ecosystem | Kirrk',
    desc: 'Led cross-platform design for keyless vehicle access. Fleet utilization rate exceeding 80%.',
    image: '/assets/OG_Kirrk.png'
  },
  {
    path: 'projets/myxpert',
    title: 'Translating complex code into a No-Code interface',
    desc: 'Designed a B2B SaaS platform translating heavy technical architecture into a drag-and-drop experience.',
    image: '/assets/OG_Mobioos.png'
  }
];

const DOMAIN = 'https://frederickarmando.fr';

try {
  if (fs.existsSync(htmlFile)) {
    const baseHtml = fs.readFileSync(htmlFile, 'utf8');

    routes.forEach(route => {
      const folderPath = path.join(distDir, route.path);
      
      // Créer le dossier s'il n'existe pas
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
      }

      // Résoudre le nom exact de l'image (Vite ajoute un hash en prod)
      let resolvedImage = route.image;
      const assetsDir = path.join(distDir, 'assets');
      if (fs.existsSync(assetsDir)) {
          const files = fs.readdirSync(assetsDir);
          const nameWithoutExt = path.parse(route.image).name;
          const matchedFile = files.find(f => f.startsWith(nameWithoutExt) && f.endsWith('.png'));
          if (matchedFile) resolvedImage = '/assets/' + matchedFile;
      }
      
      const absoluteImageUrl = `${DOMAIN}${resolvedImage}`;

      // Préparer les balises à injecter
      const metaTags = `
  <meta property="og:type" content="website">
  <meta property="og:url" content="${DOMAIN}/${route.path}">
  <meta property="og:title" content="${route.title}">
  <meta property="og:description" content="${route.desc}">
  <meta property="og:image" content="${absoluteImageUrl}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:url" content="${DOMAIN}/${route.path}">
  <meta name="twitter:title" content="${route.title}">
  <meta name="twitter:description" content="${route.desc}">
  <meta name="twitter:image" content="${absoluteImageUrl}">
  <link rel="canonical" href="${DOMAIN}/${route.path}">
`;

      // 1. Nettoyer les balises OG existantes
      let newHtml = baseHtml.replace(/<meta property="og:.*?>/g, '').replace(/<meta name="twitter:.*?>/g, '');
      
      // 2. Injecter les nouvelles balises
      newHtml = newHtml.replace('</head>', metaTags + '</head>');

      // 3. Forcer les chemins absolus (CRITIQUE)
      newHtml = newHtml.replace(/(src|href)="(\.\/)(.*?)"/g, '$1="/$3"');

      // Sauvegarder dans le sous-dossier
      fs.writeFileSync(path.join(folderPath, 'index.html'), newHtml);
      console.log(`✅ Généré: /${route.path}/index.html`);
    });

    // Optionnel : Retirer les logs index.php si ils existent, vu qu'on repasse en dossiers
    const phpFile = path.join(distDir, 'index.php');
    if (fs.existsSync(phpFile)) {
      fs.unlinkSync(phpFile);
    }

    console.log('🚀 Static Generation Fallback terminé avec succès !');

  } else {
    console.error('⚠️ Fichier index.html introuvable dans /dist.');
  }
} catch (err) {
  console.error('❌ Erreur lors du postbuild:', err);
  process.exit(1);
}
