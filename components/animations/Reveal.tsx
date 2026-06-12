"use client";

import {
  useRef,
  useEffect,
  type ReactNode,
  type ElementType,
  type Ref,
} from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export type RevealAnimation =
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "scale-up"
  | "blur-up"
  | "clip-up"
  | "rotate-up"
  | "elastic-up"
  | "premium-up"
  | "premium-left"
  | "premium-right"
  | "unveil"
  | "drift"
  | "soft-scale";

type RevealPreset = {
  from: gsap.TweenVars;
  to: gsap.TweenVars;
  ease?: string;
};

const PRESETS: Record<RevealAnimation, RevealPreset> = {
  "fade-up": {
    from: { y: 40, opacity: 0 },
    to: { y: 0, opacity: 1 },
    ease: "power3.out",
  },
  "fade-down": {
    from: { y: -32, opacity: 0 },
    to: { y: 0, opacity: 1 },
    ease: "power3.out",
  },
  "fade-left": {
    from: { x: -56, opacity: 0 },
    to: { x: 0, opacity: 1 },
    ease: "power3.out",
  },
  "fade-right": {
    from: { x: 56, opacity: 0 },
    to: { x: 0, opacity: 1 },
    ease: "power3.out",
  },
  "scale-up": {
    from: { scale: 0.92, opacity: 0, y: 24 },
    to: { scale: 1, opacity: 1, y: 0 },
    ease: "power3.out",
  },
  "blur-up": {
    from: { y: 36, opacity: 0, filter: "blur(10px)" },
    to: { y: 0, opacity: 1, filter: "blur(0px)" },
    ease: "power3.out",
  },
  "clip-up": {
    from: { clipPath: "inset(100% 0% 0% 0%)", opacity: 0, y: 16 },
    to: { clipPath: "inset(0% 0% 0% 0%)", opacity: 1, y: 0 },
    ease: "power3.inOut",
  },
  "rotate-up": {
    from: { y: 36, opacity: 0, rotation: 2.5, transformOrigin: "left bottom" },
    to: { y: 0, opacity: 1, rotation: 0 },
    ease: "power3.out",
  },
  "elastic-up": {
    from: { y: 48, opacity: 0, scale: 0.94 },
    to: { y: 0, opacity: 1, scale: 1 },
    ease: "elastic.out(1, 0.75)",
  },
  "premium-up": {
    from: { y: 32, opacity: 0, filter: "blur(6px)", scale: 0.98 },
    to: { y: 0, opacity: 1, filter: "blur(0px)", scale: 1 },
    ease: "power2.inOut",
  },
  "premium-left": {
    from: { x: -40, opacity: 0, filter: "blur(5px)" },
    to: { x: 0, opacity: 1, filter: "blur(0px)" },
    ease: "power2.inOut",
  },
  "premium-right": {
    from: { x: 40, opacity: 0, filter: "blur(5px)" },
    to: { x: 0, opacity: 1, filter: "blur(0px)" },
    ease: "power2.inOut",
  },
  unveil: {
    from: {
      clipPath: "inset(0% 100% 0% 0%)",
      opacity: 0,
      x: -12,
    },
    to: { clipPath: "inset(0% 0% 0% 0%)", opacity: 1, x: 0 },
    ease: "power3.inOut",
  },
  drift: {
    from: { y: 28, opacity: 0, x: -8, filter: "blur(4px)" },
    to: { y: 0, opacity: 1, x: 0, filter: "blur(0px)" },
    ease: "power2.inOut",
  },
  "soft-scale": {
    from: { scale: 0.96, opacity: 0, y: 20 },
    to: { scale: 1, opacity: 1, y: 0 },
    ease: "power2.inOut",
  },
};

type RevealProps<T extends ElementType = "div"> = {
  children: ReactNode;
  className?: string;
  as?: T;
  animation?: RevealAnimation;
  delay?: number;
  duration?: number;
  start?: string;
  once?: boolean;
  immediate?: boolean;
  ease?: string;
};

export function Reveal<T extends ElementType = "div">({
  children,
  className,
  as,
  animation = "premium-up",
  delay = 0,
  duration = 1.35,
  start = "top 82%",
  once = true,
  immediate = false,
  ease,
}: RevealProps<T>) {
  const ref = useRef<HTMLElement>(null);
  const Component = (as ?? "div") as ElementType;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const preset = PRESETS[animation];
    const ctx = gsap.context(() => {
      gsap.set(el, preset.from);

      const tweenVars: gsap.TweenVars = {
        ...preset.to,
        duration,
        delay,
        ease: ease ?? preset.ease ?? "power3.out",
        clearProps: "filter,clipPath",
      };

      if (immediate) {
        gsap.to(el, tweenVars);
      } else {
        gsap.to(el, {
          ...tweenVars,
          scrollTrigger: {
            trigger: el,
            start,
            once,
            toggleActions: "play none none none",
          },
        });
      }
    }, el);

    return () => ctx.revert();
  }, [animation, delay, duration, start, once, immediate, ease]);

  return (
    <Component ref={ref as Ref<never>} className={className}>
      {children}
    </Component>
  );
}

type RevealGroupProps = {
  children: ReactNode;
  className?: string;
  stagger?: number;
  animation?: RevealAnimation;
  delay?: number;
  duration?: number;
  start?: string;
  once?: boolean;
  immediate?: boolean;
};

export function RevealGroup({
  children,
  className,
  stagger = 0.2,
  animation = "premium-up",
  delay = 0,
  duration = 1.3,
  start = "top 82%",
  once = true,
  immediate = false,
}: RevealGroupProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const items = el.querySelectorAll<HTMLElement>("[data-reveal-item]");
    if (!items.length) return;

    const preset = PRESETS[animation];
    const ctx = gsap.context(() => {
      gsap.set(items, preset.from);

      const tweenVars: gsap.TweenVars = {
        ...preset.to,
        duration,
        delay,
        stagger,
        ease: preset.ease ?? "power3.out",
        clearProps: "filter,clipPath",
      };

      if (immediate) {
        gsap.to(items, tweenVars);
      } else {
        gsap.to(items, {
          ...tweenVars,
          scrollTrigger: {
            trigger: el,
            start,
            once,
            toggleActions: "play none none none",
          },
        });
      }
    }, el);

    return () => ctx.revert();
  }, [stagger, animation, delay, duration, start, once, immediate]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

type RevealLineProps = {
  className?: string;
  delay?: number;
  duration?: number;
  start?: string;
  direction?: "left" | "right" | "center" | "top" | "bottom";
  orientation?: "horizontal" | "vertical";
};

export function RevealLine({
  className,
  delay = 0,
  duration = 1.8,
  start = "top 85%",
  direction = "left",
  orientation = "horizontal",
}: RevealLineProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const isVertical = orientation === "vertical";
    const scaleProp = isVertical ? "scaleY" : "scaleX";

    const origin = isVertical
      ? direction === "bottom"
        ? "center bottom"
        : direction === "center"
          ? "center center"
          : "center top"
      : direction === "center"
        ? "center center"
        : direction === "right"
          ? "right center"
          : "left center";

    const ctx = gsap.context(() => {
      gsap.set(el, {
        [scaleProp]: 0,
        opacity: 0.3,
        transformOrigin: origin,
      });

      gsap.to(el, {
        [scaleProp]: 1,
        opacity: 1,
        duration,
        delay,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: el,
          start,
          once: true,
          toggleActions: "play none none none",
        },
      });
    }, el);

    return () => ctx.revert();
  }, [delay, duration, start, direction, orientation]);

  return <div ref={ref} className={className} />;
}
