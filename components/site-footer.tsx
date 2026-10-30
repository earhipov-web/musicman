import Link from "next/link";
import { mainNav } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="max-w-sm">
          <p className="font-display text-lg font-semibold">MusicMan</p>
          <p className="mt-3 text-sm leading-relaxed text-ash">
            One player for every streaming service you pay for.
          </p>
          <p className="mt-6 text-xs leading-relaxed text-smoke">
            MusicMan is a concept project made for a design portfolio. Spotify, Apple Music, YouTube Music, Deezer
            and SoundCloud are trademarks of their owners.
          </p>
        </div>
        <nav aria-label="Product">
          <p className="text-sm font-medium">Product</p>
          <ul className="mt-4 space-y-3 text-sm text-ash">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Account">
          <p className="text-sm font-medium">Account</p>
          <ul className="mt-4 space-y-3 text-sm text-ash">
            <li>
              <Link href="/signup" className="hover:text-white">Create an account</Link>
            </li>
            <li>
              <Link href="/login" className="hover:text-white">Log in</Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
