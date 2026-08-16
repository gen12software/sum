import type { MetadataRoute } from "next";

import { getNovedadesPublicadas } from "@/lib/novedades/queries";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.sumsa.com.ar";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = [
    { url: "/", priority: 1.0, changeFrequency: "monthly" as const },
    { url: "/emergencias", priority: 0.9, changeFrequency: "monthly" as const },
    { url: "/planes", priority: 0.9, changeFrequency: "monthly" as const },
    { url: "/servicios", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/servicios/cursos", priority: 0.7, changeFrequency: "monthly" as const },
    { url: "/novedades", priority: 0.8, changeFrequency: "weekly" as const },
    { url: "/contacto", priority: 0.8, changeFrequency: "yearly" as const },
    { url: "/contacto/pagos", priority: 0.6, changeFrequency: "yearly" as const },
    { url: "/contacto/trabaja", priority: 0.5, changeFrequency: "yearly" as const },
  ];

  const estaticas = routes.map(({ url, priority, changeFrequency }) => ({
    url: `${siteUrl}${url}`,
    lastModified: new Date("2025-01-01"),
    changeFrequency,
    priority,
  }));

  // Solo las publicadas: la consulta ya filtra por ese estado, así que los
  // borradores nunca llegan acá.
  const novedades = await getNovedadesPublicadas();

  const dinamicas = novedades.map((novedad) => ({
    url: `${siteUrl}/novedades/${novedad.slug}`,
    lastModified: new Date(novedad.updated_at),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...estaticas, ...dinamicas];
}
