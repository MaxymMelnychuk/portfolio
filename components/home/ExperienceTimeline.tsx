import { experience } from "@/data/experience";
import { SCROLL_ANIM } from "@/lib/animation";

export default function ExperienceTimeline() {
  return (
    <div className="relative pl-5">
      <div
        data-animate-line="v"
        data-animate-duration={SCROLL_ANIM.lineDuration}
        className="absolute left-0 top-1 bottom-1 w-px bg-neutral-800/80"
        aria-hidden="true"
      />

      <ol
        data-animate-stagger={SCROLL_ANIM.type}
        data-animate-stagger-delay={SCROLL_ANIM.stagger}
        data-animate-duration={SCROLL_ANIM.duration}
        className="flex flex-col gap-8 list-none"
      >
        {experience.map((item) => (
          <li
            key={`${item.role}-${item.company}`}
            data-animate-child
            className="relative pl-6"
          >
            <div
              className="absolute left-[-11px] top-1 h-2.5 w-2.5 rounded-full border border-neutral-500 bg-neutral-900"
              aria-hidden="true"
            />
            <div className="flex flex-col gap-1">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="text-sm text-neutral-200">
                  <span className="font-medium">{item.role}</span>
                  <span className="text-neutral-500"> · {item.company}</span>
                </p>
                <time className="text-xs text-neutral-500">{item.period}</time>
              </div>
              <ul className="text-xs text-neutral-400 max-w-[80%] space-y-1 list-disc pl-4">
                {item.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
