import Link from "next/link";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

type CardProps = {
  title: string;
  image: string;
  githubUrl: string;
  priority?: boolean;
};

export default function Card({
  title,
  image,
  githubUrl,
  priority = false,
}: CardProps) {
  return (
    <Link
      href={githubUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`View ${title} on GitHub`}
      className="flex relative z-0 h-full min-h-[320px] group rounded-md flex-1 gap-4 flex-col justify-between text-neutral-300 cursor-pointer overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
    >
      <span
        className="absolute left-1/2 -translate-x-1/2 w-[50%] h-[1.5px] bg-linear-to-r from-transparent via-neutral-200 to-transparent transition-all duration-300 group-hover:opacity-100 group-hover:scale-x-110 before:content-[''] before:absolute before:inset-0 before:bg-white/30 before:blur-md before:translate-y-[-2px] before:opacity-0 group-hover:before:opacity-100"
        aria-hidden="true"
      />

      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-1/4 left-1/2 -translate-x-1/2 w-[160%] h-[60%] bg-gray-400/20 blur-3xl rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      <div
        className="z-1 absolute bg-linear-to-b from-transparent to-neutral-950 h-full w-full inset-0 p-32"
        aria-hidden="true"
      />

      <div className="border border-neutral-600 rounded-md p-6 flex flex-col gap-4 h-full">
        <div className="flex justify-between z-1">
          <h3 className="text-md font-medium font-inter">{title}</h3>
          <ArrowUpRightIcon
            className="ml-1 w-4 h-4 transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 text-neutral-500 group-hover:text-neutral-400"
            aria-hidden="true"
          />
        </div>

        <div className="relative w-full aspect-4/3">
          <Image
            src={image}
            alt={`${title} project preview`}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            priority={priority}
            loading={priority ? undefined : "lazy"}
            className="relative z-10 object-contain rounded-md transition-all duration-200 group-hover:-translate-y-1 group-hover:opacity-200 opacity-70"
          />
        </div>
      </div>
    </Link>
  );
}
