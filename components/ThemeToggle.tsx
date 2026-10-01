"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Theme = "light" | "dark";

function preferred(): Theme {
  try {
    const saved = localStorage.getItem("c3_theme");
    if (saved === "light" || saved === "dark") return saved;
  } catch {
    /* ignore */
  }
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: light)").matches
  )
    return "light";
  return "dark";
}

export default function ThemeToggle() {
  // Always start on "dark" so first client render matches SSR HTML.
  // The real preference is applied in the effect below (post-hydration),
  // while the blocking script in layout.tsx already sets the correct
  // data-theme attribute before paint, so there is no visual flash.
  const [theme, setTheme] = useState<Theme>("dark");
  // Guards rapid clicks: each toggle reads state that hasn't re-rendered
  // yet, so without this two fast clicks could collapse into one
  const busy = useRef(false);

  useEffect(() => {
    const t = preferred();
    document.documentElement.setAttribute("data-theme", t);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional post-hydration sync; avoids SSR mismatch
    setTheme(t);
  }, []);

  const apply = useCallback((t: Theme, save = true) => {
    setTheme(t);
    document.documentElement.setAttribute("data-theme", t);
    if (save) {
      try {
        localStorage.setItem("c3_theme", t);
      } catch {
        /* ignore */
      }
    }
  }, []);

  // The theme itself crossfades in place via CSS (registered color
  // vars), so content never blanks. On top of that, a gold ripple flows
  // out from the toggle point to give the change an origin + direction.
  // Only transform/opacity animate — GPU-cheap, stays at 60fps.
  const toggleAt = useCallback(
    (x: number, y: number) => {
      if (busy.current) return;
      busy.current = true;
      const next: Theme = theme === "light" ? "dark" : "light";
      apply(next, true);
    if (
      typeof window === "undefined" ||
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ) {
      busy.current = false;
      return;
    }
    const endRadius =
      Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      ) + 40;
    const d = endRadius * 2;
    const at = `translate(${x - endRadius}px, ${y - endRadius}px)`;
    const mk = (extra: Record<string, string>) => {
      const el = document.createElement("div");
      el.setAttribute("aria-hidden", "true");
      Object.assign(el.style, {
        position: "fixed",
        left: "0",
        top: "0",
        width: `${d}px`,
        height: `${d}px`,
        borderRadius: "50%",
        transform: `${at} scale(0)`,
        opacity: "1",
        zIndex: "2147483646",
        pointerEvents: "none",
        ...extra,
      });
      document.body.appendChild(el);
      return el;
    };
    // soft gold wash that flows outward…
    const wash = mk({ background: "rgba(214,166,83,.16)" });
    // …edged by a crisp ring right behind it
    const ring = mk({
      border: "2px solid rgba(214,166,83,.6)",
      background: "transparent",
    });
    const flow = {
      duration: 750,
      easing: "cubic-bezier(.16,1,.3,1)",
      fill: "forwards" as const,
    };
    wash.animate(
      { transform: [`${at} scale(0)`, `${at} scale(1)`], opacity: [1, 0] },
      flow
    ).onfinish = () => wash.remove();
    const ringAnim = ring.animate(
      { transform: [`${at} scale(0)`, `${at} scale(1)`], opacity: [1, 0] },
      { ...flow, duration: 900 }
    );
    ringAnim.onfinish = () => {
      ring.remove();
      busy.current = false;
    };
    },
    [apply, theme]
  );

  const toggle = useCallback(() => {
    // Keyboard toggle flows from the top-right where the switch lives
    toggleAt(window.innerWidth - 110, 40);
  }, [toggleAt]);

  function onClick(e: React.MouseEvent<HTMLButtonElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    toggleAt(rect.left + rect.width / 2, rect.top + rect.height / 2);
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag =
        document.activeElement && document.activeElement.tagName;
      if (
        (e.key === "t" || e.key === "T") &&
        tag !== "INPUT" &&
        tag !== "TEXTAREA" &&
        tag !== "SELECT"
      ) {
        toggle();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggle]);

  const isLight = theme === "light";

  return (
    <button
      className="theme-switch"
      type="button"
      onClick={onClick}
      aria-label={isLight ? "Switch to dark theme" : "Switch to light theme"}
      title={isLight ? "Switch to dark theme (Press T)" : "Switch to light theme (Press T)"}
      aria-pressed={isLight ? "false" : "true"}
    >
      <span className="theme-switch-track">
        <span className="theme-icon sun" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="4"></circle>
            <path d="M12 2v2"></path>
            <path d="M12 20v2"></path>
            <path d="m4.93 4.93 1.41 1.41"></path>
            <path d="m17.66 17.66 1.41 1.41"></path>
            <path d="M2 12h2"></path>
            <path d="M20 12h2"></path>
            <path d="m6.34 17.66-1.41 1.41"></path>
            <path d="m19.07 4.93-1.41 1.41"></path>
          </svg>
        </span>
        <span className="theme-pill" aria-hidden="true"></span>
        <span className="theme-icon moon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
          </svg>
        </span>
      </span>
    </button>
  );
}
