import type { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types";

export const site = {
  name: "MusicMan",
  title: "MusicMan — every streaming service in one player",
  description:
    "MusicMan puts Spotify, Apple Music, YouTube Music, Deezer and SoundCloud in one player, with AI radio built from your whole collection.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
};

export const mainNav = [
  { href: "/why", label: "Why MusicMan" },
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
] as const;

// Per-page openGraph objects replace the root one, so every page spreads this in.
export const sharedOpenGraph: OpenGraph = {
  type: "website",
  siteName: site.name,
  locale: "en_US",
  images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: site.title }],
};
