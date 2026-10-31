// Hero de la home: AR2GO arma la tripulación de IA de la empresa
// (argonautas y argotipos). Copy literal del rediseño de 2026-10-31.
export const hero = {
  eyebrow: "Argonautas y argotipos · En servicio",
  titulo: "Contrata a tu primera tripulación de IA.",
  // El párrafo va en partes para poner "argonautas" y "argotipos" en negritas
  // sin meter HTML en el content.
  apoyo: [
    { texto: "Los " },
    { texto: "argonautas", enfasis: true },
    { texto: " son agentes de IA que ejecutan tareas por su cuenta. Los " },
    { texto: "argotipos", enfasis: true },
    {
      texto:
        " son herramientas inteligentes, llave en mano. Llegan listos para trabajar el primer día.",
    },
  ],
  ctaPrimario: { label: "Empezar gratis", href: "#precios" },
  ctaSecundario: { label: "Conoce a la tripulación", href: "#agentes" },

  // Franja de tripulación bajo el hero.
  franja: [
    { etiqueta: "Argonauta a bordo", valor: "Postio", descripcion: "contenido para redes" },
    { etiqueta: "Argotipo a bordo", valor: "Horiq", descripcion: "checador virtual" },
    { etiqueta: "En astillero", valor: "8 argonautas", descripcion: "por zarpar" },
  ],

  // Solo los usa el pie de la foto de /crear-cuenta e /iniciar-sesion
  // (components/layout/CuentaSplit.tsx). La home ya no los muestra.
  pieAgentes: "más de 150",
  pieAgentesEtiqueta: "agentes en producción",
  pieDisponibilidad: "99.95%",
  pieDisponibilidadEtiqueta: "de disponibilidad",
} as const;

// Bitácora de a bordo del hero. Ilustrativa: rota en loop y habla por área,
// nunca por producto (no nombra a Postio ni a Horiq).
export const bitacora = {
  titulo: "Bitácora de a bordo",
  estado: "En vivo",
  // Hora de la primera entrada; avanza un minuto por entrada.
  horaInicial: { horas: 9, minutos: 2 },
  filasVisibles: 5,
  intervaloMs: 2800,
  entradas: [
    { area: "Marketing", iniciales: "MK", tipo: "argonauta", texto: "Calendario de noviembre listo: 16 publicaciones para revisar." },
    { area: "Recursos humanos", iniciales: "RH", tipo: "argotipo", texto: "Expedientes de octubre generados y sellados: 40 colaboradores." },
    { area: "Contabilidad", iniciales: "CO", tipo: "argonauta", texto: "48 facturas de proveedores conciliadas contra el banco." },
    { area: "Ventas", iniciales: "VE", tipo: "argonauta", texto: "Cotización para Grupo Herrera lista: 3 partidas, vigencia 15 días." },
    { area: "Cobranza", iniciales: "CB", tipo: "argonauta", texto: "Recordatorio enviado por WhatsApp a 7 clientes con saldo vencido." },
    { area: "Finanzas", iniciales: "FI", tipo: "argonauta", texto: "Flujo de efectivo actualizado: alerta de liquidez para el día 28." },
    { area: "Marketing", iniciales: "MK", tipo: "argonauta", texto: "Publicación de Instagram aprobada y programada para las 18:00." },
    { area: "Recursos humanos", iniciales: "RH", tipo: "argotipo", texto: "Expediente listo para inspección laboral. Descarga en un clic." },
    { area: "Cobranza", iniciales: "CB", tipo: "argonauta", texto: "$84,500 recuperados esta semana. 2 casos escalados a ti." },
    { area: "Ventas", iniciales: "VE", tipo: "argonauta", texto: "Prospecto nuevo respondido en 40 segundos por chat." },
  ],
} as const;
