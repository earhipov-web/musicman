import Link from "next/link";
import { btn } from "@/lib/ui";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-32 sm:px-6">
      <h1 className="font-display text-4xl font-medium tracking-tight sm:text-5xl">This page isn’t playing</h1>
      <p className="mt-4 max-w-md text-lg text-ash">The link may be old, or the address has a typo.</p>
      <Link href="/" className={cn(btn.solid, btn.md, "mt-10")}>
        Go to the home page
      </Link>
    </div>
  );
}
