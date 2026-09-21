export type ExperienceItem = {
  role: string;
  company: string;
  period: string;
  bullets: string[];
};

export const experience: ExperienceItem[] = [
  {
    role: "Full-Stack Developer",
    company: "Groupe Lemoine",
    period: "May 2026 — Aug 2026",
    bullets: [
      "Developed a complete website using Next.js, TypeScript, and Tailwind CSS, including the full UI/UX design of all pages in Figma, from initial wireframes and mockups through to final implementation. Built a dedicated careers section with advanced search and filtering capabilities, as well as multilingual support in French and English.",
      "Implemented the back-end using Strapi (headless CMS), managed deployment, and optimized the website for performance, security, and accessibility. Set up Google Analytics and integrated a LinkedIn news feed using RSS.app.",
    ],
  },
  {
    role: "Front-End Developer",
    company: "Brain Research Foundation",
    period: "Oct 2025 — Jan 2026",
    bullets: [
      "Redesigned the organization's web interface by implementing an interactive 2D brain map highlighting key anatomical regions, increasing visitor engagement.",
      "Developed an educational memory game focused on brain functions, enhancing user interaction and session duration.",
    ],
  },
  {
    role: "President",
    company: "La 404 DeVinci",
    period: "2025 — 2026",
    bullets: [
      "Oversaw project development and ensured timely delivery according to set deadlines.",
      "Organized various events and activities for the association.",
    ],
  },
  {
    role: "Student",
    company: "IIM Digital School, Paris",
    period: "2024 — 2029",
    bullets: [
      "Working on web development projects, exploring interactive design, UX optimization, and AI-assisted workflows to build scalable and innovative digital experiences.",
    ],
  },
];
