import { ImageResponse } from "next/og";
import { SERVICES, SERVICE_PATHS } from "@/lib/services";

export const alt = "MusicMan — every streaming service in one player";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#000",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
        }}
      >
        <div style={{ display: "flex", gap: 20 }}>
          {SERVICES.map((s) => (
            <div
              key={s.id}
              style={{
                width: 84,
                height: 84,
                borderRadius: 20,
                background: s.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: `0 0 60px ${s.color}66`,
              }}
            >
              <svg viewBox="0 0 24 24" width="48" height="48">
                <path d={SERVICE_PATHS[s.id]} fill={s.glyph} />
              </svg>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 120, fontWeight: 700, letterSpacing: -4 }}>MusicMan</div>
          <div style={{ fontSize: 40, color: "#a3a3a3", marginTop: 12 }}>Every streaming service. One player.</div>
        </div>
      </div>
    ),
    size,
  );
}
