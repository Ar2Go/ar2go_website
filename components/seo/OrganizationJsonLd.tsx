import { site } from "@/content/site";

// JSON-LD de Organization. "logo" apunta al PNG real del wordmark
// (public/brand/ar2go-logotipo-2026.png) — antes se omitía porque no había
// logo real, ver docs/brand.md §12.
export function OrganizationJsonLd() {
  const datos = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.nombre,
    url: site.url,
    email: site.contacto.correo,
    logo: `${site.url}/brand/ar2go-logotipo-2026.png`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(datos) }}
    />
  );
}
