import type { Metadata } from "next";
import { sharedOpenGraph } from "@/lib/site";
import Link from "next/link";
import { PageIntro } from "@/components/page-intro";
import { ServiceTile } from "@/components/service-icon";
import { SERVICES } from "@/lib/services";
import { btn } from "@/lib/ui";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Supported streaming services",
  description:
    "MusicMan works with Spotify, Apple Music, YouTube Music, Deezer and SoundCloud. See what plays, what syncs and where Ultimate can publish your tracks.",
  alternates: { canonical: "/services" },
  openGraph: { ...sharedOpenGraph, url: "/services", title: "Supported streaming services" },
};

const NEXT = ["Tidal", "Amazon Music", "Bandcamp", "Qobuz"];

export default function ServicesPage() {
  return (
    <>
      <PageIntro
        title="Works with the five services people use most"
        lead="Link any of them, or all five. Playback uses your own subscription to each service, so what you can play in MusicMan matches what you can play in their apps."
      />

      <section aria-labelledby="services-title" className="border-t border-line">
        <h2 id="services-title" className="sr-only">
          Supported services
        </h2>
        <ul className="mx-auto max-w-6xl px-4 sm:px-6">
          {SERVICES.map((s) => (
            <li key={s.id} className="grid gap-6 border-b border-line py-10 md:grid-cols-[220px_1fr] md:gap-10">
              <div className="flex items-center gap-4 md:items-start">
                <ServiceTile id={s.id} className="size-12" />
                <h3 className="text-xl font-semibold md:mt-2.5">{s.name}</h3>
              </div>
              <dl className="grid gap-6 sm:grid-cols-3">
                <div>
                  <dt className="text-sm text-smoke">Playback</dt>
                  <dd className="mt-2 leading-relaxed">{s.play}</dd>
                </div>
                <div>
                  <dt className="text-sm text-smoke">Library sync</dt>
                  <dd className="mt-2 leading-relaxed">{s.library}</dd>
                </div>
                <div>
                  <dt className="text-sm text-smoke">Publishing on Ultimate</dt>
                  <dd className="mt-2 leading-relaxed">{s.release}</dd>
                </div>
              </dl>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="next-title">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-24 sm:px-6 md:grid-cols-2 md:py-28">
          <div>
            <h2 id="next-title" className="font-display text-2xl font-medium tracking-tight sm:text-3xl">
              Coming next
            </h2>
            <p className="mt-4 max-w-[48ch] leading-relaxed text-ash">
              We’re building connections to these services now. Create an account and we’ll email you when yours is
              ready.
            </p>
          </div>
          <div>
            <ul className="flex flex-wrap gap-2">
              {NEXT.map((n) => (
                <li key={n} className="rounded-full border border-line px-4 py-2 text-ash">
                  {n}
                </li>
              ))}
            </ul>
            <Link href="/signup" className={cn(btn.solid, btn.md, "mt-8")}>
              Create free account
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
