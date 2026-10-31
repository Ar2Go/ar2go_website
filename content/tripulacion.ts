// Sección 01 — La tripulación (#agentes): las dos familias de producto.
export const tripulacion = {
  eyebrow: "01 — La tripulación",
  titulo: "Dos formas de poner a la IA a trabajar.",
  apoyo:
    "Unos trabajan solos. Otros te hacen el trabajo más fácil. Ninguno necesita un proyecto de implementación.",
  imagen: "/home/tripulacion.webp",
  familias: [
    {
      destacada: true,
      etiquetas: ["Agentes de IA", "Trabajan solos"],
      nombre: "Argonautas",
      descripcion:
        "Les das un objetivo y permisos acotados. Ejecutan la tarea de principio a fin, te piden visto bueno cuando hace falta y dejan registrada cada decisión.",
      chips: ["Ejecutan", "Deciden dentro de sus límites", "Reportan"],
    },
    {
      destacada: false,
      etiquetas: ["Software inteligente", "Llave en mano"],
      nombre: "Argotipos",
      descripcion:
        "Herramientas que resuelven una sola cosa, y la resuelven muy bien. Las activas hoy, tu equipo las usa mañana. Sin consultores, sin manuales, sin curva de aprendizaje.",
      chips: ["Sencillas", "Listas para usar", "Inteligentes por dentro"],
    },
  ],
} as const;
