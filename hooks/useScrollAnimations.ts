"use client";

import { useEffect, type RefObject } from "react";
import {
  initScrollAnimations,
  refreshScrollAnimations,
} from "@/lib/scrollAnimations";

export function useScrollAnimations(
  ref: RefObject<HTMLElement | null>,
  deps: unknown[] = [],
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = initScrollAnimations(el);

    const t1 = setTimeout(refreshScrollAnimations, 150);
    const t2 = setTimeout(refreshScrollAnimations, 600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, ...deps]);
}
