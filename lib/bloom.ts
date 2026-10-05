import type { MouseEvent } from "react";

/** Tracks the cursor inside an element so a ::before bloom can spread
 *  from the hover point via --mx/--my custom properties. */
export function trackBloom(e: MouseEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
}
