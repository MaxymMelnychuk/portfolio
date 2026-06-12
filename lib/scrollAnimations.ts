import { gsap, ScrollTrigger } from "@/lib/gsap";
import { SCROLL_ANIM } from "@/lib/animation";

const START = SCROLL_ANIM.start;
const DURATION = SCROLL_ANIM.duration;
const STAGGER = SCROLL_ANIM.stagger;
const EASE = "power2.out";

type AnimType =
  | "fade-up"
  | "blur-up"
  | "slide-left"
  | "slide-right"
  | "scale"
  | "clip"
  | "drift"
  | "unveil";

const FROM: Record<AnimType, gsap.TweenVars> = {
  "fade-up": { y: 28, opacity: 0 },
  "blur-up": { y: 24, opacity: 0, filter: "blur(6px)" },
  "slide-left": { x: -36, opacity: 0, filter: "blur(3px)" },
  "slide-right": { x: 36, opacity: 0, filter: "blur(3px)" },
  scale: { scale: 0.96, opacity: 0, y: 16 },
  clip: { clipPath: "inset(100% 0% 0% 0%)", opacity: 0, y: 10 },
  drift: { y: 18, opacity: 0, x: -4 },
  unveil: { clipPath: "inset(0% 100% 0% 0%)", opacity: 0, x: -8 },
};

const TO: Record<AnimType, gsap.TweenVars> = {
  "fade-up": { y: 0, opacity: 1 },
  "blur-up": { y: 0, opacity: 1, filter: "blur(0px)" },
  "slide-left": { x: 0, opacity: 1, filter: "blur(0px)" },
  "slide-right": { x: 0, opacity: 1, filter: "blur(0px)" },
  scale: { scale: 1, opacity: 1, y: 0 },
  clip: { clipPath: "inset(0% 0% 0% 0%)", opacity: 1, y: 0 },
  drift: { y: 0, opacity: 1, x: 0 },
  unveil: { clipPath: "inset(0% 0% 0% 0%)", opacity: 1, x: 0 },
};

function isAnimType(value: string): value is AnimType {
  return value in FROM;
}

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function revealInstantly(el: HTMLElement | NodeListOf<HTMLElement>) {
  gsap.set(el, {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    filter: "none",
    clearProps: "all",
  });
}

function animateElement(
  el: HTMLElement,
  type: AnimType,
  options: {
    immediate?: boolean;
    delay?: number;
    duration?: number;
    start?: string;
  } = {},
) {
  if (prefersReducedMotion()) {
    revealInstantly(el);
    return;
  }

  const {
    immediate = false,
    delay = 0,
    duration = DURATION,
    start = START,
  } = options;

  gsap.set(el, FROM[type]);

  const tween: gsap.TweenVars = {
    ...TO[type],
    duration,
    delay,
    ease: EASE,
    clearProps: "filter,clipPath",
  };

  if (immediate) {
    gsap.to(el, tween);
  } else {
    gsap.to(el, {
      ...tween,
      scrollTrigger: {
        trigger: el,
        start,
        once: true,
        toggleActions: "play none none none",
      },
    });
  }
}

export function initScrollAnimations(scope?: Element | Document | null) {
  return gsap.context(() => {
    const root: Element | Document = scope ?? document;
    const reduced = prefersReducedMotion();

    root.querySelectorAll<HTMLElement>("[data-animate]").forEach((el) => {
      if (el.tagName === "H1") return;

      const type = el.dataset.animate ?? "fade-up";
      if (!isAnimType(type)) return;

      if (reduced) {
        revealInstantly(el);
        return;
      }

      animateElement(el, type, {
        immediate: el.hasAttribute("data-animate-immediate"),
        delay: Number(el.dataset.animateDelay ?? 0),
        duration: Number(el.dataset.animateDuration ?? DURATION),
        start: el.dataset.animateStart ?? START,
      });
    });

    root
      .querySelectorAll<HTMLElement>("[data-animate-stagger]")
      .forEach((group) => {
        const type = (group.dataset.animateStagger ?? "blur-up") as AnimType;
        if (!isAnimType(type)) return;

        const children = group.querySelectorAll<HTMLElement>(
          "[data-animate-child]",
        );

        if (!children.length) return;

        if (reduced) {
          revealInstantly(children);
          return;
        }

        gsap.set(children, FROM[type]);

        const tween: gsap.TweenVars = {
          ...TO[type],
          duration: Number(group.dataset.animateDuration ?? DURATION),
          delay: Number(group.dataset.animateDelay ?? 0),
          stagger: Number(group.dataset.animateStaggerDelay ?? STAGGER),
          ease: EASE,
          clearProps: "filter,clipPath",
        };

        if (group.hasAttribute("data-animate-immediate")) {
          gsap.to(children, tween);
        } else {
          gsap.to(children, {
            ...tween,
            scrollTrigger: {
              trigger: group,
              start: group.dataset.animateStart ?? START,
              once: true,
              toggleActions: "play none none none",
            },
          });
        }
      });

    root
      .querySelectorAll<HTMLElement>("[data-animate-line]")
      .forEach((line) => {
        if (reduced) {
          gsap.set(line, { scaleX: 1, scaleY: 1, opacity: 1 });
          return;
        }

        const orientation = line.dataset.animateLine ?? "h";
        const scaleProp = orientation === "v" ? "scaleY" : "scaleX";
        const origin = orientation === "v" ? "center top" : "left center";

        gsap.set(line, {
          [scaleProp]: 0,
          opacity: 0.35,
          transformOrigin: origin,
        });

        gsap.to(line, {
          [scaleProp]: 1,
          opacity: 1,
          duration: Number(
            line.dataset.animateDuration ?? SCROLL_ANIM.lineDuration,
          ),
          delay: Number(line.dataset.animateDelay ?? 0),
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: line,
            start: START,
            once: true,
            toggleActions: "play none none none",
          },
        });
      });
  }, scope ?? undefined);
}

export function refreshScrollAnimations() {
  ScrollTrigger.refresh();
}
