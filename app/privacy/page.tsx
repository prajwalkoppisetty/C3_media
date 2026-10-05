import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Privacy Policy — C³ Media Co.",
  description: "How C³ Media Co. collects, uses and protects your information.",
};

const sections = [
  {
    h: "1. Information we collect",
    p: "When you contact us or submit the Start a Project form, we collect the details you provide — such as your name, organization, email address, phone/WhatsApp number, project requirements and any reference URLs. We do not create accounts, and we do not collect passwords or payment details on this website.",
  },
  {
    h: "2. How we use it",
    p: "We use your information only to understand your requirements, prepare scope and quotations, communicate with you about your project, and improve our services. We do not sell your data, and we do not share it with third parties for marketing. When you submit the Start a Project form, your answers are delivered to our inbox by Resend, our email-delivery provider, which processes the message solely to transmit it.",
  },
  {
    h: "3. Storage on your device",
    p: "This website stores small preferences in your own browser (local storage), such as your light/dark theme choice and cookie-consent choice. This data never leaves your device. If analytics are enabled in the future, this policy will be updated to describe them.",
  },
  {
    h: "4. Third-party contact channels",
    p: "If you reach us through WhatsApp, email or social platforms, your messages are also subject to those platforms' own privacy policies. We treat anything you share with us as confidential and use it only for your project.",
  },
  {
    h: "5. Data retention",
    p: "We keep inquiry records only for as long as needed to handle your request and maintain business records, after which they are deleted or anonymised on request.",
  },
  {
    h: "6. Your rights",
    p: "You may ask us at any time what information we hold about you, ask us to correct it, or ask us to delete it, by writing to ccubemedia.co@gmail.com. We will respond within a reasonable time.",
  },
  {
    h: "7. Changes to this policy",
    p: "If we change how we handle data — for example when analytics or an email service is connected — we will update this page and revise the date below.",
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        crumb="Privacy Policy"
        eyebrow="Legal"
        title={
          <>
            Privacy <span className="gold">Policy.</span>
          </>
        }
        lead="Plain-language summary of what we collect and why. Last updated: October 2026."
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
