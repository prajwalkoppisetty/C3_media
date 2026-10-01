import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import PageHero from "@/components/PageHero";
import CtaBox from "@/components/CtaBox";
import ServiceIcon from "@/components/ServiceIcon";
import { serviceDetails } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services — C³ Media Co.",
  description:
    "C³ Media Co. services: web and app development, video editing, 3D cinematics and branding.",
};

const groups = ["BUILD", "CREATE", "BRAND"] as const;

export default function ServicesPage() {
  return (
    <>
      <PageHero
        crumb="Services"
        eyebrow="What we do"
        title={
          <>
            One team for your <span className="gold">digital presence.</span>
          </>
        }
        lead="From a sharp landing page to a full web application, choose exactly what your project needs."
        actions={
          <>
            <Link className="btn primary" href="/contact">
              Get a quote ↗
            </Link>
          </>
        }
      />

      {groups.map((g) => (
        <section key={g} className="section" style={{ paddingBottom: 0 }}>
          <div className="container">
            <Reveal>
              <div className="eyebrow">{g}</div>
            </Reveal>
            <div className="services" style={{ marginTop: 20 }}>
              {serviceDetails
                .filter((s) => s.group === g)
                .map((s) => (
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
          </div>
        </section>
      ))}

      <CtaBox
        eyebrow="Not sure what you need?"
        title={
          <>
            Tell us the goal. <span className="gold">We&apos;ll map the service.</span>
          </>
        }
        text="Describe your business and what you want to achieve — we'll recommend the right mix of design, development and content."
        actions={
          <>
            <Link className="btn primary" href="/contact">
              Start a project ↗
            </Link>
            <Link className="btn secondary" href="/process">
              How it works
            </Link>
          </>
        }
      />
    </>
  );
}
