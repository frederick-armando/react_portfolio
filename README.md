# Portfolio de Frederick Armando — Lead Product Designer

Ce dépôt contient le code source du portfolio professionnel de **Frederick Armando**, Lead Product Designer spécialisé en Intelligence Artificielle (AI), Interfaces Génératives (GenUI) et Accessibilité Numérique (WCAG/A11y).

Le site est hébergé en production à l'adresse suivante : [frederickarmando.fr](https://frederickarmando.fr)

---

## 🚀 Vue d'ensemble technique

L'application est développée en **React** et packagée avec **Vite**. Elle est pensée pour concilier la réactivité d'une Single Page Application (SPA) et les exigences strictes du SEO technique et de l'indexation par les LLM (GEO).

### Spécificités notables

1. **Pré-rendu Statique & SEO Hybride (`postbuild.js`)**
   - Plutôt que d'exposer une SPA vide (div `#root` vierge), un script de post-compilation (`scripts/postbuild.js`) intercepte la sortie du build Vite.
   - Il génère dynamiquement des dossiers physiques contenant des fichiers `index.html` pré-générés pour chaque route statique (`/profil`, `/methodes`, `/contact`, `/projets`) et pour chaque étude de cas projet.
   - Les balises SEO clés (Title, Meta Description, OpenGraph, Twitter Cards, balise canonique) ainsi que des schémas sémantiques complets y sont injectés en dur.

2. **GEO (Generative Engine Optimization) & JSON-LD (Schema.org)**
   - Les données structurées sont enrichies de façon poussée pour maximiser la compréhension sémantique de l'expérience et des études de cas par les LLMs (*Perplexity, ChatGPT Search, Google Gemini/SGE*).
   - Chaque projet comprend des entités `CreativeWork` détaillées contenant un résumé structuré (Problème, Solution, Impact) via la propriété `abstract`.
   - La page d'accueil expose l'entité `Person` liée à son profil (`mainEntity`), détaillant ses compétences (`knowsAbout`) et sa recherche d'opportunités (`seeks`).

3. **Optimisation A11y (Panneau d'Accessibilité)**
   - Un panneau de configuration d'accessibilité sur mesure (Accessible Widget & Panel) permet aux utilisateurs de personnaliser l'interface : redimensionnement dynamique du texte, police d'écriture adaptée à la dyslexie, modes de contrastes élevés (contrastes accrus, grisé), mise en évidence des liens interactifs, blocage des animations et pointeur agrandi.
   - Un backdrop d'arrière-plan à couverture totale (`inset: 0`) et à effet de flou dynamique (`backdrop-filter`) isole le panneau et bloque les interactions et tooltips des éléments sous-jacents.

4. **Architecture i18n & Gestion Multilingue**
   - Prise en charge native du Français et de l'Anglais via un `LanguageProvider` léger et un système de fichiers de traduction structurés par composants (`src/i18n`).

---

## 🛠️ Architecture du projet

```text
react_portfolio/
├── docs/                   # Spécifications GEO et guides d'optimisation
├── public/                 # Assets statiques distribués (CV, robots.txt, polices)
├── scripts/
│   └── postbuild.js        # Générateur de routes statiques HTML et injecteur de métadonnées SEO/Schema.org
├── src/
│   ├── assets/             # Images, logos et illustrations de l'application
│   ├── components/         # Composants globaux réutilisables (Button, AccessibilityPanel, etc.)
│   ├── config/             # Fichiers de configuration (SEO, structuredData Schema.org)
│   ├── data/               # Données structurées des projets (détails techniques, audiences, tags)
│   ├── hooks/              # Hooks React personnalisés (useSEO)
│   ├── i18n/               # Fichiers de traduction FR/EN et Context Provider
│   ├── pages/              # Pages principales (Home, Profil, Methodes, Projets, Contact)
│   ├── styles/             # Feuilles de styles CSS globales et tokens de design
│   ├── theme/              # Thème clair/sombre et ThemeContext
│   ├── App.jsx             # Configuration des routes et de la coquille applicative (shell)
│   └── main.jsx            # Point d'entrée de l'application React
├── vite.config.js          # Configuration de compilation et bundling Vite
└── package.json            # Scripts de build et dépendances npm
```

---

## ⚙️ Commandes de développement

### Prérequis

Assurez-vous d'avoir [Node.js](https://nodejs.org/) installé sur votre machine.

### Installation

Installez les dépendances du projet :

```bash
npm install
```

### Serveur de développement

Lancez le serveur local avec rechargement à chaud (Hot Module Replacement) :

```bash
npm run dev
```

### Production Build & Post-génération statique

Compilez l'application pour la production. Cette commande exécute le build de Vite puis déclenche automatiquement le script `postbuild.js` pour générer les pages HTML statiques et le sitemap :

```bash
npm run build
```

Le résultat compilé se trouve dans le dossier `/dist`.

### Prévisualisation de la production

Pour tester le livrable de production localement :

```bash
npm run preview
```

---

## 📦 Versioning & Déploiement

Le projet utilise un système de suivi de version sémantique.
- La version en cours est définie dans le fichier `package.json`.
- Lors du développement d'une nouvelle itération, la version est incrémentée en version candidate (ex: `1.9.3-rc.1`), puis figée en version stable (ex: `1.9.3`) au moment de la livraison sur la branche principale `main`.
- La variable de version `__APP_VERSION__` est injectée dynamiquement à la compilation et s'affiche dans le panneau d'accessibilité ainsi que dans la console développeur.
