// Client-side checks only. A real backend must repeat every one of them.

export const PASSWORD_MIN = 8;
export const PASSWORD_MAX = 128; // caps hashing cost on the server

export const passwordRules = [
  { id: "length", label: `At least ${PASSWORD_MIN} characters`, test: (v: string) => v.length >= PASSWORD_MIN },
  { id: "special", label: "At least one symbol, like ! ? # or @", test: (v: string) => /[^A-Za-z0-9\s]/.test(v) },
] as const;

export function validatePassword(v: string): string | null {
  if (!v) return "Enter a password.";
  if (v.length > PASSWORD_MAX) return `Use ${PASSWORD_MAX} characters or fewer.`;
  if (!passwordRules.every((r) => r.test(v)))
    return `Use at least ${PASSWORD_MIN} characters, including one symbol like ! ? # or @.`;
  return null;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateEmail(v: string): string | null {
  const s = v.trim();
  if (!s) return "Enter your email address.";
  if (s.length > 254 || !EMAIL_RE.test(s)) return "Enter an email address like name@example.com.";
  return null;
}

const USERNAME_RE = /^[a-zA-Z0-9._]{3,30}$/;

export function validateUsername(v: string): string | null {
  const s = v.trim();
  if (!s) return "Choose a username.";
  if (!USERNAME_RE.test(s)) return "Use 3–30 letters, numbers, dots or underscores.";
  return null;
}

export function validateLogin(v: string): string | null {
  const s = v.trim();
  if (!s) return "Enter your email or username.";
  if (s.length > 254) return "That’s too long for an email or username.";
  return null;
}
