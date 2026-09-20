import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // /crear-cuenta sí se indexa (es una página de conversión); su
        // contraparte privada y los pasos de sesión, no.
        disallow: ["/muestra", "/admin", "/cuenta", "/iniciar-sesion"],
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
