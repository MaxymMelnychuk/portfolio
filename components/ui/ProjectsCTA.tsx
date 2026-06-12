"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRightIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { SCROLL_ANIM } from "@/lib/animation";
import { useScrollAnimations } from "@/hooks/useScrollAnimations";

export default function ProjectsCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollAnimations(sectionRef);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="projects-cta-heading"
      className="relative w-full px-4 sm:px-6 py-24 sm:py-32 overflow-hidden"
    >
      <div
        data-animate={SCROLL_ANIM.type}
        data-animate-duration={SCROLL_ANIM.duration}
        className="relative group w-full max-w-5xl mx-auto"
      >
        <div
          className="absolute -inset-px rounded-2xl bg-linear-to-r from-neutral-600 via-neutral-400 to-neutral-600 opacity-40 group-hover:opacity-70 transition-opacity duration-500 blur-sm pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative rounded-2xl border border-neutral-800/80 bg-linear-to-b from-neutral-900/90 to-neutral-950/95 backdrop-blur-sm p-6 sm:p-10 md:p-12">
          <div
            data-animate-stagger={SCROLL_ANIM.type}
            data-animate-stagger-delay={SCROLL_ANIM.stagger}
            data-animate-duration={SCROLL_ANIM.duration}
            className="flex flex-col items-center text-center gap-6 sm:gap-8"
          >
            <div data-animate-child className="space-y-3 max-w-3xl">
              <h2
                id="projects-cta-heading"
                className="text-2xl sm:text-3xl md:text-4xl font-medium text-white font-inter tracking-tight"
              >
                There&apos;s more where that came from
              </h2>
              <p className="text-sm sm:text-base text-neutral-400 leading-relaxed px-2">
                From AI assistants to full-stack apps — explore every build,
                stack, and story behind the work.
              </p>
            </div>

            <div data-animate-child>
              <Link
                href="/projects"
                className="group/btn relative z-50 w-full sm:w-auto mt-2 inline-flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500 rounded-xl"
              >
                <span
                  className="absolute inset-0 rounded-xl bg-white/10 blur-xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"
                  aria-hidden="true"
                />

                <span className="relative flex items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 rounded-xl border border-neutral-600/80 bg-linear-to-b from-neutral-800 to-neutral-950 text-white font-medium text-base sm:text-lg transition-all duration-300 group-hover/btn:border-neutral-400/60 group-hover/btn:shadow-[0_0_40px_rgba(255,255,255,0.08)] group-hover/btn:-translate-y-0.5 active:translate-y-0">
                  <span
                    className="absolute inset-0 rounded-xl overflow-hidden"
                    aria-hidden="true"
                  >
                    <span className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 bg-linear-to-r from-transparent via-white/10 to-transparent" />
                  </span>

                  <SparklesIcon
                    className="w-5 h-5 text-neutral-400 group-hover/btn:text-white transition-colors shrink-0"
                    aria-hidden="true"
                  />
                  <span>View all projects</span>
                  <ArrowRightIcon
                    className="w-5 h-5 text-neutral-400 group-hover/btn:text-white group-hover/btn:translate-x-1 transition-all shrink-0"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
