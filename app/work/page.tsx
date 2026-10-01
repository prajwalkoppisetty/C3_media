import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import PageHero from "@/components/PageHero";
import CtaBox from "@/components/CtaBox";

export const metadata: Metadata = {
  title: "Work — C³ Media Co.",
  description: "Selected work from C³ Media Co. — websites, apps, branding, video and 3D.",
};

const projects = [
  {
    n: "01 · Website",
    title: "Modern digital presence for a growing brand.",
    body: "Concept placeholder — replace with a one-line project outcome.",
    size: "large",
  },
  {
    n: "02 · Mobile App",
    title: "Interface designed around the user.",
    body: "Concept placeholder.",
    size: "small",
  },
  {
    n: "03 · Branding",
    title: "Identity that stays consistent everywhere.",
    body: "Concept placeholder.",
    size: "small",
  },
];

export default function WorkPage() {
  return (
    <>
      <PageHero
        crumb="Work"
        eyebrow="Selected work"
        title={
          <>
            Work that earns <span className="gold">attention.</span>
          </>
        }
        lead="Concept placeholders for now — real client case studies will live here in Phase 3."
      />

      <section className="section">
        <div className="container">
          <div className="work-grid">
            <Reveal>
              <article className="project large">
                <div className="project-label">{projects[0].n} · Concept</div>
                <h3>{projects[0].title}</h3>
                <p>{projects[0].body}</p>
                <div className="mock" />
              </article>
            </Reveal>
            <div className="stack">
              {projects.slice(1).map((p) => (
                <Reveal key={p.n}>
                  <article className="project small">
                    <div className="project-label">{p.n} · Concept</div>
                    <h3 style={{ fontSize: "1.4rem" }}>{p.title}</h3>
                    <div className="mock" />
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", gap: 12, marginTop: 28, flexWrap: "wrap" }}>
            <Link className="btn primary" href="/contact">
              Start your project ↗
            </Link>
            <Link className="btn secondary" href="/services">
              Explore services
            </Link>
          </div>
        </div>
      </section>

      <CtaBox
        eyebrow="Want results like these?"
        title={
          <>
            Your project could be <span className="gold">next.</span>
          </>
        }
        text="Send a two-minute brief and we'll get back with scope, timeline and next steps."
        actions={
          <Link className="btn primary" href="/contact">
            Start a project ↗
          </Link>
        }
      />
    </>
  );
}
