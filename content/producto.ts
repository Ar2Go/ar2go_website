export type ProductoPaso = {
  numero: string;
  titulo: string;
  descripcion: string;
};

// Los seis pasos del proceso, en la voz del proceso (CLAUDE.md §8, punto 3).
export const productoPasos: ProductoPaso[] = [
  {
    numero: "01",
    titulo: "Llega el mensaje",
    descripcion:
      "Un prospecto escribe al WhatsApp del negocio, a cualquier hora del día.",
  },
  {
    numero: "02",
    titulo: "Responde con tu catálogo",
    descripcion:
      "El agente contesta con tus productos, precios de lista y disponibilidad reales.",
  },
  {
    numero: "03",
    titulo: "Califica",
    descripcion:
      "Pregunta lo necesario para saber si el prospecto está listo para cotizar.",
  },
  {
    numero: "04",
    titulo: "Cotiza y agenda",
    descripcion:
      "Cotiza a precio de lista y agenda la demo directo en tu calendario.",
  },
  {
    numero: "05",
    titulo: "Registra",
    descripcion: "Guarda la conversación y los datos del prospecto en tu CRM.",
  },
  {
    numero: "06",
    titulo: "Da seguimiento",
    descripcion:
      "Si el prospecto no responde, el agente vuelve a escribirle los días siguientes.",
  },
];

export type MensajeConversacion = {
  de: "prospecto" | "agente";
  texto: string;
};

// Conversación de ejemplo para el visual de chat (no diagrama de
// arquitectura). El precio que aparece es ilustrativo, no un dato real del
// negocio — ver content/precio.ts para los montos reales de AR2GO.
export const conversacionEjemplo: MensajeConversacion[] = [
  {
    de: "prospecto",
    texto: "Hola, vi su anuncio, ¿tienen el modelo chico disponible?",
  },
  {
    de: "agente",
    texto:
      "¡Hola! Sí, tenemos disponibilidad. Te comparto precio y medidas del modelo chico.",
  },
  { de: "prospecto", texto: "¿Cuánto cuesta con instalación incluida?" },
  {
    de: "agente",
    texto:
      "Con instalación queda en $1,850. ¿Te agendo una demo esta semana para que lo veas?",
  },
  { de: "prospecto", texto: "Sí, el jueves en la tarde." },
  {
    de: "agente",
    texto: "Quedó agendado el jueves 4pm. Te llega la confirmación por WhatsApp.",
  },
];
