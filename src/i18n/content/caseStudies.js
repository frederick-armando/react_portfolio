export const caseStudyContent = {
  fr: {
    backToProjects: 'Retour à mes projets',
    currentStudy: (company, projectName) => `Étude de cas ${company} / ${projectName}`,
    placeholder: {
      nextCaseStudy: 'Étude de cas suivante',
      title: 'Le contenu détaillé arrive bientôt',
      body: (company) => `Le contenu de ${company} sera bientôt intégré.`
    },
    'tire-assistant': {
      summary: "Le chatbot B2C existant de Michelin était un outil de support passif, caché derrière une interface confuse. En tant que <strong>Lead Product Designer</strong>, j'ai repensé l'intégralité des flux conversationnels du chatbot B2C et promu des notifications contextuelles.<br/><br/><strong>Résultat : +18 % d'ouverture et 21,3 % d'intention d'achat, monétisant avec succès le trafic SEO organique.</strong>",
      metrics: [
        { iconKey: 'calendar', title: 'Déc 2024 - Présent', detail: 'Participation au projet' },
        { iconKey: 'pencil-ruler', title: 'Lead Product Designer', detail: 'Rôle principal' },
        { iconKey: 'users', title: '1 PM, 5 Devs', detail: 'Composition de l\'équipe' },
        { iconKey: 'globe', title: 'UK, IN, MX, AU', detail: 'Déploiement global' }
      ],
      tools: [
        { iconKey: 'figma', title: 'Figma', detail: "Conception et prototypage de l'interface utilisateur" },
        { iconKey: 'database', title: 'Power BI / Kameleoon', detail: 'Analyse des données et A/B testing' },
        { iconKey: 'waypoints', title: 'Zeplin', detail: 'Spécifications techniques' },
        { iconKey: 'library-big', title: 'Confluence', detail: 'Documentation de projet' }
      ],
      processColumns: [
        ['Audit UX', 'Analyse des données', 'Définition du problème'],
        ['A/B Testing icône', 'Refonte des flux', 'Alignement Métier'],
        ['Design conversationnel', 'Intégration IA', 'Tests Qualité'],
        ['Déploiement global', 'Analyse SEO/BOF', 'Exploration GenUI']
      ],
      sections: {
        intro: {
          title: "Du chatbot passif au moteur de vente proactif",
          paragraphs: [
            "Michelin avait besoin de booster sa génération de leads B2C en ligne. L'assistant conversationnel existant était fonctionnel, mais il agissait simplement comme une FAQ passive : les utilisateurs posaient une question de support et quittaient le site. Ma mission en tant que Lead Product Designer était de transformer cet outil de support invisible en un véritable vendeur digital expert."
          ]
        },
        challenge: {
          title: "Le syndrome du bouton d'erreur",
          paragraphs: [
            "L'un des plus gros goulots d'étranglement de l'adoption du chatbot résidait dans son interface d'entrée. L'icône de lancement ressemblait à s'y méprendre à un bouton de signalement de bug ou à un sondage de satisfaction. Les utilisateurs n'avaient aucune idée qu'une intelligence conversationnelle se cachait derrière, ce qui limitait drastiquement l'engagement."
          ]
        },
        advocacy: {
          title: "La bataille de la mascotte : +18 % d'ouverture",
          paragraphs: [
            "Le design, c'est aussi savoir défendre ses convictions. Pendant près d'un an, je me suis battu pour remplacer cette icône générique par la mascotte emblématique de la marque : le Bonhomme Michelin (Bibendum). Pour convaincre les parties prenantes, j'ai exigé un test A/B. Les données ont été irréfutables : sur mobile, le taux d'ouverture a bondi de 2,7 % à 3,2 %. En corrigeant simplement ce point d'entrée, nous avons capté 18 % d'utilisateurs en plus, tout en haut de l'entonnoir de conversion."
          ]
        },
        ux: {
          title: "Redessiner l'intelligence conversationnelle",
          paragraphs: [
            "Évoluant sans UI designer dédié sur ce projet, j'ai pris en charge la cartographie complète des flux utilisateurs pour introduire des suggestions intelligentes et contextuelles. L'objectif était clair : ne plus jamais laisser l'utilisateur face à une impasse ou à un message d'erreur."
          ]
        },
        expert: {
          title: "L'effet 'Expert en vente'",
          paragraphs: [
            "Au lieu de simplement répondre aux questions, le bot V2 recommande désormais activement des produits phares en fonction des besoins détectés. L'impact a été massif : le trafic redirigé vers le pneu stratégique KO3 a presque triplé (passant de 1,10 % à 3,16 %). En fournissant des solutions de repli intelligentes, les clics liés à une \"incompréhension du bot\" ont littéralement chuté, passant de 7,2 % à seulement 1,3 %."
          ]
        },
        business: {
          title: "Un impact Business monumental",
          paragraphs: [
            "La sortie de la V2 a délivré des métriques commerciales exceptionnelles. Sur mobile, la combinaison de la génération de leads et des clics \"Acheter maintenant\" a atteint 21,3 %. Cela signifie que plus d'une conversation sur cinq se termine désormais par une forte intention d'achat (+4 points par rapport à la V1)."
          ]
        },
        seo: {
          title: "Monétiser le trafic organique",
          paragraphs: [
            "Plus impressionnant encore, le bot a modifié la typologie des utilisateurs convertis. Alors que la V1 dépendait fortement du référencement payant (Paid Search à 48 %), la V2 réussit l'exploit de monétiser le trafic organique (Organic Search à 48 %). Nous transformons désormais des visiteurs SEO gratuits en leads hautement qualifiés, et ce sans dépenser un centime de plus en publicité."
          ]
        },
        future: {
          title: "Pionnier de la GenUI (Generative UI)",
          paragraphs: [
            "Au-delà du produit actuellement en ligne, je dirige également l'UX de notre escouade \"POC\" (Proof of Concept). Nous explorons activement l'avenir des interfaces générées par l'IA (GenUI / AG-UI). Nous concevons des interfaces dynamiques pour des sites internes d'expatriation, des recherches intelligentes et des comparateurs de pneus avancés, maintenant ainsi Michelin à la pointe du design de produits digitaux."
          ]
        },
        learnings: {
          title: "Leçons d'un Lead Designer",
          paragraphs: [
            "Cette refonte m'a prouvé que la donnée (Data) est la meilleure arme d'un designer pour faire avancer ses idées. Elle démontre également qu'une excellente UX conversationnelle ne se contente pas d'aider l'utilisateur : elle a le pouvoir de transformer un centre de coûts (le support) en un véritable centre de profits (les ventes)."
          ]
        }
      },
      captions: {
        abTest: "Résultat de l'A/B Test du chatbot en Australie",
        highFidelity: "Welcome Pop-in, Contextual Notification & Tire Snap (Haute Fidélité)"
      }
    },
    masteos: {
      summary: "Masteos souhaitait démocratiser l'investissement immobilier, mais le parcours utilisateur était fragmenté et intimidant. J'ai dirigé la refonte UX/UI de l'expérience Mobile et Desktop, simplifiant des données financières complexes en une interface intuitive. Résultat : une augmentation de <strong>32 %</strong> des investissements finalisés, une baisse de <strong>20 %</strong> du taux de rebond sur les pages de biens et un bond de <strong>+15 points</strong> du NPS.",
      metrics: [
        { iconKey: 'calendar', title: '12/2021 - 09/2023', detail: 'Participation au projet' },
        { iconKey: 'pencil-ruler', title: 'Product Designer', detail: 'Rôle principal' },
        { iconKey: 'square-dashed-kanban', title: 'Méthode agile', detail: 'Méthodologie projet' },
        { iconKey: 'users', title: '2 PMs, 8 Devs', detail: 'Composition de l’équipe' },
        { iconKey: 'mic', title: '120+ interviews', detail: 'Interviews utilisateurs' },
        { iconKey: 'ticket', title: '200+ tickets', detail: 'Nombre d’entrées sur Notion' },
        { iconKey: 'book-open-check', title: 'Notion', detail: 'Documentation' },
        { iconKey: 'code', title: 'React Native', detail: "Framework utilisé" }
      ],
      tools: [
        { iconKey: 'figma', title: 'Figma', detail: "Conception et prototypage de l'interface utilisateur" },
        { iconKey: 'sticky-note', title: 'FigJam & Miro', detail: 'Cartographie des utilisateurs et idéation collaborative' },
        { iconKey: 'database', title: 'Amplitude', detail: 'Analyse du comportement des utilisateurs' },
        { iconKey: 'clipboard-type', title: 'Hotjar', detail: 'Sondage et enregistrements/analyse de parcours' }
      ],
      processColumns: [
        ['Lancement du produit', 'Entretiens & audit', 'Parcours utilisateur'],
        ['Synthèse des insights', 'Priorisation des enjeux', 'Design des parcours'],
        ['Wireframes & tests', 'UI haute fidélité', 'Spécifications'],
        ['Livraison produit', 'Mesure et itérations', 'Optimisations']
      ],
      sections: {
        intro: {
          title: "Le début d'une aventure ambitieuse",
          paragraphs: [
            "C'était en décembre 2021 lorsque je rejoignis l'équipe de Masteos, une start-up ambitieuse avec une vision audacieuse : démocratiser l'investissement immobilier pour les particuliers. Le défi était de taille : comment transformer un processus complexe, souvent intimidant, en une expérience accessible et intuitive ?"
          ]
        },
        challenges: {
          title: "Les défis initiaux",
          paragraphs: [
            "Notre mission était claire, mais le chemin pour y parvenir était parsemé d'obstacles. Comment allions-nous simplifier des données financières complexes ? Comment rendre la gestion de multiples propriétés aussi simple que de consulter son compte en banque ? Ces questions tournaient dans ma tête alors que je commençais mon rôle de Product Designer."
          ]
        },
        research: {
          title: "Plonger dans la recherche utilisateur",
          paragraphs: [
            "Les premiers mois furent intenses. Nous avons plongé tête la première dans la recherche utilisateur, menant plus de 120 interviews et analysant des centaines de réponses à nos sondages. Un constat frappant émergea : les utilisateurs rêvaient d'une approche \"passive\" de l'investissement immobilier, similaire à l'investissement dans des fonds indiciels en bourse. Cette révélation allait guider toute notre stratégie de conception."
          ]
        },
        sitemap: {
          title: "Le marathon créatif",
          paragraphs: [
            "Armés de ces insights, nous avons entamé un marathon créatif. Des séances de brainstorming animées, des maquettes griffonnées sur des post-its, des prototypes rapidement assemblés... Notre équipe de 2 designers, 2 chefs de produit et 8 développeurs travaillait en harmonie, chacun apportant son expertise unique à notre vision commune."
          ]
        },
        process: {
          title: "Cartographier le parcours produit",
          description: "Une structure simple pour transformer les insights terrain en décisions de design, puis en écrans réellement exploitables."
        },
        obstacles: {
          title: "Surmonter les obstacles",
          paragraphs: [
            "Le processus n'était pas sans embûches. Chaque fonctionnalité que nous concevions était soumise à des tests rigoureux. Je me souviens encore de notre cinquième série de tests d'utilisabilité, où nous avons découvert que notre \"innovant\" simulateur d'investissement était en réalité source de confusion pour de nombreux utilisateurs. C'était un coup dur, mais aussi une leçon précieuse. Nous sommes retournés à la planche à dessin, déterminés à simplifier sans compromettre la fonctionnalité."
          ]
        },
        launch: {
          title: "Le grand lancement",
          paragraphs: [
            "Après des mois d'itérations, de nuits blanches et de litres de café, nous étions enfin prêts pour le lancement. L'excitation était palpable dans nos bureaux le jour J. Allions-nous réussir à transformer l'investissement immobilier comme nous l'avions imaginé ?"
          ]
        },
        results: {
          title: "Les premiers retours",
          paragraphs: [
            "Les premiers retours ont dépassé nos attentes les plus folles. En seulement trois mois, nous avons vu nos inscriptions augmenter de 200%. Les utilisateurs passaient en moyenne 15 minutes par session sur l'application, explorant leurs options d'investissement avec une facilité que beaucoup décrivaient comme \"révolutionnaire\"."
          ]
        },
        validation: {
          title: "La validation ultime",
          paragraphs: [
            "Je n'oublierai jamais le message de Sarah, l'une de nos utilisatrices bêta : \"Masteos a rendu l'investissement immobilier aussi simple que l'achat d'actions. L'interface est intuitive et je sais toujours exactement comment mes investissements se portent.\" C'était la validation ultime de notre travail acharné."
          ]
        },
        future: {
          title: "Regarder vers l'avenir",
          paragraphs: [
            "Mais notre voyage ne s'arrête pas là. Avec plus de 300 millions d'euros d'investissements immobiliers facilités, nous avons prouvé que notre concept fonctionnait. Maintenant, nous rêvons encore plus grand. L'intégration de l'IA pour des conseils personnalisés, l'expansion vers l'immobilier commercial, la création d'une communauté d'investisseurs... L'avenir est rempli de possibilités excitantes."
          ]
        },
        learnings: {
          title: "Les leçons apprises",
          paragraphs: [
            "Cette expérience m'a appris que la simplicité est la clé, même (et surtout) lorsqu'on traite de sujets complexes. Que l'éducation fait partie intégrante de l'expérience utilisateur. Et surtout, que l'écoute continue des utilisateurs est le secret d'un produit qui résonne vraiment avec son public."
          ]
        },
        conclusion: {
          title: "Conclusion et perspectives",
          paragraphs: [
             "Alors que je regarde en arrière sur ce voyage de près de deux ans chez Masteos, je suis rempli de fierté pour ce que nous avons accompli. Mais je suis encore plus excité par ce qui nous attend. Car dans le monde du design UX, chaque défi résolu n'est qu'une porte ouverte vers de nouvelles opportunités d'innovation."
          ]
        }
      },
      captions: {
        userJourney: "User journey - Gestion locative",
        rentalWireframe: "Gestion locative (wireframe)",
        financeWireframe: "Situation financière (wireframe)",
        rentalHighFid: "Gestion locative (high-fidelity)",
        financeHighFid: "Situation financière (high-fidelity)"
      },
      learningCards: [
        { iconKey: 'figma', title: 'Figma', detail: "Conception et prototypage de l'interface utilisateur" },
        { iconKey: 'sticky-note', title: 'FigJam & Miro', detail: 'Cartographie des utilisateurs et idéation collaborative' },
        { iconKey: 'database', title: 'Amplitude', detail: 'Analyse du comportement des utilisateurs' },
        { iconKey: 'webcam', title: 'Hotjar', detail: 'Sondage et enregistrements/analyse de parcours' }
      ],
      deviceCards: [
        { title: "Gestion locative", description: "Gestion locative fluide et synthétique." },
        { title: "Situation financière", description: "Vision instantanée des mouvements et soldes." }
      ]
    },
    helios: {
      summary: "Alors que Masteos se développait rapidement, nos équipes internes étaient freinées par des outils inefficaces et des workflows fragmentés. J'ai piloté le design UX/UI d'Helios, un back-office sur mesure puissant. En recentrant l'attention sur nos collaborateurs et en co-créant des solutions avec eux, j'ai aidé à réduire le temps de traitement des investissements de <strong>40 %</strong> et à réinventer l'expérience collaborateur avec un NPS interne propulsé à <strong>8,7</strong>.",
      metrics: [
        { iconKey: 'calendar', title: '01/2023 - 09/2023', detail: 'Participation au projet' },
        { iconKey: 'pencil-ruler', title: 'Product Designer', detail: 'Rôle principal' },
        { iconKey: 'square-dashed-kanban', title: 'Méthode agile', detail: 'Méthodologie projet' },
        { iconKey: 'users', title: '1 PM, 4 Devs', detail: 'Composition de l’équipe' },
        { iconKey: 'waypoints', title: '4 ateliers', detail: 'Co-conception' },
        { iconKey: 'ticket', title: '48 tickets', detail: 'Nombre d’entrées sur Notion' },
        { iconKey: 'book-open-check', title: 'Notion', detail: 'Documentation' },
        { iconKey: 'code', title: 'React Admin', detail: "Framework utilisé" }
      ],
      tools: [
        { iconKey: 'figma', title: 'Figma', detail: "Conception et prototypage de l'interface utilisateur" },
        { iconKey: 'sticky-note', title: 'FigJam & Miro', detail: 'Cartographie des utilisateurs et idéation collaborative' },
        { iconKey: 'database', title: 'Amplitude', detail: 'Analyse du comportement des utilisateurs' },
        { iconKey: 'clipboard-type', title: 'Typeform', detail: 'Sondage & recherche' }
      ],
      sections: {
        intro: { title: "Réinventer l'expérience collaborateur", paragraphs: ["Alors que l'application Masteos prenait son envol, une nouvelle aventure se profilait à l'horizon. Notre équipe, encore euphorique du succès de Masteos, faisait face à un nouveau défi : créer le back-office qui allait propulser Masteos vers de nouveaux sommets."] },
        users: { title: "Comprendre nos utilisateurs internes", paragraphs: ["J'étais de nouveau aux commandes en tant que Product Designer UX/UI, mais cette fois-ci, le défi était différent. Nous ne parlions plus aux investisseurs, mais aux héros méconnus de Masteos : nos collaborateurs internes. Sales, chasseurs immobiliers, gestionnaires... Chacun avait des besoins spécifiques, et c'était à nous de les satisfaire tous."] },
        challenge: { title: "Le double défi : jongler entre projets", paragraphs: ["Le plus grand défi ? Jongler entre deux projets majeurs simultanément. Notre équipe, composée d'un PM, quatre développeurs et moi-même, devait maintenir l'élan de Masteos tout en construisant Helios de A à Z. C'était comme essayer de changer les roues d'une voiture en pleine course."] },
        daily: { title: "Un quotidien intense et multitâche", paragraphs: ["Nos journées étaient un tourbillon d'activités. Le matin, je pouvais travailler sur une nouvelle fonctionnalité pour Masteos, et l'après-midi, plonger dans les méandres d'Helios. Cette dualité était à la fois exaltante et éprouvante."] },
        questions: { title: "Des entretiens révélateurs", paragraphs: ["Pour comprendre les besoins d'Helios, nous avons mené plus de 15 interviews avec nos collègues. Chaque conversation révélait de nouvelles complexités. Comment simplifier l'ajout de biens immobiliers ? Comment optimiser le positionnement des clients ? Ces questions s'ajoutaient à la pile déjà conséquente de défis que nous relevions quotidiennement avec Masteos."] },
        workshop: { title: "L'atelier de co-création", paragraphs: ["L'un des moments les plus marquants fut lorsque nous avons organisé un atelier de co-création. Voir nos collègues des ventes, de l'immobilier et de la gestion réunis dans une même pièce, partageant leurs frustrations et leurs rêves pour Helios, fut une révélation. C'est là que j'ai vraiment compris l'ampleur de notre tâche : nous ne construisions pas simplement un outil, nous redéfinissions la façon dont Masteos opérait en coulisses."] },
        battleground: { title: "Le champ de bataille créatif", paragraphs: ["Les nuits blanches se sont multipliées. Entre les wireframes pour de nouvelles fonctionnalités de Masteos et les prototypes haute-fidélité pour Helios, mon écran Figma ressemblait à un champ de bataille créatif. Mais chaque itération, chaque test utilisateur nous rapprochait de notre objectif."] },
        launch: { title: "Le jour du lancement", paragraphs: ["Le jour du lancement d'Helios restera gravé dans ma mémoire. Alors que nous déployions la plateforme, je me souviens avoir retenu mon souffle. Allions-nous vraiment réussir à simplifier des processus aussi complexes ?"] },
        success: { title: "Un succès mesuré et tangible", paragraphs: ["La réponse ne tarda pas à venir. En l'espace de six mois, notre NPS interne passa de 6,5 à 8,7. Le temps de traitement d'un dossier d'investissement fut réduit de 40%. Mais le commentaire qui me toucha le plus fut celui de Laura, de l'équipe Sales : \"C'est comme si nous étions passés de la conduite d'une voiture manuelle à une voiture automatique de luxe.\""] },
        evolution: { title: "Un écosystème en tandem", paragraphs: ["Ce succès ne marquait pas la fin, mais plutôt un nouveau début. Avec Helios et Masteos fonctionnant en tandem, nous avions créé un écosystème complet. L'un ne pouvait exister sans l'autre, et ensemble, ils transformaient l'industrie de l'investissement immobilier."] },
        innovation: { title: "Vers l'innovation continue", paragraphs: ["Aujourd'hui, alors que nous envisageons l'intégration de l'IA et le développement d'une application mobile pour Helios, je ne peux m'empêcher de sourire. Ce voyage m'a appris que la véritable innovation ne se limite pas à ce que les clients voient. Elle réside aussi dans les systèmes qui alimentent ces expériences en coulisses."] },
        design: { 
          title: "Le design en coulisses", 
          paragraphs: [
            "Helios et Masteos resteront toujours pour moi comme les deux faces d'une même pièce. Deux projets menés en parallèle, se nourrissant mutuellement, et transformant non seulement la façon dont les gens investissent, mais aussi la façon dont nous travaillons. Et c'est peut-être ça, la véritable définition du succès en design : créer des expériences qui changent la donne, que ce soit pour le public ou en coulisses."
          ] 
        }
      },
      captions: {
        profileBefore: "Profil - Avant refonte",
        documentBefore: "Document - Avant refonte",
        profileAfter: "Profil - Après refonte",
        documentAfter: "Document - Après refonte"
      }
    },
    myxpert: {
      summary: "Les partenaires B2B et les équipes de vente de Michelin étaient confrontés à un écosystème d'applications fragmenté, entraînant une communication diluée et la frustration des utilisateurs. En tant que <strong>Lead Product Designer</strong>, j'ai réussi à faire pivoter le projet d'une simple vue web mobile vers une <strong>application native</strong> robuste.<br/><br/><strong>Résultat :</strong> un \"compagnon de vente\" centralisé lancé aux États-Unis et en Chine, la suppression de <strong>3 anciennes applications redondantes</strong>, et un objectif de déploiement de <strong>20 000 utilisateurs actifs</strong> dans 12 pays d'ici 2026.",
      metrics: [
        { iconKey: 'calendar', title: 'Déc 2024 - Présent', detail: 'Participation au projet' },
        { iconKey: 'pencil-ruler', title: 'Lead Product Designer', detail: 'Rôle principal' },
        { iconKey: 'users', title: '1 PM, 1 UI, 14 Devs', detail: 'Composition de l\'équipe' },
        { iconKey: 'building', title: 'B2B / B2E', detail: 'Périmètre du projet' }
      ],
      tools: [
        { iconKey: 'figma', title: 'Figma', detail: "Conception et prototypage de l'interface utilisateur" },
        { iconKey: 'code', title: 'React Native', detail: 'Framework de développement' },
        { iconKey: 'waypoints', title: 'Zeplin', detail: 'Spécifications techniques' },
        { iconKey: 'library-big', title: 'Confluence', detail: 'Documentation de projet' }
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
            "L'un de mes chantiers UX favoris sur ce projet a été le nettoyage cognitif. Les premiers tests d'utilisabilité ont révélé que l'application parlait le langage de Michelin, et non celui de ses utilisateurs. Des acronymes comme \"BU\" (Business Unit) ou des labels d'outils obscurs créaient une véritable barrière. J'ai donc piloté la refonte totale de l'architecture de l'information pour la baser sur des données factuelles, créant une navigation intuitive centrée sur les modèles mentaux de nos revendeurs."
          ]
        },
        launch: {
          title: "Le lancement et la victoire du 'Decommissioning'",
          paragraphs: [
            "En janvier 2026, l'application a été lancée avec succès aux États-Unis et en Chine. Les retours ont immédiatement validé MyXpert comme le \"compagnon de vente\" de référence. Mais la plus grande victoire structurelle (et financière pour l'entreprise) fut d'atteindre un niveau de complétude suffisant pour permettre à Michelin de supprimer officiellement trois de ses anciennes applications redondantes."
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
      },
      captions: {
        flow: "MyXpert Flow (Zeplin)",
        legacyVsNew: "MyTechXpert (legacy) vs MyXpert"
      }
    },
    kirrk: {
      summary: "La location automobile estivale souffrait d'une gestion de flotte complexe et d'une expérience utilisateur médiocre. Pendant <strong>2,5 ans</strong> en tant que UX Designer pour Kirrk, j'ai conçu une solution multi-plateforme (apps B2C, B2B + dashboard B2B) de A à Z. En introduisant des fonctionnalités comme l'accès Bluetooth sans clé et l'état des lieux digital, nous avons atteint un taux d'utilisation de la flotte de plus de <strong>80 %</strong> et 'révolutionné' la gestion de la mobilité.",
      metrics: [
        { iconKey: 'calendar', title: '04/2019 - 11/2021', detail: 'Participation au projet' },
        { iconKey: 'pencil-ruler', title: 'UX/UI Designer', detail: 'Rôle principal' },
        { iconKey: 'square-dashed-kanban', title: 'Méthode agile', detail: 'Méthodologie projet' },
        { iconKey: 'users', title: '1 PM, 10 Devs', detail: 'Composition de l’équipe' },
        { iconKey: 'figma', title: 'Figma & Adobe Xd', detail: "Conception et prototypage de l'interface utilisateur" },
        { iconKey: 'sticky-note', title: 'Miro', detail: 'Cartographie des utilisateurs et idéation collaborative' },
        { iconKey: 'square-kanban', title: 'Trello', detail: 'Gestion de projet & planification' },
        { iconKey: 'webcam', title: 'Hotjar', detail: 'Sondage et enregistrements/analyse de parcours' }
      ],
      tools: [
        { iconKey: 'note', title: 'Figma', detail: 'UI Design' },
        { iconKey: 'mic', title: 'InVision', detail: 'Prototypage' },
        { iconKey: 'code', title: 'Zeplin', detail: 'Handoff Dev' },
        { iconKey: 'mobile', title: 'Hotjar', detail: 'Analytics UX' }
      ],
      sections: {
        intro: { title: "Le début d'une aventure passionnante", paragraphs: ["Avril 2019. Le printemps parisien battait son plein lorsque je rejoignis l'équipe de Kirrk, une start-up ambitieuse dans le domaine de l'autopartage. Mon rôle ? UX/UI Designer, avec la mission de transformer leur vision audacieuse en une réalité digitale palpable."] },
        ambition: { title: "Un projet principal ambitieux", paragraphs: ["Kirrk était mon projet principal, le cœur de mon activité professionnelle pour les deux années et demie à venir. Notre objectif était clair mais ambitieux : révolutionner l'utilisation des flottes de véhicules en entreprise. Notre équipe, composée d'une vingtaine de développeurs, d'un ou deux designers (selon les phases) et d'un chef de produit, avait pour mission de créer une plateforme d'autopartage qui rendrait l'utilisation des véhicules aussi simple que de commander un café."] },
        challenges: { title: "Les défis à relever", paragraphs: ["Les défis étaient titanesques. Comment optimiser l'utilisation des flottes ? Comment réduire les coûts opérationnels tout en offrant une expérience utilisateur fluide ? Et surtout, comment promouvoir une mobilité durable dans un monde encore trop dépendant des énergies fossiles ?"] },
        daily: { title: "Un tourbillon d'activités quotidiennes", paragraphs: ["Nos journées étaient un tourbillon d'activités. Entre les séances de brainstorming, les tests utilisateurs \"guerilla\" dans les rues de Paris, et les nuits blanches à peaufiner les wireframes sur Figma, chaque jour apportait son lot de défis et de victoires. C'était intense, mais stimulant. Parfois, je me surprenais à rêver d'interfaces utilisateur la nuit, seulement pour me réveiller avec de nouvelles idées pour Kirrk (et occasionnellement pour Mobioos, mon projet secondaire)."] },
        moment: { title: "Un moment marquant", paragraphs: ["L'un des moments les plus marquants fut lorsque nous avons lancé la fonctionnalité de géolocalisation et d'accès sans clé. Voir un utilisateur ouvrir une voiture pour la première fois avec son smartphone, un grand sourire aux lèvres, fut une validation incroyable de notre travail acharné. C'était ces moments-là qui rendaient les longues heures de travail sur Kirrk (et les courtes sessions sur Mobioos) vraiment gratifiantes."] },
        features: { title: "Des fonctionnalités innovantes", paragraphs: ["Chaque fonctionnalité que nous développions - de la réservation en ligne 24/7 à l'état des lieux digital - était un pas de plus vers notre vision d'une mobilité urbaine révolutionnée. Les retours des utilisateurs étaient notre carburant. Je me souviens encore des mots de Marie, une directrice des opérations chez l'un de nos clients : \"Kirrk a révolutionné la façon dont nous gérons notre flotte.\" Ces mots résonnaient comme une douce mélodie à nos oreilles fatiguées."] },
        path: { title: "Le chemin parcouru", paragraphs: ["Novembre 2021 arriva plus vite que prévu. Alors que je regardais en arrière sur ces deux années et demie, je réalisais l'ampleur du chemin parcouru. Kirrk était devenu une référence dans l'autopartage d'entreprise, avec des taux d'utilisation des véhicules dépassant les 80%."] },
        learnings: { title: "Les leçons apprises", paragraphs: ["Cette aventure avec Kirrk m'a appris que l'innovation dans la mobilité urbaine peut vraiment changer la vie des gens. Et bien que mon focus principal était sur Kirrk, les compétences que j'y ai développées ont également enrichi mon travail sur Mobioos, me permettant d'aborder la personnalisation des applications avec une nouvelle perspective centrée sur l'utilisateur."] },
        future: { 
          title: "Regard vers l'avenir", 
          paragraphs: [
            "Aujourd'hui, alors que Kirrk envisage d'élargir sa gamme de véhicules, je ne peux m'empêcher de sourire. L'aventure continue, et qui sait quels nouveaux défis nous attendent au tournant ? Une chose est sûre : l'expérience acquise avec Kirrk (et Mobioos) m'a préparé à affronter n'importe quel défi UX que l'avenir pourrait me réserver."
          ] 
        }
      },
      captions: {
        booking: "Site de réservation des véhicules - Booking",
        fleet: "Site de gestion des véhicules - Fleet",
        b2c: "Application B2C - Access",
        b2b: "Application B2B - Infleet"
      }
    },
    mobioos: {
      summary: "Personnaliser des applications d'entreprise signifiait autrefois écrire des lignes de code interminables. Chez Mobioos, j'ai relevé le défi de concevoir une plateforme intuitive (Forge et Fusion) permettant aux utilisateurs non techniques de 'variabiliser' (personnaliser) des apps sans effort. Ce projet a affiné ma capacité à traduire une architecture technique complexe (UML, génération par IA) en interfaces SaaS B2B accessibles en conversant avec un chatbot ou via drag-and-drop.",
      metrics: [
        { iconKey: 'calendar', title: '04/2019 - 11/2021', detail: 'Participation au projet' },
        { iconKey: 'pencil-ruler', title: 'UX Designer', detail: 'Rôle principal' },
        { iconKey: 'square-dashed-kanban', title: 'Méthode Agile', detail: 'Méthodologie projet' },
        { iconKey: 'users', title: '1 PM, 10 Devs', detail: 'Composition de l’équipe' },
        { iconKey: 'figma', title: 'Adobe Xd', detail: "Conception et prototypage de l'interface utilisateur" },
        { iconKey: 'library-big', title: 'Confluence', detail: 'Documentation' },
        { iconKey: 'square-kanban', title: 'Trello', detail: 'Gestion de projet & planification' },
        { iconKey: 'code-xml', title: 'Java', detail: 'Technologie utilisé' }
      ],
      tools: [
        { iconKey: 'note', title: 'Sketch', detail: 'Design d\'interface' },
        { iconKey: 'mic', title: 'InVision', detail: 'Prototyping & QA' },
        { iconKey: 'ticket', title: 'Illustrator', detail: 'Design System & Icons' },
        { iconKey: 'code', title: 'Jira', detail: 'Ticket tracking' }
      ],
      sections: {
        intro: { title: "Une nouvelle opportunité se présente", paragraphs: ["Avril 2019. Alors que je plongeais tête la première dans le projet Kirrk, une autre opportunité se présenta : Mobioos. Cette plateforme visait à simplifier la personnalisation des applications, un défi technique complexe mais fascinant. Bien que secondaire par rapport à Kirrk, Mobioos m'offrait l'occasion de plonger dans un domaine totalement différent, élargissant ainsi mon expertise en UX."] },
        playground: { title: "Un terrain de jeu pour l'innovation", paragraphs: ["Mobioos était comme un projet parallèle, une sorte de terrain de jeu où je pouvais explorer de nouvelles idées. L'objectif était ambitieux : créer une plateforme qui permettrait aux développeurs et aux entreprises de personnaliser leurs applications sans avoir à réécrire des lignes de code à chaque fois. C'était un défi technique considérable, mais aussi une opportunité passionnante d'influencer la façon dont les logiciels sont développés et adaptés."] },
        juggling: { title: "Jongler entre deux projets", paragraphs: ["Jongler entre Kirrk et Mobioos était comme essayer de conduire deux voitures en même temps. Le matin, je pouvais travailler sur l'interface de réservation de Kirrk, et l'après-midi, plonger dans les méandres de la personnalisation d'applications avec Mobioos. Cette dualité était à la fois stimulante et éprouvante, mais elle m'a permis de développer une polyvalence et une capacité d'adaptation que je n'aurais pas acquises autrement."] },
        challenges: { title: "Les défis uniques de Mobioos", paragraphs: ["Les défis de Mobioos étaient uniques. Comment rendre la personnalisation d'applications accessible aux utilisateurs non techniques ? Comment s'assurer que la plateforme s'intègre facilement aux pratiques et outils existants des équipes ? Ces questions m'obligeaient à penser différemment, à adopter une perspective plus technique tout en gardant l'utilisateur final à l'esprit."] },
        moment: { title: "Un moment gratifiant", paragraphs: ["L'un des moments les plus gratifiants fut lorsque nous avons finalisé l'interface de Mobioos Fusion, permettant aux utilisateurs de sélectionner et d'appliquer des personnalisations via une interface conviviale. C'était fascinant de voir comment les principes de design centrés sur l'utilisateur que j'appliquais quotidiennement sur Kirrk pouvaient être adaptés à un contexte totalement différent avec Mobioos."] },
        impact: { title: "L'impact potentiel de Mobioos", paragraphs: ["Bien que moins visible pour le grand public que Kirrk, l'impact potentiel de Mobioos sur l'industrie du logiciel était tout aussi significatif. Chaque fonctionnalité que nous développions - de l'extension VSCode pour ajouter des informations intelligentes au code, au chatbot en langage naturel pour guider les utilisateurs non techniques - était un pas vers la démocratisation de la personnalisation des applications."] },
        synergy: { title: "Synergie entre les projets", paragraphs: ["Les deux projets, bien que différents, se nourrissaient mutuellement. Les leçons apprises sur l'importance de l'expérience utilisateur avec Kirrk influençaient ma façon d'aborder l'interface de Mobioos. Et inversement, la réflexion sur la personnalisation avec Mobioos m'inspirait pour rendre Kirrk encore plus adaptable aux besoins spécifiques de chaque entreprise."] },
        launch: { title: "Le lancement de Mobioos", paragraphs: ["Novembre 2021. Alors que Kirrk avait atteint sa vitesse de croisière, Mobioos s'apprêtait à être lancé, promettant de transformer la façon dont les entreprises abordent la personnalisation des applications. Bien que mon implication dans Mobioos ait été moins intensive que dans Kirrk, je ressentais une fierté similaire en voyant le produit prendre forme."] },
        learnings: { title: "Les leçons apprises", paragraphs: ["Cette expérience avec Mobioos, menée en parallèle de Kirrk, m'a appris que l'innovation ne se limite pas à un seul domaine. Que ce soit en transformant la mobilité urbaine ou en simplifiant le développement logiciel, le cœur de notre métier reste le même : créer des expériences qui améliorent la vie des gens."] },
        future: { 
          title: "Regard vers l'avenir", 
          paragraphs: [
            "Aujourd'hui, alors que Mobioos se prépare à conquérir de nouveaux marchés, je ne peux m'empêcher de réfléchir à la façon dont ce projet \"secondaire\" a enrichi ma perspective en tant que designer UX. L'aventure continue, et les compétences acquises sur Mobioos et Kirrk me préparent à relever n'importe quel défi UX que l'avenir pourrait me réserver."
          ] 
        }
      },
      captions: {
        showcase1: "Site vitrine - Mobioos.ai",
        dashboard: "App store — Mobioos Forge",
        showcase2: "Site vitrine - Mobioos.ai",
        showcase3: "Site vitrine - Forge Studio"
      }
    },
  },
  en: {
    backToProjects: 'Back to my projects',
    currentStudy: (company, projectName) => `Case study ${company} / ${projectName}`,
    placeholder: {
      nextCaseStudy: 'Next case study',
      title: 'Detailed content is coming next',
      body: (company) => `${company} case study is coming soon.`
    },
    'tire-assistant': {
      summary: "Michelin's existing B2C chatbot was a passive support tool hidden behind a confusing UI. As <strong>Lead Product Designer</strong>, I redesigned the entire conversational flows of the B2C chatbot and promoted contextual notifications.<br/><br/><strong>The result: +18% open rate and 21.3% purchase intent, successfully monetizing organic SEO traffic.</strong>",
      metrics: [
        { iconKey: 'calendar', title: 'Dec 2024 - Present', detail: 'Participation in the project' },
        { iconKey: 'pencil-ruler', title: 'Lead Product Designer', detail: 'Lead role' },
        { iconKey: 'users', title: '1 PM, 5 Devs', detail: 'Team composition' },
        { iconKey: 'globe', title: 'UK, IN, MX, AU', detail: 'Global deployment' }
      ],
      tools: [
        { iconKey: 'figma', title: 'Figma', detail: 'User interface design and prototyping' },
        { iconKey: 'database', title: 'Power BI / Kameleoon', detail: 'Data analytics and A/B testing' },
        { iconKey: 'waypoints', title: 'Zeplin', detail: 'Technical specifications' },
        { iconKey: 'library-big', title: 'Confluence', detail: 'Project documentation' }
      ],
      processColumns: [
        ['UX Audit', 'Data Analysis', 'Problem Definition'],
        ['Icon A/B Testing', 'Flow Redesign', 'Business Alignment'],
        ['Conversational Design', 'AI Integration', 'QA Testing'],
        ['Global Rollout', 'SEO/BOF Analysis', 'GenUI Exploration']
      ],
      sections: {
        intro: {
          title: "From passive chatbot to proactive sales engine",
          paragraphs: [
            "Michelin needed to boost its online B2C lead generation. The existing conversational assistant was functional, but it acted merely as a passive FAQ tool: users asked for help and left. My mission as Lead Product Designer was to transform this invisible support bot into an expert digital salesperson."
          ]
        },
        challenge: {
          title: "The Bug Report Syndrome",
          paragraphs: [
            "One of the biggest bottlenecks for chatbot adoption lay in its entry UI. The launcher icon looked exactly like a bug report tool or a satisfaction survey. Users had no idea a conversational AI was hiding behind it, which severely bottlenecked user engagement."
          ]
        },
        advocacy: {
          title: "The Mascot Battle: An 18% Opening Boost",
          paragraphs: [
            "Design is also about advocacy. For nearly a year, I fought to replace this generic launcher icon with the brand's beloved mascot: the Michelin Man (Bibendum). To convince stakeholders, I pushed for an A/B test. The data was undeniable: on mobile, the opening rate jumped from 2.7% to 3.2%. By simply fixing this entry point, we captured 18% more users right at the top of the funnel."
          ]
        },
        ux: {
          title: "Redesigning Conversational Intelligence",
          paragraphs: [
            "Operating without a dedicated UI designer on this project, I took charge of mapping complex user flows to introduce smart, context-aware suggestions. The goal was clear: never let the user hit a dead end or an error message again."
          ]
        },
        expert: {
          title: "The 'Sales Expert' Effect",
          paragraphs: [
            "Instead of just answering questions, the V2 bot now actively recommends flagship products based on detected needs. The impact was massive: traffic successfully redirected to the strategic KO3 tire nearly tripled (from 1.10% to 3.16%). By providing smart fallbacks, 'failed understanding' clicks plummeted from 7.2% to a mere 1.3%."
          ]
        },
        business: {
          title: "A Monumental Business Impact",
          paragraphs: [
            "The V2 release delivered incredible business metrics. On mobile, the combination of Lead Generation and 'Buy Now' clicks surged to 21.3%. This means that over 1 in 5 conversations now end with a strong purchase intent (+4 points compared to V1)."
          ]
        },
        seo: {
          title: "Monetizing Organic Traffic",
          paragraphs: [
            "Even more impressively, the bot shifted the typology of converted users. While V1 relied heavily on Paid Search (48%), V2 successfully monetizes Organic Search (48%). We are now turning free SEO visitors into highly qualified leads without relying on additional ad spend."
          ]
        },
        future: {
          title: "Pioneering GenUI (Generative UI)",
          paragraphs: [
            "Beyond the current live product, I also lead the UX for our POC (Proof of Concept) squad. We are actively exploring the future of AI-generated interfaces (GenUI / AG-UI). We are designing dynamic interfaces for internal expatriation sites, intelligent search, and advanced tire comparators, keeping Michelin at the forefront of digital product design."
          ]
        },
        learnings: {
          title: "Lessons from a Lead Designer",
          paragraphs: [
            "This redesign proved to me that data is a designer's best weapon to push ideas forward. It also demonstrates that excellent conversational UX does not just help the user: it has the power to transform a cost center (support) into a true profit center (sales)."
          ]
        }
      },
      captions: {
        abTest: "Chatbot A/B Test results in Australia",
        highFidelity: "Welcome Pop-in, Contextual Notification & Tire Snap (High-Fidelity)"
      }
    },
    masteos: {
      summary: "Masteos wanted to democratize real estate investing, but the user journey was highly fragmented and intimidating. I led the UX/UI redesign of the core Mobile and Desktop experience, simplifying complex financial data into an intuitive interface. The result? A <strong>32%</strong> increase in finalized investments, a <strong>20%</strong> drop in bounce rate on property pages, and a <strong>+15 point</strong> boost in NPS.",
      metrics: [
        { iconKey: 'calendar', title: '12/2021 - 09/2023', detail: 'Participation in the project' },
        { iconKey: 'pencil-ruler', title: 'Product Designer', detail: 'Lead role' },
        { iconKey: 'square-dashed-kanban', title: 'Agile Method', detail: 'Project methodology' },
        { iconKey: 'users', title: '2 PMs, 8 Devs', detail: 'Team composition' },
        { iconKey: 'mic', title: '120+ interviews', detail: 'User interviews' },
        { iconKey: 'ticket', title: '200+ tickets', detail: 'Number of entries on Notion' },
        { iconKey: 'book-open-check', title: 'Notion', detail: 'Documentation' },
        { iconKey: 'code', title: 'React Native', detail: 'Framework used' }
      ],
      tools: [
        { iconKey: 'figma', title: 'Figma', detail: 'User interface design and prototyping' },
        { iconKey: 'sticky-note', title: 'FigJam & Miro', detail: 'User mapping and collaborative ideation' },
        { iconKey: 'database', title: 'Amplitude', detail: 'User behavior analysis' },
        { iconKey: 'clipboard-type', title: 'Hotjar', detail: 'Survey and recording/pathway analysis' }
      ],
      processColumns: [
        ['Product kickoff', 'Interviews & audit', 'User journeys'],
        ['Insight synthesis', 'Challenge prioritization', 'Flow design'],
        ['Wireframes & testing', 'High-fidelity UI', 'Specifications'],
        ['Product delivery', 'Measurement & iterations', 'Optimizations']
      ],
      sections: {
        intro: {
          title: 'The Beginning of an Ambitious Journey',
          paragraphs: [
            'It was in December 2021 when I joined the Masteos team, an ambitious startup with a bold vision: democratizing real estate investing for individuals. The challenge was significant: how could we turn a complex, often intimidating process into an accessible and intuitive experience?'
          ]
        },
        challenges: {
          title: 'Initial Challenges',
          paragraphs: [
            'Our mission was clear, but the path to get there was full of obstacles. How would we simplify complex financial data? How could we make managing multiple properties as easy as checking a bank account? Those questions kept running through my mind as I started my role as a Product Designer.'
          ]
        },
        research: {
          title: 'Diving into User Research',
          paragraphs: [
            'The first few months were intense. We dove headfirst into user research, conducting more than 120 interviews and analyzing hundreds of survey responses. One striking insight emerged: users were dreaming of a "passive" approach to real estate investing, similar to investing in stock market index funds. This revelation would guide our entire design strategy.'
          ]
        },
        sitemap: {
          title: 'The Creative Marathon',
          paragraphs: [
            'Armed with these insights, we kicked off a creative marathon. Lively brainstorming sessions, mockups sketched on post-its, rapidly assembled prototypes... Our team of 2 designers, 2 product managers, and 8 developers worked in harmony, each bringing unique expertise to our shared vision.'
          ]
        },
        process: {
          title: 'Mapping the product journey',
          description: 'A simple structure to turn field insights into design decisions, then into screens that were genuinely usable.'
        },
        obstacles: {
          title: 'Overcoming Obstacles',
          paragraphs: [
            'The process was not without setbacks. Every feature we designed was put through rigorous testing. I still remember our fifth round of usability tests, where we discovered that our "innovative" investment simulator was actually confusing many users. It was a tough blow, but also a valuable lesson. We went back to the drawing board, determined to simplify without compromising functionality.'
          ]
        },
        launch: {
          title: 'The Big Launch',
          paragraphs: [
            'After months of iterations, sleepless nights, and countless liters of coffee, we were finally ready to launch. The excitement in our office was palpable on launch day. Would we really succeed in transforming real estate investing the way we had imagined?'
          ]
        },
        results: {
          title: 'The First Results',
          paragraphs: [
            'The first wave of feedback exceeded our wildest expectations. In just three months, we saw signups increase by 200%. Users spent an average of 15 minutes per session in the app, exploring investment options with an ease many described as "revolutionary."'
          ]
        },
        validation: {
          title: 'The Ultimate Validation',
          paragraphs: [
            'I will never forget Sarah\'s message, one of our beta users: "Masteos made real estate investing as simple as buying stocks. The interface is intuitive, and I always know exactly how my investments are performing." That was the ultimate validation of our hard work.'
          ]
        },
        future: {
          title: 'Looking Ahead',
          paragraphs: [
            'But our journey does not stop there. With more than €300 million in real estate investments facilitated, we proved that our concept works. Now we are dreaming even bigger. AI-powered personalized guidance, expansion into commercial real estate, and building an investor community... The future is full of exciting possibilities.'
          ]
        },
        learnings: {
          title: 'Lessons Learned',
          paragraphs: [
            'This experience taught me that simplicity is key, even (and especially) when dealing with complex topics. That education is an integral part of the user experience. And above all, that continuously listening to users is the secret to building a product that truly resonates with its audience.'
          ]
        },
        conclusion: {
          title: 'Conclusion and Perspectives',
          paragraphs: [
            'As I look back on this nearly two-year journey at Masteos, I am filled with pride for what we accomplished. But I am even more excited about what is ahead. Because in the world of UX design, every solved challenge is just an open door to new opportunities for innovation.'
          ]
        }
      },
      captions: {
        userJourney: "User journey - Rental management",
        rentalWireframe: "Rental management (wireframe)",
        financeWireframe: "Financial situation (wireframe)",
        rentalHighFid: "Rental management (high-fidelity)",
        financeHighFid: "Financial situation (high-fidelity)"
      },
      learningCards: [
        { iconKey: 'figma', title: 'Figma', detail: 'User interface design and prototyping' },
        { iconKey: 'sticky-note', title: 'FigJam & Miro', detail: 'User mapping and collaborative ideation' },
        { iconKey: 'database', title: 'Amplitude', detail: 'User behavior analysis' },
        { iconKey: 'webcam', title: 'Hotjar', detail: 'Survey and recording/pathway analysis' }
      ],
      deviceCards: [
        { title: 'Rental management', description: 'Fluid and easy-to-scan rental management.' },
        { title: 'Financial overview', description: 'Instant visibility into transactions and balances.' }
      ]
    },
    helios: {
      summary: "While Masteos was scaling rapidly, our internal teams were bogged down by inefficient tools and fragmented workflows. I led the UX/UI design of Helios, a powerful custom back-office solution. By shifting focus to our internal heroes and co-creating solutions with them, I helped reduce investment processing time by <strong>40%</strong> and reinvented the employee experience with an internal NPS rising to <strong>8.7</strong>.",
      metrics: [
        { iconKey: 'calendar', title: '01/2023 - 09/2023', detail: 'Participation in the project' },
        { iconKey: 'pencil-ruler', title: 'Product Designer', detail: 'Lead role' },
        { iconKey: 'square-dashed-kanban', title: 'Agile Method', detail: 'Project methodology' },
        { iconKey: 'users', title: '1 PM, 4 Devs', detail: 'Team composition' },
        { iconKey: 'waypoints', title: '4 workshops', detail: 'Co-design' },
        { iconKey: 'ticket', title: '48 tickets', detail: 'Number of entries on Notion' },
        { iconKey: 'book-open-check', title: 'Notion', detail: 'Documentation' },
        { iconKey: 'code', title: 'React Admin', detail: 'Framework used' }
      ],
      tools: [
        { iconKey: 'figma', title: 'Figma', detail: 'User interface design and prototyping' },
        { iconKey: 'sticky-note', title: 'FigJam & Miro', detail: 'User mapping and collaborative ideation' },
        { iconKey: 'database', title: 'Amplitude', detail: 'User behavior analysis' },
        { iconKey: 'clipboard-type', title: 'Typeform', detail: 'Surveys & research' }
      ],
      sections: {
        intro: { title: "Reinventing the employee experience", paragraphs: ["As the Masteos application was taking off, a new adventure was emerging on the horizon. Our team, still euphoric from Masteos' success, faced a new challenge: building the back-office that would take Masteos to new heights."] },
        users: { title: "Understanding Our Internal Users", paragraphs: ["I was once again in command as a UX/UI Product Designer, but this time the challenge was different. We were no longer speaking to investors, but to Masteos' unsung heroes: our internal collaborators. Sales, property hunters, managers... each had specific needs, and it was our job to satisfy them all."] },
        challenge: { title: "The Double Challenge: Juggling Projects", paragraphs: ["The biggest challenge? Juggling two major projects at the same time. Our team, made up of one PM, four developers, and myself, had to maintain Masteos' momentum while building Helios from the ground up. It was like trying to change a car's wheels while it was still racing."] },
        daily: { title: "An Intense, Multitasking Daily Routine", paragraphs: ["Our days were a whirlwind of activity. In the morning, I could be working on a new feature for Masteos, and in the afternoon, diving into the intricacies of Helios. This duality was both exhilarating and exhausting."] },
        questions: { title: "Revealing Interviews", paragraphs: ["To understand Helios' needs, we conducted more than 15 interviews with our colleagues. Each conversation revealed new complexities. How could we simplify adding real estate properties? How could we optimize client positioning? These questions added to the already substantial stack of challenges we were tackling daily with Masteos."] },
        workshop: { title: "The Co-Creation Workshop", paragraphs: ["One of the most memorable moments came when we organized a co-creation workshop. Seeing colleagues from sales, real estate, and operations gathered in the same room, sharing frustrations and dreams for Helios, was a revelation. That is when I truly grasped the scale of our mission: we were not just building a tool, we were redefining how Masteos operated behind the scenes."] },
        battleground: { title: "The Creative Battleground", paragraphs: ["Sleepless nights became more frequent. Between wireframes for new Masteos features and high-fidelity prototypes for Helios, my Figma screen looked like a creative battleground. But every iteration, every user test, brought us closer to our goal."] },
        launch: { title: "Launch Day", paragraphs: ["Helios launch day will stay with me forever. As we rolled out the platform, I remember holding my breath. Would we really manage to simplify processes this complex?"] },
        success: { title: "Measured and Tangible Success", paragraphs: ["The answer came quickly. Within six months, our internal NPS rose from 6.5 to 8.7. The processing time for an investment file was reduced by 40%. But the comment that touched me most came from Laura on the Sales team: \"It feels like we moved from driving a manual car to a luxury automatic one.\""] },
        evolution: { title: "An Ecosystem in Tandem", paragraphs: ["This success was not the end, but rather a new beginning. With Helios and Masteos working in tandem, we had created a complete ecosystem. One could not exist without the other, and together they were transforming the real estate investment industry."] },
        innovation: { title: "Toward Continuous Innovation", paragraphs: ["Today, as we consider AI integration and the development of a mobile app for Helios, I cannot help but smile. This journey taught me that true innovation is not limited to what customers see. It also lives in the systems that power those experiences behind the scenes."] },
        design: { 
          title: "Design Behind the Scenes", 
          paragraphs: [
            "Helios and Masteos will always remain, for me, as two sides of the same coin. Two projects led in parallel, feeding each other, and transforming not only how people invest, but also how we work. And maybe that is the true definition of success in design: creating game-changing experiences, whether for the public or behind the scenes."
          ] 
        }
      },
      captions: {
        profileBefore: "Profile - Before redesign",
        documentBefore: "Document - Before redesign",
        profileAfter: "Profile - After redesign",
        documentAfter: "Document - After redesign"
      }
    },
    myxpert: {
      summary: "Michelin's B2B partners and sales teams were struggling with a fragmented ecosystem of apps, leading to diluted messaging and user frustration. As <strong>Lead Product Designer</strong>, I successfully pivoted the project from a basic mobile web view to a robust <strong>native application</strong>.<br/><br/><strong>The result:</strong> A centralized \"sales companion\" launched in the US and China, the decommissioning of <strong>3 redundant legacy apps</strong>, and a rollout target of <strong>20,000 active users</strong> across 12 countries by 2026.",
      metrics: [
        { iconKey: 'calendar', title: 'Dec 2024 - Present', detail: 'Participation in the project' },
        { iconKey: 'pencil-ruler', title: 'Lead Product Designer', detail: 'Lead role' },
        { iconKey: 'users', title: '1 PM, 1 UI, 14 Devs', detail: 'Team composition' },
        { iconKey: 'building', title: 'B2B / B2E', detail: 'Project scope' }
      ],
      tools: [
        { iconKey: 'figma', title: 'Figma', detail: 'User interface design and prototyping' },
        { iconKey: 'code', title: 'React Native', detail: 'Development framework' },
        { iconKey: 'waypoints', title: 'Zeplin', detail: 'Technical specifications' },
        { iconKey: 'library-big', title: 'Confluence', detail: 'Project documentation' }
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
            "One of my favorite UX challenges on this project was cognitive cleanup. Early usability tests revealed that the application spoke Michelin's language, not the users' language. Acronyms like \"BU\" (Business Unit) or obscure tool labels created a real barrier. I led a complete overhaul of the information architecture based on factual data, creating an intuitive navigation centered around our dealers' mental models."
          ]
        },
        launch: {
          title: "Launch and the Decommissioning Victory",
          paragraphs: [
            "In January 2026, the app was successfully launched in the US and China. The feedback immediately validated MyXpert as the ultimate \"sales companion.\" But the greatest structural (and financial) victory for the company was reaching a level of completeness that allowed Michelin to officially decommission three of its redundant legacy applications."
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
      },
      captions: {
        flow: "MyXpert Flow (Zeplin)",
        legacyVsNew: "MyTechXpert (legacy) vs MyXpert"
      }
    },
    kirrk: {
      summary: "Summer car rentals suffered from complex fleet management and poor user experience. Over <strong>2.5 years</strong> as a UX Designer for Kirrk, I designed a cross-platform solution (B2C and B2B apps + B2B dashboard) from scratch. By introducing features like keyless Bluetooth access and digital condition reports, we achieved a fleet utilization rate of over <strong>80%</strong> and 'revolutionized' mobility management.",
      metrics: [
        { iconKey: 'calendar', title: '04/2019 - 11/2021', detail: 'Participation in the project' },
        { iconKey: 'pencil-ruler', title: 'UX/UI Designer', detail: 'Lead role' },
        { iconKey: 'square-dashed-kanban', title: 'Agile Method', detail: 'Project methodology' },
        { iconKey: 'users', title: '1 PM, 10 Devs', detail: 'Team composition' },
        { iconKey: 'figma', title: 'Figma & Adobe Xd', detail: 'User interface design and prototyping' },
        { iconKey: 'sticky-note', title: 'Miro', detail: 'User mapping and collaborative ideation' },
        { iconKey: 'square-kanban', title: 'Trello', detail: 'Project management & planning' },
        { iconKey: 'webcam', title: 'Hotjar', detail: 'Survey and recording/pathway analysis' }
      ],
      tools: [
        { iconKey: 'note', title: 'Figma', detail: 'UI Design' },
        { iconKey: 'mic', title: 'InVision', detail: 'Prototyping' },
        { iconKey: 'code', title: 'Zeplin', detail: 'Dev Handoff' },
        { iconKey: 'mobile', title: 'Hotjar', detail: 'UX Analytics' }
      ],
      sections: {
        intro: { title: "The Beginning of an Exciting Adventure", paragraphs: ["April 2019. Paris in spring was in full swing when I joined the Kirrk team, an ambitious startup in the car-sharing space. My role? UX/UI Designer, with a mission to turn their bold vision into a tangible digital reality."] },
        ambition: { "title": "An Ambitious Core Project", "paragraphs": ["Kirrk was my main project, the center of my professional activity for the next two and a half years. Our goal was clear but ambitious: revolutionize the use of corporate vehicle fleets. Our team, made up of around twenty developers, one or two designers (depending on the phase), and a product manager, was tasked with building a car-sharing platform that would make vehicle usage as simple as ordering a coffee."] },
        challenges: { "title": "Challenges to Overcome", "paragraphs": ["The challenges were titanic. How could we optimize fleet usage? How could we reduce operational costs while delivering a seamless user experience? And above all, how could we promote sustainable mobility in a world still heavily dependent on fossil fuels?"] },
        daily: { "title": "A Whirlwind of Daily Activity", "paragraphs": ["Our days were a whirlwind of activity. Between brainstorming sessions, guerrilla user testing in the streets of Paris, and sleepless nights polishing wireframes in Figma, every day brought its own share of challenges and victories. It was intense, but stimulating. Sometimes, I would catch myself dreaming about interfaces at night, only to wake up with new ideas for Kirrk (and occasionally for Mobioos, my secondary project)."] },
        moment: { "title": "A Defining Moment", "paragraphs": ["One of the most memorable moments came when we launched the geolocation and keyless access feature. Seeing a user unlock a car for the first time with their smartphone, a huge smile on their face, was an incredible validation of our hard work. Those moments made the long hours on Kirrk (and shorter sessions on Mobioos) truly rewarding."] },
        features: { "title": "Innovative Features", "paragraphs": ["Every feature we developed - from 24/7 online booking to digital vehicle inspection - was one more step toward our vision of reinvented urban mobility. User feedback was our fuel. I still remember Marie, an operations director at one of our client companies, saying: \"Kirrk revolutionized how we manage our fleet.\" Those words sounded like a sweet melody to our tired ears."] },
        path: { "title": "The Journey So Far", "paragraphs": ["November 2021 came faster than expected. Looking back on those two and a half years, I realized how far we had come. Kirrk had become a benchmark in corporate car sharing, with vehicle usage rates exceeding 80%."] },
        learnings: { "title": "Lessons Learned", "paragraphs": ["This adventure with Kirrk taught me that innovation in urban mobility can truly change people's lives. And while my main focus was Kirrk, the skills I developed there also enriched my work on Mobioos, allowing me to approach application customization with a new user-centered perspective."] },
        future: { 
          title: "Looking to the future", 
          paragraphs: [
            "Today, as Kirrk considers expanding its vehicle range, I can't help but smile. The adventure continues, and who knows what new challenges await us around the corner? One thing is certain: the experience gained with Kirrk (and Mobioos) has prepared me to face any UX challenge the future may hold."
          ] 
        }
      },
      captions: {
        booking: "Vehicle booking site - Booking",
        fleet: "Vehicle management site - Fleet",
        b2c: "B2C Application - Access",
        b2b: "B2B Application - Infleet"
      }
    },
    mobioos: {
      summary: "Customizing enterprise applications used to mean writing endless lines of code. At Mobioos, I took on the challenge of designing an intuitive platform (Forge and Fusion) that allowed non-technical users to 'variabilize' (customize) apps effortlessly. This project honed my ability to translate highly complex technical architecture (UML, AI-generation) into accessible B2B SaaS interfaces via chatbot conversations or drag-and-drop.",
      metrics: [
        { iconKey: 'calendar', title: '04/2019 - 11/2021', detail: 'Participation in the project' },
        { iconKey: 'pencil-ruler', title: 'UX Designer', detail: 'Lead role' },
        { iconKey: 'square-dashed-kanban', title: 'Agile Method', detail: 'Project methodology' },
        { iconKey: 'users', title: '1 PM, 10 Devs', detail: 'Team composition' },
        { iconKey: 'figma', title: 'Adobe Xd', detail: 'User interface design and prototyping' },
        { iconKey: 'library-big', title: 'Confluence', detail: 'Documentation' },
        { iconKey: 'square-kanban', title: 'Trello', detail: 'Project management & planning' },
        { iconKey: 'code-xml', title: 'Java', detail: 'Technology used' }
      ],
      tools: [
        { iconKey: 'note', title: 'Sketch', detail: 'Interface Design' },
        { iconKey: 'mic', title: 'InVision', detail: 'Prototyping & QA' },
        { iconKey: 'ticket', title: 'Illustrator', detail: 'Design System & Icons' },
        { iconKey: 'code', title: 'Jira', detail: 'Ticket tracking' }
      ],
      sections: {
        intro: { title: "A New Opportunity Emerges", paragraphs: ["April 2019. As I was diving headfirst into the Kirrk project, another opportunity emerged: Mobioos. This platform aimed to simplify application customization, a complex but fascinating technical challenge. Although secondary compared to Kirrk, Mobioos gave me the chance to dive into a completely different domain, broadening my UX expertise."] },
        playground: { title: "A Playground for Innovation", paragraphs: ["Mobioos was like a side project, a kind of playground where I could explore new ideas. The goal was ambitious: build a platform that would allow developers and companies to customize their applications without rewriting lines of code every time. It was a major technical challenge, but also an exciting opportunity to influence how software is built and adapted."] },
        juggling: { title: "Juggling Between Two Projects", paragraphs: ["Juggling Kirrk and Mobioos was like trying to drive two cars at once. In the morning, I could be working on Kirrk's booking interface, and in the afternoon, diving into the intricacies of application customization with Mobioos. This duality was both stimulating and demanding, but it helped me develop versatility and adaptability I would not have gained otherwise."] },
        challenges: { title: "Mobioos' Unique Challenges", paragraphs: ["Mobioos brought unique challenges. How do we make application customization accessible to non-technical users? How do we ensure the platform integrates smoothly with teams' existing workflows and tools? These questions pushed me to think differently, adopting a more technical perspective while keeping the end-user in mind."] },
        moment: { title: "A Rewarding Moment", paragraphs: ["One of the most rewarding moments came when we finalized the Mobioos Fusion interface, allowing users to select and apply customizations through a user-friendly experience. It was fascinating to see how user-centered design principles I was applying daily on Kirrk could be adapted to a completely different context with Mobioos."] },
        impact: { title: "Mobioos' Potential Impact", paragraphs: ["Although less visible to the general public than Kirrk, Mobioos' potential impact on the software industry was just as significant. Every feature we developed - from the VSCode extension that adds smart code insights to the natural-language chatbot guiding non-technical users - was a step toward democratizing application customization."] },
        synergy: { title: "Synergy Between Projects", paragraphs: ["The two projects, while different, fed each other. Lessons learned about user experience on Kirrk influenced how I approached Mobioos' interface. And in return, thinking about customization with Mobioos inspired me to make Kirrk even more adaptable to each company's specific needs."] },
        launch: { title: "The Launch of Mobioos", paragraphs: ["November 2021. As Kirrk reached cruising speed, Mobioos was preparing for launch, promising to transform how companies approach application customization. Although my involvement in Mobioos was less intensive than in Kirrk, I felt similar pride seeing the product take shape."] },
        learnings: { title: "Lessons Learned", paragraphs: ["This Mobioos experience, run in parallel with Kirrk, taught me that innovation is not limited to one domain. Whether transforming urban mobility or simplifying software development, the core of our work remains the same: creating experiences that improve people's lives."] },
        future: { 
          title: "Looking to the future", 
          paragraphs: [
            "Today, as Mobioos prepares to conquer new markets, I cannot help but reflect on how this \"secondary\" project enriched my perspective as a UX designer. The adventure continues, and the skills gained on Mobioos and Kirrk prepare me to tackle any UX challenge the future may bring."
          ] 
        }
      },
      captions: {
        showcase1: "Showcase site - Mobioos.ai",
        dashboard: "App store — Mobioos Forge",
        showcase2: "Showcase site - Mobioos.ai",
        showcase3: "Showcase site - Forge Studio"
      }
    }
  }
};
