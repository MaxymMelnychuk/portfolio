"use client";

import Link from "next/link";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isProjects = pathname.startsWith("/projects");
  const isContact = pathname.startsWith("/contact");

  return (
    <header className="fixed top-3 left-1/2 z-50 w-[calc(100vw-2rem)] max-w-6xl -translate-x-1/2 rounded-md border border-neutral-800 bg-[#090909] p-3 text-sm font-light text-neutral-300 shadow-[0_0_10px_rgba(0,0,0,0.6)] backdrop-blur font-rubik flex items-center">
      <div className="flex-1">
        <Link
          href="/"
          className="inline-block px-1 text-xl font-medium italic bg-linear-to-t from-neutral-500 to-neutral-300 bg-clip-text text-transparent"
        >
          MM
        </Link>
      </div>
      <nav className="flex-1 flex justify-center">
        <ul className="flex gap-6">
          <li
            className={`transition-colors duration-300 ease-in-out ${
              isHome
                ? "text-white scale-105"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <Link href="/">{isHome ? "[ Home ]" : "Home"}</Link>
          </li>
          <li
            className={`transition-colors duration-300 ease-in-out ${
              isProjects
                ? "text-white scale-105"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <Link href="/projects">
              {isProjects ? "[ Projects ]" : "Projects"}
            </Link>
          </li>
          <li
            className={`transition-colors duration-300 ease-in-out ${
              isContact
                ? "text-white scale-105"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <Link href="/contact">{isContact ? "[ Contact ]" : "Contact"}</Link>
          </li>
        </ul>
      </nav>
      <div className="flex-1 flex justify-end">
        <ul className="flex gap-4">
          <li className="hover:text-white flex whitespace-nowrap transition-colors duration-300 ease-in-out">
            <a href="https://www.linkedin.com/in/maxym-melnychuk-92891232b/">
              Linkedin
            </a>
            <ArrowUpRightIcon className="ml-1 w-3 h-3" />
          </li>
          <li className="hover:text-white flex whitespace-nowrap transition-colors duration-300 ease-in-out">
            <a href="https://github.com/MaxymMelnychuk">Github</a>
            <ArrowUpRightIcon className="ml-1 w-3 h-3" />
          </li>
          <li className="hover:text-white flex whitespace-nowrap transition-colors duration-300 ease-in-out">
            <a href="mailto:maxym.melnychuk.pro@gmail.com">Email</a>
            <ArrowUpRightIcon className="ml-1 w-3 h-3" />
          </li>
          <li className="hover:text-white flex whitespace-nowrap transition-colors duration-300 ease-in-out">
            <a href="#">CV</a>
            <ArrowUpRightIcon className="ml-1 w-3 h-3" />
          </li>
        </ul>
      </div>
    </header>
  );
}
