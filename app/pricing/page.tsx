import type { Metadata } from "next";
import { sharedOpenGraph } from "@/lib/site";
import { PageIntro } from "@/components/page-intro";
import { PricingPlans } from "@/components/pricing-plans";

export const metadata: Metadata = {
  title: "Pricing: Free, Upgraded and Ultimate",
  description:
    "Listen free across every streaming service. Upgraded adds AI Mix Radio for $5.99/mo; Ultimate adds releases to every platform for $11.99/mo.",
  alternates: { canonical: "/pricing" },
  openGraph: { ...sharedOpenGraph, url: "/pricing", title: "MusicMan pricing" },
};

const ROWS: { label: string; free: boolean; upgraded: boolean; ultimate: boolean }[] = [
  { label: "Play tracks from every linked service", free: true, upgraded: true, ultimate: true },
  { label: "One search and one library", free: true, upgraded: true, ultimate: true },
  { label: "Mix Radio built from your whole collection", free: false, upgraded: true, ultimate: true },
  { label: "Playlists that mix services", free: false, upgraded: true, ultimate: true },
  { label: "Move playlists between services", free: false, upgraded: true, ultimate: true },
  { label: "Gapless playback and crossfade", free: false, upgraded: true, ultimate: true },
  { label: "Synced lyrics", free: false, upgraded: true, ultimate: true },
  { label: "Monthly taste report", free: false, upgraded: true, ultimate: true },
  { label: "Publish your tracks to every linked platform", free: false, upgraded: false, ultimate: true },
  { label: "AI release check", free: false, upgraded: false, ultimate: true },
  { label: "Scheduled releases", free: false, upgraded: false, ultimate: true },
  { label: "Cross-platform release stats", free: false, upgraded: false, ultimate: true },
];

const FAQ = [
  {
    q: "Do I still need my Spotify or Apple Music subscription?",
    a: "Yes. MusicMan plays music through your own accounts, so full-length playback follows each service’s rules. Free accounts on those services get the same previews they get in their own apps.",
  },
  {
    q: "What does Mix Radio use to choose the next track?",
    a: "Your saved music and listening history from every linked service: what you replay, what you skip and when you listen. You can open your taste profile and remove anything you don’t want it to use.",
  },
  {
    q: "Where can Ultimate publish my tracks?",
    a: "Directly to SoundCloud and YouTube Music, and to Spotify, Apple Music and Deezer through our distribution partner. You keep 100% of your royalties.",
  },
  {
    q: "Can I cancel any time?",
    a: "Yes. Cancel from your account settings and you’ll keep paid features until the end of the billing period, then move to Free. Your linked accounts and library stay.",
  },
];

const Mark = ({ on }: { on: boolean }) =>
  on ? (
    <>
      <svg aria-hidden="true" viewBox="0 0 16 16" className="mx-auto size-4" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 8.5l3 3 7-7" />
      </svg>
      <span className="sr-only">Included</span>
    </>
  ) : (
    <>
      <span aria-hidden="true" className="text-smoke">
        –
      </span>
      <span className="sr-only">Not included</span>
    </>
  );

export default function PricingPage() {
  return (
    <>
      <PageIntro
        title="Free to listen. Pay for the AI and the release tools."
        lead="Every plan works with all five services. Prices are in US dollars; yearly billing gives you two months free."
      />

      <section aria-label="Plans" className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        <PricingPlans />
      </section>

      <section aria-labelledby="compare-title" className="border-t border-line">
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
          <h2 id="compare-title" className="font-display text-3xl font-medium tracking-tight sm:text-4xl">
            Compare plans
          </h2>
          <div className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[560px] text-left">
              <caption className="sr-only">Features included in each MusicMan plan</caption>
              <thead>
                <tr className="border-b border-line">
                  <th scope="col" className="py-4 pr-6 text-sm font-normal text-ash">
                    Feature
                  </th>
                  {["Free", "Upgraded", "Ultimate"].map((p) => (
                    <th key={p} scope="col" className="w-28 py-4 text-center font-medium">
                      {p}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ROWS.map((r) => (
                  <tr key={r.label} className="border-b border-line">
                    <th scope="row" className="py-4 pr-6 font-normal">
                      {r.label}
                    </th>
                    <td className="py-4 text-center">
                      <Mark on={r.free} />
                    </td>
                    <td className="py-4 text-center">
                      <Mark on={r.upgraded} />
                    </td>
                    <td className="py-4 text-center">
                      <Mark on={r.ultimate} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section aria-labelledby="faq-title" className="border-t border-line">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-24 sm:px-6 md:grid-cols-[1fr_1.6fr]">
          <h2 id="faq-title" className="font-display text-3xl font-medium tracking-tight sm:text-4xl">
            Questions
          </h2>
          <div className="divide-y divide-line border-y border-line">
            {FAQ.map((item) => (
              <details key={item.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-medium [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <svg aria-hidden="true" viewBox="0 0 16 16" className="size-4 shrink-0 transition-transform group-open:rotate-45" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
                    <path d="M8 3v10M3 8h10" />
                  </svg>
                </summary>
                <p className="mt-3 max-w-[62ch] leading-relaxed text-ash">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
