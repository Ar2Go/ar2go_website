// Sección 03 — En astillero: argonautas que todavía no existen. Solo
// anuncio, sin formulario ni captura de correo.
export const astillero = {
  eyebrow: "03 — En astillero",
  titulo: "La tripulación crece cada mes.",
  apoyo:
    "Estos argonautas se están construyendo ahora mismo. Cuando zarpe el que necesitas, se suma a tu cuenta sin volver a empezar.",
  estado: "Por zarpar",
  // Puerto entre montañas; la misma foto de fondo de /cuenta.
  imagen: "/acceso/landing.webp",
  argonautas: [
    { numero: "01", nombre: "Contabilidad", descripcion: "Concilia, clasifica y te entrega el cierre sin perseguir comprobantes." },
    { numero: "02", nombre: "Finanzas", descripcion: "Flujo de efectivo al día y alertas antes de que falte liquidez." },
    { numero: "03", nombre: "Recursos humanos", descripcion: "Altas, vacaciones, incidencias y expedientes en orden." },
    { numero: "04", nombre: "Cotizaciones", descripcion: "Arma la propuesta con tus precios y te la deja lista para enviar." },
    { numero: "05", nombre: "Cobranza", descripcion: "Da seguimiento a cada factura vencida, con tacto y sin olvidar ninguna." },
    { numero: "06", nombre: "Servicio a cliente", descripcion: "Resuelve dudas frecuentes y escala solo lo que necesita a una persona." },
    { numero: "07", nombre: "Chats y WhatsApp", descripcion: "Contesta al instante, a cualquier hora, con la voz de tu marca." },
    { numero: "08", nombre: "Llamadas", descripcion: "Confirma citas, da seguimiento y registra cada conversación." },
  ],
} as const;
