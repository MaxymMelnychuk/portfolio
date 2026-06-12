"use client";

import { useRef } from "react";
import Link from "next/link";
import { SCROLL_ANIM } from "@/lib/animation";
import { useScrollAnimations } from "@/hooks/useScrollAnimations";

export default function NotFound() {
  const pageRef = useRef<HTMLDivElement>(null);
  useScrollAnimations(pageRef);

  return (
    <div
      ref={pageRef}
      className="h-screen flex flex-col items-center justify-center text-white px-6"
    >
      <h1 className="text-8xl font-light font-montserrat">404</h1>

      <p
        data-animate={SCROLL_ANIM.type}
        data-animate-immediate
        data-animate-delay="0.2"
        data-animate-duration={SCROLL_ANIM.duration}
        className="text-3xl sm:text-5xl font-light mt-4 font-inter"
      >
        Page Not Found
      </p>

      <Link
        data-animate={SCROLL_ANIM.type}
        data-animate-immediate
        data-animate-delay="0.4"
        data-animate-duration={SCROLL_ANIM.duration}
        href="/"
        className="mt-10 inline-flex items-center gap-3 rounded-full border border-neutral-700 px-6 py-3 text-sm text-neutral-300 hover:border-neutral-500 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500"
      >
        Back to home
        <span className="h-px w-6 bg-neutral-500" aria-hidden="true" />
      </Link>
    </div>
  );
}
