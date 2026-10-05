"use client";

import { useRef, useState, useTransition } from "react";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import Dropdown from "@/components/Dropdown";
import { trackBloom } from "@/lib/bloom";
import { submitInquiry } from "@/app/contact/actions";
import { site } from "@/lib/site";
import {
  featureOptions,
  pageOptions,
  projectTypes,
  timelineOptions,
} from "@/lib/contact-options";

export default function ContactPage() {
  const [step, setStep] = useState(1);
  const [sent, setSent] = useState(false);
  const [types, setTypes] = useState<string[]>([]);
  const [features, setFeatures] = useState<string[]>([]);
  const [typeError, setTypeError] = useState<string | null>(null);
  const [otherType, setOtherType] = useState("");
  // One token per form visit doubles as Resend's idempotency key: a retry of
  // the SAME failed attempt reuses it (no duplicate email), while starting
  // over mints a fresh one so the new brief is a genuinely new delivery.
  const newSubmitToken = () =>
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  const [submitToken, setSubmitToken] = useState(newSubmitToken);
  const [sendError, setSendError] = useState<string | null>(null);
  const [pages, setPages] = useState(pageOptions[0]);
  const [timeline, setTimeline] = useState(timelineOptions[0]);
  const [sending, startSending] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  function toggle(list: string[], v: string, set: (x: string[]) => void) {
    set(list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);
    setTypeError(null);
    setSendError(null);
  }

  function goStep(n: number) {
    setSendError(null);
    setStep(n);
  }

  function next(form: HTMLFormElement) {
    if (sending) return;
    // Validate ONLY the visible step. The Continue button must stay
    // type="button": a submit button would natively validate required
    // fields on hidden (display:none) steps, which the browser can't
    // focus — blocking every step with "invalid form control" errors.
    // The server action re-checks everything on final submit.
    const active = form.querySelector(`[data-step="${step}"]`);
    const required = active?.querySelectorAll("[required]");
    let ok = true;
    required?.forEach((el) => {
      const input = el as HTMLInputElement;
      if (!input.checkValidity()) {
        input.reportValidity();
        ok = false;
      }
    });
    if (!ok) return;
    if (step === 2 && types.length === 0) {
      setTypeError("Please choose at least one project type.");
      return;
    }
    if (step === 2 && types.includes("Other") && !otherType.trim()) {
      setTypeError("Please tell us what “Other” means for you.");
      return;
    }
    setTypeError(null);
    if (step < 4) {
      goStep(step + 1);
      return;
    }
    setSendError(null);
    const data = new FormData(form);
    startSending(async () => {
      const res = await submitInquiry(data);
      if (res.ok) {
        setSent(true);
      } else {
        setSendError(res.error);
      }
    });
  }

  return (
    <>
      <PageHero
        crumb="Contact"
        eyebrow="Start a project"
        title={
          <>
            Tell us what you&apos;re <span className="gold">building.</span>
          </>
        }
        lead="A short project brief is all we need to understand the direction. You can keep the details rough — we'll ask questions later."
      />

      <section className="section">
        <div className="container contact-grid">
          <Reveal className="contact-copy">
            <div className="eyebrow">What we take on</div>
            <h2 style={{ fontSize: "clamp(1.8rem,3.5vw,2.6rem)" }}>
              Two minutes, four steps.
            </h2>
            <p>
              Prefer browsing first? Check{" "}
              <Link href="/services" style={{ color: "var(--gold-2)", textDecoration: "underline" }}>
                services
              </Link>{" "}
              and{" "}
              <Link href="/process" style={{ color: "var(--gold-2)", textDecoration: "underline" }}>
                process
              </Link>{" "}
              before you submit.
            </p>
            <div className="contact-points">
              <div className="contact-point">↗ Websites &amp; landing pages</div>
              <div className="contact-point">↗ UI/UX &amp; redesigns</div>
              <div className="contact-point">↗ Web &amp; mobile applications</div>
              <div className="contact-point">↗ Content, video &amp; social media</div>
            </div>
          </Reveal>

          <Reveal className="form-card">
            {!sent ? (
              <form
                ref={formRef}
                noValidate
                onSubmit={(e) => {
                  e.preventDefault();
                  next(e.currentTarget);
                }}
              >
                <div className="progress">
                  <span style={{ width: `${(step / 4) * 100}%` }} />
                </div>

                <div className={`form-step${step === 1 ? " active" : ""}`} data-step="1">
                  <h3 className="step-title">First, who are you?</h3>
                  <p className="step-help">Basic contact details. Nothing complicated.</p>
                  <div className="fields">
                    <div className="field">
                      <label className="contact-label" htmlFor="org">Organization / Company *</label>
                      <input id="org" name="org" className="contact-input" required autoComplete="organization" placeholder="Your organization" />
                    </div>
                    <div className="field">
                      <label className="contact-label" htmlFor="name">Your name *</label>
                      <input id="name" name="name" className="contact-input" required autoComplete="name" placeholder="Your name" />
                    </div>
                    <div className="field">
                      <label className="contact-label" htmlFor="email">Email *</label>
                      <input id="email" name="email" type="email" className="contact-input" required autoComplete="email" placeholder="you@example.com" />
                    </div>
                    <div className="field">
                      <label className="contact-label" htmlFor="phone">Phone / WhatsApp *</label>
                      <input id="phone" name="phone" className="contact-input" required inputMode="tel" autoComplete="tel" placeholder="+91 98765 43210" />
                    </div>
                  </div>
                </div>

                <div className={`form-step${step === 2 ? " active" : ""}`} data-step="2">
                  <h3 className="step-title">What are you building?</h3>
                  <p className="step-help">Pick all that apply.</p>
                  <div className="choice-grid">
                    {projectTypes.map((t) => (
                      <label key={t} className="choice">
                        <input
                          type="checkbox"
                          name="types"
                          value={t}
                          checked={types.includes(t)}
                          onChange={() => toggle(types, t, setTypes)}
                        />
                        <span>{t}</span>
                      </label>
                    ))}
                  </div>
                  {typeError && (
                    <p role="alert" style={{ color: "#e07878", fontSize: ".83rem", marginTop: 10 }}>
                      {typeError}
                    </p>
                  )}
                  {types.includes("Other") && (
                    <div className="field" style={{ marginTop: 15 }}>
                      <label className="contact-label" htmlFor="otherType">What are you building? *</label>
                      <input
                        id="otherType"
                        name="otherType"
                        className="contact-input"
                        value={otherType}
                        onChange={(e) => {
                          setOtherType(e.target.value);
                          setTypeError(null);
                        }}
                        placeholder="e.g. SaaS dashboard, booking portal…"
                        autoFocus
                      />
                    </div>
                  )}
                </div>

                <div className={`form-step${step === 3 ? " active" : ""}`} data-step="3">
                  <h3 className="step-title">What does it need?</h3>
                  <p className="step-help">Select anything you already know you need.</p>
                  <div className="choice-grid">
                    {featureOptions.map((f) => (
                      <label key={f} className="choice">
                        <input
                          type="checkbox"
                          name="features"
                          value={f}
                          checked={features.includes(f)}
                          onChange={() => toggle(features, f, setFeatures)}
                        />
                        <span>{f}</span>
                      </label>
                    ))}
                  </div>
                  <div className="fields" style={{ marginTop: 15 }}>
                    <div className="field">
                      <label className="contact-label" htmlFor="pages-dd">Approx. number of pages</label>
                      <Dropdown id="pages-dd" name="pages" value={pages} options={pageOptions} onChange={setPages} />
                    </div>
                    <div className="field">
                      <label className="contact-label" htmlFor="timeline-dd">Timeline</label>
                      <Dropdown id="timeline-dd" name="timeline" value={timeline} options={timelineOptions} onChange={setTimeline} />
                    </div>
                  </div>
                </div>

                <div className={`form-step${step === 4 ? " active" : ""}`} data-step="4">
                  <h3 className="step-title">Anything else?</h3>
                  <p className="step-help">References, ideas, existing websites — tell us everything useful.</p>
                  <div className="fields">
                    <div className="field full">
                      <label className="contact-label" htmlFor="details">Project details *</label>
                      <textarea
                        id="details"
                        name="details"
                        className="contact-input"
                        required
                        placeholder="Tell us about your business, what you want to build, and references you like."
                      />
                    </div>
                    <div className="field full">
                      <label className="contact-label" htmlFor="url">Existing website / reference URL (optional)</label>
                      <input id="url" name="url" type="url" className="contact-input" placeholder="github.com or https://…" />
                    </div>
                  </div>
                </div>

                <div className="form-actions">
                  <button
                    className="btn secondary btn-bloom"
                    type="button"
                    disabled={sending}
                    onMouseMove={trackBloom}
                    onMouseEnter={trackBloom}
                    style={{ visibility: step === 1 ? "hidden" : "visible" }}
                    onClick={() => goStep(Math.max(1, step - 1))}
                  >
                    ← Back
                  </button>
                  <button
                    className="btn primary btn-bloom"
                    type="button"
                    disabled={sending}
                    onMouseMove={trackBloom}
                    onMouseEnter={trackBloom}
                    onClick={() => formRef.current && next(formRef.current)}
                  >
                    {sending ? "Sending…" : step === 4 ? "Submit inquiry →" : "Continue →"}
                  </button>
                </div>
                {sendError && (
                  <p role="alert" style={{ color: "#e07878", fontSize: ".85rem", marginTop: 12 }}>
                    {sendError}
                  </p>
                )}
                {/* M1 idempotency token: retries reuse it, fresh briefs mint a new one. */}
                <input type="hidden" name="submitToken" value={submitToken} />
                {/* Honeypot: invisible to humans, irresistible to bots */}
                <input
                  type="text"
                  name="company_website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0 }}
                />
              </form>
            ) : (
              <div className="success show">
                <div className="check">✓</div>
                <div className="eyebrow">Inquiry sent</div>
                <h3 style={{ marginTop: 12 }}>Thank you — we&apos;ve got your brief.</h3>
                <p>
                  Our team will review it and get back to you within
                  1–2 business days on email or WhatsApp. In a hurry? Skip
                  the wait and chat with us right now.
                </p>
                <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                    <a
                    className="btn primary btn-bloom"
                    href={site.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={trackBloom}
                  >
                    Chat on WhatsApp ↗
                  </a>
                  <Link className="btn secondary btn-bloom" href="/" onClick={trackBloom}>
                    Back to home
                  </Link>
                </div>
                <div style={{ marginTop: 18 }}>
                  <button
                    type="button"
                    onClick={() => {
                      formRef.current?.reset();
                      setTypes([]);
                      setFeatures([]);
                      setOtherType("");
                      setPages(pageOptions[0]);
                      setTimeline(timelineOptions[0]);
                      setTypeError(null);
                      setSendError(null);
                      setSent(false);
                      setStep(1);
                      // New brief = new delivery: mint a fresh idempotency token.
                      setSubmitToken(newSubmitToken());
                    }}
                    style={{
                      background: "none",
                      border: 0,
                      color: "var(--muted)",
                      fontSize: ".83rem",
                      textDecoration: "underline",
                    }}
                  >
                    Submit another brief
                  </button>
                </div>
              </div>
            )}
          </Reveal>
        </div>
      </section>
    </>
  );
}
