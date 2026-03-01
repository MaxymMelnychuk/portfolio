import Image from "next/image";
import Card from "@/components/ui/Card";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";

export default function Home() {
  return (
    <div className="relative min-h-screen font-montserrat bg-neutral-950">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-screen w-full overflow-hidden">
        <Image
          src="/hero-arc.png"
          alt="Decor Hero"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-45 pointer-events-none  select-none"
        />
      </div>

      <main className="max-w-6xl mx-auto">
        <section
          id="projects"
          className="relative mx-auto h-full w-full flex flex-col items-center justify-center bg-[url('/hero-grid.png')] bg-no-repeat bg-size-[1200px] xl:bg-contain bg-top "
        >
          <div className="flex flex-col items-center gap-8 text-center  sm:text-left pt-52 relative ">
            <div className=" border border-neutral-600 rounded-sm bg-linear-to-b from-neutral-800 to-neutral-950 text-sm px-4 py-2">
              <p>Hi, i&apos;m Maxym Melnychuk 👋</p>
            </div>
            <h1 className=" text-5xl font-medium tracking-wide text-center  text-black dark:text-zinc-50">
              A developer who enjoys solving hard problems and building lasting
              systems.
            </h1>
            <p className="max-w-3xl text-sm text-center  text-zinc-600 dark:text-zinc-400">
              Driven by innovation, exploring the potential of AI, and turning
              ideas into scalable, high-impact products. I’m constantly
              learning, experimenting, and challenging myself to build solutions
              that solve real problems and create long-term value.
            </p>
          </div>
          <div className="my-38 w-full">
            <p className="text-xl text-neutral-400 italic text-right mb-4">
              Latest projects
            </p>

            <div className="flex gap-6 w-full">
              <Card title="Moi Mon Cerveau" image="/project-moi-mon-cerveau.png" />
              <Card title="Parc Activities" image="/project-parc-activities.png" />
              <Card title="Currency Converter" image="/project-currency-converter.png" />
            </div>
          </div>
        </section>
        <section className="py-40 px-6 sm:px-0 ">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-neutral-500 mb-8">
              <span>About</span>
            </div>
            <div className="h-px w-full bg-linear-to-r from-neutral-900 via-neutral-700/70 to-neutral-900 mb-10" />
            <div className="grid gap-12 md:grid-cols-[minmax(0,1.7fr)_minmax(0,1.1fr)]">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-medium text-zinc-50">
                  A developer who cares about clarity, pace, and long-term
                  quality.
                </h2>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  I&apos;m a second-year student at IIM Digital School in Paris,
                  focused on web development and digital products. I like
                  projects that force me to think about structure, not just
                  pixels — how components scale, how data flows, and how the
                  experience feels end-to-end.
                </p>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  Most of my time goes into building clean, maintainable
                  frontends, iterating quickly, and learning from each project
                  so the next one is sharper, faster, and more considered.
                </p>
              </div>
              <div className="space-y-8 text-sm text-zinc-400">
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-[0.18em] text-neutral-500">
                    Now
                  </p>
                  <p>
                    Exploring how AI, design systems, and good architecture can
                    work together to ship interfaces that feel simple on the
                    surface but are solid underneath.
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-[0.18em] text-neutral-500">
                    Outside of code
                  </p>
                  <p>
                    I recharge with video games, cars, and Japanese culture —
                    things that also influence how I think about motion, pacing,
                    and detail in the products I build.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="py-32 px-6 sm:px-10 lg:px-0 max-w-5xl mx-auto">
          <div className="max-w-6xl mx-auto flex flex-col gap-12 md:flex-row md:items-start">
            <div className="md:w-1/3 flex flex-col gap-3">
              <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
                Skills
              </p>
              <h2 className="text-3xl md:text-4xl font-medium text-zinc-50">
                Clean and maintainable code built for scalability
              </h2>
              <p className="text-sm text-zinc-400">
                Focused on creating reliable, maintainable, and thoughtful
                solutions with clarity and purpose in every layer, carefully
                balancing scalability, performance, and long-term impact to
                ensure that each system, component, and interaction works
                seamlessly together.
              </p>
            </div>
            <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-8 border-t border-neutral-800 pt-8 ">
              <div className="flex flex-col gap-3">
                <p className="text-xs uppercase tracking-[0.18em] text-neutral-500">
                  Frameworks
                </p>
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="rounded-full border border-neutral-700/70 px-3 py-1 text-neutral-200 bg-neutral-900/40">
                    React
                  </span>
                  <span className="rounded-full border border-neutral-700/70 px-3 py-1 text-neutral-200 bg-neutral-900/40">
                    Next.js
                  </span>
                  <span className="rounded-full border border-neutral-700/70 px-3 py-1 text-neutral-200 bg-neutral-900/40">
                    Vue.js
                  </span>
                  <span className="rounded-full border border-neutral-700/70 px-3 py-1 text-neutral-200 bg-neutral-900/40">
                    Symfony
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <p className="text-xs uppercase tracking-[0.18em] text-neutral-500">
                  Languages
                </p>
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="rounded-full border border-neutral-700/70 px-3 py-1 text-neutral-200 bg-neutral-900/40">
                    TypeScript
                  </span>
                  <span className="rounded-full border border-neutral-700/70 px-3 py-1 text-neutral-200 bg-neutral-900/40">
                    JavaScript
                  </span>
                  <span className="rounded-full border border-neutral-700/70 px-3 py-1 text-neutral-200 bg-neutral-900/40">
                    HTML &amp; CSS
                  </span>
                  <span className="rounded-full border border-neutral-700/70 px-3 py-1 text-neutral-200 bg-neutral-900/40">
                    Python
                  </span>
                  <span className="rounded-full border border-neutral-700/70 px-3 py-1 text-neutral-200 bg-neutral-900/40">
                    PHP
                  </span>
                  <span className="rounded-full border border-neutral-700/70 px-3 py-1 text-neutral-200 bg-neutral-900/40">
                    Node.js
                  </span>
                  <span className="rounded-full border border-neutral-700/70 px-3 py-1 text-neutral-200 bg-neutral-900/40">
                    SQL
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <p className="text-xs uppercase tracking-[0.18em] text-neutral-500">
                  Libraries
                </p>
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="rounded-full border border-neutral-700/70 px-3 py-1 text-neutral-200 bg-neutral-900/40">
                    Tailwind CSS
                  </span>
                  <span className="rounded-full border border-neutral-700/70 px-3 py-1 text-neutral-200 bg-neutral-900/40">
                    GSAP
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <p className="text-xs uppercase tracking-[0.18em] text-neutral-500">
                  Tools
                </p>
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="rounded-full border border-neutral-700/70 px-3 py-1 text-neutral-200 bg-neutral-900/40">
                    Git &amp; GitHub
                  </span>
                  <span className="rounded-full border border-neutral-700/70 px-3 py-1 text-neutral-200 bg-neutral-900/40">
                    Figma (handoff)
                  </span>
                  <span className="rounded-full border border-neutral-700/70 px-3 py-1 text-neutral-200 bg-neutral-900/40">
                    VS Code
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-32 px-6 sm:px-10 lg:px-0">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-baseline justify-between gap-6 mb-10">
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
                  Experience
                </p>
                <h2 className="text-3xl md:text-4xl font-medium text-zinc-50">
                  A concise timeline of what I&apos;ve been building.
                </h2>
              </div>
            </div>
            <div className="relative pl-5">
              <div className="absolute left-0 top-1 bottom-1 w-px bg-neutral-800/80" />
              <div className="flex flex-col gap-8">
                <div className="relative pl-6">
                  <div className="absolute left-[-11px] top-1 h-2.5 w-2.5 rounded-full border border-neutral-500 bg-neutral-900" />
                  <div className="flex flex-col gap-1">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <p className="text-sm text-neutral-200">
                        <span className="font-medium">
                          Full-Stack Developer
                        </span>
                        <span className="text-neutral-500">
                          {" "}
                          · Client-Sponsored Project — Groupe Lemoine
                        </span>
                      </p>
                      <p className="text-xs text-neutral-500">
                        Jan 2026 — Present
                      </p>
                    </div>
                    <p className="text-xs text-neutral-400 max-w-[80%]">
                      - Redesigned the website, improving load speed,
                      responsiveness, and overall user experience. <br />-
                      Developed the &quot;Careers&quot; page, structured the
                      candidate journey, integrated HR content, and enhanced
                      usability for a seamless application process.
                    </p>
                  </div>
                </div>
                <div className="relative pl-6">
                  <div className="absolute left-[-11px] top-1 h-2.5 w-2.5 rounded-full border border-neutral-500 bg-neutral-900" />
                  <div className="flex flex-col gap-1">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <p className="text-sm text-neutral-200">
                        <span className="font-medium">Front-End Developer</span>
                        <span className="text-neutral-500">
                          {" "}
                          · Client-Sponsored Project — Brain Research Foundation
                          (France)
                        </span>
                      </p>
                      <p className="text-xs text-neutral-500">
                        Oct 2025 — Dec 2025
                      </p>
                    </div>
                    <p className="text-xs text-neutral-400 max-w-[80%]">
                      - Created an interactive brain map to enable clear
                      visualization and exploration of its various regions.{" "}
                      <br />- Implemented a memory mini-game to assess and
                      stimulate cognitive abilities.
                    </p>
                  </div>
                </div>
                <div className="relative pl-6">
                  <div className="absolute left-[-11px] top-1 h-2.5 w-2.5 rounded-full border border-neutral-500 bg-neutral-900" />
                  <div className="flex flex-col gap-1">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <p className="text-sm text-neutral-200">
                        <span className="font-medium">President</span>
                        <span className="text-neutral-500">
                          {" "}
                          · La 404 DeVinci
                        </span>
                      </p>
                      <p className="text-xs text-neutral-500">2025 — 2026</p>
                    </div>
                    <p className="text-xs text-neutral-400 max-w-[80%]">
                      - Oversaw project development and ensured timely delivery
                      according to set deadlines. <br />- Organized various
                      events and activities for the association.
                    </p>
                  </div>
                </div>
                <div className="relative pl-6">
                  <div className="absolute left-[-11px] top-1 h-2.5 w-2.5 rounded-full border border-neutral-500 bg-neutral-900" />
                  <div className="flex flex-col gap-1">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <p className="text-sm text-neutral-200">
                        <span className="font-medium">Student</span>
                        <span className="text-neutral-500">
                          {" "}
                          · IIM Digital School, Paris
                        </span>
                      </p>
                      <p className="text-xs text-neutral-500">2024 — 2029</p>
                    </div>
                    <p className="text-xs text-neutral-400 max-w-[80%]">
                      Working on web development projects, exploring interactive
                      design, UX optimization, and AI-assisted workflows to
                      build scalable and innovative digital experiences.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="py-46 flex justify-center items-center">
          <a
            href="/projects"
            className="group inline-flex items-center gap-2 rounded-full border border-neutral-700/80 bg-neutral-900/70 px-7 py-4 text-xl uppercase tracking-[0.2em] text-neutral-100"
          >
            <span>View all projects</span>
            <ArrowUpRightIcon className="w-4 h-4 text-neutral-300 transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </section>
      </main>
    </div>
  );
}
