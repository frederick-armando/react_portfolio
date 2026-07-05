import { homeContent } from './home.jsx';

export const pagesContent = {
  fr: {
    home: homeContent.fr,
    profile: {
      title: 'Profil',
      introTitle: 'Présentation & Carrière',
      skillsTitle: 'Compétences clés',
      introParagraphs: [
        <>
          Mon rôle est de transformer des problématiques complexes en décisions produit claires. J&apos;interviens à l&apos;intersection des besoins utilisateurs, des objectifs business et des contraintes techniques, avec une attention forte portée à l&apos;accessibilité et à l&apos;impact réel.
        </>,
        <>
          Ces dernières années, j&apos;ai accompagné des équipes sur des produits B2C, B2B, mobiles et IA : cadrage, discovery, ateliers, prototypage, design system, handoff et mesure. J&apos;aime les sujets flous, les contraintes fortes et les produits qui doivent convaincre autant les utilisateurs que les équipes qui les construisent.
        </>,
      ],
      skillGroups: [
        {
          title: 'Stratégie & cadrage',
          skills: [
            'Product Strategy',
            'Discovery',
            'Design Thinking',
            'Analyse des besoins',
            "Animation d'ateliers",
          ],
        },
        {
          title: 'Expérience & livraison',
          skills: [
            'UX Design',
            'UI Design',
            'Apps mobiles & web',
            'Wireframe / Prototypage',
            'Design Systems',
            'Handoff',
          ],
        },
        {
          title: 'IA & qualité',
          skills: [
            'Conversational AI',
            'GenUI',
            'Accessibilité',
            'User Research',
            'User Testing',
            'Audit UX',
          ],
        },
      ],
    },
    methods: {
      title: 'Méthodes',
      items: [
        {
          title: 'Cadrer',
          text:
            'Transformer un sujet flou en problème actionnable. Je clarifie les objectifs, les utilisateurs concernés, les contraintes et les critères de succès avant de produire des solutions.',
        },
        {
          title: 'Aligner',
          text:
            'Faire converger les enjeux business, les besoins utilisateurs et la faisabilité technique. J’utilise les ateliers, cartographies et prototypes pour rendre les décisions visibles et discutables.',
        },
        {
          title: 'Concevoir',
          text:
            'Passer rapidement de l’hypothèse au prototype. Je structure les parcours, les interactions et les interfaces avec une attention particulière à la clarté, à l’accessibilité et à la scalabilité.',
        },
        {
          title: 'Livrer',
          text:
            'Sécuriser le passage du design à l’implémentation. Je documente les comportements, les états, les règles d’usage et les guidelines pour faciliter le handoff avec les équipes produit et engineering.',
        },
        {
          title: 'Mesurer',
          text:
            'Évaluer l’impact réel des solutions. J’analyse les retours utilisateurs, les signaux d’usage et les KPIs disponibles pour prioriser les itérations suivantes.',
        },
      ],
    },
    contact: {
      title: 'Contact',
      introTitle: 'Vous travaillez sur un produit complexe ?',
      introParagraphs: [
        <>
          Je suis ouvert aux échanges autour du design produit, de l&apos;IA, du mobile et des expériences B2B/B2C. Que ce soit pour une mission, une collaboration ou simplement une discussion produit, le plus simple est de m&apos;envoyer un message.
        </>,
      ],
      socialsAria: 'Réseaux sociaux',
      socialLinkLabel: (label) => `Ouvrir le profil ${label} de Frederick Armando`,
      contactTitle: 'Me contacter',
      contactBody:
        'Envoyez-moi un mail, je réponds rapidement.',
      locationTitle: 'Où me trouver :',
      locationAddress: (
        <>
          Basé en France, disponible pour des opportunités en <strong>hybride ou remote</strong>.
        </>
      ),
      callMe: 'Appelez-moi',
      mailMe: "M’envoyer un mail",
    },
  },
  en: {
    home: homeContent.en,
    profile: {
      title: 'Profile',
      introTitle: 'Overview & Career',
      skillsTitle: 'Key skills',
      introParagraphs: [
        <>
          My role is to turn complex problems into clear product decisions. I work at the intersection of user needs, business goals and technical constraints, with a strong focus on accessibility and real-world impact.
        </>,
        <>
          Over the past years, I have supported teams across B2C, B2B, mobile and AI products: framing, discovery, workshops, prototyping, design systems, handoff and measurement. I like ambiguous topics, strong constraints and products that need to convince both users and the teams building them.
        </>,
      ],
      skillGroups: [
        {
          title: 'Strategy & framing',
          skills: [
            'Product Strategy',
            'Discovery',
            'Design Thinking',
            'Needs analysis',
            'Workshop facilitation',
          ],
        },
        {
          title: 'Experience & delivery',
          skills: [
            'UX Design',
            'UI Design',
            'Mobile & web apps',
            'Wireframing / Prototyping',
            'Design Systems',
            'Handoff',
          ],
        },
        {
          title: 'AI & quality',
          skills: [
            'Conversational AI',
            'GenUI',
            'Accessibility',
            'User Research',
            'User Testing',
            'UX Audit',
          ],
        },
      ],
    },
    methods: {
      title: 'Methods',
      items: [
        {
          title: 'Frame',
          text:
            'Turn an ambiguous topic into an actionable problem. I clarify goals, target users, constraints and success criteria before producing solutions.',
        },
        {
          title: 'Align',
          text:
            'Bring business goals, user needs and technical feasibility together. I use workshops, maps and prototypes to make decisions visible and discussable.',
        },
        {
          title: 'Design',
          text:
            'Move quickly from hypothesis to prototype. I structure flows, interactions and interfaces with a strong focus on clarity, accessibility and scalability.',
        },
        {
          title: 'Deliver',
          text:
            'Secure the transition from design to implementation. I document behaviors, states, usage rules and guidelines to make handoff easier for product and engineering teams.',
        },
        {
          title: 'Measure',
          text:
            'Evaluate the real impact of solutions. I analyze user feedback, usage signals and available KPIs to prioritize the next iterations.',
        },
      ],
    },
    contact: {
      title: 'Contact',
      introTitle: 'Working on a complex product?',
      introParagraphs: [
        <>
          I&apos;m open to conversations about product design, AI, mobile and B2B/B2C experiences. Whether it is for a mission, a collaboration or simply a product discussion, the easiest way is to send me a message.
        </>,
      ],
      socialsAria: 'Social links',
      socialLinkLabel: (label) => `Open Frederick Armando's ${label} profile`,
      contactTitle: 'Contact me',
      contactBody:
        'Send me an email, I reply quickly.',
      locationTitle: 'Where to find me:',
      locationAddress: (
        <>
          Based in France, available for <strong>hybrid or remote</strong> opportunities.
        </>
      ),
      callMe: 'Call me',
      mailMe: 'Send me an email',
    },
  },
};
