import type { MetadataRoute } from "next";
import { actions } from "@/content/actions";
import { events } from "@/content/events";
import { siteConfig } from "@/lib/site";

const routes = [
  { path: "", priority: 1 },
  { path: "/a-propos", priority: 0.8 },
  { path: "/communaute", priority: 0.8 },
  { path: "/activites", priority: 0.8 },
  { path: "/evenements", priority: 0.9 },
  { path: "/actions", priority: 0.8 },
  { path: "/rejoindre", priority: 0.9 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const detail = [
    ...events.map((e) => ({ path: `/evenements/${e.slug}`, priority: 0.7 })),
    ...actions.map((a) => ({ path: `/actions/${a.slug}`, priority: 0.6 })),
  ];
  return [...routes, ...detail].map((r) => ({
    url: `${siteConfig.url}${r.path}`,
    changeFrequency: "monthly",
    priority: r.priority,
  }));
}
