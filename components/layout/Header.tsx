"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import StaggeredMenu from "@/components/animations/StaggeredMenu";
import MobileMenuButton from "@/components/layout/MobileMenuButton";
import { usePathname } from "next/navigation";

const externalLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/maxym-melnychuk-92891232b/",
  },
  { label: "Github", href: "https://github.com/MaxymMelnychuk" },
  { label: "Email", href: "mailto:maxym.melnychuk.pro@gmail.com" },
  { label: "CV", href: "./resume.pdf" },
] as const;

const menuItems = [
  { label: "Home", ariaLabel: "Go to home page", link: "/" },
  { label: "Projects", ariaLabel: "Go to projects page", link: "/projects" },
  { label: "Contact", ariaLabel: "Go to contact page", link: "/contact" },
] as const;

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isHome = pathname === "/";
  const isProjects = pathname.startsWith("/projects");
  const isContact = pathname.startsWith("/contact");

  const pathnameRef = useRef(pathname);

  useEffect(() => {
    document.body.classList.remove("menu-open");
  }, []);

  useEffect(() => {
    if (pathnameRef.current === pathname) return;
    pathnameRef.current = pathname;
    setMenuOpen(false);
  }, [pathname]);

  const navItem = (isActive: boolean) =>
    `relative before:content-['['] after:content-[']'] before:mr-1 after:ml-1 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500 rounded-sm ${
      isActive
        ? "text-white scale-105 before:text-white after:text-white"
        : "text-neutral-400 hover:text-white before:text-transparent after:text-transparent"
    }`;

  return (
    <header className="fixed top-3 left-0 right-0 mx-auto z-50 sm:px-6 lg:px-0 w-[calc(100vw-2rem)] max-w-7xl py-6 text-sm font-light text-neutral-300 font-rubik flex items-center">
      <div className="hidden lg:flex w-full items-center">
        <nav className="flex-1 flex" aria-label="Main navigation">
          <ul className="flex gap-4">
            <li>
              <Link
                href="/"
                className={navItem(isHome)}
                aria-current={isHome ? "page" : undefined}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/projects"
                className={navItem(isProjects)}
                aria-current={isProjects ? "page" : undefined}
              >
                Projects
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className={navItem(isContact)}
                aria-current={isContact ? "page" : undefined}
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        <div className="flex-1 flex justify-end">
          <ul className="flex gap-4" aria-label="External links">
            {externalLinks.map(({ label, href }) => (
              <li
                key={label}
                className="hover:text-white flex whitespace-nowrap transition-colors"
              >
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    href.startsWith("http") ? "noopener noreferrer" : undefined
                  }
                  aria-label={label}
                  className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500 rounded-sm"
                >
                  {label}
                </a>
                <ArrowUpRightIcon className="ml-1 w-3 h-3" aria-hidden="true" />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <MobileMenuButton
        open={menuOpen}
        onClick={() => setMenuOpen((prev) => !prev)}
      />

      <StaggeredMenu
        open={menuOpen}
        onOpenChange={setMenuOpen}
        socialItems={externalLinks.map(({ label, href }) => ({
          label,
          link: href,
        }))}
        items={[...menuItems]}
      />
    </header>
  );
}
