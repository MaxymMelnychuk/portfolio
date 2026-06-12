"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import TextReveal from "@/components/animations/TextReveal";
import SectionLabel from "@/components/ui/SectionLabel";
import ProjectCard from "@/components/ui/ProjectCard";
import { projects } from "@/data/projects";
import { SCROLL_ANIM } from "@/lib/animation";
import { useScrollAnimations } from "@/hooks/useScrollAnimations";

const DarkVeil = dynamic(() => import("@/components/animations/DarkVeil"), {
  ssr: false,
});

export default function ProjectsPage() {
  const mainRef = useRef<HTMLElement>(null);
  useScrollAnimations(mainRef);

  return (
    <main ref={mainRef} className="mx-auto min-h-screen">
      <div className="w-full h-screen fixed" aria-hidden="true">
        <DarkVeil />
      </div>

      <section
        aria-label="Projects"
        className="relative z-10 pt-40 pb-20 px-4 lg:px-12 xl:px-0"
      >
        <div className="max-w-7xl mx-auto flex-col xl:flex-row xl:flex items-center gap-16">
          <div className="space-y-3 lg:flex-1 flex-col flex mb-12 xl:mb-0 xl:sticky xl:top-32 self-start">
            <SectionLabel
              data-animate={SCROLL_ANIM.type}
              data-animate-duration={SCROLL_ANIM.duration}
            >
              Projects
            </SectionLabel>

            <TextReveal
              text="Interfaces, experiments, and tools I've been shipping."
              className="text-4xl md:text-5xl font-medium text-zinc-50 max-w-2xl"
            />

            <p
              data-animate={SCROLL_ANIM.type}
              data-animate-delay="0.1"
              data-animate-duration={SCROLL_ANIM.duration}
              className="text-sm text-neutral-400"
            >
              A selection of work that mixes minimal layouts, clear hierarchy,
              and product-focused thinking.
            </p>
          </div>

          <div
            data-animate-stagger={SCROLL_ANIM.type}
            data-animate-stagger-delay={SCROLL_ANIM.stagger}
            data-animate-duration={SCROLL_ANIM.duration}
            className="flex flex-col max-w-xl gap-5"
          >
            {projects.map((project) => (
              <div key={project.id} data-animate-child>
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
