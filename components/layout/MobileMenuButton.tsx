"use client";

import { useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

type MobileMenuButtonProps = {
  open: boolean;
  onClick: () => void;
};

const subscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export default function MobileMenuButton({
  open,
  onClick,
}: MobileMenuButtonProps) {
  const mounted = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot,
  );

  if (!mounted || typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <button
      type="button"
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      aria-controls="mobile-menu-panel"
      onClick={onClick}
      className="fixed top-8 right-4 z-[10002] lg:hidden inline-flex items-center justify-center bg-transparent border-0 cursor-pointer text-[#e9e9ef] p-2 touch-manipulation [-webkit-tap-highlight-color:transparent]"
    >
      <span className="relative block h-4 w-[22px]" aria-hidden="true">
        <span
          className={`absolute left-0 h-0.5 w-full rounded-sm bg-current transition-all duration-300 ease-out ${
            open ? "top-[7px] rotate-45" : "top-0 rotate-0"
          }`}
        />
        <span
          className={`absolute left-0 top-[7px] h-0.5 w-full rounded-sm bg-current transition-all duration-300 ease-out ${
            open ? "scale-x-0 opacity-0" : "scale-x-100 opacity-100"
          }`}
        />
        <span
          className={`absolute left-0 h-0.5 w-full rounded-sm bg-current transition-all duration-300 ease-out ${
            open ? "top-[7px] -rotate-45" : "top-[14px] rotate-0"
          }`}
        />
      </span>
    </button>,
    document.body,
  );
}
