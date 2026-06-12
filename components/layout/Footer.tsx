"use client";

import { useRef } from "react";
import { SCROLL_ANIM } from "@/lib/animation";
import { useScrollAnimations } from "@/hooks/useScrollAnimations";

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  useScrollAnimations(footerRef);

  return (
    <footer
      ref={footerRef}
      data-animate={SCROLL_ANIM.type}
      data-animate-duration={SCROLL_ANIM.duration}
      data-animate-start="top 96%"
      className="relative z-100 py-6 text-xs flex flex-wrap justify-center gap-1 text-neutral-300 border-t border-neutral-800 bg-neutral-950"
    >
      <p>Maxym Melnychuk -</p>
      <p>© {new Date().getFullYear()} All rights reserved.</p>
    </footer>
  );
}
