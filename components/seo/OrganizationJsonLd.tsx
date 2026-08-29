import { site } from "@/content/site";

// JSON-LD de Organization. Sin "logo": public/brand/ todavía no tiene el
// isotipo real (ver public/brand/README.md) y no queremos apuntar a un
// archivo que no existe.
export function OrganizationJsonLd() {
  const datos = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.nombre,
    url: site.url,
    email: site.contacto.correo,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(datos) }}
    />
  );
}
