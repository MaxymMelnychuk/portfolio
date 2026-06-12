import Image from "next/image";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import type { Project } from "@/data/projects";

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <a
      href={project.githubUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`View ${project.title} on GitHub`}
      className="group relative flex cursor-pointer flex-col gap-5 justify-between rounded-lg border border-neutral-800 backdrop-blur-xl p-4 sm:p-5 overflow-hidden transition-all duration-500 hover:border-neutral-500/80 hover:shadow-[0_0_40px_rgba(255,255,255,0.04)] hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
    >
      <span
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-linear-to-br from-white/3 via-transparent to-transparent"
        aria-hidden="true"
      />

      <div className="relative overflow-hidden rounded-md border border-neutral-800 transition-colors duration-500 group-hover:border-neutral-600/70">
        <Image
          src={project.image}
          alt={`${project.title} project preview`}
          width={640}
          height={400}
          loading="lazy"
          className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
        <span
          className="pointer-events-none absolute inset-0 bg-neutral-950/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          aria-hidden="true"
        />
      </div>

      <div className="relative flex flex-col justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-baseline gap-3">
              <span className="text-xs text-neutral-500">{project.id}</span>
              <h2 className="text-sm text-neutral-200 font-inter font-medium transition-colors duration-300 group-hover:text-white">
                {project.title}
              </h2>
            </div>
            <ArrowUpRightIcon
              className="w-4 h-4 shrink-0 text-neutral-500 transition-all duration-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </div>
          <p className="text-sm text-neutral-400 transition-colors duration-300 group-hover:text-neutral-300">
            {project.description}
          </p>
        </div>

        <ul className="flex flex-wrap gap-2 list-none text-[11px] text-neutral-300">
          {project.stack.map((item) => (
            <li
              key={item}
              className="rounded-full border border-neutral-700/80 px-2.5 py-1 transition-colors duration-300 group-hover:border-neutral-600/80"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </a>
  );
}
