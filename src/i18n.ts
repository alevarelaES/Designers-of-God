export type Language = "EN" | "FR" | "DE";

export type ArticleCategory = "Collab" | "Collection" | "Atelier" | "Mission" | "Culture" | "Sport" | "Recrutement";

export interface ArticleTranslation {
  title: string;
  excerpt: string;
  lead: string;
  body: string[];
}

export interface Translations {
  nav: {
    news: string;
    about: string;
    contact: string;
    langLabel: string;
  };
  hero: {
    heading: string;
    subheading: string;
    cta: string;
    scrollHint: string;
  };
  about: {
    sectionTitle: string;
    missionLabel: string;
    body1: string;
    body2: string;
    cta: string;
    imgAlt: string;
    pillars: Array<{ label: string; desc: string }>;
  };
  news: {
    sectionTitle: string;
    sectionSubtitle: string;
    journal: string;
    latestLabel: string;
    readMore: string;
    backToNews: string;
    readAlso: string;
    minuteRead: string;
    allArticles: string;
  };
  categoryLabels: Record<string, string>;
  contact: {
    sectionTitle: string;
    writeUs: string;
    heading: string;
    subtext: string;
    formTitle: string;
    labelName: string;
    labelEmail: string;
    labelSubject: string;
    labelMessage: string;
    placeholderName: string;
    placeholderSubject: string;
    placeholderMessage: string;
    submit: string;
    sent: string;
    thanks: string;
    socials: string;
    stats: Array<{ suffix: string; label: string }>;
  };
  footer: {
    tagline: string;
    rights: string;
    association: string;
    programs: string;
    follow: string;
    project: string;
    programList: string[];
  };
  articleList: ArticleTranslation[];
  breadcrumb: {
    home: string;
    news: string;
  };
}

export const translations: Record<Language, Translations> = {
  FR: {
    nav: {
      news: "Actualités",
      about: "À propos",
      contact: "Contact",
      langLabel: "Langue",
    },
    hero: {
      heading: "Créer. Apprendre. Grandir.",
      subheading: "Une association qui accompagne les jeunes à travers la création, la vie ensemble et le développement personnel.",
      cta: "Découvrir notre mission",
      scrollHint: "Défiler pour explorer",
    },
    about: {
      sectionTitle: "À propos",
      missionLabel: "Notre mission",
      body1: "D.O.G est une association qui accompagne les jeunes à travers des projets créatifs, éducatifs et structurants. Un cadre bienveillant, mais ambitieux.",
      body2: "Designers of God n'est pas un nom de marque choisi pour son impact marketing. C'est une conviction — que chaque jeune porte en lui quelque chose à créer, à exprimer, à offrir. L'association est née d'un constat simple : trop de jeunes talentueux n'ont pas accès aux espaces qui leur permettraient de développer leur créativité. D.O.G se construit pour être cet espace.",
      cta: "Rejoindre le mouvement",
      imgAlt: "Membre D.O.G portant le sweat Designers of God",
      pillars: [
        { label: "Créer",    desc: "Série, photo, design, podcasts — l'expression sous toutes ses formes." },
        { label: "Apprendre", desc: "Des ateliers animés par des professionnels qui transmettent autant qu'ils enseignent." },
        { label: "Grandir",  desc: "Développement personnel, vie ensemble et événements qui structurent et inspirent." },
      ],
    },
    news: {
      sectionTitle: "Actualités",
      sectionSubtitle: "Collabs, ateliers, collections et tout ce qui fait vivre D.O.G sur le terrain",
      journal: "Journal",
      latestLabel: "Nos dernières publications",
      readMore: "Lire l'article",
      backToNews: "Retour aux actualités",
      readAlso: "Lire aussi",
      minuteRead: "min de lecture",
      allArticles: "Tous les articles",
    },
    categoryLabels: {
      Collab: "Collab",
      Collection: "Collection",
      Atelier: "Atelier",
      Mission: "Mission",
      Culture: "Culture",
      Sport: "Sport",
      Recrutement: "Recrutement",
    },
    contact: {
      sectionTitle: "Contact",
      writeUs: "Écris-nous",
      heading: "Parlons ensemble",
      subtext: "Une question, une envie de rejoindre un atelier, un projet à partager ? On est là. Tous les messages sont lus.",
      formTitle: "Envoyer un message",
      labelName: "Nom complet",
      labelEmail: "Adresse email",
      labelSubject: "Sujet",
      labelMessage: "Message",
      placeholderName: "Votre nom",
      placeholderSubject: "Atelier, collab, question...",
      placeholderMessage: "Votre message...",
      submit: "Envoyer",
      sent: "Message envoyé ✓",
      thanks: "Merci ! Réponse sous 48h.",
      socials: "Réseaux sociaux",
      stats: [
        { suffix: "",    label: "Jeunes/an" },
        { suffix: "",     label: "Domaines créatifs" },
        { suffix: " ans", label: "D'expérience" },
      ],
    },
    footer: {
      tagline: "Designers of God — Un espace pour créer, apprendre et grandir.",
      rights: "Tous droits réservés.",
      association: "L'association",
      programs: "Nos programmes",
      follow: "Suivre D.O.G",
      project: "",
      programList: [
        "Série originale",
        "Ateliers photo",
        "Design & Brand",
        "Podcasts",
        "Musique",
        "Développement personnel",
        "Vie ensemble",
      ],
    },
    articleList: [
      {
        title: "KRM.STUDIOS × Designers of God : la collab officielle",
        excerpt: "On officialise. KRM.STUDIOS et D.O.G unissent leurs univers pour lancer une collection exclusive porteuse de sens et de mission.",
        lead: "Quand deux projets partagent la même vision — créer des espaces où les jeunes peuvent s'exprimer, progresser et saisir des opportunités concrètes — la collaboration devient une évidence.",
        body: [
          "KRM.STUDIOS × DESIGNERS OF GOD, c'est plus qu'une collection. C'est la rencontre de deux structures engagées autour d'une conviction commune : la créativité est un levier de transformation, et les jeunes méritent des espaces pour l'exercer.",
          "D.O.G accompagne les jeunes à travers des projets créatifs, éducatifs et structurants : série originale, ateliers photo, design & brand, podcasts, connaissance de soi, vie ensemble. Autant d'espaces où l'on apprend à se connaître, à créer, à oser.",
          "KRM.STUDIOS apporte son expertise visuelle, son esthétique et sa capacité à raconter des histoires à travers l'image. Ensemble, ils construisent une collection qui raconte quelque chose de vrai — pas un produit de saison, mais un objet chargé d'intention.",
          "La collection sera disponible prochainement. Chaque vêtement vendu contribue directement à financer les projets D.O.G sur le terrain. Porter D.O.G, c'est soutenir un mouvement. C'est dire que ce que font ces jeunes compte.",
          "Plus qu'un projet, c'est un mouvement. Un espace pour créer, apprendre, s'inspirer et grandir ensemble.",
        ],
      },
      {
        title: "La Collection D.O.G : un vêtement pour une mission",
        excerpt: "Oversized, black, intentional. La première collection D.O.G n'est pas là pour décorer — elle est là pour financer une mission qui se construit chaque jour sur le terrain.",
        lead: "Un tee-shirt noir. Un script rose. Quatre lettres qui ne ressemblent pas à un logo — parce que D.O.G n'est pas une marque. C'est une promesse.",
        body: [
          "La silhouette est simple : coupe oversize, coton lourd, broderies nettes. Le dos porte le nom complet en script — Designers of God — comme une affirmation calme. Une présence qui n'a pas besoin de crier pour exister.",
          "Mais derrière l'objet, il y a une intention claire. Chaque pièce vendue contribue directement aux programmes D.O.G : les ateliers photo, la série originale, les sessions de développement personnel. Le vêtement est le support financier d'un espace réel, pour des gens réels.",
          "On aurait pu faire quelque chose de plus commercial. Plus facile à vendre. On a choisi de faire quelque chose d'honnête — des pièces qui durent, pensées pour ceux qui comprennent ce qu'elles représentent.",
          "La collection inclut le tee-shirt signature, le hoodie D.O.G, et le pantalon D.O.G — chaque pièce disponible en quantité limitée. Pas de restocks. Quand c'est parti, c'est parti.",
        ],
      },
      {
        title: "Ateliers Photo : l'image comme outil de création",
        excerpt: "Dans les ateliers photo D.O.G, on apprend à regarder avant d'appuyer. On apprend à raconter. À voir ce que les autres ne voient pas encore.",
        lead: "La photographie, chez D.O.G, n'est pas enseignée comme une technique. Elle est transmise comme une façon d'être présent — dans une rue, dans une lumière, dans un moment qui ne reviendra pas.",
        body: [
          "Les ateliers se déroulent en petit groupe, avec des photographes professionnels qui partagent leur regard autant que leur savoir-faire. On commence par observer — les compositions que la ville offre, les portraits que les gens portent malgré eux, la lumière comme narrateur.",
          "Ensuite on pratique. Avec des appareils argentiques ou numériques, selon le projet. On rate beaucoup. On regarde ses ratés. On comprend pourquoi ils sont ratés. Et parfois, on tombe sur quelque chose de juste — une image qui dit exactement ce qu'on voulait dire, sans même qu'on l'ait planifié.",
          "Les participants repartent avec plus qu'une compétence technique. Ils repartent avec un regard. Et un regard, ça change la façon dont on traverse le monde.",
          "Les prochains ateliers photo ouvrent leurs inscriptions. Gratuit pour les participants. Financé par la collection D.O.G.",
        ],
      },
      {
        title: "Qui sommes-nous ? La mission D.O.G",
        excerpt: "D.O.G est une association qui accompagne les jeunes à travers des projets créatifs, éducatifs et structurants. Un cadre bienveillant, mais ambitieux.",
        lead: "Designers of God n'est pas un nom de marque choisi pour son impact marketing. C'est une conviction — que chaque jeune porte en lui quelque chose à créer, à exprimer, à offrir.",
        body: [
          "L'association est née d'un constat simple : trop de jeunes talentueux n'ont pas accès aux espaces et aux ressources qui leur permettraient de développer leurs créativité et leurs compétences. D.O.G se construit pour être cet espace.",
          "Les projets que D.O.G structure sont volontairement variés : une série originale produite par et avec les jeunes, des ateliers photo, des sessions de design & brand, un podcast où ils prennent la parole, et la vie ensemble — sorties, sport, événements. La diversité des formats reflète la diversité des jeunes qu'on accompagne.",
          "Libre dans la création, structuré dans l'accompagnement. Ce n'est pas un slogan — c'est la tension productive au cœur de ce qu'on fait. On ne bride pas l'expression. Mais on construit un cadre solide pour qu'elle puisse se déployer sérieusement.",
          "D.O.G est financé en partie par la collection de vêtements. Chaque achat est un acte de soutien direct aux programmes. Pas de subvention institutionnelle, pas d'intermédiaire. Le vêtement et la mission sont indissociables.",
        ],
      },
      {
        title: "Le sacré dans la rue : spiritualité et création",
        excerpt: "Pourquoi une cathédrale pour shooter une collection streetwear ? Parce que D.O.G n'a jamais séparé le sacré du quotidien. Ni la foi du geste créatif.",
        lead: "La lumière traverse les vitraux. Sur les bancs, en bas, quelqu'un porte un tee-shirt noir avec « God » brodé en rose. L'image ne cherche pas à choquer. Elle cherche à être vraie.",
        body: [
          "Le nom Designers of God est délibéré. Il pose une question plutôt qu'il n'y répond : qu'est-ce que ça signifie de créer ? De qui tenons-nous cette capacité ? Et que fait-on de ce don, dans les quartiers, dans les ateliers, dans les salles de sport ?",
          "Les shoots en cathédrale ne sont pas une esthétique empruntée. Ils sont une déclaration de cohérence. On habite ces espaces parce qu'on croit que ce qu'on fait — accompagner les jeunes, créer ensemble, nommer les choses — a une valeur qui dépasse le commercial.",
          "Le sacré n'est pas réservé aux lieux de culte. Il est dans la façon dont un jeune tient son premier appareil photo. Dans la fierté de voir son nom associé à quelque chose de bien fait. Dans la décision de continuer quand c'est difficile.",
          "C'est ça, Designers of God. Non pas une revendication religieuse. Une invitation à prendre son rôle de créateur au sérieux.",
        ],
      },
      {
        title: "Vie ensemble : le corps comme territoire",
        excerpt: "La vie ensemble chez D.O.G — sport, sorties, moments partagés — n'est pas là pour faire du sport. Elle est là pour apprendre à se dépasser, à collaborer, à tenir sous pression.",
        lead: "Il y a ce moment dans l'effort sportif — juste avant d'abandonner — où on découvre quelque chose sur soi. D.O.G construit des espaces pour que ce moment arrive, et pour qu'il ne soit pas vécu seul.",
        body: [
          "Le sport chez D.O.G est un prétexte. Un prétexte honnête, utile, concret — mais un prétexte quand même. Ce qui nous intéresse, c'est ce que le corps apprend quand il est mis sous pression collective : la gestion de l'échec, la confiance dans les autres, la discipline du soin quotidien.",
          "Les sessions sont encadrées par des éducateurs sportifs et des coachs de développement personnel. On ne sépare pas les deux. Un entraînement physique peut être suivi d'un cercle de parole. Une compétition peut déboucher sur un atelier de visualisation.",
          "Plusieurs disciplines sont pratiquées : basketball, arts martiaux, course à pied. Les participants choisissent leur entrée, mais ils partagent le même cadre — respectueux, exigeant, bienveillant.",
          "Le corps, chez D.O.G, est un territoire de travail sur soi. Pas un objet de performance. Un endroit où on revient chaque semaine pour être, ensemble, légèrement meilleurs que la semaine d'avant.",
        ],
      },
      {
        title: "Nous recherchons un graphiste bénévole",
        excerpt: "D.O.G cherche un·e graphiste passionné·e pour harmoniser les documents de l'association. Un projet créatif jeunesse basé à Lausanne, avec une vraie mission derrière.",
        lead: "Pour harmoniser les documents de l'association D.O.G et donner une cohérence visuelle à tous nos supports, nous recherchons un·e graphiste bénévole prêt·e à s'investir dans un projet qui a du sens.",
        body: [
          "Un design cohérent, c'est un message qui se lit clairement. Chez D.O.G, on croit que la forme sert le fond — et qu'une association qui accompagne de jeunes créatifs mérite des documents à la hauteur de son ambition.",
          "La mission : retravailler et harmoniser nos documents internes et externes — présentations, rapports, affiches, supports de communication. Un travail de fond qui aura un impact direct sur la façon dont D.O.G est perçu et dont il se raconte.",
          "Pas de budget, mais une vraie reconnaissance : ton nom associé au projet, une lettre de recommandation, et la satisfaction de contribuer à quelque chose de concret pour les jeunes de Lausanne.",
          "Tu es graphiste, designer, étudiant·e en design ? DM @designersog sur Instagram ou écris-nous à info@designersog.ch. On attend ton message.",
        ],
      },
    ],
    breadcrumb: {
      home: "Accueil",
      news: "Actualités",
    },
  },

  EN: {
    nav: {
      news: "News",
      about: "About",
      contact: "Contact",
      langLabel: "Language",
    },
    hero: {
      heading: "Create. Learn. Grow.",
      subheading: "An association that supports young people through creativity, life together and personal development.",
      cta: "Discover our mission",
      scrollHint: "Scroll to explore",
    },
    about: {
      sectionTitle: "About",
      missionLabel: "Our mission",
      body1: "D.O.G is an association that supports young people through creative, educational and structural projects. A supportive framework, but an ambitious one.",
      body2: "Designers of God is not a brand name chosen for its marketing impact. It's a conviction — that every young person carries within them something to create, to express, to offer. The association was born from a simple observation: too many talented young people don't have access to the spaces that would allow them to develop their creativity. D.O.G is built to be that space.",
      cta: "Join the movement",
      imgAlt: "D.O.G member wearing the Designers of God sweatshirt",
      pillars: [
        { label: "Create",  desc: "Series, photography, design, podcasts — expression in all its forms." },
        { label: "Learn",   desc: "Workshops led by professionals who transmit as much as they teach." },
        { label: "Grow",    desc: "Personal development, life together and events that structure and inspire." },
      ],
    },
    news: {
      sectionTitle: "Latest News",
      sectionSubtitle: "Collabs, workshops, collections and everything that drives D.O.G on the ground",
      journal: "Journal",
      latestLabel: "Our latest publications",
      readMore: "Read article",
      backToNews: "Back to news",
      readAlso: "Read also",
      minuteRead: "min read",
      allArticles: "All articles",
    },
    categoryLabels: {
      Collab: "Collab",
      Collection: "Collection",
      Atelier: "Workshop",
      Mission: "Mission",
      Culture: "Culture",
      Sport: "Sport",
      Recrutement: "Recruitment",
    },
    contact: {
      sectionTitle: "Contact",
      writeUs: "Write to us",
      heading: "Let's talk",
      subtext: "A question, a desire to join a workshop, a project to share? We're here. All messages are read.",
      formTitle: "Send a message",
      labelName: "Full name",
      labelEmail: "Email address",
      labelSubject: "Subject",
      labelMessage: "Message",
      placeholderName: "Your name",
      placeholderSubject: "Workshop, collab, question...",
      placeholderMessage: "Your message...",
      submit: "Send",
      sent: "Message sent ✓",
      thanks: "Thank you! Response within 48h.",
      socials: "Social media",
      stats: [
        { suffix: "",       label: "Young people/year" },
        { suffix: "",        label: "Creative fields" },
        { suffix: " years",  label: "Of experience" },
      ],
    },
    footer: {
      tagline: "Designers of God — A space to create, learn and grow.",
      rights: "All rights reserved.",
      association: "The association",
      programs: "Our programs",
      follow: "Follow D.O.G",
      project: "",
      programList: [
        "Original series",
        "Photo workshops",
        "Design & Brand",
        "Podcasts",
        "Music",
        "Personal development",
        "Life together",
      ],
    },
    articleList: [
      {
        title: "KRM.STUDIOS × Designers of God: the official collab",
        excerpt: "We're making it official. KRM.STUDIOS and D.O.G are joining forces to launch an exclusive collection built on meaning and mission.",
        lead: "When two projects share the same vision — creating spaces where young people can express themselves, grow and seize real opportunities — collaboration becomes inevitable.",
        body: [
          "KRM.STUDIOS × DESIGNERS OF GOD is more than a collection. It's the meeting of two committed organizations around a shared conviction: creativity is a lever for transformation, and young people deserve spaces to practice it.",
          "D.O.G supports young people through creative, educational and structural projects: an original series, photography workshops, design & branding, podcasts, self-knowledge sessions, and life together.",
          "KRM.STUDIOS brings its visual expertise, aesthetic and capacity to tell stories through images. Together, they're building a collection that says something real — not a seasonal product, but an object loaded with intention.",
          "The collection will be available soon. Every garment sold directly contributes to funding D.O.G programs on the ground. Wearing D.O.G means supporting a movement.",
          "More than a project, this is a movement. A space to create, learn, get inspired and grow together.",
        ],
      },
      {
        title: "The D.O.G Collection: a garment for a mission",
        excerpt: "Oversized, black, intentional. The first D.O.G collection isn't here to look good — it's here to fund a mission built every day on the ground.",
        lead: "A black tee. A pink script. Four letters that don't look like a logo — because D.O.G is not a brand. It's a promise.",
        body: [
          "The silhouette is simple: oversized fit, heavy cotton, clean embroidery. The back carries the full name in script — Designers of God — like a quiet statement. A presence that doesn't need to shout to exist.",
          "But behind the object, there's a clear intention. Each piece sold directly contributes to D.O.G programs: photography workshops, the original series, personal development sessions. The garment is the financial support for a real space, for real people.",
          "We could have made something more commercial. Easier to sell. We chose to make something honest — pieces that last, designed for those who understand what they represent.",
          "The collection includes the signature tee, the D.O.G hoodie, and the D.O.G pants — each piece available in limited quantities. No restocks. When it's gone, it's gone.",
        ],
      },
      {
        title: "Photo Workshops: the image as a creative tool",
        excerpt: "In D.O.G photography workshops, we learn to look before pressing the shutter. We learn to tell stories. To see what others haven't yet noticed.",
        lead: "Photography at D.O.G isn't taught as a technique. It's transmitted as a way of being present — in a street, in a light, in a moment that won't return.",
        body: [
          "Workshops run in small groups, with professional photographers who share their eye as much as their skills. We start by observing — the compositions the city offers, the portraits people carry without knowing, light as narrator.",
          "Then we practice. With film or digital cameras, depending on the project. We miss a lot. We look at our misses. We understand why they're misses. And sometimes, we land on something right — an image that says exactly what we wanted to say, without having planned it.",
          "Participants leave with more than technical skill. They leave with a way of looking. And a way of looking changes how you move through the world.",
          "The next photography workshops are open for registration. Free for participants. Funded by the D.O.G collection.",
        ],
      },
      {
        title: "Who are we? The D.O.G mission",
        excerpt: "D.O.G is an association that supports young people through creative, educational and structural projects. A supportive framework, but an ambitious one.",
        lead: "Designers of God is not a brand name chosen for its marketing impact. It's a conviction — that every young person carries within them something to create, to express, to offer.",
        body: [
          "The association was born from a simple observation: too many talented young people don't have access to the spaces and resources that would allow them to develop their creativity and skills. D.O.G is built to be that space.",
          "The projects D.O.G structures are deliberately varied: an original series produced by and with young people, photography workshops, design & brand sessions, a podcast where they have a voice, and life together — outings, sport, shared moments.",
          "Free in creation, structured in support. That's not a slogan — it's the productive tension at the heart of what we do. We don't restrict expression. But we build a solid framework so it can unfold seriously.",
          "D.O.G is partly funded by the clothing collection. Every purchase is a direct act of support for the programs. No institutional funding, no intermediary. The garment and the mission are inseparable.",
        ],
      },
      {
        title: "The Sacred in the Street: spirituality and creation",
        excerpt: "Why a cathedral for a streetwear collection shoot? Because D.O.G has never separated the sacred from the everyday. Or faith from the creative act.",
        lead: "Light passes through the stained glass. On the pews below, someone wears a black tee with 'God' embroidered in pink. The image isn't trying to provoke. It's trying to be true.",
        body: [
          "The name Designers of God is deliberate. It asks a question rather than answering one: what does it mean to create? Where does this capacity come from? And what do we do with this gift, in neighborhoods, in workshops, in gyms?",
          "The cathedral shoots aren't borrowed aesthetics. They're a declaration of coherence. We inhabit these spaces because we believe that what we do — supporting young people, creating together, naming things — has a value that goes beyond the commercial.",
          "The sacred isn't reserved for places of worship. It's in the way a young person holds their first camera. In the pride of seeing your name associated with something well made. In the decision to keep going when it's hard.",
          "That's Designers of God. Not a religious claim. An invitation to take your role as a creator seriously.",
        ],
      },
      {
        title: "Life together: the body as territory",
        excerpt: "Life together at D.O.G — sport, outings, shared moments — isn't there for sport's sake. It's there to learn to push limits, collaborate, and hold steady under pressure.",
        lead: "There's that moment in physical effort — just before giving up — where you discover something about yourself. D.O.G builds spaces for that moment to arrive, and so it isn't faced alone.",
        body: [
          "Sport at D.O.G is a pretext. An honest, useful, concrete pretext — but a pretext nonetheless. What interests us is what the body learns when placed under collective pressure: managing failure, trusting others, the discipline of daily care.",
          "Sessions are led by sports educators and personal development coaches. We don't separate the two. A physical training session can be followed by a talking circle. A competition can lead into a visualization workshop.",
          "Several disciplines are practiced: basketball, martial arts, running. Participants choose their entry point, but share the same framework — respectful, demanding, caring.",
          "The body, at D.O.G, is a territory for working on oneself. Not an object of performance. A place you return to each week to be, together, slightly better than the week before.",
        ],
      },
      {
        title: "We're looking for a volunteer graphic designer",
        excerpt: "D.O.G is looking for a passionate graphic designer to harmonize the association's documents. A youth creative project based in Lausanne, with a real mission behind it.",
        lead: "To give visual coherence to all of D.O.G's documents and materials, we're looking for a volunteer graphic designer ready to invest in a meaningful project.",
        body: [
          "A consistent design means a message that reads clearly. At D.O.G, we believe form serves substance — and that an association supporting young creatives deserves documents that match its ambition.",
          "The mission: rework and harmonize our internal and external documents — presentations, reports, posters, communication materials. Foundational work that will directly impact how D.O.G is perceived and how it tells its story.",
          "No budget, but real recognition: your name associated with the project, a letter of recommendation, and the satisfaction of contributing something concrete for the young people of Lausanne.",
          "Are you a graphic designer, designer, or design student? DM @designersog on Instagram or write to us at info@designersog.ch. We look forward to hearing from you.",
        ],
      },
    ],
    breadcrumb: {
      home: "Home",
      news: "News",
    },
  },

  DE: {
    nav: {
      news: "Nachrichten",
      about: "Über uns",
      contact: "Kontakt",
      langLabel: "Sprache",
    },
    hero: {
      heading: "Erschaffen. Lernen. Wachsen.",
      subheading: "Ein Verein, der junge Menschen durch Kreativität, gemeinsames Leben und persönliche Entwicklung begleitet.",
      cta: "Unsere Mission entdecken",
      scrollHint: "Scrollen zum Erkunden",
    },
    about: {
      sectionTitle: "Über uns",
      missionLabel: "Unsere Mission",
      body1: "D.O.G ist ein Verein, der Jugendliche durch kreative, bildende und strukturierende Projekte begleitet. Ein unterstützender Rahmen, aber ein ehrgeiziger.",
      body2: "Designers of God ist kein Markenname, der für seinen Marketingeffekt gewählt wurde. Es ist eine Überzeugung — dass jeder junge Mensch etwas in sich trägt, das erschaffen, ausgedrückt und angeboten werden will. Der Verein entstand aus einer einfachen Beobachtung: Zu viele talentierte Jugendliche haben keinen Zugang zu den Räumen, die ihre Kreativität entfalten könnten. D.O.G ist gebaut, um dieser Raum zu sein.",
      cta: "Der Bewegung beitreten",
      imgAlt: "D.O.G-Mitglied mit dem Designers of God Sweatshirt",
      pillars: [
        { label: "Erschaffen", desc: "Serie, Fotografie, Design, Podcasts — Ausdruck in allen seinen Formen." },
        { label: "Lernen",     desc: "Workshops mit Fachleuten, die ebenso viel vermitteln wie sie lehren." },
        { label: "Wachsen",    desc: "Persönliche Entwicklung, gemeinsames Leben und Events, die strukturieren und inspirieren." },
      ],
    },
    news: {
      sectionTitle: "Aktuelle Nachrichten",
      sectionSubtitle: "Kollabs, Workshops, Kollektionen und alles, was D.O.G antreibt",
      journal: "Journal",
      latestLabel: "Unsere neuesten Beiträge",
      readMore: "Artikel lesen",
      backToNews: "Zurück zu den Nachrichten",
      readAlso: "Lesen Sie auch",
      minuteRead: "Min Lesezeit",
      allArticles: "Alle Artikel",
    },
    categoryLabels: {
      Collab: "Kollaboration",
      Collection: "Kollektion",
      Atelier: "Workshop",
      Mission: "Mission",
      Culture: "Kultur",
      Sport: "Sport",
      Recrutement: "Rekrutierung",
    },
    contact: {
      sectionTitle: "Kontakt",
      writeUs: "Schreib uns",
      heading: "Lass uns reden",
      subtext: "Eine Frage, ein Wunsch, einem Workshop beizutreten, ein Projekt zu teilen? Wir sind da. Alle Nachrichten werden gelesen.",
      formTitle: "Eine Nachricht senden",
      labelName: "Vollständiger Name",
      labelEmail: "E-Mail-Adresse",
      labelSubject: "Betreff",
      labelMessage: "Nachricht",
      placeholderName: "Dein Name",
      placeholderSubject: "Workshop, Kollaboration, Frage...",
      placeholderMessage: "Deine Nachricht...",
      submit: "Senden",
      sent: "Nachricht gesendet ✓",
      thanks: "Danke! Antwort innerhalb von 48h.",
      socials: "Soziale Medien",
      stats: [
        { suffix: "",       label: "Jugendliche/Jahr" },
        { suffix: "",        label: "Kreative Bereiche" },
        { suffix: " Jahre",  label: "Erfahrung" },
      ],
    },
    footer: {
      tagline: "Designers of God — Ein Raum zum Erschaffen, Lernen und Wachsen.",
      rights: "Alle Rechte vorbehalten.",
      association: "Der Verein",
      programs: "Unsere Programme",
      follow: "D.O.G folgen",
      project: "",
      programList: [
        "Originalserie",
        "Fotoworkshops",
        "Design & Brand",
        "Podcasts",
        "Musik",
        "Persönliche Entwicklung",
        "Leben zusammen",
      ],
    },
    articleList: [
      {
        title: "KRM.STUDIOS × Designers of God: die offizielle Kollaboration",
        excerpt: "Es ist offiziell. KRM.STUDIOS und D.O.G bündeln ihre Kräfte für eine exklusive Kollektion voller Bedeutung und Mission.",
        lead: "Wenn zwei Projekte dieselbe Vision teilen — Räume zu schaffen, in denen Jugendliche sich ausdrücken, wachsen und echte Chancen ergreifen können — wird Zusammenarbeit unvermeidlich.",
        body: [
          "KRM.STUDIOS × DESIGNERS OF GOD ist mehr als eine Kollektion. Es ist die Begegnung zweier engagierter Strukturen um eine gemeinsame Überzeugung: Kreativität ist ein Hebel für Veränderung.",
          "D.O.G begleitet Jugendliche durch kreative, bildende und strukturierende Projekte: eine Originalserie, Fotoworkshops, Design & Branding, Podcasts, Selbsterkenntnis und das Leben zusammen.",
          "Die Kollektion wird bald erhältlich sein. Jedes verkaufte Kleidungsstück trägt direkt zur Finanzierung der D.O.G-Programme bei. D.O.G zu tragen bedeutet, eine Bewegung zu unterstützen.",
        ],
      },
      {
        title: "Die D.O.G Kollektion: ein Kleidungsstück für eine Mission",
        excerpt: "Oversized, schwarz, bewusst. Die erste D.O.G Kollektion ist nicht da, um auszusehen — sie ist da, um eine Mission zu finanzieren.",
        lead: "Ein schwarzes T-Shirt. Ein rosafarbenes Skript. Vier Buchstaben, die nicht wie ein Logo aussehen — weil D.O.G keine Marke ist. Es ist ein Versprechen.",
        body: [
          "Die Silhouette ist einfach: Oversized-Schnitt, schwerer Baumwollstoff, saubere Stickerei. Der Rücken trägt den vollen Namen im Skript — Designers of God — wie eine ruhige Aussage.",
          "Jedes verkaufte Stück trägt direkt zu den D.O.G-Programmen bei: Fotoworkshops, Originalserie, persönliche Entwicklung.",
        ],
      },
      {
        title: "Fotoworkshops: das Bild als kreatives Werkzeug",
        excerpt: "In den D.O.G Fotoworkshops lernt man, hinzusehen, bevor man auf den Auslöser drückt. Geschichten erzählen. Sehen, was andere noch nicht sehen.",
        lead: "Fotografie wird bei D.O.G nicht als Technik gelehrt. Sie wird als eine Art vermittelt, präsent zu sein — in einer Straße, in einem Licht, in einem Moment, der nicht zurückkommt.",
        body: [
          "Die Workshops finden in kleinen Gruppen mit professionellen Fotografen statt, die ihr Auge ebenso teilen wie ihr Handwerk.",
          "Die nächsten Fotoworkshops nehmen Anmeldungen entgegen. Kostenlos für die Teilnehmer. Finanziert durch die D.O.G Kollektion.",
        ],
      },
      {
        title: "Wer sind wir? Die D.O.G Mission",
        excerpt: "D.O.G ist ein Verein, der Jugendliche durch kreative, bildende und strukturierende Projekte begleitet. Ein unterstützender Rahmen, aber ein ehrgeiziger.",
        lead: "Designers of God ist kein Markenname, der für seinen Marketingeffekt gewählt wurde. Es ist eine Überzeugung — dass jeder junge Mensch etwas in sich trägt, das erschaffen, ausgedrückt und angeboten werden will.",
        body: [
          "Der Verein entstand aus einer einfachen Beobachtung: Zu viele talentierte Jugendliche haben keinen Zugang zu den Räumen und Ressourcen, die ihre Kreativität entfalten könnten. D.O.G ist gebaut, um dieser Raum zu sein.",
          "Frei in der Schöpfung, strukturiert in der Begleitung. Das ist kein Slogan — es ist die produktive Spannung im Kern unserer Arbeit.",
        ],
      },
      {
        title: "Das Heilige in der Straße: Spiritualität und Kreation",
        excerpt: "Warum eine Kathedrale für einen Streetwear-Shoot? Weil D.O.G das Heilige nie vom Alltag getrennt hat.",
        lead: "Licht fällt durch Buntglasfenster. Auf den Kirchenbänken trägt jemand ein schwarzes T-Shirt mit 'God' in Rosa gestickt. Das Bild will nicht provozieren. Es will wahrhaftig sein.",
        body: [
          "Der Name Designers of God ist bewusst gewählt. Er stellt eine Frage, statt sie zu beantworten: Was bedeutet es zu erschaffen?",
          "Das Heilige ist nicht Gotteshäusern vorbehalten. Es steckt in der Art, wie ein Jugendlicher seine erste Kamera hält.",
        ],
      },
      {
        title: "Leben zusammen: der Körper als Territorium",
        excerpt: "Das Leben zusammen bei D.O.G — Sport, Ausflüge, gemeinsame Momente — ist nicht da, um Sport zu treiben, sondern um zu lernen, sich zu übertreffen und zusammenzuarbeiten.",
        lead: "Es gibt diesen Moment in der körperlichen Anstrengung — kurz bevor man aufgibt — in dem man etwas über sich selbst entdeckt. D.O.G baut Räume, damit dieser Moment entsteht.",
        body: [
          "Sport bei D.O.G ist ein Vorwand. Was uns interessiert, ist, was der Körper lernt, wenn er unter kollektivem Druck steht.",
          "Der Körper ist bei D.O.G ein Territorium der Selbstarbeit. Ein Ort, zu dem man jede Woche zurückkehrt, um gemeinsam besser zu sein.",
        ],
      },
      {
        title: "Wir suchen einen ehrenamtlichen Grafikdesigner",
        excerpt: "D.O.G sucht einen leidenschaftlichen Grafikdesigner, um die Dokumente des Vereins zu harmonisieren. Ein kreatives Jugendprojekt in Lausanne mit echter Mission.",
        lead: "Um allen Dokumenten und Materialien von D.O.G eine visuelle Kohärenz zu geben, suchen wir einen ehrenamtlichen Grafikdesigner, der bereit ist, sich in ein sinnvolles Projekt einzubringen.",
        body: [
          "Ein konsistentes Design bedeutet eine klare Botschaft. Bei D.O.G glauben wir, dass Form dem Inhalt dient — und dass ein Verein, der junge Kreative begleitet, Dokumente verdient, die seinem Ehrgeiz entsprechen.",
          "Die Mission: unsere internen und externen Dokumente überarbeiten und harmonisieren — Präsentationen, Berichte, Plakate, Kommunikationsmaterialien.",
          "Kein Budget, aber echte Anerkennung: dein Name mit dem Projekt verbunden, ein Empfehlungsschreiben und die Genugtuung, etwas Konkretes für die Jugendlichen in Lausanne beizutragen.",
          "Bist du Grafikdesigner, Designer oder Designstudent? DM @designersog auf Instagram oder schreib uns an info@designersog.ch.",
        ],
      },
    ],
    breadcrumb: {
      home: "Startseite",
      news: "Nachrichten",
    },
  },
};

// ── Article metadata (images = real D.O.G brand photos) ──
import imgTeeBack from "figma:asset/3c1769b7024c60b4d9360ef65cc5b63344077c68.png";
import imgHoodie from "figma:asset/d975ed4fb5361da1f952203d60ccce82358fccaa.png";
import imgPants from "figma:asset/7653d637267c63aea368a5ff73747d57ee04962a.png";
import imgCathedralIn from "figma:asset/e074c212eb4dd31491604e56c86f5a9e8f00b21b.png";
import imgCathedralEx from "figma:asset/6754f4e5701549a92251b66cd5428cf6b10d5a81.png";
import imgStainedGlass from "figma:asset/870eafa488d4074a3656986d052bee639fb8916e.png";
import imgGraphiste from "figma:asset/0a5be20abb9db07cc7fa00f16ea509b6747ed687.png";
// New high-res D.O.G photos
import imgSittingHoodie from "figma:asset/e5845344bde9b95151dd93fbbc9233123a4da962.png";
import imgChurchStanding from "figma:asset/c2e99a3b167853eabd44f7f978016f6912484e62.png";
import imgPewSitting from "figma:asset/a4f70538075c6ad701733ee61df54a136dbc437f.png";
import imgProfileHoodie from "figma:asset/4d2c22f17d7224b734eb0d0ba7ae4d860dca7602.png";
import imgGroupDOG from "figma:asset/4570d0f400aaf8e8da8e05e25b3f4df1982fe3a6.png";

export const articleImages = {
  teeBack: imgTeeBack,
  hoodie: imgHoodie,
  pants: imgPants,
  cathedralIn: imgCathedralIn,
  cathedralEx: imgCathedralEx,
  stainedGlass: imgStainedGlass,
  graphiste: imgGraphiste,
  sittingHoodie: imgSittingHoodie,
  churchStanding: imgChurchStanding,
  pewSitting: imgPewSitting,
  profileHoodie: imgProfileHoodie,
  groupDOG: imgGroupDOG,
};

export const articleData = [
  {
    id: "1",
    category: "Collab" as ArticleCategory,
    date: "03.03.2026",
    readingTime: 4,
    image: imgChurchStanding,
    imageHero: imgChurchStanding,
    objectPosition: "center 30%",
    objectPositionHero: "center 35%",
  },
  {
    id: "2",
    category: "Collection" as ArticleCategory,
    date: "25.02.2026",
    readingTime: 3,
    image: imgTeeBack,
    imageHero: imgTeeBack,
    objectPosition: "center 22%",
    objectPositionHero: "center 30%",
  },
  {
    id: "3",
    category: "Atelier" as ArticleCategory,
    date: "14.02.2026",
    readingTime: 3,
    image: imgSittingHoodie,
    imageHero: imgSittingHoodie,
    objectPosition: "center 30%",
    objectPositionHero: "center 35%",
  },
  {
    id: "4",
    category: "Mission" as ArticleCategory,
    date: "07.02.2026",
    readingTime: 4,
    image: imgGroupDOG,
    imageHero: imgGroupDOG,
    objectPosition: "center 30%",
    objectPositionHero: "center 35%",
  },
  {
    id: "5",
    category: "Culture" as ArticleCategory,
    date: "22.01.2026",
    readingTime: 4,
    image: imgStainedGlass,
    imageHero: imgStainedGlass,
    objectPosition: "center 20%",
    objectPositionHero: "center 32%",
  },
  {
    id: "6",
    category: "Sport" as ArticleCategory,
    date: "10.01.2026",
    readingTime: 3,
    image: imgPants,
    imageHero: imgPants,
    objectPosition: "center 40%",
    objectPositionHero: "center 50%",
  },
  {
    id: "7",
    category: "Recrutement" as ArticleCategory,
    date: "15.03.2026",
    readingTime: 2,
    image: imgGraphiste,
    imageHero: imgGraphiste,
    objectPosition: "center 15%",
    objectPositionHero: "center 35%",
  },
];

export const categoryColor: Record<string, string> = {
  Collab: "#E84B8A",
  Collection: "#FFFFFF",
  Atelier: "#3BA9D9",
  Mission: "#E84B8A",
  Culture: "#3BA9D9",
  Sport: "#FFFFFF",
  Recrutement: "#E84B8A",
};