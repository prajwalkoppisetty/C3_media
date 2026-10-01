"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const KEY = "c3_consent";

export default function CookieConsent() {
  // Render nothing on server AND on first client render (matching SSR),
  // then check storage post-hydration. Reading localStorage during the
  // first render would diverge from SSR HTML for fresh visitors.
  const [show, setShow] = useState(false);
  const [ready, setReady] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const acceptRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(KEY);
    } catch {
      /* private mode etc. — show the banner */
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional post-hydration sync; avoids SSR mismatch
    setShow(!stored);
    setReady(true);
  }, []);

  // Move focus into the dialog when it appears; Escape declines
  useEffect(() => {
    if (!ready || !show) return;
    acceptRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") choose("declined");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [ready, show]);

  function choose(v: "accepted" | "declined") {
    try {
      localStorage.setItem(KEY, v);
    } catch {
      /* ignore */
    }
    setLeaving(true);
    window.setTimeout(() => setShow(false), 220);
  }

  if (!ready || !show) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className={`cookie-card cookie-pop${leaving ? " cookie-hide" : ""}`}
      style={{
        position: "fixed",
        left: 20,
        bottom: 20,
        zIndex: 60,
        width: "min(380px, calc(100vw - 40px))",
        borderRadius: 20,
        padding: "20px 20px 18px",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: "0 0 auto 0",
          height: 3,
          background: "linear-gradient(90deg, var(--gold), transparent)",
        }}
      />
      <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
        <span
          aria-hidden
          style={{
            flexShrink: 0,
            width: 40,
            height: 40,
            borderRadius: "50%",
            display: "grid",
            placeItems: "center",
            background: "var(--gold-subtle)",
            border: "1px solid var(--line)",
            color: "var(--gold-2)",
            fontSize: "1.15rem",
          }}
        >
          🍪
        </span>
        <div>
          <p style={{ color: "var(--text-heading)", fontWeight: 700, fontSize: ".95rem" }}>
            Cookies, kept minimal
          </p>
          <p style={{ color: "var(--muted)", fontSize: ".83rem", marginTop: 6, lineHeight: 1.55 }}>
            We store only functional preferences (theme, consent) in your
            browser — no tracking. Details in our{" "}
            <Link
              href="/privacy"
              style={{ color: "var(--gold-2)", textDecoration: "underline" }}
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
      <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
        <button
          ref={acceptRef}
          className="btn primary"
          type="button"
          onClick={() => choose("accepted")}
          style={{ flex: 1 }}
        >
          Accept
        </button>
        <button
          className="btn secondary"
          type="button"
          onClick={() => choose("declined")}
          style={{ flex: 1 }}
        >
          Decline
        </button>
      </div>
    </div>
  );
}
