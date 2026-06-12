"use client";

import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";

const numOpacityTween = (opacity: number): gsap.TweenVars =>
  ({ "--sm-num-opacity": opacity }) as gsap.TweenVars;

export interface StaggeredMenuItem {
  label: string;
  ariaLabel: string;
  link: string;
}
export interface StaggeredMenuSocialItem {
  label: string;
  link: string;
}
export interface StaggeredMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  position?: "left" | "right";
  colors?: string[];
  items?: StaggeredMenuItem[];
  socialItems?: StaggeredMenuSocialItem[];
  displaySocials?: boolean;
  displayItemNumbering?: boolean;
  className?: string;
  accentColor?: string;
  closeOnClickAway?: boolean;
}

export const StaggeredMenu: React.FC<StaggeredMenuProps> = ({
  open,
  onOpenChange,
  position = "right",
  colors = ["#1a1a1a", "#121212", "#0a0a0a"],
  items = [],
  socialItems = [],
  displaySocials = true,
  displayItemNumbering = true,
  className,
  accentColor = "#5227FF",
  closeOnClickAway = true,
}: StaggeredMenuProps) => {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  const panelRef = useRef<HTMLDivElement | null>(null);
  const preLayersRef = useRef<HTMLDivElement | null>(null);
  const openTlRef = useRef<gsap.core.Timeline | null>(null);

  const CONTENT_DELAY = 0.15;
  const PANEL_OPEN_BUFFER = 0.15;

  const buildContentTimeline = useCallback(() => {
    const panel = panelRef.current;
    if (!panel) return null;

    openTlRef.current?.kill();

    const itemEls = Array.from(
      panel.querySelectorAll(".sm-panel-itemLabel"),
    ) as HTMLElement[];
    const numberEls = Array.from(
      panel.querySelectorAll(".sm-panel-list[data-numbering] .sm-panel-item"),
    ) as HTMLElement[];
    const socialTitle = panel.querySelector(
      ".sm-socials-title",
    ) as HTMLElement | null;
    const socialCard = panel.querySelector(
      ".sm-socials-card",
    ) as HTMLElement | null;
    const socialLinks = Array.from(
      panel.querySelectorAll(".sm-socials-link"),
    ) as HTMLElement[];

    if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });
    if (numberEls.length) gsap.set(numberEls, numOpacityTween(0));
    if (socialTitle) gsap.set(socialTitle, { opacity: 0, y: 12 });
    if (socialCard) gsap.set(socialCard, { opacity: 0, y: 28 });
    if (socialLinks.length) gsap.set(socialLinks, { y: 16, opacity: 0 });

    const tl = gsap.timeline({ paused: true, delay: CONTENT_DELAY });

    if (itemEls.length) {
      tl.to(
        itemEls,
        {
          yPercent: 0,
          rotate: 0,
          duration: 0.85,
          ease: "power4.out",
          stagger: { each: 0.08, from: "start" },
        },
        0,
      );

      if (numberEls.length) {
        tl.to(
          numberEls,
          {
            ...numOpacityTween(1),
            duration: 0.5,
            ease: "power2.out",
            stagger: { each: 0.06, from: "start" },
          },
          0.08,
        );
      }
    }

    if (socialCard) {
      tl.to(
        socialCard,
        { opacity: 1, y: 0, duration: 0.55, ease: "power3.out" },
        0.2,
      );
    }
    if (socialTitle) {
      tl.to(
        socialTitle,
        { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" },
        0.24,
      );
    }
    if (socialLinks.length) {
      tl.to(
        socialLinks,
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power3.out",
          stagger: { each: 0.06, from: "start" },
          onComplete: () => {
            gsap.set(socialLinks, { clearProps: "opacity" });
          },
        },
        0.28,
      );
    }

    openTlRef.current = tl;
    return tl;
  }, [CONTENT_DELAY]);

  const playContentIn = useCallback(() => {
    buildContentTimeline()?.play(0);
  }, [buildContentTimeline]);

  const resetContent = useCallback(() => {
    openTlRef.current?.kill();
    openTlRef.current = null;

    const panel = panelRef.current;
    if (!panel) return;

    const itemEls = Array.from(
      panel.querySelectorAll(".sm-panel-itemLabel"),
    ) as HTMLElement[];
    const numberEls = Array.from(
      panel.querySelectorAll(".sm-panel-list[data-numbering] .sm-panel-item"),
    ) as HTMLElement[];
    const socialTitle = panel.querySelector(
      ".sm-socials-title",
    ) as HTMLElement | null;
    const socialCard = panel.querySelector(
      ".sm-socials-card",
    ) as HTMLElement | null;
    const socialLinks = Array.from(
      panel.querySelectorAll(".sm-socials-link"),
    ) as HTMLElement[];

    if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });
    if (numberEls.length) gsap.set(numberEls, numOpacityTween(0));
    if (socialTitle) gsap.set(socialTitle, { opacity: 0, y: 12 });
    if (socialCard) gsap.set(socialCard, { opacity: 0, y: 28 });
    if (socialLinks.length) gsap.set(socialLinks, { y: 16, opacity: 0 });
  }, []);

  useLayoutEffect(() => {
    if (!mounted) return;
    resetContent();
  }, [mounted, resetContent]);

  useEffect(() => {
    if (!mounted || !visible) return;

    const panel = panelRef.current;
    if (!panel) return;

    let played = false;
    let playTimer = 0;

    const playAfterPanel = () => {
      if (played) return;
      played = true;
      playTimer = window.setTimeout(
        () => playContentIn(),
        PANEL_OPEN_BUFFER * 1000,
      );
    };

    const onTransitionEnd = (event: TransitionEvent) => {
      if (event.target === panel && event.propertyName === "transform") {
        playAfterPanel();
      }
    };

    panel.addEventListener("transitionend", onTransitionEnd);
    const fallback = window.setTimeout(playAfterPanel, 150);

    return () => {
      panel.removeEventListener("transitionend", onTransitionEnd);
      window.clearTimeout(fallback);
      window.clearTimeout(playTimer);
    };
  }, [mounted, visible, playContentIn, PANEL_OPEN_BUFFER]);

  useEffect(() => {
    if (open) {
      const raf = requestAnimationFrame(() => setMounted(true));
      return () => cancelAnimationFrame(raf);
    }

    const hideRaf = requestAnimationFrame(() => setVisible(false));

    if (!mounted) {
      return () => cancelAnimationFrame(hideRaf);
    }

    resetContent();
    const timer = window.setTimeout(() => setMounted(false), 480);
    return () => {
      cancelAnimationFrame(hideRaf);
      window.clearTimeout(timer);
    };
  }, [open, mounted, resetContent]);

  useEffect(() => {
    if (!mounted || !open) return;

    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setVisible(true));
    });

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [mounted, open]);

  useEffect(() => {
    if (!open || !mounted) return;

    document.body.classList.add("menu-open");

    return () => {
      document.body.classList.remove("menu-open");
    };
  }, [open, mounted]);

  const closeMenu = useCallback(() => {
    onOpenChange(false);
  }, [onOpenChange]);

  if (!mounted || typeof document === "undefined") return null;

  const overlay = (
    <div className="sm-scope fixed inset-0 z-10000" role="presentation">
      {closeOnClickAway && open && (
        <button
          type="button"
          aria-label="Close menu"
          className="absolute inset-0 bg-black/40 border-0 cursor-default"
          onClick={closeMenu}
          tabIndex={-1}
        />
      )}

      <div
        className={
          (className ? className + " " : "") +
          "staggered-menu-wrapper pointer-events-none relative w-full h-full"
        }
        style={
          accentColor
            ? ({ "--sm-accent": accentColor } as CSSProperties)
            : undefined
        }
        data-position={position}
        data-open={visible ? "" : undefined}
      >
        <div
          ref={preLayersRef}
          className="sm-prelayers absolute top-0 right-0 bottom-0 pointer-events-none z-1"
          aria-hidden="true"
        >
          {(() => {
            const raw =
              colors && colors.length
                ? colors.slice(0, 4)
                : ["#141414", "#101010", "#080808"];
            const arr = [...raw];
            if (arr.length >= 3) {
              const mid = Math.floor(arr.length / 2);
              arr.splice(mid, 1);
            }
            return arr.map((c, i) => (
              <div
                key={i}
                className={`sm-prelayer sm-prelayer-${i + 1} absolute top-0 right-0 h-full w-full`}
                style={{
                  background: `linear-gradient(180deg, ${c} 0%, rgba(8, 8, 8, 0.98) 100%)`,
                }}
              />
            ));
          })()}
        </div>

        <aside
          id="mobile-menu-panel"
          ref={panelRef}
          className="staggered-menu-panel absolute top-0 right-0 h-full flex flex-col overflow-y-auto z-2 pointer-events-auto"
          aria-hidden={!open}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <div className="sm-panel-bg" aria-hidden="true">
            <div className="sm-panel-bg-gradient" />
            <div className="sm-panel-bg-grid" />
            <div className="sm-panel-bg-glow" />
          </div>

          <div className="sm-panel-inner flex-1 flex flex-col gap-5">
            <div className="sm-panel-nav">
              <p className="sm-panel-eyebrow">Navigation</p>
              <ul
                className="sm-panel-list list-none m-0 p-0 flex flex-col gap-2"
                role="list"
                data-numbering={displayItemNumbering || undefined}
              >
                {items.map((it, idx) => (
                  <li
                    className="sm-panel-itemWrap relative overflow-hidden leading-none"
                    key={it.label + idx}
                  >
                    <a
                      className="sm-panel-item relative cursor-pointer leading-none tracking-[-0.04em] uppercase transition-[color,transform] duration-300 ease-out inline-block no-underline pr-[0.5em]"
                      href={it.link}
                      aria-label={it.ariaLabel}
                      data-index={idx + 1}
                      onClick={closeMenu}
                    >
                      <span className="sm-panel-itemLabel inline-block origin-[50%_100%] will-change-transform">
                        {it.label}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {displaySocials && socialItems.length > 0 && (
              <div className="sm-socials mt-auto" aria-label="Social links">
                <div className="sm-socials-card">
                  <div className="sm-socials-header">
                    <span className="sm-socials-eyebrow">Socials</span>
                  </div>
                  <ul className="sm-socials-list list-none m-0 p-0" role="list">
                    {socialItems.map((s, i) => (
                      <li key={s.label + i} className="sm-socials-item">
                        <a
                          href={s.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="sm-socials-link no-underline"
                          onClick={closeMenu}
                        >
                          <span className="sm-socials-link-label">
                            {s.label}
                          </span>
                          <span
                            className="sm-socials-link-arrow w-4"
                            aria-hidden="true"
                          >
                            <ArrowUpRightIcon />
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </aside>
      </div>

      <style>{`
.sm-scope .staggered-menu-wrapper { position: relative; width: 100%; height: 100%; pointer-events: none; }
.sm-scope .sm-panel-itemWrap { position: relative; overflow: hidden; line-height: 1; }
.sm-scope .staggered-menu-panel {
  position: absolute;
  top: 0;
  right: 0;
  width: clamp(280px, 42vw, 440px);
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 6.5em 1.75em 2em 1.75em;
  overflow-y: auto;
  isolation: isolate;
  background: linear-gradient(165deg, #050505 0%, #090909 38%, #0d0d0d 100%);
  border-left: 1px solid rgba(255, 255, 255, 0.07);
  box-shadow: -28px 0 90px rgba(0, 0, 0, 0.55);
  transform: translate3d(100%, 0, 0);
  transition: transform 0.58s cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: 180ms;
  will-change: transform;
}
.sm-scope .staggered-menu-wrapper[data-open] .staggered-menu-panel {
  transform: translate3d(0, 0, 0);
}
.sm-scope .staggered-menu-wrapper[data-position='left'] .staggered-menu-panel {
  right: auto;
  left: 0;
  border-left: none;
  border-right: 1px solid rgba(255, 255, 255, 0.07);
  box-shadow: 28px 0 90px rgba(0, 0, 0, 0.55);
  transform: translate3d(-100%, 0, 0);
}
.sm-scope .staggered-menu-wrapper[data-position='left'][data-open] .staggered-menu-panel {
  transform: translate3d(0, 0, 0);
}
.sm-scope .sm-panel-bg {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
}
.sm-scope .sm-panel-bg-gradient {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 90% 55% at 100% 0%, rgba(255, 255, 255, 0.05) 0%, transparent 58%),
    radial-gradient(ellipse 70% 45% at 0% 100%, rgba(255, 255, 255, 0.035) 0%, transparent 52%);
}
.sm-scope .sm-panel-bg-grid {
  position: absolute;
  inset: 0;
  opacity: 0.28;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.035) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.035) 1px, transparent 1px);
  background-size: 44px 44px;
  mask-image: linear-gradient(to bottom, black 0%, transparent 88%);
  -webkit-mask-image: linear-gradient(to bottom, black 0%, transparent 88%);
}
.sm-scope .sm-panel-bg-glow {
  position: absolute;
  top: 10%;
  right: -18%;
  width: 260px;
  height: 260px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.07) 0%, transparent 72%);
  filter: blur(42px);
}
.sm-scope .sm-prelayers {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: clamp(280px, 42vw, 440px);
  pointer-events: none;
  overflow: hidden;
}
.sm-scope .staggered-menu-wrapper[data-position='left'] .sm-prelayers {
  right: auto;
  left: 0;
}
.sm-scope .sm-prelayer {
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: 100%;
  transform: translate3d(100%, 0, 0);
  transition: transform 0.52s cubic-bezier(0.22, 1, 0.36, 1);
  will-change: transform;
}
.sm-scope .staggered-menu-wrapper[data-position='left'] .sm-prelayer {
  right: auto;
  left: 0;
  transform: translate3d(-100%, 0, 0);
}
.sm-scope .sm-prelayer-1 { transition-delay: 0ms; z-index: 1; }
.sm-scope .sm-prelayer-2 { transition-delay: 75ms; z-index: 2; }
.sm-scope .sm-prelayer-3 { transition-delay: 150ms; z-index: 3; }
.sm-scope .staggered-menu-wrapper[data-open] .sm-prelayer {
  transform: translate3d(0, 0, 0);
}
@media (max-width: 1024px) {
  .sm-scope .staggered-menu-panel,
  .sm-scope .sm-prelayers { width: 100%; left: 0; right: 0; }
  .sm-scope .sm-prelayer {
    transition-duration: 0.62s;
  }
  .sm-scope .sm-prelayer-1 { transition-delay: 0ms; }
  .sm-scope .sm-prelayer-2 { transition-delay: 95ms; }
  .sm-scope .sm-prelayer-3 { transition-delay: 190ms; }
  .sm-scope .staggered-menu-panel {
    transition-duration: 0.72s;
    transition-delay: 280ms;
  }
}
.sm-scope .sm-panel-inner {
  position: relative;
  z-index: 1;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.sm-scope .sm-panel-nav { display: flex; flex-direction: column; gap: 1.25rem; }
.sm-scope .sm-panel-eyebrow {
  margin: 0;
  font-size: 0.68rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.34);
  font-weight: 400;
}
.sm-scope .sm-panel-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.35rem; }
.sm-scope .sm-panel-item {
  position: relative;
  color: rgba(255, 255, 255, 0.92);
  font-size: clamp(2rem, 8vw, 2.85rem);
  font-weight: 500;
  cursor: pointer;
  line-height: 1;
  letter-spacing: -0.04em;
  text-transform: uppercase;
  transition: color 0.35s ease, transform 0.35s ease;
  display: inline-block;
  text-decoration: none;
  padding-right: 1em;
}
.sm-scope .sm-panel-itemLabel {
  display: inline-block;
  will-change: transform;
  transform-origin: 50% 100%;
}
.sm-scope .sm-panel-item:hover,
.sm-scope .sm-panel-item:focus-visible {
  color: #ffffff;
  transform: translateX(4px);
}
.sm-scope .sm-panel-item:focus-visible { outline: none; }
.sm-scope .sm-panel-item:focus-visible .sm-panel-itemLabel {
  outline: 1px solid rgba(255, 255, 255, 0.25);
  outline-offset: 6px;
}
.sm-scope .sm-panel-list[data-numbering] { counter-reset: smItem; }
.sm-scope .sm-panel-list[data-numbering] .sm-panel-item::after {
  counter-increment: smItem;
  content: counter(smItem, decimal-leading-zero);
  position: absolute;
  top: 0.12em;
  right: 0;
  font-size: 0.72rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.28);
  letter-spacing: 0.08em;
  pointer-events: none;
  user-select: none;
  opacity: var(--sm-num-opacity, 0);
}
.sm-scope .sm-socials { margin-top: auto; padding-top: 2.5rem; }
.sm-scope .sm-socials-card {
  position: relative;
  padding: 1.2rem 1.1rem 1rem;
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: linear-gradient(180deg, rgba(0,0,0,.45) 0%, rgba(0,0,0,.15) 100%);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06);
  overflow: hidden;
}
.sm-scope .sm-socials-eyebrow {
  display: block;
  font-size: 0.68rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.34);
  margin-bottom: 0.35rem;
}
.sm-scope .sm-socials-list {
  list-style: none;
  margin: 1rem 0 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}
.sm-scope .sm-socials-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.72rem 0.85rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  background: rgba(0, 0, 0, 0.22);
  color: rgba(255, 255, 255, 0.72);
  text-decoration: none;
  font-size: 0.88rem;
  font-weight: 400;
  transition: border-color 0.3s ease, background 0.3s ease, color 0.3s ease, transform 0.3s ease;
}
.sm-scope .sm-socials-link:hover,
.sm-scope .sm-socials-link:focus-visible {
  color: #ffffff;
  border-color: rgba(255, 255, 255, 0.16);
  background: rgba(255, 255, 255, 0.06);
  transform: translateX(4px);
}
@media (max-width: 640px) {
  .sm-scope .staggered-menu-panel { padding: 6em 1.25em 1.5em; }
}
      `}</style>
    </div>
  );

  return createPortal(overlay, document.body);
};

export default StaggeredMenu;
