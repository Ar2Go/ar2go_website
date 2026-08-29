export type EstadisticaProblema = {
  // TODO_DATO: cifra real del negocio, todavía sin fuente. No se inventa
  // (CLAUDE.md §3) — se deja visible como placeholder hasta tener el dato.
  cifra: string;
  descripcion: string;
};

export const problema = {
  eyebrow: "El problema",
  titulo: "Cada mensaje sin responder es un cliente que ya cotizó con otro.",
  apoyo:
    "Un prospecto de WhatsApp no espera. Si nadie contesta en los primeros minutos, sigue buscando.",
  estadisticas: [
    {
      cifra: "TODO_DATO",
      descripcion:
        "de los leads de WhatsApp de una pyme llegan fuera de horario de atención.",
    },
    {
      cifra: "TODO_DATO",
      descripcion: "es el tiempo promedio de primera respuesta hoy.",
    },
    {
      cifra: "TODO_DATO",
      descripcion:
        "de los prospectos que no reciben respuesta en la primera hora ya no vuelven a escribir.",
    },
  ] satisfies EstadisticaProblema[],
} as const;
