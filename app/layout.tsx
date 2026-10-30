import type { Metadata, Viewport } from "next";
import { SiteFooter } from "@/components/site-footer";
import { RouteTransition } from "@/components/route-transition";
import { SiteHeader } from "@/components/site-header";
import { manrope, unbounded } from "@/lib/fonts";
import { sharedOpenGraph, site } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: "%s | MusicMan" },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "music streaming aggregator",
    "all streaming services in one app",
    "Spotify and Apple Music in one player",
    "AI radio",
    "cross-platform playlists",
    "release music to multiple platforms",
  ],
  alternates: { canonical: "/" },
  openGraph: { ...sharedOpenGraph, title: site.title, description: site.description, url: "/" },
  twitter: { card: "summary_large_image", title: site.title, description: site.description, images: ["/opengraph-image"] },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`dark ${unbounded.variable} ${manrope.variable}`}>
      <body className="flex min-h-svh flex-col">
        <a
          href="#main"
          className="sr-only z-50 rounded-full bg-white px-4 py-2 text-sm text-black focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        <SiteFooter />
        <RouteTransition />
      </body>
    </html>
  );
}
