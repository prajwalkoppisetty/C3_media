import Link from "next/link";
import type { ReactNode } from "react";
import Reveal from "@/components/Reveal";

export default function PageHero({
  crumb,
  eyebrow,
  title,
  lead,
  actions,
}: {
  crumb: string;
  eyebrow: string;
  title: ReactNode;
  lead: string;
  actions?: ReactNode;
}) {
  return (
    <section className="page-hero">
      <div className="container page-hero-inner">
        <Reveal>
          <div className="breadcrumb">
            <Link href="/">Home</Link> / {crumb}
          </div>
          <div className="eyebrow">{eyebrow}</div>
          <h1>{title}</h1>
          <p className="lead">{lead}</p>
          {actions && <div className="page-hero-actions">{actions}</div>}
        </Reveal>
      </div>
    </section>
  );
}
