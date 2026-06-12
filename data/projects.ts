export type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  stack: string[];
  githubUrl: string;
  liveUrl: string;
};

export const projects: Project[] = [
  {
    id: "01",
    title: "Syrixa AI",
    description:
      "Your intelligent assistant for conversation, creation, and document insights.",
    image: "/project-syrix.png",
    stack: ["HTML/CSS", "Javascript", "Node.js", "LangChain", "RAG"],
    githubUrl: "https://github.com/MaxymMelnychuk/syrixa-ai",
    liveUrl: "#",
  },
  {
    id: "02",
    title: "Daily Wallet",
    description:
      "Track your money, manage your balance, and stay in control every day.",
    image: "/project-daily-walt.png",
    stack: [
      "Next.js",
      "TypeScript",
      "TailwindCSS",
      "MySQL",
      "Prisma",
      "Vitest",
      "Docker",
    ],
    githubUrl: "https://github.com/MaxymMelnychuk/daily-wallet",
    liveUrl: "#",
  },
  {
    id: "03",
    title: "Pixel Trader",
    description:
      "A trading-inspired UI exploring grids, typography, and micro-interactions in a pixel-perfect layout.",
    image: "/project-pixel-trade.png",
    stack: ["Node.js", "Express.js", "Javascript", "SCSS"],
    githubUrl: "https://github.com/MaxymMelnychuk/PixelTrader",
    liveUrl: "#",
  },
  {
    id: "04",
    title: "Pokebox",
    description:
      "A playful collection UI for exploring and organizing Pokémon, mixing nostalgia with a clean grid.",
    image: "/project-pokebo.png",
    stack: ["HTML/CSS", "Javascript", "PHP"],
    githubUrl: "https://github.com/MaxymMelnychuk/PokeboxV2",
    liveUrl: "#",
  },
  {
    id: "05",
    title: "Moi Mon Cerveau",
    description:
      "An educational interface around the human brain, designed to feel calm, clear, and intuitive.",
    image: "/project-moi-mon-cerveau.png",
    stack: ["HTML/CSS", "Javascript"],
    githubUrl: "https://github.com/MaxymMelnychuk/MoiMonCerveau",
    liveUrl: "#",
  },
  {
    id: "06",
    title: "Currency Converter",
    description:
      "A minimal converter interface built to feel lightweight, responsive, and easy to read at a glance.",
    image: "/project-currency-converte.png",
    stack: ["HTML/CSS", "Javascript"],
    githubUrl: "https://github.com/MaxymMelnychuk/Currency-Converter",
    liveUrl: "#",
  },
  {
    id: "07",
    title: "Parc Activities",
    description:
      "A concept for showcasing activities in a park with a focus on hierarchy, rhythm, and discoverability.",
    image: "/project-parc-activitis.png",
    stack: ["HTML/CSS", "PHP"],
    githubUrl: "https://github.com/MaxymMelnychuk/AOO-project",
    liveUrl: "#",
  },
];

export const featuredProjects = [
  projects.find((p) => p.title === "Syrixa AI")!,
  projects.find((p) => p.title === "Daily Wallet")!,
  projects.find((p) => p.title === "Pixel Trader")!,
];
