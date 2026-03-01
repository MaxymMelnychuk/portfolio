import Image from "next/image";
import Link from "next/link";

const projects = [
  {
    id: "01",
    title: "Moi Mon Cerveau",
    description:
      "An educational interface around the human brain, designed to feel calm, clear, and intuitive.",
    image: "/project-moi-mon-cerveau.png",
    stack: ["HTML/CSS", "Javascript"],
    githubUrl: "https://github.com/MaxymMelnychuk/MoiMonCerveau",
    liveUrl: "#",
  },
  {
    id: "02",
    title: "Pixel Trader",
    description:
      "A trading-inspired UI exploring grids, typography, and micro-interactions in a pixel-perfect layout.",
    image: "/project-pixel-trader.png",
    stack: ["Node.js", "Express.js", "Javascript", "SCSS"],
    githubUrl: "https://github.com/MaxymMelnychuk/PixelTrader",
    liveUrl: "#",
  },
  {
    id: "03",
    title: "Parc Activities",
    description:
      "A concept for showcasing activities in a park with a focus on hierarchy, rhythm, and discoverability.",
    image: "/project-parc-activities.png",
    stack: ["HTML/CSS", "PHP"],
    githubUrl: "https://github.com/MaxymMelnychuk/AOO-project",
    liveUrl: "#",
  },
  {
    id: "04",
    title: "Currency Converter",
    description:
      "A minimal converter interface built to feel lightweight, responsive, and easy to read at a glance.",
    image: "/project-currency-converter.png",
    stack: ["HTML/CSS", "Javascript"],
    githubUrl: "https://github.com/MaxymMelnychuk/Currency-Converter",
    liveUrl: "#",
  },
  {
    id: "05",
    title: "Pokebox",
    description:
      "A playful collection UI for exploring and organizing Pokémon, mixing nostalgia with a clean grid.",
    image: "/project-pokebox.png",
    stack: ["HTML/CSS", "Javascript", "PHP"],
    githubUrl: "https://github.com/MaxymMelnychuk/PokeboxV2",
    liveUrl: "#",
  },
];

export default function ProjectsPage() {
  return (
    <main className="max-w-6xl mx-auto min-h-screen">
      <section className="pt-40 pb-20 px-6 sm:px-10 lg:px-0">
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
              Projects
            </p>
            <h1 className="text-4xl md:text-5xl font-medium text-zinc-50">
              Interfaces, experiments, and tools I&apos;ve been shipping.
            </h1>
            <p className="text-sm text-neutral-400 max-w-xl">
              A selection of work that mixes minimal layouts, clear hierarchy,
              and product-focused thinking.
            </p>
          </div>
          <div className="space-y-5">
            {projects.map((project) => (
              <div
                key={project.id}
                className="group grid gap-6 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1.7fr)] rounded-lg border border-neutral-800 bg-neutral-950/70 p-4 sm:p-5 hover:border-neutral-500/90 transition-colors"
              >
                <div className="relative overflow-hidden rounded-md border border-neutral-800 bg-neutral-950">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={640}
                    height={400}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
                <div className="flex flex-col justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-baseline gap-3">
                      <p className="text-xs text-neutral-500">{project.id}</p>
                      <p className="text-sm text-neutral-200">
                        {project.title}
                      </p>
                    </div>
                    <p className="text-sm text-neutral-400">
                      {project.description}
                    </p>
                  </div>
                  <div className="flex justify-between gap-3 text-[11px] text-neutral-300">
                    <div className="flex flex-wrap gap-2">
                      {project.stack.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-neutral-700/80 px-2.5 py-1"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-4 text-xs text-neutral-400">
                      {project.githubUrl && (
                        <Link
                          href={project.githubUrl}
                          target="_blank"
                          className="underline underline-offset-4 decoration-neutral-600 hover:decoration-neutral-300"
                        >
                          GitHub
                        </Link>
                      )}
                      {project.liveUrl && project.liveUrl !== "#" && (
                        <Link
                          href={project.liveUrl}
                          target="_blank"
                          className="underline underline-offset-4 decoration-neutral-600 hover:decoration-neutral-300"
                        >
                          Live site
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
