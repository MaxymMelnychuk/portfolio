import type { ComponentPropsWithoutRef } from "react";

type SectionHeadingProps = ComponentPropsWithoutRef<"h2"> & {
  align?: "left" | "center" | "right";
};

export default function SectionHeading({
  children,
  className = "",
  align = "left",
  ...props
}: SectionHeadingProps) {
  const alignClass =
    align === "right"
      ? "text-right"
      : align === "center"
        ? "text-center"
        : "text-left";

  return (
    <h2
      className={`font-inter font-medium text-zinc-50 tracking-tight ${alignClass} ${className}`.trim()}
      {...props}
    >
      {children}
    </h2>
  );
}
