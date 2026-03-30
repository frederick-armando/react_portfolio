const fs = require('fs');
const path = './src/i18n/content/caseStudies.js';
let content = fs.readFileSync(path, 'utf8');

// Define the exact new MYXPERT blocks
const myxpertFR = `    myxpert: {
      summary: "Les partenaires B2B et les équipes de vente de Michelin étaient confrontés à un écosystème d'applications fragmenté, entraînant une communication diluée et la frustration des utilisateurs. En tant que <strong>Lead Product Designer</strong>, j'ai réussi à faire pivoter le projet d'une simple vue web mobile vers une <strong>application native</strong> robuste.<br/><br/><strong>Résultat :</strong> un \\"compagnon de vente\\" centralisé lancé aux États-Unis et en Chine, la suppression de <strong>3 anciennes applications redondantes</strong>, et un objectif de déploiement de <strong>20 000 utilisateurs actifs</strong> dans 12 pays d'ici 2026.",
      metrics: [
        { iconKey: 'calendar', title: 'Déc 2024 - Présent', detail: 'Timeline' },
        { iconKey: 'pencil-ruler', title: 'Lead Product Designer', detail: 'UX/UI' },
        { iconKey: 'users', title: '1 PM, 1 UI, 14 Devs', detail: 'Équipe' },
        { iconKey: 'building', title: 'B2B / B2E', detail: 'Contexte Global' }
      ],
      tools: [
        { iconKey: 'figma', title: 'Figma', detail: 'Design System & UI' },
        { iconKey: 'mobile', title: 'Native App', detail: 'iOS & Android' }
      ],
      processColumns: [
        ['Recherche utilisateur', 'Analyse du legacy', 'Définition du MVP'],
        ['Pivot vers natif', 'Itérations agiles', 'Synchronisation métier'],
        ['Design System', 'Wireframing', 'Tests utilisateurs'],
        ['Lancement US/Chine', 'Suppression legacy', 'Déploiement global']
      ],
      sections: {
        intro: {
          title: "Le point de départ d'une refonte mondiale",
          paragraphs: [
            "L'écosystème digital de Michelin est vaste, très vaste. Lorsque j'ai rejoint le projet MyXpert en tant que Lead Product Designer, l'objectif était colossal : unifier la diffusion de la connaissance technique pour les forces de vente B2B et B2E à l'échelle mondiale. L'enjeu n'était pas seulement de concevoir une application, mais de rationaliser des années d'empilement technologique."
          ]
        },
        legacy: {
          title: "Le cauchemar de la fragmentation",
          paragraphs: [
            "Le premier constat sur le terrain fut sans appel. Les revendeurs et les équipes internes étaient submergés par une multiplication d'applications disparates. En plein rendez-vous client, un commercial devait parfois jongler entre trois outils différents pour trouver la bonne spécification d'un pneu. Cela générait une immense frustration, une perte de temps, et diluait l'image d'expertise de la marque."
          ]
        },
        localNeeds: {
          title: "Penser global, concevoir local",
          paragraphs: [
            "Une application mondiale ne signifie pas une application générique. Nos phases de recherche utilisateur ont rapidement mis en lumière des exigences locales non négociables. Par exemple, le marché américain nécessitait une intégration absolue de la conformité DOT (Department of Transportation), tandis que le marché européen exigeait une taxonomie et une terminologie technique d'une précision chirurgicale."
          ]
        },
        pivot: {
          title: "Le pivot stratégique : imposer le natif",
          paragraphs: [
            "Avant mon arrivée, un premier sprint de conception avait abouti à un concept s'apparentant davantage à un site web responsive encapsulé. Mon premier grand combat de Lead a été de faire pivoter cette vision. J'ai démontré aux parties prenantes qu'un outil de vente professionnel quotidien nécessitait la fluidité, le mode hors-ligne et les performances d'une véritable application native."
          ]
        },
        agile: {
          title: "Orchestrer l'agilité à grande échelle",
          paragraphs: [
            "Avec une équipe composée d'un Product Manager, d'un UI Designer et de 14 développeurs, la coordination était la clé du succès. J'ai instauré des boucles d'itération très courtes. Grâce à des synchronisations hebdomadaires entre le Design, le Produit et le Métier, nous avons pu aligner constamment nos efforts vers la livraison d'un MVP mobile natif robuste, sans jamais perdre de vue la faisabilité technique."
          ]
        },
        jargon: {
          title: "Tuer le jargon de l'entreprise",
          paragraphs: [
            "L'un de mes chantiers UX favoris sur ce projet a été le nettoyage cognitif. Les premiers tests d'utilisabilité ont révélé que l'application parlait le langage de Michelin, et non celui de ses utilisateurs. Des acronymes comme \\"BU\\" (Business Unit) ou des labels d'outils obscurs créaient une véritable barrière. J'ai donc piloté la refonte totale de l'architecture de l'information pour la baser sur des données factuelles, créant une navigation intuitive centrée sur les modèles mentaux de nos revendeurs."
          ]
        },
        launch: {
          title: "Le lancement et la victoire du 'Decommissioning'",
          paragraphs: [
            "En janvier 2026, l'application a été lancée avec succès aux États-Unis et en Chine. Les retours ont immédiatement validé MyXpert comme le \\"compagnon de vente\\" de référence. Mais la plus grande victoire structurelle (et financière pour l'entreprise) fut d'atteindre un niveau de complétude suffisant pour permettre à Michelin de supprimer officiellement trois de ses anciennes applications redondantes."
          ]
        },
        future: {
          title: "Cap sur les 20 000 utilisateurs",
          paragraphs: [
            "Le travail de consolidation continue. Alors que nous préparons le grand déploiement sur le marché européen, notre objectif est d'atteindre les 20 000 utilisateurs actifs quotidiens répartis dans 12 pays. Chaque nouvelle fonctionnalité est scrupuleusement testée pour s'assurer que MyXpert reste cet outil centralisé et indispensable."
          ]
        },
        learnings: {
          title: "Leçons de leadership",
          paragraphs: [
            "Ce projet chez Michelin m'a conforté dans l'idée que le rôle d'un Lead Designer dépasse largement la création d'interfaces. Il s'agit d'aligner la stratégie business avec l'excellence technique, d'avoir le courage de proposer des pivots architecturaux majeurs, et de toujours, toujours, se battre pour simplifier le quotidien de l'utilisateur final."
          ]
        }
      }
    }`;

const myxpertEN = `    myxpert: {
      summary: "Michelin's B2B partners and sales teams were struggling with a fragmented ecosystem of apps, leading to diluted messaging and user frustration. As <strong>Lead Product Designer</strong>, I successfully pivoted the project from a basic mobile web view to a robust <strong>native application</strong>.<br/><br/><strong>The result:</strong> A centralized \\"sales companion\\" launched in the US and China, the decommissioning of <strong>3 redundant legacy apps</strong>, and a rollout target of <strong>20,000 active users</strong> across 12 countries by 2026.",
      metrics: [
        { iconKey: 'calendar', title: 'Dec 2024 - Present', detail: 'Timeline' },
        { iconKey: 'pencil-ruler', title: 'Lead Product Designer', detail: 'UX/UI' },
        { iconKey: 'users', title: '1 PM, 1 UI, 14 Devs', detail: 'Team' },
        { iconKey: 'building', title: 'B2B / B2E', detail: 'Global Context' }
      ],
      tools: [
        { iconKey: 'figma', title: 'Figma', detail: 'Design System & UI' },
        { iconKey: 'mobile', title: 'Native App', detail: 'iOS & Android' }
      ],
      processColumns: [
        ['User Research', 'Legacy Analysis', 'MVP Definition'],
        ['Native Pivot', 'Agile Iterations', 'Business Sync'],
        ['Design System', 'Wireframing', 'User Testing'],
        ['US/China Launch', 'Legacy Kill', 'Global Rollout']
      ],
      sections: {
        intro: {
          title: "The Starting Point of a Global Redesign",
          paragraphs: [
            "Michelin's digital ecosystem is vast. When I joined the MyXpert project as Lead Product Designer, the objective was massive: unify the distribution of technical knowledge for B2B and B2E sales forces worldwide. The challenge was not just designing an application, but rationalizing years of accumulated technological debt."
          ]
        },
        legacy: {
          title: "The Nightmare of Fragmentation",
          paragraphs: [
            "The initial field observation was clear. Dealers and internal teams were overwhelmed by a multiplication of disparate apps. During a client meeting, a sales rep sometimes had to juggle between three different tools just to find the right tire specification. This generated immense frustration, wasted time, and diluted the brand's image of expertise."
          ]
        },
        localNeeds: {
          title: "Thinking Global, Designing Local",
          paragraphs: [
            "A global application does not mean a generic one. Our user research phases quickly highlighted non-negotiable local requirements. For example, the US market required absolute integration of DOT (Department of Transportation) compliance, while the European market demanded highly specialized and precise technical terminology."
          ]
        },
        pivot: {
          title: "The Strategic Pivot: Pushing for Native",
          paragraphs: [
            "Before I arrived, an initial design sprint had resulted in a concept that felt more like a wrapped responsive website. My first major battle as a Lead was to pivot this vision. I demonstrated to stakeholders that a daily professional sales tool required the fluidity, offline capabilities, and high performance of a true native application."
          ]
        },
        agile: {
          title: "Orchestrating Agile at Scale",
          paragraphs: [
            "With a team consisting of one Product Manager, one UI Designer, and 14 developers, coordination was the key to success. I introduced very short iteration loops. Through weekly syncs between Design, Product, and Business, we consistently aligned our efforts toward delivering a robust native mobile MVP, without ever losing sight of technical feasibility."
          ]
        },
        jargon: {
          title: "Killing the Corporate Jargon",
          paragraphs: [
            "One of my favorite UX challenges on this project was cognitive cleanup. Early usability tests revealed that the application spoke Michelin's language, not the users' language. Acronyms like \\"BU\\" (Business Unit) or obscure tool labels created a real barrier. I led a complete overhaul of the information architecture based on factual data, creating an intuitive navigation centered around our dealers' mental models."
          ]
        },
        launch: {
          title: "Launch and the Decommissioning Victory",
          paragraphs: [
            "In January 2026, the app was successfully launched in the US and China. The feedback immediately validated MyXpert as the ultimate \\"sales companion.\\" But the greatest structural (and financial) victory for the company was reaching a level of completeness that allowed Michelin to officially decommission three of its redundant legacy applications."
          ]
        },
        future: {
          title: "Scaling to 20,000 Users",
          paragraphs: [
            "The consolidation work continues. As we prepare for the major rollout in the European market, our goal is to reach 20,000 daily active users across 12 countries. Every new feature is scrupuleously tested to ensure that MyXpert remains this centralized and indispensable tool."
          ]
        },
        learnings: {
          title: "Leadership Lessons",
          paragraphs: [
            "This project at Michelin reinforced my belief that the role of a Lead Designer goes far beyond creating interfaces. It is about aligning business strategy with technical excellence, having the courage to propose major architectural pivots, and always fighting to simplify the daily lives of the end-users."
          ]
        }
      }
    }`;

// 1. Remove everything between "myxpert: {" and the REAL "kirrk: {" (which has the car rental summary)
const realKirrkFRIndex = content.indexOf(\`kirrk: {
      summary: "La location automobile estivale\`);
const myxpertFRIndex = content.indexOf(\`myxpert: {\`);

// Extract prefix and suffix and replace the middle
if (myxpertFRIndex !== -1 && realKirrkFRIndex !== -1 && myxpertFRIndex < realKirrkFRIndex) {
  content = content.substring(0, myxpertFRIndex) + myxpertFRIndex + "\\n" + content.substring(realKirrkFRIndex);
  // wait we want to inject myxpertFR here
  content = content.replace(myxpertFRIndex + "\\n", myxpertFR + ",\\n    ");
}

const realKirrkENIndex = content.indexOf(\`kirrk: {
      summary: "Summer car rentals suffered\`);
const myxpertENIndex = content.indexOf(\`myxpert: {\`, realKirrkFRIndex); // find the EN myxpert

if (myxpertENIndex !== -1 && realKirrkENIndex !== -1 && myxpertENIndex < realKirrkENIndex) {
  content = content.substring(0, myxpertENIndex) + "MYXPERT_EN_MARKER\\n" + content.substring(realKirrkENIndex);
  content = content.replace("MYXPERT_EN_MARKER\\n", myxpertEN + ",\\n    ");
}

fs.writeFileSync(path, content, 'utf8');
console.log("Successfully fixed caseStudies.js");
