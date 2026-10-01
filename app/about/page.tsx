import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import PageHero from "@/components/PageHero";
import CtaBox from "@/components/CtaBox";
import { whyItems } from "@/lib/content";

export const metadata: Metadata = {
  title: "About — C³ Media Co.",
  description: "About C³ Media Co. — a digital studio combining technology and creative production.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumb="About"
        eyebrow="About us"
        title={
          <>
            Small team. <span className="gold">Big digital thinking.</span>
          </>
        }
        lead="C³ Media Co. is a digital studio combining technology and creative production."
      />

      <section className="section" style={{ paddingBottom: 28 }}>
        <Reveal className="container about">
          <Reveal className="about-card" spotlight>
            <div className="big">C³</div>
            <div>
              <div className="eyebrow">Design · Develop · Deliver</div>
              <p style={{ color: "var(--muted)", marginTop: 10 }}>
                Creative minds. Smart solutions.
              </p>
            </div>
          </Reveal>
          <Reveal className="about-copy">
            <div className="eyebrow">Why us</div>
            <h2>
              Built for startups <span className="gold">&amp; brands.</span>
            </h2>
            <p>
              We work with businesses, startups, creators and individuals to
              turn ideas into websites, applications, brands and digital
              experiences.
            </p>
            <p>
              The team brings together developers, designers, editors and 3D
              artists depending on project requirements.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 22 }}>
              <Link className="btn primary" href="/contact">
                Work with us ↗
              </Link>
            </div>
          </Reveal>
        </Reveal>
        <div className="container">
          <div className="values">
            {whyItems.map((w) => (
              <Reveal key={w.n} className="value">
                <h3>
                  {w.n} — {w.title}
                </h3>
                <p>{w.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBox
        tight
        eyebrow="Like how we think?"
        title="Let's build together."
        text="Two minutes is all it takes to start."
        actions={
          <Link className="btn primary" href="/contact">
            Start a project ↗
          </Link>
        }
      />
    </>
  );
}
