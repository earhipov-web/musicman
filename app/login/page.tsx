import type { Metadata } from "next";
import { AuthForm } from "@/components/auth-form";

export const metadata: Metadata = {
  title: "Log in",
  description: "Log in to MusicMan with your email or username, Google, Spotify, Apple Music, YouTube Music, Deezer or SoundCloud.",
  alternates: { canonical: "/login" },
  robots: { index: false, follow: true },
};

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-xl px-4 py-16 sm:px-6 md:py-24">
      <h1 className="font-display text-3xl font-medium tracking-tight sm:text-4xl">Log in to MusicMan</h1>
      <p className="mt-3 text-ash">Pick up your queue where you left it.</p>
      <div className="mt-10">
        <AuthForm mode="login" />
      </div>
    </div>
  );
}
