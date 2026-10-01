import Link from "next/link";

export default function NotFound() {
  return (
    <section className="page-hero">
      <div className="container page-hero-inner" style={{ textAlign: "center", margin: "0 auto" }}>
        <div className="eyebrow">404</div>
        <h1>
          Lost in <span className="gold">space?</span>
        </h1>
        <p className="lead" style={{ margin: "0 auto" }}>
          This page doesn&apos;t exist — but your idea still can. Let&apos;s get
          you back on track.
        </p>
        <div className="page-hero-actions" style={{ justifyContent: "center" }}>
          <Link className="btn primary" href="/">
            Back home ↗
          </Link>
          <Link className="btn secondary" href="/contact">
            Start a project
          </Link>
        </div>
      </div>
    </section>
  );
}
