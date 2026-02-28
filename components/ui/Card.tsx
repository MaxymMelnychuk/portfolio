import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

type CardProps = {
  title: string;
  image: string;
};

export default function Card({ title, image }: CardProps) {
  return (
    <div className="flex h-full rounded-md flex-1 gap-4 flex-col border border-neutral-600  p-6 justify-between text-neutral-300">
      <div className="flex justify-between">
        <h3 className="text-md font-medium ">{title}</h3>
        <ArrowUpRightIcon className="ml-1 w-4 h-4 " />
      </div>
      <Image
        width={200}
        height={200}
        src={image}
        alt={title}
        className="w-full h-full"
      />
    </div>
  );
}
