"use client";

import { type HTMLMotionProps, motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useRef, useState } from "react";

const EMOJI_REGEX =
  /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/u;

interface TextDecryptionProps extends HTMLMotionProps<"span"> {
  animateOn?: "view" | "hover";
  characters?: string;
  className?: string;
  encryptedClassName?: string;
  glowEffect?: boolean;
  loop?: boolean;
  loopDelay?: number;
  maxIterations?: number;
  parentClassName?: string;
  revealDirection?: "start" | "end" | "center";
  sequential?: boolean;
  speed?: number;
  text: string;
  typewriterEffect?: boolean;
  useOriginalCharsOnly?: boolean;
}

export function TextDecryption({
  text,
  speed = 5,
  maxIterations = 10,
  sequential = false,
  revealDirection = "start",
  useOriginalCharsOnly = false,
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+",
  className = "",
  parentClassName = "",
  encryptedClassName = "",
  animateOn = "hover",
  glowEffect = false,
  typewriterEffect = false,
  loop = false,
  loopDelay = 2000,
  ...props
}: TextDecryptionProps) {
  const [displayText, setDisplayText] = useState<string>(text);
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [isScrambling, setIsScrambling] = useState<boolean>(false);
  const [revealedIndices, setRevealedIndices] = useState<Set<number>>(
    new Set(),
  );
  const [hasAnimated, setHasAnimated] = useState<boolean>(false);
  const [isLooping, setIsLooping] = useState<boolean>(false);
  const containerRef = useRef<HTMLSpanElement>(null);
  const loopTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { theme } = useTheme();

  // Theme-aware default styling classes
  const getThemeAwareClasses = () => {
    if (className) {
      return className;
    }

    return theme === "dark"
      ? "text-green-400 font-mono transition-all duration-300"
      : "text-green-600 font-mono transition-all duration-300";
  };

  const getThemeAwareEncryptedClasses = () => {
    if (encryptedClassName) {
      return encryptedClassName;
    }

    return theme === "dark"
      ? "text-gray-500 font-mono opacity-70 transition-all duration-150"
      : "text-gray-400 font-mono opacity-60 transition-all duration-150";
  };

  const getThemeAwareParentClasses = () => {
    if (parentClassName) {
      return parentClassName;
    }

    return "inline-block cursor-pointer transition-all duration-300";
  };

  const defaultClassName = getThemeAwareClasses();
  const defaultEncryptedClassName = getThemeAwareEncryptedClasses();
  const defaultParentClassName = getThemeAwareParentClasses();

  // Helper to get next index for center reveal
  const getCenterRevealIndex = useCallback(
    (revealedSet: Set<number>, textLength: number): number => {
      const middle = Math.floor(textLength / 2);
      const offset = Math.floor(revealedSet.size / 2);
      const nextIndex =
        revealedSet.size % 2 === 0 ? middle + offset : middle - offset - 1;

      if (
        nextIndex >= 0 &&
        nextIndex < textLength &&
        !revealedSet.has(nextIndex)
      ) {
        return nextIndex;
      }
      for (let i = 0; i < textLength; i++) {
        if (!revealedSet.has(i)) {
          return i;
        }
      }
      return 0;
    },
    [],
  );

  // Helper to get next index based on reveal direction
  const getNextIndex = useCallback(
    (revealedSet: Set<number>): number => {
      const textLength = text.length;
      switch (revealDirection) {
        case "start":
          return revealedSet.size;
        case "end":
          return textLength - 1 - revealedSet.size;
        case "center":
          return getCenterRevealIndex(revealedSet, textLength);
        default:
          return revealedSet.size;
      }
    },
    [text.length, revealDirection, getCenterRevealIndex],
  );

  useEffect(() => {
    let currentIteration = 0;

    const availableChars = useOriginalCharsOnly
      ? Array.from(new Set(text.split(""))).filter((char) => char !== " ")
      : characters.split("");

    // Helper function to check if a character is an emoji or special Unicode character
    const isEmojiOrSpecial = (char: string): boolean =>
      EMOJI_REGEX.test(char) || char.charCodeAt(0) > 127;

    // Use Array.from for proper Unicode character handling
    const getTextChars = (text: string): string[] => Array.from(text);

    const shuffleText = (
      originalText: string,
      currentRevealed: Set<number>,
    ): string => {
      const textChars = getTextChars(originalText);

      if (useOriginalCharsOnly) {
        const positions = textChars.map((char, i) => ({
          char,
          isSpace: char === " ",
          isEmoji: isEmojiOrSpecial(char),
          index: i,
          isRevealed: currentRevealed.has(i),
        }));

        const nonSpecialChars = positions
          .filter((p) => !(p.isSpace || p.isEmoji || p.isRevealed))
          .map((p) => p.char);

        for (let i = nonSpecialChars.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [nonSpecialChars[i], nonSpecialChars[j]] = [
            nonSpecialChars[j],
            nonSpecialChars[i],
          ];
        }

        let charIndex = 0;
        return positions
          .map((p) => {
            if (p.isSpace || p.isEmoji) {
              return p.char; // Preserve spaces and emojis
            }
            if (p.isRevealed) {
              return textChars[p.index];
            }
            return nonSpecialChars[charIndex++] || p.char;
          })
          .join("");
      }
      return textChars
        .map((char, i) => {
          if (char === " " || isEmojiOrSpecial(char)) {
            return char; // Preserve spaces and emojis
          }
          if (currentRevealed.has(i)) {
            return textChars[i];
          }
          return availableChars[
            Math.floor(Math.random() * availableChars.length)
          ];
        })
        .join("");
    };

    const startLoopCycle = () => {
      if (loop && animateOn === "view" && !isLooping) {
        setIsLooping(true);
        loopTimeoutRef.current = setTimeout(() => {
          setRevealedIndices(new Set());
          setIsHovering(false);
          setIsLooping(false);
          setTimeout(() => {
            setIsHovering(true);
            setIsScrambling(true);
          }, 100);
        }, loopDelay);
      }
    };

    const handleSequentialReveal = (prevRevealed: Set<number>) => {
      if (prevRevealed.size < text.length) {
        const nextIndex = getNextIndex(prevRevealed);
        const newRevealed = new Set(prevRevealed);
        newRevealed.add(nextIndex);
        setDisplayText(shuffleText(text, newRevealed));
        return newRevealed;
      }
      clearInterval(interval);
      setIsScrambling(false);
      startLoopCycle();
      return prevRevealed;
    };

    const handleRandomReveal = (prevRevealed: Set<number>) => {
      setDisplayText(shuffleText(text, prevRevealed));
      currentIteration++;
      if (currentIteration >= maxIterations) {
        clearInterval(interval);
        setIsScrambling(false);
        setDisplayText(text);
        startLoopCycle();
      }
      return prevRevealed;
    };

    if (!isHovering) {
      return () => {
        if (loopTimeoutRef.current) {
          clearTimeout(loopTimeoutRef.current);
        }
      };
    }

    const interval = setInterval(() => {
      setRevealedIndices((prevRevealed) => {
        if (sequential) {
          return handleSequentialReveal(prevRevealed);
        }
        return handleRandomReveal(prevRevealed);
      });
    }, speed);

    return () => {
      clearInterval(interval);
      if (loopTimeoutRef.current) {
        clearTimeout(loopTimeoutRef.current);
      }
    };
  }, [
    isHovering,
    text,
    speed,
    maxIterations,
    sequential,
    characters,
    useOriginalCharsOnly,
    loop,
    loopDelay,
    animateOn,
    isLooping,
    getNextIndex,
  ]);

  useEffect(() => {
    if (isHovering) {
      return;
    }

    const frame = requestAnimationFrame(() => {
      setDisplayText(text);
      setRevealedIndices(new Set());
      setIsScrambling(false);
    });

    return () => cancelAnimationFrame(frame);
  }, [isHovering, text]);

  useEffect(() => {
    if (animateOn !== "view") {
      return;
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      for (const entry of entries) {
        if (entry.isIntersecting && (!hasAnimated || loop)) {
          setIsHovering(true);
          setIsScrambling(true);
          if (!loop) {
            setHasAnimated(true);
          }
        }
      }
    };

    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );
    const currentRef = containerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [animateOn, hasAnimated, loop]);

  const hoverProps =
    animateOn === "hover"
      ? {
          onMouseEnter: () => {
            setIsHovering(true);
            setIsScrambling(true);
          },
          onMouseLeave: () => setIsHovering(false),
        }
      : {};

  const getThemeAwareGlow = () => {
    if (!(glowEffect && isHovering)) {
      return "";
    }

    return theme === "dark"
      ? "drop-shadow-[0_0_10px_rgba(34,197,94,0.5)]"
      : "drop-shadow-[0_0_8px_rgba(22,163,74,0.4)]";
  };

  const containerClasses = [
    defaultParentClassName,
    getThemeAwareGlow(),
    isScrambling ? "animate-pulse" : "",
  ]
    .filter(Boolean)
    .join(" ");
  const characterOccurrences = new Map<string, number>();

  return (
    <motion.span
      animate={{ opacity: 1, y: 0 }}
      className={`inline-block whitespace-pre-wrap ${containerClasses}`}
      initial={{ opacity: 0, y: 10 }}
      ref={containerRef}
      transition={{ duration: 0.5, ease: "easeOut" }}
      {...hoverProps}
      {...props}
    >
      {/* Screen reader accessible text */}
      <span className="sr-only">{text}</span>

      {/* Visual text with scramble effect */}
      <span aria-hidden="true" className="relative">
        {Array.from(displayText).map((char, index) => {
          const occurrence = (characterOccurrences.get(char) ?? 0) + 1;
          characterOccurrences.set(char, occurrence);
          const isRevealedOrDone =
            revealedIndices.has(index) || !isScrambling || !isHovering;

          const getAnimateProps = () => {
            if (!typewriterEffect) {
              return;
            }
            if (isRevealedOrDone) {
              return { opacity: 1, scale: 1 };
            }
            return { opacity: 0.7, scale: 0.9 };
          };

          return (
            <motion.span
              animate={getAnimateProps()}
              className={`${
                isRevealedOrDone ? defaultClassName : defaultEncryptedClassName
              } relative inline-block`}
              initial={
                typewriterEffect ? { opacity: 0, scale: 0.8 } : undefined
              }
              key={`${char}-${occurrence}-${displayText}`}
              transition={{
                duration: 0.2,
                delay: typewriterEffect ? index * 0.05 : 0,
                ease: "easeOut",
              }}
            >
              {char}
              {/* Subtle glow effect for revealed characters */}
              {glowEffect && isRevealedOrDone && (
                <span className="pointer-events-none absolute inset-0 text-green-400 opacity-50 blur-sm">
                  {char}
                </span>
              )}
            </motion.span>
          );
        })}

        {/* Cursor effect for typewriter mode */}
        {typewriterEffect && isScrambling && (
          <motion.span
            animate={{ opacity: [1, 0] }}
            className="ml-1 inline-block h-5 w-0.5 bg-green-400"
            transition={{
              duration: 0.8,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
        )}
      </span>
    </motion.span>
  );
}
