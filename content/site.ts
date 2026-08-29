// Datos centrales del sitio. Un solo lugar por dato (CLAUDE.md §9): ningún
// otro archivo de contenido debe repetir el dominio o el número de WhatsApp.

// TODO_DOMINIO: dominio definitivo del sitio, aún no decidido.
const DOMINIO = "TODO_DOMINIO";

// TODO_WHATSAPP: número de WhatsApp Business en formato E.164 sin "+"
// (ej. 5215512345678), aún no lo tenemos.
const WHATSAPP_NUMERO = "TODO_WHATSAPP";

export const site = {
  nombre: "AR2GO",
  dominio: DOMINIO,
  url: `https://${DOMINIO}`,
  whatsapp: {
    numero: WHATSAPP_NUMERO,
    // Deep link de WhatsApp. Queda roto hasta reemplazar TODO_WHATSAPP por el
    // número real — intencional, para que sea imposible no notarlo.
    href: `https://wa.me/${WHATSAPP_NUMERO}`,
  },
  contacto: {
    correo: `hola@${DOMINIO}`,
  },
} as const;
