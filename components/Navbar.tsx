"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site";
import ThemeToggle from "@/components/ThemeToggle";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Track cursor inside the CTA so the gold bloom spreads from the hover point
  function trackCursor(e: React.MouseEvent<HTMLAnchorElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  }

  return (
    <div className="nav-wrap">
      <nav className="container nav-bar" aria-label="Primary">
        <Link className="brand" href="/">
          <Image src="/logo.png" alt="C3 Media Co logo" width={40} height={40} priority />
          <span>
            C³ MEDIA <small>CO.</small>
          </span>
        </Link>
        <div className={`nav-links${open ? " active" : ""}`} id="navLinks">
          {site.nav.map((l) => {
            const active =
              l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={active ? "active" : ""}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            );
          })}
        </div>
        <div className="nav-actions">
          <ThemeToggle />
          <Link
            className="nav-cta"
            href="/contact"
            onMouseMove={trackCursor}
            onMouseEnter={trackCursor}
          >
            Start a Project ↗
          </Link>
          <button
            className="menu"
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="navLinks"
            onClick={() => setOpen((v) => !v)}
          >
            ☰
          </button>
        </div>
      </nav>
    </div>
  );
}
