"use client";

import type { ReactNode } from "react";
import Reveal from "@/components/Reveal";

export default function CtaBox({
  eyebrow,
  title,
  text,
  actions,
  tight = false,
}: {
  eyebrow: string;
  title: ReactNode;
  text: string;
  actions: ReactNode;
  tight?: boolean;
}) {
  // Feed cursor position to the ::before spotlight so the gold
  // highlight tracks the pointer across the box
  function track(e: React.MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--px", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--py", `${e.clientY - r.top}px`);
  }

  return (
    <section className={tight ? "cta cta-tight" : "cta"}>
      <div className="container">
        <Reveal className="cta-box" onMouseMove={track}>
          <div className="eyebrow">{eyebrow}</div>
          <h2>{title}</h2>
          <p>{text}</p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>{actions}</div>
        </Reveal>
      </div>
    </section>
  );
}
