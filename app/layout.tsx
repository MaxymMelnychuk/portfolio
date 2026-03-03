import type { Metadata } from "next";
import { Montserrat, Rubik } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-montserrat",
});

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-rubik",
});

export const metadata: Metadata = {
  title: "Maxym Melnychuk — Portfolio",
  description:
    "Portfolio of Maxym Melnychuk, a developer focused on clean interfaces, reliable systems, and long-term quality.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${rubik.variable} antialiased mx-auto relative`}
      >
        <Header />
        {children}
        <footer className="py-6 text-xs font-light flex justify-center gap-1 text-neutral-300 border-t border-neutral-800">
          <p>Maxym Melnychuk -</p>
          <p>© {new Date().getFullYear()} All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
