"use client";

import Link from "next/link";
import { useId, useRef, useState, type FormEvent } from "react";
import { GoogleGlyph, ServiceGlyph } from "@/components/service-icon";
import type { ServiceId } from "@/lib/services";
import { btn } from "@/lib/ui";
import { cn } from "@/lib/utils";
import {
  PASSWORD_MAX,
  passwordRules,
  validateEmail,
  validateLogin,
  validatePassword,
  validateUsername,
} from "@/lib/validation";

type Mode = "login" | "signup";
type Field = "login" | "email" | "username" | "password";
/** idle → submitting → done; a provider click goes straight to done with its own message. */
type Status = { kind: "idle" } | { kind: "submitting" } | { kind: "done"; message: string };

const PROVIDERS: { id: "google" | ServiceId; name: string }[] = [
  { id: "google", name: "Google" },
  { id: "spotify", name: "Spotify" },
  { id: "apple-music", name: "Apple Music" },
  { id: "youtube-music", name: "YouTube Music" },
  { id: "deezer", name: "Deezer" },
  { id: "soundcloud", name: "SoundCloud" },
];

const validators: Record<Field, (v: string) => string | null> = {
  login: validateLogin,
  email: validateEmail,
  username: validateUsername,
  password: validatePassword,
};

export function AuthForm({ mode, planName }: { mode: Mode; planName?: string }) {
  const uid = useId();
  const fields: Field[] = mode === "login" ? ["login", "password"] : ["email", "username", "password"];
  const [values, setValues] = useState<Record<Field, string>>({ login: "", email: "", username: "", password: "" });
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const refs = useRef<Partial<Record<Field, HTMLInputElement | null>>>({});

  // Login only checks that the password is filled in; strength rules apply when it is created.
  const errorFor = (f: Field) => {
    if (mode === "login" && f === "password") return values.password ? null : "Enter your password.";
    return validators[f](values[f]);
  };
  const visibleError = (f: Field) => (touched[f] ? errorFor(f) : null);

  const set = (f: Field, v: string) => {
    setValues((s) => ({ ...s, [f]: v }));
    if (status.kind === "done") setStatus({ kind: "idle" });
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setTouched(Object.fromEntries(fields.map((f) => [f, true])));
    const firstInvalid = fields.find((f) => errorFor(f));
    if (firstInvalid) {
      refs.current[firstInvalid]?.focus();
      return;
    }
    setStatus({ kind: "submitting" });
    // No backend in this demo: nothing is sent or stored. Clear the password from memory right away.
    window.setTimeout(() => {
      setValues((s) => ({ ...s, password: "" }));
      setTouched((t) => ({ ...t, password: false }));
      setStatus({
        kind: "done",
        message:
          mode === "login"
            ? "This is a design demo, so there’s no account to log in to. Nothing you typed was sent or saved."
            : "This is a design demo, so no account was created. Nothing you typed was sent or saved.",
      });
    }, 700);
  };

  const onProvider = (name: string) =>
    setStatus({ kind: "done", message: `${name} sign-in isn’t connected in this demo, so nothing happened.` });

  const busy = status.kind === "submitting";
  const verb = mode === "login" ? "Log in" : "Sign up";

  const input =
    "mt-2 block h-12 w-full rounded-xl border bg-graphite px-4 text-base text-white placeholder:text-smoke transition-colors focus:border-white focus:outline-none aria-[invalid=true]:border-danger";

  return (
    <div>
      <ul className="grid gap-2.5 sm:grid-cols-2">
        {PROVIDERS.map((p) => (
          <li key={p.id}>
            <button
              type="button"
              onClick={() => onProvider(p.name)}
              className={cn(btn.quiet, "h-12 w-full justify-start px-4 text-[15px]")}
            >
              {p.id === "google" ? <GoogleGlyph /> : <ServiceGlyph id={p.id} />}
              {verb === "Log in" ? "Continue" : "Sign up"} with {p.name}
            </button>
          </li>
        ))}
      </ul>

      <p className="my-8 flex items-center gap-4 text-sm text-smoke">
        <span aria-hidden="true" className="h-px flex-1 bg-line" />
        or {mode === "login" ? "use your MusicMan account" : "use your email"}
        <span aria-hidden="true" className="h-px flex-1 bg-line" />
      </p>

      <form noValidate onSubmit={onSubmit}>
        {planName && (
          <p className="mb-6 rounded-xl border border-line px-4 py-3 text-sm text-ash">
            You’re signing up for <span className="text-white">{planName}</span>. You can change plans later.
          </p>
        )}

        <div className="space-y-5">
          {fields.map((f) => {
            const err = visibleError(f);
            const id = `${uid}-${f}`;
            const isPassword = f === "password";
            const label = {
              login: "Email or username",
              email: "Email",
              username: "Username",
              password: "Password",
            }[f];
            const describedBy = [err && `${id}-error`, isPassword && mode === "signup" && `${id}-rules`]
              .filter(Boolean)
              .join(" ");
            return (
              <div key={f}>
                <label htmlFor={id} className="text-sm font-medium">
                  {label}
                </label>
                <div className="relative">
                  <input
                    ref={(el) => {
                      refs.current[f] = el;
                    }}
                    id={id}
                    name={f}
                    type={isPassword ? (showPassword ? "text" : "password") : f === "email" ? "email" : "text"}
                    inputMode={f === "email" ? "email" : undefined}
                    autoComplete={
                      {
                        login: "username",
                        email: "email",
                        username: "username",
                        password: mode === "login" ? "current-password" : "new-password",
                      }[f]
                    }
                    autoCapitalize="none"
                    autoCorrect="off"
                    spellCheck={false}
                    maxLength={isPassword ? PASSWORD_MAX : 254}
                    required
                    value={values[f]}
                    onChange={(e) => set(f, e.target.value)}
                    onBlur={() => values[f] && setTouched((t) => ({ ...t, [f]: true }))}
                    aria-invalid={err ? true : undefined}
                    aria-describedby={describedBy || undefined}
                    className={cn(input, err ? "border-danger" : "border-input", isPassword && "pr-20")}
                  />
                  {isPassword && (
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      aria-controls={id}
                      className="absolute top-1/2 right-2 -translate-y-1/2 rounded-lg px-3 py-1.5 text-sm text-ash hover:text-white"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  )}
                </div>
                {err && (
                  <p id={`${id}-error`} className="mt-2 text-sm text-danger">
                    {err}
                  </p>
                )}
                {isPassword && mode === "signup" && (
                  <ul id={`${id}-rules`} className="mt-3 space-y-1.5 text-sm">
                    {passwordRules.map((r) => {
                      const ok = r.test(values.password);
                      return (
                        <li key={r.id} className={cn("flex items-center gap-2", ok ? "text-ok" : "text-ash")}>
                          <svg aria-hidden="true" viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                            {ok ? <path d="M3 8.5l3 3 7-7" /> : <circle cx="8" cy="8" r="2.5" />}
                          </svg>
                          {r.label}
                          <span className="sr-only">{ok ? "(done)" : "(not yet)"}</span>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            );
          })}
        </div>

        <button type="submit" disabled={busy} className={cn(btn.solid, btn.lg, "mt-8 w-full")}>
          {busy ? (mode === "login" ? "Logging in…" : "Creating account…") : mode === "login" ? "Log in" : "Create account"}
        </button>
      </form>

      <p
        id={`${uid}-status`}
        role="status"
        aria-live="polite"
        className={cn("text-sm leading-relaxed", status.kind === "done" && "mt-5 rounded-xl border border-line px-4 py-3 text-ash")}
      >
        {status.kind === "done" ? status.message : ""}
      </p>

      <p className="mt-8 text-center text-sm text-ash">
        {mode === "login" ? (
          <>
            New to MusicMan?{" "}
            <Link href="/signup" className="font-medium text-white underline underline-offset-4">
              Create an account
            </Link>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-white underline underline-offset-4">
              Log in
            </Link>
          </>
        )}
      </p>
    </div>
  );
}
