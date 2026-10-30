import { SERVICE_PATHS, SERVICES, type ServiceId } from "@/lib/services";
import { cn } from "@/lib/utils";

/** App-icon tile in the service's own color, as in the intro animation. */
export function ServiceTile({ id, className }: { id: ServiceId; className?: string }) {
  const service = SERVICES.find((s) => s.id === id)!;
  return (
    <span
      aria-hidden="true"
      className={cn("inline-flex shrink-0 items-center justify-center rounded-[22%]", className)}
      style={{ background: service.color }}
    >
      <svg viewBox="0 0 24 24" className="size-[58%]">
        <path d={SERVICE_PATHS[id]} fill={service.glyph} />
      </svg>
    </span>
  );
}

/** Bare glyph in the service color, for buttons on dark surfaces. */
export function ServiceGlyph({ id, className }: { id: ServiceId; className?: string }) {
  const service = SERVICES.find((s) => s.id === id)!;
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={cn("size-5 shrink-0", className)}>
      <path d={SERVICE_PATHS[id]} fill={service.color} />
    </svg>
  );
}

export function GoogleGlyph({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={cn("size-5 shrink-0", className)}>
      <path fill="#4285F4" d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.46a5.52 5.52 0 0 1-2.4 3.62v3h3.88c2.27-2.09 3.58-5.17 3.58-8.81Z" />
      <path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.94-2.92l-3.88-3A7.2 7.2 0 0 1 12 19.2a7.17 7.17 0 0 1-6.73-4.96H1.26v3.1A12 12 0 0 0 12 24Z" />
      <path fill="#FBBC05" d="M5.27 14.24A7.2 7.2 0 0 1 4.89 12c0-.78.14-1.53.38-2.24v-3.1H1.26A12 12 0 0 0 0 12c0 1.94.46 3.77 1.26 5.34l4.01-3.1Z" />
      <path fill="#EA4335" d="M12 4.77c1.76 0 3.34.61 4.59 1.8l3.44-3.44A11.97 11.97 0 0 0 12 0 12 12 0 0 0 1.26 6.66l4.01 3.1A7.17 7.17 0 0 1 12 4.77Z" />
    </svg>
  );
}
