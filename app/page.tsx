import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import CtaBox from "@/components/CtaBox";
import ServiceIcon from "@/components/ServiceIcon";
import { site } from "@/lib/site";
import { serviceDetails } from "@/lib/content";

export default function Home() {
  const preview = serviceDetails.slice(0, 3);
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.name,
    slogan: site.tagline,
    url: site.url,
    email: site.email,
    telephone: "+91-6309805170",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <section className="hero" id="home">
        <div className="hero-inner container">
          <Reveal>
            <Image
              className="hero-logo hero-float"
              src="/logo.png"
              alt="C3 Media Co"
              width={132}
              height={132}
              priority
            />
            <div className="hero-badge">
              <span className="hero-dot" aria-hidden />
              Design · Develop · Deliver
            </div>
            <h1>
              <span>
                We build the <span className="hero-gradient">digital side</span>
              </span>
              <span>of ambitious ideas.</span>
            </h1>
            <p className="sub">
              Websites. Apps. Brands. Motion. 3D. From the first concept to the
              final launch, C³ brings design, development and creative
              production together.
            </p>
            <div className="hero-chips" aria-label="What we do">
              {["Websites", "Apps", "Brands", "Motion", "3D"].map((c) => (
                <span key={c} className="hero-chip">
                  {c}
                </span>
              ))}
            </div>
            <div className="hero-actions">
              <Link className="btn primary hero-cta" href="/contact">
                Tell us your idea <span aria-hidden>↗</span>
              </Link>
              <Link className="btn secondary" href="/services">
                Explore services
              </Link>
            </div>
            <div className="hero-meta">
              <div>
                Built for <strong>Startups &amp; Brands</strong>
              </div>
              <div>
                Focus <strong>Design + Development</strong>
              </div>
              <div>
                Approach <strong>Human-first</strong>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 20 }}>
        <div className="container">
          <Reveal className="section-head">
            <div>
              <div className="eyebrow">Explore</div>
              <h2>Everything lives on its own page.</h2>
            </div>
            <p>
              No more scrolling one giant page. Jump straight to what you need —
              each section is now a dedicated page.
            </p>
          </Reveal>
          <div className="page-links">
            <Reveal>
              <Link className="page-link-card" href="/services">
                <div>
                  <h3>Services →</h3>
                  <p>Web, apps, video, 3D and branding. 10 offerings in detail.</p>
                </div>
                <span className="arrow">↗</span>
              </Link>
            </Reveal>
            <Reveal>
              <Link className="page-link-card" href="/process">
                <div>
                  <h3>Process →</h3>
                  <p>Tell us → Plan → Build → Deliver. Simple from first message to launch.</p>
                </div>
                <span className="arrow">↗</span>
              </Link>
            </Reveal>
            <Reveal>
              <Link className="page-link-card" href="/about">
                <div>
                  <h3>About →</h3>
                  <p>Small team, big digital thinking. Who we are and how we work.</p>
                </div>
                <span className="arrow">↗</span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <Reveal className="section-head">
            <div>
              <div className="eyebrow">What we do</div>
              <h2>One team for your digital presence.</h2>
            </div>
            <p>A quick preview — see the full breakdown on the Services page.</p>
          </Reveal>
          <div className="services">
            {preview.map((s) => (
              <Reveal key={s.n}>
                <article className="service">
                  <div className="icon">
                    <ServiceIcon name={s.icon} />
                  </div>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                  <div className="tags">
                    {s.tags.map((t) => (
                      <span key={t} className="tag">
                        {t}
                      </span>
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
          <div style={{ marginTop: 26 }}>
            <Link className="btn secondary" href="/services">
              View all 10 services ↗
            </Link>
          </div>
        </div>
      </section>

      <CtaBox
        eyebrow="Have an idea?"
        title={
          <>
            Let&apos;s build something <span className="gold">extraordinary.</span>
          </>
        }
        text="Tell us what you're planning. The form takes around two minutes and gives us enough context to start the conversation."
        actions={
          <>
            <Link className="btn primary" href="/contact">
              Start a project ↗
            </Link>
            <Link className="btn secondary" href="/process">
              See how it works
            </Link>
          </>
        }
      />
    </>
  );
}
