import type { Metadata } from "next";
import { Montserrat, Rubik, Inter, Geist } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SmoothScrollProvider from "@/components/animations/SmoothScrollProvider";
import GradualBlur from "@/components/animations/GradualBlur";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-montserrat",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-inter",
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
    <html
      lang="en"
      className={cn("font-sans bg-neutral-950", geist.variable)}
      suppressHydrationWarning
    >
      <body
        className={`${montserrat.variable} ${rubik.variable} ${inter.variable} antialiased mx-auto relative bg-neutral-950`}
        suppressHydrationWarning
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-100 focus:px-4 focus:py-2 focus:bg-neutral-900 focus:text-white focus:rounded-md focus:ring-2 focus:ring-neutral-500"
        >
          Skip to content
        </a>
        <SmoothScrollProvider>
          <Header />
          <div id="main-content">{children}</div>
          <GradualBlur />
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
