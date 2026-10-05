import { Resend } from "resend";

export type Inquiry = {
  org: string;
  name: string;
  email: string;
  phone: string;
  types: string[];
  features: string[];
  pages: string;
  timeline: string;
  details: string;
  url: string;
};

let client: Resend | null = null;

/** Lazily constructed so builds and key-less environments never crash. */
export function getResend(): Resend {
  if (!client) {
    const key = process.env.RESEND_API_KEY;
    if (!key) throw new Error("RESEND_API_KEY is not configured");
    client = new Resend(key);
  }
  return client;
}

export function contactTo(): string {
  return process.env.CONTACT_TO ?? "ccubemedia.co@gmail.com";
}

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function row(label: string, value: string): string {
  return `<tr><td style="padding:8px 12px;color:#857f74;font-size:13px;vertical-align:top;white-space:nowrap;">${esc(label)}</td><td style="padding:8px 12px;color:#1a1917;font-size:14px;">${value || "—"}</td></tr>`;
}

export function inquirySubject(i: Inquiry): string {
  return `New project inquiry — ${i.org} (${i.name})`;
}

export function inquiryHtml(i: Inquiry): string {
  const pills = (xs: string[]) =>
    xs.length
      ? xs
          .map(
            (x) =>
              `<span style="display:inline-block;padding:5px 12px;margin:0 6px 6px 0;border:1px solid #d6a653;border-radius:999px;color:#946519;font-size:13px;background:#faf5ea;">${esc(x)}</span>`
          )
          .join("")
      : "—";
  const ref = i.url
    ? `<a href="${esc(i.url)}" style="color:#946519;">${esc(i.url)}</a>`
    : "";
  const telDigits = esc(i.phone.replace(/\D/g, ""));
  return `
<div style="font-family:Arial,Helvetica,sans-serif;background:#f4f1ea;padding:32px 16px;">
  <div style="max-width:620px;margin:auto;background:#ffffff;border-radius:18px;overflow:hidden;border:1px solid #e5e0d5;">
    <div style="background:#0e0e10;padding:30px 32px;border-bottom:3px solid #d6a653;">
      <div style="color:#f0c979;font-size:11px;letter-spacing:.28em;font-weight:bold;">C³ MEDIA CO. &nbsp;·&nbsp; NEW INQUIRY</div>
      <div style="color:#ffffff;font-size:24px;font-weight:bold;margin-top:10px;">${esc(i.org)}</div>
      <div style="color:#a6a29b;font-size:13px;margin-top:4px;">from ${esc(i.name)} · <a href="mailto:${esc(i.email)}" style="color:#f0c979;">${esc(i.email)}</a></div>
    </div>
    <div style="padding:8px 16px 8px;">
      <table style="border-collapse:collapse;width:100%;">
        ${row("Phone / WhatsApp", `<a href="tel:${telDigits}" style="color:#946519;">${esc(i.phone)}</a>`)}
        ${row("Timeline", esc(i.timeline))}
        ${row("Pages", esc(i.pages))}
        ${row("Reference", ref)}
      </table>
    </div>
    <div style="padding:6px 32px 4px;">
      <div style="color:#857f74;font-size:12px;letter-spacing:.08em;text-transform:uppercase;">Project type</div>
      <div style="margin-top:8px;">${pills(i.types)}</div>
    </div>
    <div style="padding:6px 32px 4px;">
      <div style="color:#857f74;font-size:12px;letter-spacing:.08em;text-transform:uppercase;">Features</div>
      <div style="margin-top:8px;">${pills(i.features)}</div>
    </div>
    <div style="margin:14px 32px 0;background:#faf7f1;border:1px solid #e5e0d5;border-radius:12px;padding:18px 20px;">
      <div style="color:#857f74;font-size:12px;letter-spacing:.08em;text-transform:uppercase;">Project details</div>
      <div style="color:#22211e;font-size:14px;line-height:1.6;margin-top:8px;white-space:pre-wrap;">${esc(i.details)}</div>
    </div>
    <div style="padding:22px 32px 28px;text-align:center;">
      <a href="mailto:${esc(i.email)}?subject=${encodeURIComponent(`Re: Project inquiry — ${i.org}`)}" style="display:inline-block;background:#d6a653;color:#111111;font-weight:bold;font-size:14px;padding:13px 34px;border-radius:999px;text-decoration:none;">Reply to ${esc(i.name.split(" ")[0])} →</a>
    </div>
    <div style="background:#faf7f1;padding:14px 32px;color:#857f74;font-size:11px;letter-spacing:.06em;text-align:center;border-top:1px solid #e5e0d5;">SENT FROM THE C³MEDIA&zwnj;.CO CONTACT FORM · DESIGN · DEVELOP · DELIVER</div>
  </div>
</div>`;
}

export function inquiryText(i: Inquiry): string {
  return [
    `New project inquiry — ${i.org}`,
    `Name: ${i.name}`,
    `Email: ${i.email}`,
    `Phone/WhatsApp: ${i.phone}`,
    `Project type: ${i.types.join(", ") || "—"}`,
    `Features: ${i.features.join(", ") || "—"}`,
    `Pages: ${i.pages}`,
    `Timeline: ${i.timeline}`,
    `Reference URL: ${i.url || "—"}`,
    ``,
    `Project details:`,
    i.details,
  ].join("\n");
}
