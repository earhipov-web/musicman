import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

const routes = [
  { path: "", priority: 1 },
  { path: "/why", priority: 0.8 },
  { path: "/services", priority: 0.8 },
  { path: "/pricing", priority: 0.9 },
  { path: "/signup", priority: 0.5 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((r) => ({
    url: `${site.url}${r.path}`,
    lastModified: new Date("2026-10-31"),
    changeFrequency: "monthly",
    priority: r.priority,
  }));
}
