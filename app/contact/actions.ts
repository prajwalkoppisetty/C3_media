"use server";

import {
  contactTo,
  getResend,
  inquiryHtml,
  inquirySubject,
  inquiryText,
  type Inquiry,
} from "@/lib/email";
import {
  featureOptions,
  pageOptions,
  projectTypes,
  timelineOptions,
} from "@/lib/contact-options";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type SubmitResult = { ok: true } | { ok: false; error: string };

function str(v: FormDataEntryValue | null): string {
  return typeof v === "string" ? v.trim() : "";
}

/** Keeps http(s) URLs; bare domains like "github.com" get https://.
 *  Anything else (including javascript:) is dropped. */
function safeUrl(v: string): string {
  const raw = v.slice(0, 300).trim();
  if (!raw) return "";
  const withProto = /^[a-z][a-z0-9+.-]*:\/\//i.test(raw)
    ? raw
    : `https://${raw}`;
  return /^https?:\/\/[^/\s]+\.[^/\s]+/i.test(withProto) ? withProto : "";
}

export async function submitInquiry(
  formData: FormData
): Promise<SubmitResult> {
  // Honeypot: bots fill it, humans never see it. Smile and pretend.
  if (str(formData.get("company_website"))) return { ok: true };

  // NOTE: no rate limiting here yet (pre-launch traffic). Before any
  // marketing push, add a Vercel Firewall rate-limit rule or Upstash
  // throttling — otherwise the Resend quota and inbox are exposed.
  const inquiry: Inquiry = {
    org: str(formData.get("org")).slice(0, 120),
    name: str(formData.get("name")).slice(0, 120),
    email: str(formData.get("email")).slice(0, 160),
    phone: str(formData.get("phone")).slice(0, 40),
    types: formData
      .getAll("types")
      .filter((v): v is string => typeof v === "string")
      .filter((t) => projectTypes.includes(t)),
    features: formData
      .getAll("features")
      .filter((v): v is string => typeof v === "string")
      .filter((f) => featureOptions.includes(f)),
    pages: str(formData.get("pages")).slice(0, 40),
    timeline: str(formData.get("timeline")).slice(0, 40),
    details: str(formData.get("details")).slice(0, 5000),
    url: safeUrl(str(formData.get("url"))),
  };
  // Fold a typed "Other" description into the type list for the email
  const otherText = str(formData.get("otherType")).slice(0, 120);
  if (otherText) {
    inquiry.types = inquiry.types.map((t) =>
      t === "Other" ? `Other — ${otherText}` : t
    );
  }
  if (!pageOptions.includes(inquiry.pages)) inquiry.pages = "Not sure";
  if (!timelineOptions.includes(inquiry.timeline))
    inquiry.timeline = "Not sure yet";

  if (!inquiry.org || !inquiry.name || !inquiry.phone || !inquiry.details) {
    return { ok: false, error: "Please complete all required fields." };
  }
  if (!EMAIL_RE.test(inquiry.email)) {
    return { ok: false, error: "That email address doesn't look right." };
  }
  if (inquiry.types.length === 0) {
    return { ok: false, error: "Please choose at least one project type." };
  }
  if (inquiry.phone.replace(/\D/g, "").length < 7) {
    return { ok: false, error: "That phone number looks too short." };
  }

  try {
    await getResend().emails.send({
      // Test identity until the domain is verified in Phase 4;
      // replyTo routes replies straight to the inquirer.
      from: "C³ Website <onboarding@resend.dev>",
      to: contactTo(),
      replyTo: inquiry.email,
      subject: inquirySubject(inquiry),
      html: inquiryHtml(inquiry),
      text: inquiryText(inquiry),
    });
    return { ok: true };
  } catch (e) {
    // Visible in Vercel/server logs only — never leaks internals to visitors.
    console.error("[inquiry] Resend send failed:", e);
    const msg = e instanceof Error ? e.message : "";
    if (/own email address|verify a domain|domain/i.test(msg)) {
      return {
        ok: false,
        error:
          "Our mail service needs attention before it can deliver. Please reach us on WhatsApp meanwhile — sorry about that.",
      };
    }
    return {
      ok: false,
      error:
        "Couldn't send just now. Please try again — or reach us on WhatsApp and we'll take it from there.",
    };
  }
}
