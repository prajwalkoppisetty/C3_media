"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";

const projectTypes = [
  "Website",
  "Mobile App",
  "Web Application",
  "E-commerce",
  "Branding",
  "Video Editing",
  "3D Cinematic",
  "Wedding Invitation",
  "Other",
];

const featureOptions = [
  "Responsive Design",
  "CMS / Admin",
  "Contact Form",
  "Authentication",
  "Payments / UPI",
  "Booking",
  "API Integration",
  "SEO / Performance",
];

const pageOptions = ["1–3", "4–6", "7–10", "10+", "Not sure"];

export default function ContactPage() {
  const [step, setStep] = useState(1);
  const [sent, setSent] = useState(false);
  const [types, setTypes] = useState<string[]>([]);
  const [features, setFeatures] = useState<string[]>([]);
  const [typeError, setTypeError] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  function toggle(list: string[], v: string, set: (x: string[]) => void) {
    set(list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);
    setTypeError(false);
  }

  function next(form: HTMLFormElement) {
    if (step < 4) {
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
        setTypeError(true);
        return;
      }
      setTypeError(false);
      setStep(step + 1);
    } else {
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      setSent(true);
    }
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
                noValidate={false}
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
                      <input id="org" name="org" className="contact-input" required placeholder="Your organization" />
                    </div>
                    <div className="field">
                      <label className="contact-label" htmlFor="name">Your name *</label>
                      <input id="name" name="name" className="contact-input" required placeholder="Your name" />
                    </div>
                    <div className="field">
                      <label className="contact-label" htmlFor="email">Email *</label>
                      <input id="email" name="email" type="email" className="contact-input" required placeholder="you@example.com" />
                    </div>
                    <div className="field">
                      <label className="contact-label" htmlFor="phone">Phone / WhatsApp *</label>
                      <input id="phone" name="phone" className="contact-input" required placeholder="+91 98765 43210" />
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
                          checked={types.includes(t)}
                          onChange={() => toggle(types, t, setTypes)}
                        />
                        <span>{t}</span>
                      </label>
                    ))}
                  </div>
                  {typeError && (
                    <p role="alert" style={{ color: "#e07878", fontSize: ".83rem", marginTop: 10 }}>
                      Please choose at least one project type.
                    </p>
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
                          checked={features.includes(f)}
                          onChange={() => toggle(features, f, setFeatures)}
                        />
                        <span>{f}</span>
                      </label>
                    ))}
                  </div>
                  <div className="fields" style={{ marginTop: 15 }}>
                    <div className="field">
                      <label className="contact-label" htmlFor="pages">Approx. number of pages</label>
                      <select id="pages" name="pages" className="contact-input">
                        {pageOptions.map((p) => (
                          <option key={p}>{p}</option>
                        ))}
                      </select>
                    </div>
                    <div className="field">
                      <label className="contact-label" htmlFor="timeline">Timeline</label>
                      <select id="timeline" name="timeline" className="contact-input">
                        <option>As soon as possible</option>
                        <option>2–4 weeks</option>
                        <option>1–2 months</option>
                        <option>Flexible</option>
                        <option>Not sure yet</option>
                      </select>
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
                      <input id="url" name="url" type="url" className="contact-input" placeholder="https://" />
                    </div>
                  </div>
                </div>

                <div className="form-actions">
                  <button
                    className="btn secondary"
                    type="button"
                    style={{ visibility: step === 1 ? "hidden" : "visible" }}
                    onClick={() => setStep(Math.max(1, step - 1))}
                  >
                    ← Back
                  </button>
                  <button className="btn primary" type="submit">
                    {step === 4 ? "Submit inquiry →" : "Continue →"}
                  </button>
                </div>
              </form>
            ) : (
              <div className="success show">
                <div className="check">✓</div>
                <h3>Brief complete — ready when you are.</h3>
                <p>
                  This preview doesn&apos;t send data anywhere yet. Connect the
                  submit handler to your email service (Formspree, Web3Forms,
                  Resend) in Phase 2 to start receiving inquiries.
                </p>
                <button
                  className="btn secondary"
                  type="button"
                  onClick={() => {
                    formRef.current?.reset();
                    setTypes([]);
                    setFeatures([]);
                    setTypeError(false);
                    setSent(false);
                    setStep(1);
                  }}
                >
                  Start over
                </button>
              </div>
            )}
          </Reveal>
        </div>
      </section>
    </>
  );
}
