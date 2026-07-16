# Frederick Armando Portfolio: Lead Product Designer

This repository contains the source code for the professional portfolio of **Frederick Armando**, Lead Product Designer specializing in Artificial Intelligence (AI), Generative UI (GenUI), and Web Accessibility (WCAG/A11y).

The live site is hosted at: [frederickarmando.fr](https://frederickarmando.fr)

---

## Technical Overview

The application is built using **React** and bundled with **Vite**. It is designed to combine the smooth user experience of a Single Page Application (SPA) with search engine optimization (SEO) and generative search engine visibility (GEO).

### Key Features

1. **Static Pre-rendering and Hybrid SEO (`postbuild.js`)**
   - Instead of serving an empty SPA structure (a blank `#root` div), a custom post-build script (`scripts/postbuild.js`) processes the Vite output.
   - It generates physical directories containing pre-rendered `index.html` files for static routes (`/profil`, `/methodes`, `/contact`, `/projets`) and individual project case studies.
   - Standard SEO tags (Title, Meta Description, OpenGraph, Twitter Cards, canonical link) and semantic schemas are injected directly into the HTML files.

2. **GEO (Generative Engine Optimization) and JSON-LD (Schema.org)**
   - Structured data is customized to help LLMs (Perplexity, ChatGPT Search, Google Gemini/SGE) read and index the portfolio context.
   - Each project includes a detailed `CreativeWork` entity featuring a structured summary (Problem, Solution, Impact) using the `abstract` property.
   - The homepage contains a `Person` entity linked to the profile (`mainEntity`), detailing skills (`knowsAbout`) and target roles (`seeks`).

3. **A11y Panel (Accessibility Widget)**
   - A custom accessibility settings panel allows visitors to customize the interface: dynamic text sizing, dyslexia-friendly fonts, high contrast modes (enhanced contrasts, grayscale), link highlighting, animation disabling, and an enlarged cursor.
   - A full-viewport backdrop (`inset: 0`) with a blur effect (`backdrop-filter`) isolates the active panel and blocks interactions and tooltips from underlying page elements.

4. **Multi-language System (i18n)**
   - Native support for French and English translation strings managed through a custom context provider (`LanguageProvider`) and localized content dictionaries in `src/i18n`.

---

## Project Structure

```text
react_portfolio/
├── docs/                   # GEO specifications and optimization guidelines
├── public/                 # Static public assets (CVs, robots.txt, web fonts)
├── scripts/
│   └── postbuild.js        # Static HTML generator and SEO/Schema.org injector
├── src/
│   ├── assets/             # Logos, images, and visual design assets
│   ├── components/         # Reusable global React components (Button, AccessibilityPanel, etc.)
│   ├── config/             # Configuration files (SEO, structuredData Schema.org schemas)
│   ├── data/               # Project source data (meta descriptions, tags, case study structures)
│   ├── hooks/              # Custom React hooks (useSEO)
│   ├── i18n/               # Translation dictionaries and Context Providers
│   ├── pages/              # Main view templates (Home, Profil, Methodes, Projets, Contact)
│   ├── styles/             # Global CSS stylesheets and design tokens
│   ├── theme/              # Light/dark mode configurations and ThemeContext
│   ├── App.jsx             # React routing setup and layout shell wrapper
│   └── main.jsx            # Application mount point
├── vite.config.js          # Vite compiler config and build setup
└── package.json            # npm script definitions and dependencies
```

---

## Local Development

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed.

### Installation

Install the required node modules:

```bash
npm install
```

### Development Server

Start the local server with hot reloading enabled:

```bash
npm run dev
```

### Build and Static Generation

Compile the application for production. This runs Vite's build process followed by the `postbuild.js` script to generate static pages and the sitemap.xml:

```bash
npm run build
```

The compiled application is generated in the `/dist` directory.

### Preview Production Build

Serve the local build files to test production output:

```bash
npm run preview
```

---

## Versioning and Releases

This project follows semantic versioning rules.
- The active version is defined in `package.json`.
- During active feature cycles, the version uses a candidate suffix (e.g., `1.9.3-rc.1`), which is removed to match a stable release (e.g., `1.9.3`) before merging changes to `main`.
- The global build variable `__APP_VERSION__` is dynamically compiled into the code, displaying the version in the accessibility panel footer and the browser console.
