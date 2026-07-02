import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: "https://micaelaauzmendi.com", lastModified, changeFrequency: "monthly", priority: 1 },
    { url: "https://micaelaauzmendi.com/proyectos", lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: "https://micaelaauzmendi.com/en", lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: "https://micaelaauzmendi.com/en/proyectos", lastModified, changeFrequency: "monthly", priority: 0.7 },
  ];
}
