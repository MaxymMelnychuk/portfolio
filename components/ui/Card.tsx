import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

type CardProps = {
  title: string;
  image: string;
};

export default function Card({ title, image }: CardProps) {
  return (
    <a href="/projects" className="flex h-full group rounded-md flex-1  gap-4 flex-col border border-neutral-600  p-6 justify-between text-neutral-300 cursor-pointer">
      <div className="flex justify-between">
        <h3 className="text-md font-medium ">{title}</h3>
        <ArrowUpRightIcon className="ml-1 w-4 h-4 transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </div>
      <Image
        width={200}
        height={200}
        src={image}
        alt={title}
        className="w-full  aspect-4/3"
      />
    </a>
  );
}
