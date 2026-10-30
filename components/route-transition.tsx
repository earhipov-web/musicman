"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import WaveformLoader from "@/components/ui/waveform-loader";

/*
  Route transition: hidden → covering (on an internal link click) → revealing
  (once the new route is in place) → hidden.
  Timing: 0.15 s fade in, held until the route changes and at least MIN_MS have
  passed, then a 0.3 s fade out. MAX_MS force-hides it, so it never lasts
  longer than 1.5 s even on a slow network.
*/
const FADE_IN = 0.15;
const FADE_OUT = 0.3;
const MIN_MS = 550;
const MAX_MS = 1200;

function isInternalNavigation(e: MouseEvent): string | null {
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return null;
  const a = (e.target as Element | null)?.closest?.("a");
  if (!a || a.target === "_blank" || a.hasAttribute("download")) return null;
  const url = new URL(a.href, location.href);
  if (url.origin !== location.origin) return null;
  if (url.pathname === location.pathname) return null; // same page or hash link
  return url.pathname;
}

export function RouteTransition() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const startedAt = useRef(0);
  const timers = useRef<number[]>([]);

  const clear = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!isInternalNavigation(e)) return;
      clear();
      startedAt.current = performance.now();
      setVisible(true);
      timers.current.push(window.setTimeout(() => setVisible(false), MAX_MS));
    };
    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      clear();
    };
  }, []);

  // The new route has rendered: keep the loader up for the minimum time, then reveal.
  useEffect(() => {
    if (!startedAt.current) return;
    // Client navigation keeps focus on the old link; move it to the new page's content.
    document.getElementById("main")?.focus({ preventScroll: true });
    const left = Math.max(0, (reduce ? 120 : MIN_MS) - (performance.now() - startedAt.current));
    clear();
    timers.current.push(
      window.setTimeout(() => {
        setVisible(false);
        startedAt.current = 0;
      }, left),
    );
  }, [pathname, reduce]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="route-loader"
          aria-hidden="true"
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: reduce ? 0 : FADE_IN } }}
          exit={{ opacity: 0, transition: { duration: reduce ? 0.1 : FADE_OUT, ease: "easeOut" } }}
        >
          <WaveformLoader />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
