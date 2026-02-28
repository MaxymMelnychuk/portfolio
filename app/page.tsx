import Image from "next/image";
import Card from "@/components/ui/Card";

export default function Home() {
  return (
    <div className="relative min-h-screen font-montserrat bg-neutral-950">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-screen w-full overflow-hidden">
        <Image
          src="/hero-arc.png"
          alt="Decor Hero"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-40 pointer-events-none  select-none"
        />
      </div>

      <main className="relative mx-auto h-full w-full max-w-6xl flex flex-col items-center justify-center bg-[url('/hero-grid.png')] bg-no-repeat bg-size-[1200px] xl:bg-contain bg-top ">
        <div className="flex flex-col items-center gap-8 text-center  sm:text-left pt-52 relative ">
          <div className=" border border-neutral-600 rounded-sm bg-linear-to-b from-neutral-800 to-neutral-950 text-sm px-4 py-2">
            <p>Hi, i&apos;m Maxym Melnychuk 👋</p>
          </div>
          <h1 className=" text-5xl font-medium tracking-wide text-center  text-black dark:text-zinc-50">
            A developer who enjoys solving hard problems and building lasting
            systems.
          </h1>
          <p className="max-w-3xl text-sm text-center  text-zinc-600 dark:text-zinc-400">
            Driven by innovation, exploring the potential of AI, and turning
            ideas into scalable, high-impact products. I’m constantly learning,
            experimenting, and challenging myself to build solutions that solve
            real problems and create long-term value.
          </p>
        </div>
        <div className="mt-38 w-full">
          <p className="text-xl text-neutral-400 italic text-right mb-4">
            Latest projects
          </p>

          <div className="flex gap-4 w-full">
            <Card title="Moi Mon Cerveau" image="/project-image.png" />
            <Card title="Moi Mon Cerveau" image="/project-image.png" />
            <Card title="Moi Mon Cerveau" image="/project-image.png" />
          </div>
        </div>
      </main>
    </div>
  );
}
