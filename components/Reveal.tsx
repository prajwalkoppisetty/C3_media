"use client";

import { useEffect, useRef, type ReactNode } from "react";

export default function Reveal({
  children,
  className = "",
  onMouseMove,
  spotlight = false,
}: {
  children: ReactNode;
  className?: string;
  onMouseMove?: React.MouseEventHandler<HTMLDivElement>;
  spotlight?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      el.classList.add("visible");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("visible");
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Spotlight mode tracks the cursor itself so server components can
  // opt into the glow with a plain boolean prop (no handler passing)
  function track(e: React.MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--px", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--py", `${e.clientY - r.top}px`);
  }

  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      onMouseMove={spotlight ? track : onMouseMove}
    >
      {children}
    </div>
  );
}
