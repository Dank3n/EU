/**
 * Datele centrale ale site-ului.
 */
export const site = {
  name: "Nica Daniel",
  role: "Web Developer",
  phone: "0759637583",
  phoneHref: "tel:+40759637583",
  phoneDisplay: "0759 637 583",
  email: "daletalefnun@gmail.com",
  website: "WEBSITE_URL_PLACEHOLDER",
  linkedin: "LINKEDIN_URL_PLACEHOLDER",
  github: "GITHUB_URL_PLACEHOLDER",

  slogan:
    "Construiesc interfețe clare, performante și ușor de folosit — de la idee până la produsul live.",
  about: [
    "Sunt Nica Daniel, web developer pasionat de experiențe digitale bine gândite. Lucrez la intersecția dintre design și inginerie: scriu cod curat, pun accent pe detaliu și livrez site-uri care se simt rapide pe orice dispozitiv.",
    "Îmi place să transform cerințe complexe în interfețe simple. De la landing pages până la aplicații web complete, mă concentrez pe structură, accesibilitate și o arhitectură ușor de întreținut.",
  ],

  matrix: {
    name: "N1C4 D4N13L",
    role: "root@web-dev",
    slogan: "Nu te speria... nu ți-am 'hack-uit' dispozitivul. Sunt Dan și doar am vrut să-ți arăt de ce sunt capabil ;)",
    sloganLines: [
      "Nu te speria...",
      "nu ți-am 'hack-uit' dispozitivul.",
      "Sunt Dan și doar am vrut să-ți arăt",
      "de ce sunt capabil ;)",
    ],
    title: "ROOT ACCESS — nica.daniel.exe",
    heading: "SYSTEM COMPROMISED",
    sub: "Modul secret a fost deblocat. Bine ai venit în Matrix.",
    offerTitle: "Pot să-ți fac website-ul gratis",
    offerBody: "Ai nevoie de un site? Ți-l construiesc fără cost. Scrie-mi și îl punem live.",
    aboutHeading: ["Nu e", "pentru toți."],
    about: [
      "Nu oricine ajunge aici. Ai fost curios, ai apăsat unde trebuia, și sistemul ți-a deschis ușa. Ești în camera pe care 99% o sar — și asta spune ceva despre tine.",
      "Eu sunt Dan. Fac site-uri care nu se uită după 3 secunde. Dacă ai găsit nivelul secret, deja avem ceva în comun: observi detaliile. Hai să construim ceva pe măsura ta.",
    ],
  },
} as const;

export const navLinks = [
  { href: "#despre", label: "Despre", matrixOnly: false },
  { href: "#abilitati", label: "Abilități", matrixOnly: false },
  { href: "#portofoliu", label: "Portofoliu", matrixOnly: true },
  { href: "#contact", label: "Contact", matrixOnly: false },
] as const;

export const skillGroups = [
  {
    title: "Frontend",
    items: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS"],
  },
  {
    title: "Backend",
    items: ["Node.js", "Express", "REST API", "SQL"],
  },
  {
    title: "Instrumente",
    items: ["Git", "GitHub", "Figma", "Vite", "VS Code"],
  },
] as const;

/** Proiecte reale — vizibile doar în modul Matrix. */
export const projects = [
  {
    number: "01",
    title: "Luvyer",
    type: "E-commerce",
    description:
      "Magazin de ceasuri mecanice automate: configurator, colecții și comandă online, cu livrare mondială.",
    tags: ["Website", "E-commerce"],
    href: "https://luvyer.com",
    host: "luvyer.com",
    image: "/projects/luvyer.jpg",
    video:
      "https://luvyer.com/cdn/shop/videos/c/vp/0e5dbda887fe4f6e814cb4f9e531d8cb/0e5dbda887fe4f6e814cb4f9e531d8cb.HD-720p-4.5Mbps-88333852.mp4?v=0",
    headerFade: 17,
  },
  {
    number: "02",
    title: "Mishi Bufet",
    type: "Restaurant",
    description:
      "Bufet asiatic și sushi train lângă Mega Mall: all you can eat, combo-uri și bandă live cu nigiri & maki.",
    tags: ["Website", "Restaurant"],
    href: "https://mishi-bufet-8qbx.vercel.app",
    host: "mishi-bufet-8qbx.vercel.app",
    image: "/projects/mishi.jpg",
  },
  {
    number: "03",
    title: "Jungle Bistro",
    type: "Restaurant",
    description:
      "Restaurant și brunch cu atmosferă de junglă în București: meniu, evenimente private și rezervări.",
    tags: ["Website", "Restaurant"],
    href: "https://junglebistro.ro",
    host: "junglebistro.ro",
    image: "/projects/jungle.jpg",
    video: "https://junglebistro.ro/videos/jungle-bistro.mp4?v=4",
    headerFade: 12,
  },
  {
    number: "04",
    title: "Restaurant Pekin",
    type: "Restaurant",
    description:
      "Tradiția gustului chinezesc în inima Bucureștiului, din 1992. Pasajul Macca-Vilacrosse.",
    tags: ["Website", "Restaurant"],
    href: "https://www.pekin.ro",
    host: "pekin.ro",
    image: "/projects/pekin.jpg",
    video: "/projects/pekin.mp4",
    headerFade: 13,
  },
  {
    number: "05",
    title: "Burger's Records",
    type: "Restaurant",
    description:
      "Burgeri artizanali și atmosferă de vinil: carne maturată, sosuri de casă și un spațiu cu rafturi de LP-uri.",
    tags: ["Website", "Restaurant"],
    href: "https://burgers-red.vercel.app",
    host: "burgers-red.vercel.app",
    image: "/projects/burgers.jpg",
  },
  {
    number: "06",
    title: "Cabinet de Cardiologie",
    type: "Medical",
    description:
      "Site de prezentare pentru cabinetul Dr. Elena Marinescu — cardiologie, programări și informații pentru pacienți.",
    tags: ["Website", "Medical"],
    href: "https://cardiologie-yq6b.vercel.app",
    host: "cardiologie-yq6b.vercel.app",
    image: "/projects/cardio.jpg",
  },
] as const;
