import type { MetadataRoute } from "next";

const baseUrl = "https://softwareinovations.com.br";

const routes: {
  path: string;
  changeFrequency: "monthly" | "yearly";
  priority: number;
}[] = [
  { path: "/", changeFrequency: "monthly", priority: 1 },
  { path: "/solucoes", changeFrequency: "monthly", priority: 0.8 },
  { path: "/portfolio", changeFrequency: "monthly", priority: 0.8 },
  { path: "/sobre", changeFrequency: "yearly", priority: 0.5 },
  { path: "/contato", changeFrequency: "yearly", priority: 0.5 },
  { path: "/privacidade", changeFrequency: "yearly", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
