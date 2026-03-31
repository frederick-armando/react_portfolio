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
          Au-delà de la création d&apos;interfaces, mon rôle est d&apos;aligner les enjeux business, les contraintes techniques et les besoins réels des utilisateurs. Je suis convaincu que l&apos;innovation technologique n&apos;a de véritable impact que si elle reste inclusive et centrée sur l&apos;humain.
        </>,
        <>
          C&apos;est pourquoi j&apos;intègre l&apos;accessibilité et le design éthique dès les premières phases de réflexion. De l&apos;animation d&apos;ateliers de co-création à la conception de parcours complexes pour le SaaS, je pilote le processus de design pour garantir que chaque décision repose sur une recherche solide et permette aux équipes de livrer des produits robustes.
        </>,
      ],
      skills: [
        'Product Design',
        'UI Design',
        'AI',
        'GenUI',
        'Design Thinking',
        'Accessibilité',
        'Innovation produit',
        'SaaS',
        'User Research',
        'User Testing',
        'Audit UX',
        'Wireframe/Prototypage',
        'Apps mobiles & web',
        "Animation d'ateliers",
        'Analyse des besoins',
      ],
    },
    methods: {
      title: 'Méthodes',
      items: [
        {
          title: 'Recherches',
          text:
            "Identification des vrais problèmes. Je mène des entretiens qualitatifs et des audits pour transformer des données brutes en insights actionnables, toujours ancrés dans la réalité des utilisateurs.",
        },
        {
          title: 'Analyses',
          text:
            "Cartographie de la complexité. Je structure l'architecture de l'information et les parcours utilisateurs pour m'assurer que la vision produit s'aligne parfaitement avec les objectifs d'affaires.",
        },
        {
          title: 'Conception',
          text:
            "Matérialisation des solutions. Du wireframe conceptuel au prototype haute fidélité, je conçois des interfaces évolutives, soutenues par des Design Systems robustes et testées itérativement.",
        },
        {
          title: 'Production',
          text:
            "Sécurisation de la livraison. Je collabore étroitement avec les équipes d'ingénierie via une documentation rigoureuse et des guidelines d'accessibilité strictes pour un handoff sans friction.",
        },
        {
          title: 'Évaluation',
          text:
            "Mesure de l'impact. J'analyse les métriques d'usage (KPIs) et mène des évaluations heuristiques pour valider nos hypothèses et définir le plan d'évolution du produit.",
        },
      ],
    },
    contact: {
      title: 'Contact',
      introTitle: 'Prêt à relever votre prochain défi ?',
      introParagraphs: [
        <>
          Je suis toujours ouvert pour échanger sur vos enjeux de design, de stratégie produit ou d&apos;équipe. Que ce soit en français ou en anglais, discutons de la façon dont je peux accompagner votre entreprise.
        </>,
      ],
      socialsAria: 'Réseaux sociaux',
      contactTitle: 'Comment me contacter :',
      contactBody:
        "Vous pouvez m'appeler ou m'envoyer un message, je répondrai aussi vite que possible :)",
      locationTitle: 'Où me trouver :',
      locationAddress: (
        <>
          Disponible pour des opportunités en <strong>hybride ou remote</strong> (basé à{' '}
          <span className="city-light city-light--paris" data-city="Paris">
            Paris
          </span>{' '}
          /{' '}
          <span className="city-light city-light--lyon" data-city="Lyon">
            Lyon
          </span>
          ).
        </>
      ),
      callMe: 'Appelez-moi',
      mailMe: 'Envoyez-moi un mail',
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
          Beyond crafting interfaces, my role is to align business goals, technical constraints, and real user needs. I firmly believe that technological innovation only makes a true impact when it remains inclusive and human-centered.
        </>,
        <>
          That is why I embed accessibility and ethical design into the very first stages of ideation. From facilitating co-creation workshops to designing complex journeys for SaaS, I drive the design process to ensure every decision is rooted in solid research and empowers teams to deliver robust products.
        </>,
      ],
      skills: [
        'Product Design',
        'UI Design',
        'AI',
        'GenUI',
        'Design Thinking',
        'Accessibility',
        'Product innovation',
        'SaaS',
        'User Research',
        'User Testing',
        'UX Audit',
        'Wireframing/Prototyping',
        'Mobile & web apps',
        'Workshop facilitation',
        'Needs analysis',
      ],
    },
    methods: {
      title: 'Methods',
      items: [
        {
          title: 'Research',
          text:
            'Identifying the right problems to solve. I conduct qualitative interviews and UX audits to turn raw data into actionable insights, always grounded in real user needs.',
        },
        {
          title: 'Analysis',
          text:
            'Mapping complexity. I structure information architecture and user journeys to ensure the product vision aligns perfectly with business goals.',
        },
        {
          title: 'Design',
          text:
            'Materializing solutions. From conceptual wireframes to high-fidelity prototypes, I craft scalable interfaces backed by robust Design Systems and iterative usability testing.',
        },
        {
          title: 'Production',
          text:
            'Securing delivery. I collaborate closely with engineering teams through rigorous documentation and strict accessibility guidelines to ensure a frictionless handoff.',
        },
        {
          title: 'Evaluation',
          text:
            "Measuring impact. I track usage metrics (KPIs) and conduct heuristic evaluations to validate our hypotheses and define the product's next evolution plans.",
        },
      ],
    },
    contact: {
      title: 'Contact',
      introTitle: 'Ready to tackle your next challenge?',
      introParagraphs: [
        <>
          I&apos;m always open to discussing design challenges, product strategy, or team leadership. Whether in English or French, let&apos;s talk about how I can help your team scale and succeed.
        </>,
      ],
      socialsAria: 'Social links',
      contactTitle: 'How to contact me:',
      contactBody:
        "You can call me or send me a message, I'll reply as quickly as possible :)",
      locationTitle: 'Where to find me:',
      locationAddress: (
        <>
          Available for <strong>hybrid or remote</strong> opportunities (based in{' '}
          <span className="city-light city-light--paris" data-city="Paris">
            Paris
          </span>{' '}
          /{' '}
          <span className="city-light city-light--lyon" data-city="Lyon">
            Lyon
          </span>
          ).
        </>
      ),
      callMe: 'Call me',
      mailMe: 'Mail me',
    },
  },
};
