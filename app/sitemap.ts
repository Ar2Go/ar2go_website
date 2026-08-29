import type { MetadataRoute } from "next";
import { site } from "@/content/site";

// Solo la home: las páginas legales siguen en borrador y quedan noindex
// (ver app/aviso-de-privacidad y app/terminos) hasta la revisión de abogado,
// así que no tiene caso listarlas todavía en el sitemap.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${site.url}/`,
      lastModified: new Date(),
    },
  ];
}
