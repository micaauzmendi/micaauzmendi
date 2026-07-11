import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    // /proyectos + /en/proyectos están ocultos por ahora (redirigen al home).
    { url: "https://micaelaauzmendi.com", lastModified, changeFrequency: "monthly", priority: 1 },
    { url: "https://micaelaauzmendi.com/en", lastModified, changeFrequency: "monthly", priority: 0.9 },
  ];
}
