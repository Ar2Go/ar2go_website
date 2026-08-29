export type PreguntaFaq = {
  pregunta: string;
  respuesta: string;
};

export const faq: PreguntaFaq[] = [
  {
    pregunta: "¿Qué pasa si el agente se equivoca?",
    respuesta:
      "El agente opera dentro de un espacio de acciones acotado: solo responde con tu catálogo, cotiza a precio de lista, agenda y da seguimiento. No improvisa descuentos ni compromisos. Cada conversación queda en el tablero de auditoría, así que cualquier error se detecta revisando el historial, no adivinando.",
  },
  {
    pregunta: "¿Quién es dueño del número de WhatsApp?",
    respuesta:
      "El número de WhatsApp Business es tuyo y de tu negocio. Nosotros lo conectamos a la plataforma del agente; no te pedimos usar un número nuestro.",
  },
  {
    pregunta: "¿Qué necesito tener para empezar?",
    respuesta:
      "Tu número de WhatsApp Business, tu catálogo de productos o servicios con precios de lista, y acceso a tu calendario para que el agente pueda agendar demos directamente ahí.",
  },
  {
    pregunta: "¿Puedo cancelar?",
    respuesta:
      "Sí, la renta es mensual, sin permanencia forzosa. TODO_LEGAL: confirmar el aviso previo y las condiciones exactas de cancelación antes de publicar.",
  },
  {
    pregunta: "¿Dónde quedan mis datos?",
    respuesta:
      "Se guardan conforme a nuestro aviso de privacidad. Puedes ejercer tus derechos de acceso, rectificación, cancelación y oposición (ARCO) cuando quieras.",
  },
];
