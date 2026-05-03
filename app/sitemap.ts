import type { MetadataRoute } from "next";
import { routing } from "@/lib/routing";
import { projectIds } from "@/lib/projects";

const BASE_URL = "https://sarmadax.com";

// Static routes and their priorities / change frequencies.
const staticRoutes: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}> = [
  { path: "", changeFrequency: "monthly", priority: 1.0 },
  { path: "/services", changeFrequency: "monthly", priority: 0.9 },
  { path: "/pricing", changeFrequency: "monthly", priority: 0.9 },
  { path: "/portfolio", changeFrequency: "monthly", priority: 0.8 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.8 },
  { path: "/about", changeFrequency: "monthly", priority: 0.7 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
];

// Build a canonical URL for a given locale and path.
// English (default) omits the prefix; Arabic gets /ar prefix.
function url(locale: string, path: string) {
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  return `${BASE_URL}${prefix}${path}`;
}

// Build the hreflang alternates block for a path.
function alternates(path: string) {
  return {
    languages: Object.fromEntries(
      routing.locales.map((locale) => [locale, url(locale, path)])
    ) as Record<string, string>,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Static pages — one entry per locale.
  const staticEntries = staticRoutes.flatMap(
    ({ path, changeFrequency, priority }) =>
      routing.locales.map((locale) => ({
        url: url(locale, path),
        lastModified: now,
        changeFrequency,
        priority,
        alternates: alternates(path),
      }))
  );

  // Portfolio case-study pages.
  const projectEntries = projectIds.flatMap((slug) =>
    routing.locales.map((locale) => ({
      url: url(locale, `/portfolio/${slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
      alternates: alternates(`/portfolio/${slug}`),
    }))
  );

  return [...staticEntries, ...projectEntries];
}
