export const site = {
  name: "C³ Media Co.",
  // IMPORTANT: set NEXT_PUBLIC_SITE_URL to the real production domain
  // at deploy time — sitemap, robots and social previews inherit it.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://c3media.co",
  tagline: "Design · Develop · Deliver",
  whatsapp: "https://wa.me/6309805170",
  whatsappLabel: "Chat with C³",
  email: "ccubemedia.co@gmail.com",
  nav: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Process", href: "/process" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
} as const;
