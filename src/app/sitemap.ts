import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.sumsa.com.ar";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { url: "/", priority: 1.0, changeFrequency: "monthly" as const },
    { url: "/emergencias", priority: 0.9, changeFrequency: "monthly" as const },
    { url: "/planes", priority: 0.9, changeFrequency: "monthly" as const },
    { url: "/servicios", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/servicios/cursos", priority: 0.7, changeFrequency: "monthly" as const },
    { url: "/contacto", priority: 0.8, changeFrequency: "yearly" as const },
    { url: "/contacto/pagos", priority: 0.6, changeFrequency: "yearly" as const },
    { url: "/contacto/trabaja", priority: 0.5, changeFrequency: "yearly" as const },
  ];

  return routes.map(({ url, priority, changeFrequency }) => ({
    url: `${siteUrl}${url}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));
}
