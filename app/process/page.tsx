import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import PageHero from "@/components/PageHero";
import CtaBox from "@/components/CtaBox";
import { processSteps } from "@/lib/content";

export const metadata: Metadata = {
  title: "Process — C³ Media Co.",
  description: "How C³ Media Co. works: tell us, plan, build, deliver.",
};

export default function ProcessPage() {
  return (
    <>
      <PageHero
        crumb="Process"
        eyebrow="How it works"
        title={
          <>
            Simple from first message <span className="gold">to launch.</span>
          </>
        }
        lead="No complicated process. Tell us what you need, align on scope, and we build."
        actions={
          <Link className="btn primary" href="/contact">
            Start step 01 ↗
          </Link>
        }
      />

      <section className="section">
        <div className="container">
          <Reveal className="process">
            {processSteps.map((s) => (
              <div key={s.n} className="step">
                <b>{s.n}</b>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <CtaBox
        eyebrow="Ready for step 01?"
        title={
          <>
            It starts with a <span className="gold">two-minute brief.</span>
          </>
        }
        text="Fill the project form once — that's enough for us to plan scope, timeline and pricing."
        actions={
          <>
            <Link className="btn primary" href="/contact">
              Tell us your idea ↗
            </Link>
            <Link className="btn secondary" href="/about">
              Meet the team
            </Link>
          </>
        }
      />
    </>
  );
}
