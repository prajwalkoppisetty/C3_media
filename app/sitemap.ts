import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  // NOTE: /work is intentionally unlinked from nav until the portfolio
  // is built out — re-add it here when the Work links go back in.
  const routes = [
    "",
    "/services",
    "/process",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
  ];
  return routes.map((r) => ({
    url: `${site.url}${r || "/"}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: r === "" ? 1 : 0.7,
  }));
}
