import type { MetadataRoute } from "next";
import { site } from "@/content/site";

// Home y alta de cuenta: las páginas legales siguen en borrador y quedan
// noindex (ver app/aviso-de-privacidad y app/terminos) hasta la revisión de
// abogado, así que no tiene caso listarlas todavía en el sitemap.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${site.url}/`,
      lastModified: new Date(),
    },
    {
      url: `${site.url}/crear-cuenta`,
      lastModified: new Date(),
    },
  ];
}
