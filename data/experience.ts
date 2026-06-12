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
    period: "Feb 2026 — Present",
    bullets: [
      "Led the end-to-end development of a corporate website using Next.js, React, TypeScript, Tailwind CSS, and Strapi — from UI/UX design to deployment — covering 10+ unique pages across 5 languages.",
      "Integrated an AI-powered conversational assistant and interactive production-site maps, enhancing the platform's user experience.",
      "Implemented a Strapi CMS for managing products and certifications, while developing recruitment features that enabled HR teams to centralize and review applications.",
      "Applied mobile-first development, accessibility standards, and performance optimization best practices within an agile greenfield project.",
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
