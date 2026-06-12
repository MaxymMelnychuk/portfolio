import type { ComponentPropsWithoutRef } from "react";

type SectionLabelProps = ComponentPropsWithoutRef<"p">;

export default function SectionLabel({
  children,
  className = "",
  ...props
}: SectionLabelProps) {
  return (
    <p
      className={`text-xs uppercase tracking-[0.2em] text-neutral-500 ${className}`.trim()}
      {...props}
    >
      {children}
    </p>
  );
}
