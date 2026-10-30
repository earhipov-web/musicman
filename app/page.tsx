import Link from "next/link";
import { HeroIntro } from "@/components/hero-intro";
import { JsonLd } from "@/components/json-ld";
import { ServiceGlyph, ServiceTile } from "@/components/service-icon";
import { PLANS } from "@/lib/plans";
import { SERVICES, type ServiceId } from "@/lib/services";
import { site } from "@/lib/site";
import { btn } from "@/lib/ui";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    title: "Link your accounts",
    body: "Sign in to the services you already use. MusicMan never sees your passwords — each service hands us a revocable access key.",
  },
  {
    title: "Your library merges",
    body: "Saved songs, albums and playlists from every account land in one library. The same song saved twice shows up once.",
  },
  {
    title: "Press play",
    body: "Queue a Deezer album after a SoundCloud mix after a YouTube live set. It plays as one queue, with one set of controls.",
  },
];

const AI_FEATURES = [
  {
    title: "Mix Radio",
    body: "An endless station built from everything you’ve saved on every service. For each next track, the AI checks all your services and plays the one that fits your taste best right now.",
  },
  {
    title: "Track match",
    body: "Recognises the same recording across catalogues, even when titles differ, so duplicates collapse and playlists move between services without gaps.",
  },
  {
    title: "Taste profile",
    body: "Learns from skips, replays and the time of day you listen. You can open it, see why a track was picked and remove anything that doesn’t sound like you.",
  },
  {
    title: "Release check",
    body: "For artists on Ultimate: checks tags, artwork size and loudness against each platform’s rules before a track goes out.",
  },
];

const QUEUE: { title: string; artist: string; service: ServiceId; why: string }[] = [
  { title: "Saltwater Hours", artist: "Mira Vale", service: "soundcloud", why: "You replay slow synth intros" },
  { title: "Concrete Bloom", artist: "The Halves", service: "apple-music", why: "Same producer as your top track this week" },
  { title: "Low Orbit (Live)", artist: "Juno Fields", service: "youtube-music", why: "Only on YouTube — you saved the studio take" },
  { title: "Glass Weather", artist: "Odessa Row", service: "deezer", why: "Lossless on Deezer, so we picked that version" },
  { title: "Night Shift Radio", artist: "Lumen Park", service: "spotify", why: "Late-evening tempo you tend to keep playing" },
];

const REVIEWS = [
  {
    quote: "I had Spotify for playlists and Apple Music for albums, and kept switching apps mid-song. Now it’s one queue and I forgot which service a track is from.",
    name: "Dana K.",
    role: "Upgraded, 8 months",
  },
  {
    quote: "Mix Radio found a SoundCloud remix I saved three years ago and played it right after the original on Deezer. That’s the moment I stopped opening other apps.",
    name: "Tomás R.",
    role: "Upgraded, 1 year",
  },
  {
    quote: "I release lo-fi beats. Uploading to five platforms used to eat my Sunday. On Ultimate it’s one form and a release time.",
    name: "Ayo B.",
    role: "Ultimate, producer",
  },
  {
    quote: "Moving my 400-song running playlist from Spotify to YouTube Music took about a minute, and it only missed two bootlegs.",
    name: "Lena M.",
    role: "Upgraded, 5 months",
  },
  {
    quote: "The free plan is honestly enough for me. One search box for every catalogue is the feature I didn’t know I wanted.",
    name: "Chris O.",
    role: "Free",
  },
  {
    quote: "The release check caught that my cover art was too small for Apple Music before I pressed publish. Saved me a rejected release.",
    name: "Priya S.",
    role: "Ultimate, singer-songwriter",
  },
];

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            { "@type": "WebSite", name: site.name, url: site.url, description: site.description, inLanguage: "en" },
            {
              "@type": "SoftwareApplication",
              name: site.name,
              applicationCategory: "MultimediaApplication",
              operatingSystem: "iOS, Android, macOS, Windows, Web",
              description: site.description,
              url: site.url,
              offers: PLANS.map((p) => ({
                "@type": "Offer",
                name: p.name,
                price: p.price.toFixed(2),
                priceCurrency: "USD",
                url: `${site.url}/pricing`,
              })),
            },
          ],
        }}
      />

      <HeroIntro />

      {/* About */}
      <section aria-labelledby="about-title" className="border-t border-line">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-24 sm:px-6 md:grid-cols-[1fr_1.1fr] md:py-32">
          <div>
            <h2 id="about-title" className="font-display text-3xl leading-[1.15] font-medium tracking-tight sm:text-4xl">
              Your music is scattered. It shouldn’t be.
            </h2>
          </div>
          <div className="max-w-[62ch] space-y-5 text-lg leading-relaxed text-ash">
            <p>
              Most people who love music pay for one service and borrow from three others. The album is on Apple
              Music, the remix lives on SoundCloud, the live set is on YouTube, and every playlist you’ve made is
              stuck in Spotify.
            </p>
            <p>
              <span className="text-white">MusicMan sits on top of the services you already use.</span> Link your
              accounts once, and everything you’ve saved shows up in one library, plays in one queue and stays in
              sync both ways. Save a song in MusicMan and it’s saved in the service it came from, too.
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-4 pb-24 sm:px-6 md:pb-32">
          <h3 className="text-sm font-medium text-ash">How it works</h3>
          <ol className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
            {STEPS.map((step, i) => (
              <li key={step.title} className="bg-black p-7 md:p-8">
                <span className="font-display text-sm text-smoke" aria-hidden="true">
                  {i + 1}
                </span>
                <p className="mt-6 text-lg font-semibold">{step.title}</p>
                <p className="mt-2 leading-relaxed text-ash">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* AI */}
      <section aria-labelledby="ai-title" className="border-t border-line">
        <div className="mx-auto grid max-w-6xl items-start gap-14 px-4 py-24 sm:px-6 md:py-32 lg:grid-cols-[1fr_1fr]">
          <div>
            <h2 id="ai-title" className="font-display text-3xl leading-[1.15] font-medium tracking-tight sm:text-4xl">
              AI that knows your whole collection, not one app’s slice of it
            </h2>
            <p className="mt-5 max-w-[56ch] text-lg leading-relaxed text-ash">
              Recommendations inside a single service only see what you did there. MusicMan’s models learn from your
              listening across all of them, and they only work for you: your data builds your profile and is never
              sold.
            </p>
            <dl className="mt-12 grid gap-x-8 gap-y-9 sm:grid-cols-2">
              {AI_FEATURES.map((f) => (
                <div key={f.title}>
                  <dt className="font-semibold">{f.title}</dt>
                  <dd className="mt-2 leading-relaxed text-ash">{f.body}</dd>
                </div>
              ))}
            </dl>
          </div>

          <figure className="rounded-3xl border border-line bg-graphite p-5 sm:p-7 lg:sticky lg:top-24">
            <figcaption className="flex items-baseline justify-between gap-4">
              <span className="font-semibold">Mix Radio</span>
              <span className="text-sm text-smoke">Up next, picked from 5 services</span>
            </figcaption>
            <ul className="mt-6 divide-y divide-line">
              {QUEUE.map((t, i) => {
                const service = SERVICES.find((s) => s.id === t.service)!;
                return (
                  <li key={t.title} className="flex items-center gap-4 py-4">
                    <ServiceTile id={t.service} className="size-10" />
                    <div className="min-w-0 flex-1">
                      <p className={cn("font-medium", i === 0 ? "text-white" : "text-white/90")}>
                        {t.title}
                        <span className="text-ash"> by {t.artist}</span>
                      </p>
                      <p className="mt-0.5 text-sm text-smoke">{t.why}</p>
                    </div>
                    <span className="sr-only">from {service.name}</span>
                  </li>
                );
              })}
            </ul>
          </figure>
        </div>
      </section>

      {/* Reviews */}
      <section aria-labelledby="reviews-title" className="border-t border-line">
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 md:py-32">
          <h2 id="reviews-title" className="font-display text-3xl leading-[1.15] font-medium tracking-tight sm:text-4xl">
            What listeners say
          </h2>
          <ul className="mt-14 columns-1 gap-6 md:columns-2 lg:columns-3">
            {REVIEWS.map((r) => (
              <li key={r.name} className="mb-6 break-inside-avoid">
                <figure className="rounded-2xl border border-line p-6">
                  <blockquote className="text-[17px] leading-relaxed">“{r.quote}”</blockquote>
                  <figcaption className="mt-5 text-sm">
                    <span className="font-medium">{r.name}</span>
                    <span className="text-smoke">, {r.role}</span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Closing CTA */}
      <section aria-labelledby="cta-title" className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-10 px-4 py-24 sm:px-6 md:flex-row md:items-end md:justify-between md:py-28">
          <div>
            <div className="flex gap-2" aria-hidden="true">
              {SERVICES.map((s) => (
                <ServiceGlyph key={s.id} id={s.id} className="size-6" />
              ))}
            </div>
            <h2 id="cta-title" className="mt-6 font-display text-3xl leading-[1.15] font-medium tracking-tight sm:text-5xl">
              Five apps in. One out.
            </h2>
            <p className="mt-4 max-w-md text-lg text-ash">Free forever for listening. Upgrade when you want the AI.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/signup" className={cn(btn.solid, btn.lg)}>
              Create free account
            </Link>
            <Link href="/services" className={cn(btn.quiet, btn.lg)}>
              See supported services
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
