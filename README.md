# MusicMan

Concept website for **MusicMan**, a player that brings Spotify, Apple Music, YouTube Music, Deezer and SoundCloud into one app, with AI radio built from your whole collection. Made for a design portfolio; there is no real backend.

## Pages

| Route | What's there |
| --- | --- |
| `/` | Animated intro (five service icons spin into a ring, merge into a dot that becomes the tittle of the *i* in MusicMan), about, how it works, AI features, reviews |
| `/why` | Advantages and a before/after comparison |
| `/services` | Supported services: playback, library sync and publishing per service |
| `/pricing` | Free, Upgraded and Ultimate plans, monthly/yearly toggle, comparison table, FAQ |
| `/login` | Log in with email/username + password, Google, Spotify, Apple Music, YouTube Music, Deezer or SoundCloud |
| `/signup` | Same providers, plus email, username and a password of at least 8 characters with one symbol |

Route changes show the `WaveformLoader` for about 1 s, never more than 1.5 s.

## Stack

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · shadcn/ui structure (`components/ui`) · framer-motion · Unbounded + Manrope via `next/font`.

## Run locally

```bash
npm install
npm run dev
```

Set `NEXT_PUBLIC_SITE_URL` to the production origin before deploying. Canonical URLs, the sitemap and Open Graph tags are built from it.

## Security notes

- Strict headers in `next.config.ts`: CSP, `frame-ancestors 'none'`, `nosniff`, HSTS, Referrer-Policy, Permissions-Policy.
- Auth forms validate on the client only, send nothing, store nothing, and clear the password from state after submit. A real backend must repeat every check (`lib/validation.ts`) server-side.
- The `?plan=` query on `/signup` is matched against known plan ids and is never rendered as-is.

## Accessibility and SEO

- Skip link, visible focus rings, labelled inputs with inline errors, focus moves to the first invalid field and to `<main>` after navigation.
- The intro respects `prefers-reduced-motion` and has a Skip / Replay control.
- Per-page titles, descriptions and canonicals, Open Graph image, `sitemap.xml`, `robots.txt` and JSON-LD (`WebSite`, `SoftwareApplication` with plan offers).

Service names and logos are trademarks of their owners.
