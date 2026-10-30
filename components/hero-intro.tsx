"use client";

import Link from "next/link";
import { Fragment, useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { unbounded } from "@/lib/fonts";
import { SERVICE_PATHS, type ServiceId } from "@/lib/services";
import { btn } from "@/lib/ui";
import { cn } from "@/lib/utils";

/*
  Port of the "MusicMan Intro" composition: five service icons appear with a
  coloured glow, spin in a ring, merge into a white dot that levitates, and the
  dot becomes the tittle of the i in "MusicMan".
  The scene is authored on a 1920×1080 stage and scaled to fit the hero.
*/

const W = 1920;
const H = 1080;
const CX = W / 2;
const CY = H / 2;

// Scene start times in seconds (Appear 3.2 → Spin 4.5 → Merge 2 → Levitate 1.1 → Reveal 5.5).
const C = { Appear: 0, Spin: 3.2, Merge: 7.7, Levitate: 9.7, Reveal: 10.8, End: 16.3 };
const TURNS = 8;
const GLOW = 1;

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const easeOutBack = (t: number) => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};
const cl = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const hx = (v: number) => Math.round(cl(v) * 255).toString(16).padStart(2, "0");

const LOGOS: { id: ServiceId; color: string; glyph: string }[] = [
  { id: "deezer", color: "#A238FF", glyph: "#fff" },
  { id: "youtube-music", color: "#FF0033", glyph: "#fff" },
  { id: "spotify", color: "#1ED760", glyph: "#000" },
  { id: "soundcloud", color: "#FF5500", glyph: "#fff" },
  { id: "apple-music", color: "#FA2D48", glyph: "#fff" },
];
const SIZE = 150;
const RAD = 34;
const FOCAL = 1500;
const BASE = [0, 72, 144, -144, -72].map((d) => (d * Math.PI) / 180);

function logoState(i: number, t: number) {
  const a = easeOutCubic(cl((t - (C.Appear + 0.3 + i * 0.35)) / 1.1));
  const g = easeInOutCubic(cl((t - (C.Appear + 0.8 + i * 0.35)) / 1.2));
  const sS = cl((t - C.Spin) / (C.Merge - C.Spin));
  const m = easeInOutCubic(cl(sS / 0.28));
  const u = cl((t - C.Spin) / (C.Merge + 1.3 - C.Spin));
  const c = easeInOutCubic(cl((t - (C.Merge - 1.4)) / 2.5));
  const R = 420 * (1 - c);
  const th = BASE[i] + TURNS * 2 * Math.PI * Math.pow(u, 2.6);
  const z = R * Math.cos(th) * m;
  const x = (i - 2) * 300 * (1 - m) + R * Math.sin(th) * m;
  const y = (1 - a) * 30 * (1 - m) + z * 0.2;
  const persp = FOCAL / (FOCAL - z);
  const scale = (0.86 + 0.14 * a) * persp * (1 - 0.2 * sS) * (1 - 0.88 * c);
  const op = a * (1 - easeInOutCubic(cl((t - (C.Merge + 0.1)) / 0.9)));
  const dim = R > 0 ? 1 - 0.45 * m * (1 - (z / R + 1) / 2) : 1;
  return { x, y, z, scale, op, glow: g, dim, m, c, blur: 6 * Math.pow(sS, 3) + 7 * c, speed: Math.pow(u, 1.6) * (1 - c) };
}

function AppIcon({ logo, glow }: { logo: (typeof LOGOS)[number]; glow: number }) {
  const k = glow * GLOW;
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        borderRadius: RAD,
        background: logo.color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: `0 0 16px ${logo.color}${hx(0.9 * k)}, 0 0 50px ${logo.color}${hx(0.6 * k)}, 0 0 120px ${logo.color}${hx(0.35 * k)}, 0 0 220px ${logo.color}${hx(0.18 * k)}`,
      }}
    >
      <svg viewBox="0 0 24 24" width={SIZE * 0.58} height={SIZE * 0.58} style={{ display: "block" }}>
        <path d={SERVICE_PATHS[logo.id]} fill={logo.glyph} />
      </svg>
    </div>
  );
}

function Palm({ T }: { T: number }) {
  const s = logoState(0, T);
  const o = s.m * (1 - s.c);
  return (
    <div
      style={{
        position: "absolute",
        left: CX - 620,
        top: CY + 30,
        width: 1240,
        height: 200,
        borderRadius: "50%",
        background: "radial-gradient(ellipse at center, rgba(255,255,255,0.14) 0%, rgba(200,170,255,0.05) 45%, transparent 70%)",
        opacity: o * (0.85 + 0.15 * Math.sin(T * 2.4)),
        filter: "blur(10px)",
      }}
    />
  );
}

function Logos({ T }: { T: number }) {
  return LOGOS.map((logo, i) => {
    const s = logoState(i, T);
    const ghosts = [];
    if (s.speed > 0.12 && s.op > 0) {
      for (let j = 1; j <= 6; j++) {
        const g = logoState(i, T - j * 0.02);
        ghosts.push(
          <div
            key={j}
            style={{
              position: "absolute",
              left: CX + g.x - SIZE / 2,
              top: CY + g.y - SIZE / 2,
              width: SIZE,
              height: SIZE,
              borderRadius: RAD,
              background: logo.color,
              zIndex: Math.round(g.z) + 999,
              opacity: s.op * s.speed * (1 - j / 7) * 0.4,
              transform: `scale(${g.scale * 0.9})`,
              filter: `blur(${14 + j * 3}px)`,
            }}
          />,
        );
      }
    }
    return (
      <Fragment key={logo.id}>
        {ghosts}
        <div
          style={{
            position: "absolute",
            left: CX + s.x - SIZE / 2,
            top: CY + s.y - SIZE / 2,
            width: SIZE,
            height: SIZE,
            zIndex: Math.round(s.z) + 1000,
            opacity: s.op,
            transform: `scale(${s.scale})`,
            filter: `blur(${s.blur}px) brightness(${s.dim})`,
          }}
        >
          <AppIcon logo={logo} glow={s.glow} />
        </div>
      </Fragment>
    );
  });
}

const WORD = "MusicMan".split("");
const I_IDX = 3;
const FS = 168;

type Metrics = { xs: number[]; dotX: number; dotY: number; dotD: number };

function useWordMetrics() {
  const refs = useRef<(HTMLSpanElement | null)[]>([]);
  const [mt, setMt] = useState<Metrics | null>(null);
  useEffect(() => {
    let alive = true;
    const font = `600 ${FS}px ${unbounded.style.fontFamily}`;
    const measure = () => {
      const els = refs.current;
      const el = els[I_IDX];
      if (!alive || !el) return;
      const cv = document.createElement("canvas").getContext("2d");
      if (!cv) return;
      cv.font = font;
      const mi = cv.measureText("i");
      const md = cv.measureText("ı");
      const fA = md.fontBoundingBoxAscent || FS * 0.95;
      const fD = md.fontBoundingBoxDescent || FS * 0.25;
      const sw = md.actualBoundingBoxRight + md.actualBoundingBoxLeft;
      const baseline = el.offsetTop + (FS - (fA + fD)) / 2 + fA;
      setMt({
        xs: els.map((e) => (e ? e.offsetLeft + e.offsetWidth / 2 : CX)),
        dotX: el.offsetLeft + (md.actualBoundingBoxRight - md.actualBoundingBoxLeft) / 2,
        dotY: baseline - mi.actualBoundingBoxAscent + sw / 2,
        dotD: sw,
      });
    };
    (document.fonts ? document.fonts.load(font).then(() => document.fonts.ready) : Promise.resolve()).then(() =>
      requestAnimationFrame(measure),
    );
    return () => {
      alive = false;
    };
  }, []);
  return [refs, mt] as const;
}

function Finale({ T }: { T: number }) {
  const [refs, mt] = useWordMetrics();
  const R0 = C.Reveal;
  const dotX = mt ? mt.dotX : CX;
  const dotY = mt ? mt.dotY : CY - 70;
  const dotD = mt ? mt.dotD : 30;
  // The orb appears out of the collapse, levitates, then glides to the tittle.
  const appear = easeInOutCubic(cl((T - (C.Merge + 0.15)) / 1.1));
  const amp = 26 * easeOutCubic(cl((T - C.Merge - 0.9) / 0.9)) * (1 - easeInOutCubic(cl((T - R0) / 0.7)));
  const bob = -amp * Math.sin((2 * Math.PI * Math.max(0, T - C.Merge - 0.9)) / 1.8);
  const go = easeInOutCubic(cl((T - R0) / 1.0));
  const D = 34;
  const ox = CX + (dotX - CX) * go;
  const oy = CY + bob + (dotY - CY) * go;
  const oScale = (0.4 + 0.6 * appear) * (1 + (dotD / D - 1) * go);
  const flash = Math.max(0, 1 - Math.abs(T - (C.Merge + 0.55)) / 0.8);
  const halo = (0.8 + 0.2 * Math.sin(T * 3.1)) * (1 - 0.5 * go);
  // The stem drops out of the dot.
  const st = cl((T - (R0 + 0.95)) / 0.7);
  const stem = st <= 0 ? 0 : easeOutBack(st);
  const breathe = (0.9 + 0.1 * Math.sin((T - R0) * 2.2)) * GLOW;
  const shadow = `0 0 18px rgba(255,255,255,${0.55 * breathe}), 0 0 60px rgba(255,255,255,${0.3 * breathe}), 0 0 120px rgba(255,255,255,${0.15 * breathe})`;
  const iX = mt ? mt.xs[I_IDX] : CX;

  return (
    <>
      <div
        style={{
          position: "absolute",
          left: CX - 360,
          top: CY - 360,
          width: 720,
          height: 720,
          borderRadius: "50%",
          zIndex: 3000,
          background: "radial-gradient(circle, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.12) 18%, transparent 50%)",
          opacity: easeInOutCubic(flash) * 0.6,
          transform: `scale(${0.5 + flash * 0.5})`,
        }}
      />
      <div style={{ position: "absolute", inset: 0, zIndex: 3001 }}>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {WORD.map((ch, i) => {
            const isI = i === I_IDX;
            const d = Math.abs(i - I_IDX);
            const e = easeOutCubic(cl((T - (R0 + 1.45 + (d - 1) * 0.16)) / 1.1));
            const dx = mt ? (iX - mt.xs[i]) * (1 - e) : 0;
            const style: CSSProperties = isI
              ? { clipPath: `inset(0 -40px ${(1 - stem) * 100}% -40px)`, opacity: stem > 0 ? 1 : 0 }
              : {
                  opacity: mt ? cl(e * 1.4) : 0,
                  filter: `blur(${(1 - e) * 10}px)`,
                  transform: `translateX(${dx}px) scale(${0.85 + 0.15 * e})`,
                };
            return (
              <span
                key={i}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                style={{
                  display: "inline-block",
                  color: "#fff",
                  fontFamily: unbounded.style.fontFamily,
                  fontWeight: 600,
                  fontSize: FS,
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                  textShadow: shadow,
                  ...style,
                }}
              >
                {isI ? "ı" : ch}
              </span>
            );
          })}
        </div>
        <div
          style={{
            position: "absolute",
            left: ox - D / 2,
            top: oy - D / 2,
            width: D,
            height: D,
            opacity: appear,
            transform: `scale(${oScale})`,
          }}
        >
          <div
            style={{
              position: "absolute",
              left: -D * 2,
              top: -D * 2,
              width: D * 5,
              height: D * 5,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(255,255,255,0.22) 0%, transparent 62%)",
              opacity: halo,
              filter: "blur(14px)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              background: "#fff",
              boxShadow: `0 0 ${18 / Math.max(0.5, oScale)}px rgba(255,255,255,0.55), 0 0 ${50 / Math.max(0.5, oScale)}px rgba(255,255,255,0.22)`,
            }}
          />
        </div>
      </div>
    </>
  );
}

/** Drives scene time with requestAnimationFrame; stops at the end. */
function useTimeline() {
  const [T, setT] = useState(0);
  const raf = useRef(0);

  const play = useCallback((from = 0) => {
    cancelAnimationFrame(raf.current);
    const start = performance.now() - from * 1000;
    const tick = (now: number) => {
      const t = Math.min(C.End, (now - start) / 1000);
      setT(t);
      if (t < C.End) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
  }, []);

  const skip = useCallback(() => {
    cancelAnimationFrame(raf.current);
    setT(C.End);
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Reduced motion shows the final frame instead of playing the intro.
    if (reduce) raf.current = requestAnimationFrame(() => setT(C.End));
    else play();
    return () => cancelAnimationFrame(raf.current);
  }, [play]);

  return { T, play, skip };
}

export function HeroIntro() {
  const { T, play, skip } = useTimeline();
  const box = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      // The word and the ring are ~1200 px wide, so fit that rather than the full stage.
      setScale(Math.min(height / H, width / 1240));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const done = T >= C.End;

  return (
    <section aria-labelledby="hero-title" className="relative flex min-h-[calc(100svh-4rem)] flex-col overflow-hidden">
      <div ref={box} className="relative min-h-[260px] flex-1" aria-hidden="true">
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: W,
            height: H,
            marginLeft: -W / 2,
            marginTop: -H / 2,
            transform: `scale(${scale})`,
            background: "#000",
          }}
        >
          <Palm T={T} />
          <Logos T={T} />
          <Finale T={T} />
        </div>
      </div>

      {/* The copy is visible from the first paint so it stays readable, clickable and counts for LCP. */}
      <div className="relative mx-auto w-full max-w-3xl px-4 pb-16 text-center sm:px-6">
        <h1 id="hero-title" className="font-display text-2xl leading-tight font-medium tracking-tight sm:text-4xl">
          Every streaming service. One player.
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-ash sm:text-lg">
          Spotify, Apple Music, YouTube Music, Deezer and SoundCloud in one library and one queue — with AI radio that
          picks the next track from all of them.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/signup" className={cn(btn.solid, btn.lg)}>
            Start listening free
          </Link>
          <Link href="/pricing" className={cn(btn.quiet, btn.lg)}>
            Compare plans
          </Link>
        </div>
      </div>

      <button
        type="button"
        onClick={done ? () => play(0) : skip}
        className="absolute right-4 bottom-4 rounded-full px-3 py-2 text-sm text-smoke transition-colors hover:text-white sm:right-6"
      >
        {done ? "Replay intro" : "Skip intro"}
      </button>
    </section>
  );
}
