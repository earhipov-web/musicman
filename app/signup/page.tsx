import type { Metadata } from "next";
import { sharedOpenGraph } from "@/lib/site";
import { AuthForm } from "@/components/auth-form";
import { PLANS } from "@/lib/plans";

export const metadata: Metadata = {
  title: "Create your account",
  description: "Create a free MusicMan account and link Spotify, Apple Music, YouTube Music, Deezer and SoundCloud in one player.",
  alternates: { canonical: "/signup" },
  openGraph: { ...sharedOpenGraph, url: "/signup", title: "Create your MusicMan account" },
};

export default async function SignupPage({ searchParams }: { searchParams: Promise<{ plan?: string | string[] }> }) {
  const { plan } = await searchParams;
  // Only known plan ids are shown; the query string is never rendered as-is.
  const chosen = PLANS.find((p) => p.id === plan && p.id !== "free");
  return (
    <div className="mx-auto max-w-xl px-4 py-16 sm:px-6 md:py-24">
      <h1 className="font-display text-3xl font-medium tracking-tight sm:text-4xl">Create your account</h1>
      <p className="mt-3 text-ash">Free to listen. Link your services in the next step.</p>
      <div className="mt-10">
        <AuthForm mode="signup" planName={chosen?.name} />
      </div>
    </div>
  );
}
