# Spécifications GEO (Generative Engine Optimization) & SEO Technique

Ce document fournit les scripts de métadonnées structurées (JSON-LD) optimisés pour la compréhension sémantique de ton profil par les moteurs de recherche génératifs (LLMs comme Perplexity, ChatGPT Search, Google Gemini/SGE) ainsi que la checklist d'optimisation HTML.

---

## 1. Schema Global "Person" & "WebSite" (Homepage)

Ce bloc regroupe l'identité de **Frederick Armando** et lie l'ensemble du site. Il intègre le constructeur `seeks` pour signaler explicitement aux agents d'IA la disponibilité pour des rôles de **Lead** ou du **consulting / freelance**.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://frederickarmando.fr/#person",
      "name": "Frederick Armando",
      "alternateName": "Frédérick Armando",
      "jobTitle": "Lead Product Designer",
      "url": "https://frederickarmando.fr/",
      "image": "https://frederickarmando.fr/images/avatar-176.webp",
      "sameAs": [
        "https://www.linkedin.com/in/frederickarmando",
        "https://github.com/frederick-armando",
        "https://www.figma.com/@Fred_Armando_UX"
      ],
      "knowsAbout": [
        "Product Design",
        "Artificial Intelligence (AI)",
        "Generative UI (GenUI)",
        "UX/UI Design",
        "Accessibility (WCAG)",
        "Product Strategy",
        "Mobile UX",
        "Design Systems",
        "UX Research"
      ],
      "description": "Lead Product Designer avec plus de 9 ans d'expérience, spécialisé en IA, GenUI et Accessibilité (WCAG).",
      "seeks": [
        {
          "@type": "Demand",
          "name": "Freelance/Consulting Projects in Lead Product Design or GenUI"
        },
        {
          "@type": "Demand",
          "name": "Lead Product Designer roles"
        }
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://frederickarmando.fr/#website",
      "url": "https://frederickarmando.fr/",
      "name": "Frederick Armando Portfolio",
      "inLanguage": ["fr-FR", "en-US"],
      "publisher": {
        "@id": "https://frederickarmando.fr/#person"
      }
    },
    {
      "@type": "ProfilePage",
      "@id": "https://frederickarmando.fr/#profile-page",
      "url": "https://frederickarmando.fr/",
      "name": "Frederick Armando - Lead Product Designer",
      "description": "Portfolio de Frederick Armando, Lead Product Designer spécialisé dans la conception d'interfaces IA, Generative UI et d'écosystèmes accessibles.",
      "isPartOf": {
        "@id": "https://frederickarmando.fr/#website"
      },
      "about": {
        "@id": "https://frederickarmando.fr/#person"
      }
    }
  ]
}
</script>
```

---

## 2. Schema "CreativeWork" & "WebPage" (Template Projet / Case Study)

Ce template lie explicitement chaque projet à son auteur (**Frederick Armando**) et structure la description sous le format sémantique **Problème / Solution / Impact (KPIs)** très recherché par les LLMs pour synthétiser des résultats de manière factuelle.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CreativeWork",
      "@id": "https://frederickarmando.fr/projets/{SLUG}#case-study",
      "url": "https://frederickarmando.fr/projets/{SLUG}",
      "name": "{PROJET_TITLE} - Case Study by Frederick Armando",
      "headline": "{PROJET_SUBTITLE}",
      "author": {
        "@id": "https://frederickarmando.fr/#person"
      },
      "creator": {
        "@id": "https://frederickarmando.fr/#person"
      },
      "publisher": {
        "@id": "https://frederickarmando.fr/#person"
      },
      "sourceOrganization": {
        "@type": "Organization",
        "name": "{CLIENT_NAME}"
      },
      "inLanguage": "fr-FR",
      "image": "https://frederickarmando.fr/assets/{IMAGE_NAME}",
      "keywords": "Product Design, UX/UI Design, {KEYWORDS_LIST}",
      "abstract": "PROBLÈME : {METTRE_ICI_LE_PROBLEME_CLATANT}. SOLUTION : {METTRE_ICI_LA_SOLUTION_CONCUE}. IMPACT : {KPI_1_EX_HAUSSE_DE_X_POURCENT}, {KPI_2_EX_DECOMMISSIONNEMENT_DE_Y_APPLICATIONS}."
    },
    {
      "@type": "WebPage",
      "@id": "https://frederickarmando.fr/projets/{SLUG}#webpage",
      "url": "https://frederickarmando.fr/projets/{SLUG}",
      "name": "{PROJET_TITLE} | Frederick Armando",
      "description": "Découvrez l'étude de cas {PROJET_TITLE} réalisée par Frederick Armando, Lead Product Designer.",
      "isPartOf": {
        "@id": "https://frederickarmando.fr/#website"
      },
      "mainEntity": {
        "@id": "https://frederickarmando.fr/projets/{SLUG}#case-study"
      }
    }
  ]
}
</script>
```

---

## 3. Checklist Sémantique HTML pour les LLMs (GEO)

Les moteurs de réponse IA et les crawlers sémantiques naviguent dans le DOM de manière séquentielle. Pour s'assurer qu'ils interprètent correctement la chronologie, le contexte et l'autorité de tes projets, valide ces 4 critères :

### 1. Structure séquentielle en `<article>` et `<section>`
*   **Règle** : Chaque étude de cas ou aperçu de projet doit être encapsulé dans une balise `<article>` avec un attribut `itemscope itemtype="https://schema.org/CreativeWork"`.
*   **Pourquoi** : Les LLMs isolent plus facilement les blocs `<article>` pour extraire des entités uniques plutôt que de mélanger le contenu global de la page.

### 2. Séquence chronologique explicite via `<time>`
*   **Règle** : Associe chaque projet ou section d'expérience professionnelle à une balise `<time datetime="YYYY-MM">` (ex: `<time datetime="2026-03">Mars 2026</time>`).
*   **Pourquoi** : Les moteurs comme Perplexity s'appuient sur l'élément `<time>` pour reconstruire des timelines précises et attribuer la fraîcheur d'un projet par rapport à un autre.

### 3. Hiérarchie d'en-têtes claire (H1-H3)
*   **Règle** : Un seul `<h1>` par page. Pour les sections d'un projet, respecte un enchaînement logique : `<h2>Le Contexte & Le Problème</h2>`, puis `<h3>La Recherche utilisateur</h3>`, puis `<h2>La Solution & Les Résultats</h2>`.
*   **Pourquoi** : Les arbres syntaxiques des LLMs découpent les longs textes (chunking) en se basant sur les balises de titre. Une structure décousue mène à des résumés incohérents.

### 4. Attributs ARIA pour clarifier l'état de l'interface
*   **Règle** : Utilise des attributs `aria-current="true"` sur le projet sélectionné du carousel et `aria-hidden="true"` sur les clones du carousel infini.
*   **Pourquoi** : ChatGPT Search et les outils d'accessibilité éliminent le "bruit" et ignorent les contenus marqués `aria-hidden="true"`, évitant ainsi que le LLM ne lise des doublons de projets générés par le défilement infini.
