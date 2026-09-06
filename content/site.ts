// Datos centrales del sitio. Un solo lugar por dato (CLAUDE.md §9): ningún
// otro archivo de contenido debe repetir el dominio, el teléfono o el correo.

// Dominio definitivo, comprado 2026-09-06. Raíz (sin "www") como canónico —
// Vercel redirige www.ar2go.io → ar2go.io (configuración del proyecto, no de
// este archivo).
const DOMINIO = "ar2go.io";

// TODO_WHATSAPP: número de WhatsApp Business en formato E.164 sin "+"
// (ej. 5215512345678). Ya no es el canal principal del pivote a plataforma
// de autoservicio (CLAUDE.md §1, 2026-09-06), pero se conserva por si algún
// flujo de contacto lo vuelve a usar.
const WHATSAPP_NUMERO = "TODO_WHATSAPP";

// TODO_TELEFONO: número de contacto para el pie de página, aún no asignado
// (la maqueta trae +52 55 0000 0000 como relleno, no un número real).
const TELEFONO = "TODO_TELEFONO";

export const site = {
  nombre: "AR2GO",
  dominio: DOMINIO,
  url: `https://${DOMINIO}`,
  whatsapp: {
    numero: WHATSAPP_NUMERO,
    href: `https://wa.me/${WHATSAPP_NUMERO}`,
  },
  contacto: {
    correo: `hola@${DOMINIO}`,
    telefono: TELEFONO,
    telefonoHref: `tel:+${TELEFONO}`,
    ciudad: "Ciudad de México",
    // TODO_LINKEDIN: liga real de LinkedIn de la empresa, aún no creada.
    linkedin: "TODO_LINKEDIN",
  },
} as const;
