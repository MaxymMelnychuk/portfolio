export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center  font-montserrat bg-neutral-950">
      <main className="flex w-full max-w-6xl flex-col items-center justify-center bg-neutral-950">
        <div className="flex flex-col items-center gap-8 text-center  sm:text-left">
          <div className=" border border-gray-300 px-4 py-2">
            <p>Hi, i&apos;m Maxym Melnychuk 👋</p>
          </div>
          <h1 className=" text-5xl text-center font-semibold  tracking-tight text-black dark:text-zinc-50">
            A developer who enjoys solving hard problems and building lasting
            systems.
          </h1>
          <p className="max-w-4xl text-md text-center  text-zinc-600 dark:text-zinc-400">
            Driven by innovation, I love coding, exploring the potential of AI,
            and turning ideas into scalable, high-impact products. I’m
            constantly learning, experimenting, and challenging myself to build
            solutions that solve real problems and create long-term value.
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row"></div>
      </main>
    </div>
  );
}
