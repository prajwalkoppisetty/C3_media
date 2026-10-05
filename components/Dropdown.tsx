"use client";

import { useEffect, useRef, useState } from "react";

const CLOSE_OTHERS = "dd:close-others";

export default function Dropdown({
  id,
  name,
  value,
  options,
  onChange,
}: {
  id: string;
  name: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const optRefs = useRef<Array<HTMLButtonElement | null>>([]);

  function close(focusToggle = false) {
    setOpen(false);
    if (focusToggle) toggleRef.current?.focus();
  }

  function pick(v: string) {
    onChange(v);
    close(true);
  }

  // Close when another dropdown on the page opens
  useEffect(() => {
    const onOther = (e: Event) => {
      if ((e as CustomEvent<string>).detail !== id) setOpen(false);
    };
    window.addEventListener(CLOSE_OTHERS, onOther);
    return () => window.removeEventListener(CLOSE_OTHERS, onOther);
  }, [id]);

  useEffect(() => {
    if (!open) return;
    // Announce ourselves so siblings close (L1)
    window.dispatchEvent(new CustomEvent(CLOSE_OTHERS, { detail: id }));
    // Move focus to the selected option (or first) for keyboard users
    const idx = Math.max(
      0,
      options.findIndex((o) => o === value)
    );
    optRefs.current[idx]?.focus();
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close(true);
    };
    document.addEventListener("mousedown", onDoc);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  function onListKey(e: React.KeyboardEvent) {
    const items = optRefs.current.filter(
      (b): b is HTMLButtonElement => b !== null
    );
    const cur = items.indexOf(document.activeElement as HTMLButtonElement);
    if (e.key === "ArrowDown") {
      e.preventDefault();
      items[(cur + 1) % items.length]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      items[(cur - 1 + items.length) % items.length]?.focus();
    } else if (e.key === "Home") {
      e.preventDefault();
      items[0]?.focus();
    } else if (e.key === "End") {
      e.preventDefault();
      items[items.length - 1]?.focus();
    } else if (e.key === "Tab") {
      setOpen(false);
    }
  }

  return (
    <div className="dd" ref={rootRef}>
      {/* Hidden input keeps the value in FormData for the server action */}
      <input type="hidden" name={name} value={value} />
      <button
        ref={toggleRef}
        id={id}
        type="button"
        className="dd-btn"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span>{value}</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      {open && (
        <ul className="dd-list" role="menu" aria-label={id} onKeyDown={onListKey}>
          {options.map((o, i) => (
            <li key={o} role="none">
              <button
                ref={(b) => {
                  optRefs.current[i] = b;
                }}
                type="button"
                role="menuitemradio"
                aria-checked={o === value}
                className={`dd-opt${o === value ? " selected" : ""}`}
                onClick={() => pick(o)}
              >
                {o}
                {o === value && <span aria-hidden>✓</span>}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
