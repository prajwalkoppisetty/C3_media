import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Terms & Conditions — C³ Media Co.",
  description: "The terms that apply when you work with C³ Media Co.",
};

const sections = [
  {
    h: "1. Scope of work",
    p: "Every project starts with a written understanding of scope, deliverables, timeline and pricing — agreed over messages, email or quotation before work begins. Anything outside that scope is quoted separately.",
  },
  {
    h: "2. Quotations and payments",
    p: "Quotations are valid for 30 days unless stated otherwise. Payment schedules (typically an advance to begin work and milestone or completion payments) are agreed per project. Work pauses if scheduled payments are delayed, and delivery timelines shift accordingly.",
  },
  {
    h: "3. Revisions",
    p: "Reasonable revisions within the agreed scope are included. A revision is a refinement of the agreed direction — not a new direction. Repeated or out-of-scope changes are billed additionally after informing you.",
  },
  {
    h: "4. Timelines",
    p: "Timelines depend on both sides: we deliver on schedule when feedback, content and approvals arrive on time. Delays in client inputs extend delivery by an equal period.",
  },
  {
    h: "5. Intellectual property",
    p: "On full and final payment, ownership of the final deliverables transfers to you. Until then, all work remains the property of C³ Media Co. We may showcase completed work in our portfolio unless you request otherwise in writing before launch.",
  },
  {
    h: "6. Client responsibilities",
    p: "You confirm that any content you provide (text, images, logos, videos) is yours to use or properly licensed, and you accept responsibility for claims arising from it.",
  },
  {
    h: "7. Warranties and liability",
    p: "We build carefully and test before delivery, but to the maximum extent permitted by law our total liability for any project is limited to the amount paid for that project. We are not liable for indirect losses such as lost profits or downtime of third-party services (hosting, app stores, payment gateways).",
  },
  {
    h: "8. Cancellation",
    p: "Either side may stop a project with written notice. Work completed up to that point is billed, the advance is non-refundable, and any delivered work-in-progress remains our property until paid for.",
  },
  {
    h: "9. Governing law",
    p: "These terms are governed by the laws of India. Disputes will first be attempted to be resolved amicably, failing which they are subject to the courts at our principal place of business.",
  },
  {
    h: "10. Contact",
    p: "Questions about these terms: hello@c3media.co. Last updated: October 2026.",
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHero
        crumb="Terms & Conditions"
        eyebrow="Legal"
        title={
          <>
            Terms &amp; <span className="gold">Conditions.</span>
          </>
        }
        lead="The ground rules for working together — written to be read, not skipped."
      />
      <section className="section">
        <div className="container" style={{ maxWidth: 820 }}>
          {sections.map((s) => (
            <Reveal key={s.h}>
              <div style={{ marginBottom: 28 }}>
                <h2
                  style={{
                    color: "var(--text-heading)",
                    fontSize: "1.25rem",
                    marginBottom: 8,
                  }}
                >
                  {s.h}
                </h2>
                <p style={{ color: "var(--muted)" }}>{s.p}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
