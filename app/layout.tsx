import type { Metadata, Viewport } from "next";
import Script from "next/script";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import { site } from "@/lib/site";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f6f0" },
    { media: "(prefers-color-scheme: dark)", color: "#090909" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "C³ Media Co. — Ideas that connect. Solutions that scale.",
    template: "%s — C³ Media Co.",
  },
  description:
    "C³ Media Co. — design, development, video and creative production. Explore services, process, about and contact.",
  icons: { icon: "/icon-32.png", apple: "/logo.png" },
  openGraph: {
    type: "website",
    siteName: "C³ Media Co.",
    title: "C³ Media Co. — Ideas that connect. Solutions that scale.",
    description:
      "We build the digital side of ambitious ideas. Websites, apps, brands, motion, 3D.",
  },
  twitter: {
    card: "summary_large_image",
    title: "C³ Media Co. — Ideas that connect. Solutions that scale.",
    description:
      "We build the digital side of ambitious ideas. Websites, apps, brands, motion, 3D.",
  },
};

const themeInit = `(function(){try{var s=localStorage.getItem('c3_theme');if(s==='light'||s==='dark'){document.documentElement.setAttribute('data-theme',s);}else if(window.matchMedia&&window.matchMedia('(prefers-color-scheme: light)').matches){document.documentElement.setAttribute('data-theme','light');}else{document.documentElement.setAttribute('data-theme','dark');}}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className="h-full antialiased"
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        {process.env.NODE_ENV === "development" && (
          <Script
            src="/react-grab.global.js"
            strategy="beforeInteractive"
          />
        )}
      </head>
      <body className="min-h-full flex flex-col">
        <div className="bg-glow" aria-hidden />
        <div className="grid-bg" aria-hidden />
        <div className="orb one" aria-hidden />
        <div className="orb two" aria-hidden />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
