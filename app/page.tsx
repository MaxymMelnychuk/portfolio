"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import Card from "@/components/ui/Card";
import TextReveal from "@/components/animations/TextReveal";
import ProjectsCTA from "@/components/ui/ProjectsCTA";
import SectionLabel from "@/components/ui/SectionLabel";
import SectionHeading from "@/components/ui/SectionHeading";
import ExperienceTimeline from "@/components/home/ExperienceTimeline";
import { featuredProjects } from "@/data/projects";
import { SCROLL_ANIM } from "@/lib/animation";
import { useScrollAnimations } from "@/hooks/useScrollAnimations";
import { motion } from "framer-motion";

const LightRays = dynamic(() => import("@/components/animations/LightRays"), {
  ssr: false,
});
const Particles = dynamic(() => import("@/components/animations/Particles"), {
  ssr: false,
});
const MagicBento = dynamic(() => import("@/components/animations/MagicBento"), {
  ssr: false,
});

const { type: ANIM, duration: DURATION, stagger: STAGGER } = SCROLL_ANIM;

export default function Home() {
  const mainRef = useRef<HTMLElement>(null);
  useScrollAnimations(mainRef);

  return (
    <div className="relative min-h-screen font-montserrat">
      <main ref={mainRef} className="mx-auto flex flex-col items-center">
        <section
          id="hero"
          aria-label="Introduction"
          className="relative mx-auto h-screen w-full flex flex-col items-center justify-center bg-[url('/hero-grid.png')] bg-no-repeat bg-size-[1200px] xl:bg-contain bg-top"
        >
          <div
            className="absolute h-full w-full inset-0 pointer-events-none"
            aria-hidden="true"
          >
            <LightRays />
          </div>

          <div
            className="absolute w-full inset-0 pointer-events-none"
            aria-hidden="true"
          >
            <Particles />
          </div>

          <div className="flex z-4 flex-col items-center justify-center gap-6 sm:gap-8 text-center relative w-full max-w-5xl mx-auto px-5 sm:px-8">
            <div
              data-animate={ANIM}
              data-animate-immediate
              data-animate-delay="0.1"
              data-animate-duration={DURATION}
              className="p-px rounded-sm bg-linear-to-b from-neutral-400 to-neutral-600"
            >
              <div className="text-white rounded-sm bg-linear-to-b from-neutral-800 to-neutral-950 text-xs sm:text-sm px-4 py-2">
                <p>Hi, i&apos;m Maxym Melnychuk 👋</p>
              </div>
            </div>

            <TextReveal
              text="A developer who enjoys building scalable systems for real use."
              className="w-full text-[1.6rem] leading-tight sm:text-4xl sm:leading-tight sm:max-w-3xl lg:text-6xl lg:max-w-5xl lg:leading-[1.1] font-medium font-inter tracking-tight text-center text-white"
            />

            <p
              data-animate={ANIM}
              data-animate-immediate
              data-animate-delay="0.35"
              data-animate-duration={DURATION}
              className="w-full max-w-md sm:max-w-2xl lg:max-w-3xl leading-relaxed text-sm sm:text-base text-center text-zinc-400"
            >
              Driven by innovation and AI, I build scalable, high-impact
              products. I&apos;m constantly learning and experimenting to create
              solutions that solve real problems and deliver long-term value.
            </p>
          </div>

          <div
            data-animate={ANIM}
            data-animate-immediate
            data-animate-delay="0.55"
            data-animate-duration={DURATION}
            className="mt-10"
            aria-hidden="true"
          >
            <motion.div
              animate={{
                y: [0, 18, 0],
                opacity: [0.6, 1, 0.6],
                filter: [
                  "drop-shadow(0 0 0px rgba(255,255,255,0))",
                  "drop-shadow(0 0 10px rgba(255,255,255,0.55))",
                  "drop-shadow(0 0 0px rgba(255,255,255,0))",
                ],
              }}
              transition={{
                duration: 2.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <svg width="42" height="42" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 3V17"
                  stroke="#bbbbbb"
                  strokeWidth="1"
                  strokeLinecap="round"
                />
                <path
                  d="M7 12L12 17L17 12"
                  stroke="#bbbbbb"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
          </div>

          <span
            className="z-3 absolute bottom-0 w-full h-50 bg-linear-to-t from-neutral-950 to-transparent"
            aria-hidden="true"
          />
        </section>

        <section
          id="projects"
          aria-labelledby="latest-projects-heading"
          className="max-w-7xl w-full flex flex-col justify-end px-4 sm:px-6 py-20"
        >
          <SectionHeading
            id="latest-projects-heading"
            align="right"
            data-animate={ANIM}
            data-animate-duration={DURATION}
            data-animate-start="top 90%"
            className="text-2xl sm:text-3xl mb-10 sm:mb-12"
          >
            Latest projects
          </SectionHeading>

          <div
            data-animate-stagger={ANIM}
            data-animate-stagger-delay={STAGGER}
            data-animate-duration={DURATION}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full items-end"
          >
            {featuredProjects.map((project, index) => (
              <div key={project.id} data-animate-child>
                <Card
                  title={project.title}
                  image={project.image}
                  githubUrl={project.githubUrl}
                  priority={index === 0}
                />
              </div>
            ))}
          </div>
        </section>

        <section
          aria-labelledby="about-heading"
          className="py-32 sm:py-40 px-6 sm:px-0"
        >
          <div className="max-w-5xl mx-auto">
            <SectionLabel
              data-animate={ANIM}
              data-animate-duration={DURATION}
              className="mb-8"
            >
              About
            </SectionLabel>

            <div
              data-animate-line="h"
              data-animate-duration={SCROLL_ANIM.lineDuration}
              className="h-px w-full bg-linear-to-r from-neutral-900 via-neutral-700/70 to-neutral-900 mb-10"
              aria-hidden="true"
            />

            <div className="grid gap-12 md:grid-cols-[minmax(0,1.7fr)_minmax(0,1.1fr)]">
              <div className="space-y-4">
                <SectionHeading
                  id="about-heading"
                  data-animate={ANIM}
                  data-animate-duration={DURATION}
                  className="text-3xl md:text-4xl"
                >
                  A developer who cares about clarity, pace, and long-term
                  quality.
                </SectionHeading>

                <div
                  data-animate-stagger={ANIM}
                  data-animate-stagger-delay={STAGGER}
                  data-animate-duration={DURATION}
                  className="space-y-4"
                >
                  <p
                    data-animate-child
                    className="text-sm text-zinc-400 leading-relaxed"
                  >
                    I&apos;m a third-year student at IIM Digital School in
                    Paris, focused on web development and digital products. I
                    like projects that force me to think about structure, not
                    just pixels — how components scale, how data flows, and how
                    the experience feels end-to-end.
                  </p>
                  <p
                    data-animate-child
                    className="text-sm text-zinc-400 leading-relaxed"
                  >
                    Most of my time goes into building clean, maintainable
                    frontends, iterating quickly, and learning from each project
                    so the next one is sharper, faster, and more considered.
                  </p>
                </div>
              </div>

              <div
                data-animate-stagger={ANIM}
                data-animate-stagger-delay={STAGGER}
                data-animate-duration={DURATION}
                className="space-y-8 text-sm text-zinc-400"
              >
                <div data-animate-child className="space-y-2">
                  <SectionLabel>Now</SectionLabel>
                  <p>
                    Exploring how AI, design systems, and good architecture can
                    work together to ship interfaces that feel simple on the
                    surface but are solid underneath.
                  </p>
                </div>
                <div data-animate-child className="space-y-2">
                  <SectionLabel>Outside of code</SectionLabel>
                  <p>
                    Music plays an important role in my daily life and often
                    accompanies me while I’m developing. I enjoy movies for
                    their storytelling and video games for their immersive and
                    interactive worlds. In my free time, I like to relax and
                    discover new things.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="skills-heading"
          className="py-32 px-6 sm:px-10 lg:px-0 max-w-6xl mx-auto w-full"
        >
          <div className="flex flex-col gap-6 md:flex-row md:items-start">
            <div className="md:w-2/5 flex flex-col gap-3">
              <SectionLabel
                data-animate={ANIM}
                data-animate-duration={DURATION}
              >
                Skills
              </SectionLabel>
              <SectionHeading
                id="skills-heading"
                data-animate={ANIM}
                data-animate-delay="0.08"
                data-animate-duration={DURATION}
                className="text-3xl md:text-4xl"
              >
                Clean and maintainable code built for scalability
              </SectionHeading>
            </div>
            <div
              data-animate={ANIM}
              data-animate-delay="0.12"
              data-animate-duration={DURATION}
              className="md:flex-1 w-full border-t border-neutral-800 pt-8"
            >
              <MagicBento />
            </div>
          </div>
        </section>

        <section
          aria-labelledby="experience-heading"
          className="py-32 px-6 sm:px-10 lg:px-0 w-full"
        >
          <div className="max-w-5xl mx-auto">
            <div
              data-animate={ANIM}
              data-animate-duration={DURATION}
              className="mb-10 space-y-2"
            >
              <SectionLabel>Experience</SectionLabel>
              <SectionHeading
                id="experience-heading"
                className="text-3xl md:text-4xl"
              >
                A concise timeline of what I&apos;ve been building.
              </SectionHeading>
            </div>

            <ExperienceTimeline />
          </div>
        </section>

        <ProjectsCTA />
      </main>
    </div>
  );
}
