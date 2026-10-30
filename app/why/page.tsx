import type { Metadata } from "next";
import { sharedOpenGraph } from "@/lib/site";
import Link from "next/link";
import { PageIntro } from "@/components/page-intro";
import { btn } from "@/lib/ui";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Why MusicMan",
  description:
    "One library, one queue and AI radio across every streaming service, plus one-click releases to every platform. Here’s why people switch to MusicMan.",
  alternates: { canonical: "/why" },
  openGraph: { ...sharedOpenGraph, url: "/why", title: "Why MusicMan" },
};

const COMPARE = [
  { label: "Apps open to play your music", before: "Up to 5", after: "1" },
  { label: "Searches to find a track", before: "One per app", after: "1" },
  { label: "Playlists that mix services", before: "Not possible", after: "Any" },
  { label: "Time to move a 400-song playlist", before: "An evening", after: "About a minute" },
  { label: "Forms to release a single", before: "One per platform", after: "1" },
];

const REASONS = [
  {
    title: "Nothing to migrate",
    body: "Keep the subscriptions you have. MusicMan plays through them, so your history, likes and artist payouts stay where they are.",
  },
  {
    title: "Everything you saved, together",
    body: "One library holds your songs, albums and playlists from every account. Sort it by date added across all of them, not app by app.",
  },
  {
    title: "Changes go both ways",
    body: "Like a track in MusicMan and it’s liked in the service it came from. Edit a playlist in the Spotify app and MusicMan updates within seconds.",
  },
  {
    title: "The best version plays",
    body: "If a song is on three services, MusicMan plays the highest-quality copy you can access: lossless on Deezer or Apple Music, the original upload on SoundCloud.",
  },
  {
    title: "Recommendations that see everything",
    body: "Our AI learns from all your listening, not one app’s slice. That’s why Mix Radio can follow a Spotify classic with the SoundCloud remix you forgot you liked.",
  },
  {
    title: "Your accounts stay yours",
    body: "We connect through each service’s official sign-in. We never see your passwords, and you can disconnect any service in one tap.",
  },
];

export default function WhyPage() {
  return (
    <>
      <PageIntro
        title="One player that respects the services you already pay for"
        lead="Streaming services compete for your whole library. MusicMan lets you keep all of them and stop switching between them."
      />

      <section aria-labelledby="reasons-title" className="border-t border-line">
        <h2 id="reasons-title" className="sr-only">
          Advantages
        </h2>
        <ul className="mx-auto grid max-w-6xl px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-3">
          {REASONS.map((r) => (
            <li key={r.title} className="border-b border-line py-10 md:pr-10">
              <h3 className="text-xl font-semibold">{r.title}</h3>
              <p className="mt-3 max-w-[48ch] leading-relaxed text-ash">{r.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="compare-title">
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 md:py-32">
          <h2 id="compare-title" className="font-display text-3xl leading-[1.15] font-medium tracking-tight sm:text-4xl">
            Before and after
          </h2>
          <div className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[520px] text-left">
              <caption className="sr-only">Listening with separate apps compared with MusicMan</caption>
              <thead>
                <tr className="border-b border-line text-sm text-ash">
                  <th scope="col" className="py-4 pr-6 font-normal">
                    Task
                  </th>
                  <th scope="col" className="py-4 pr-6 font-normal">
                    Separate apps
                  </th>
                  <th scope="col" className="py-4 font-medium text-white">
                    MusicMan
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARE.map((row) => (
                  <tr key={row.label} className="border-b border-line">
                    <th scope="row" className="py-5 pr-6 font-normal">
                      {row.label}
                    </th>
                    <td className="py-5 pr-6 text-smoke">{row.before}</td>
                    <td className="py-5 font-display font-medium">{row.after}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-14 flex flex-wrap gap-3">
            <Link href="/signup" className={cn(btn.solid, btn.lg)}>
              Start listening free
            </Link>
            <Link href="/pricing" className={cn(btn.quiet, btn.lg)}>
              Compare plans
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
