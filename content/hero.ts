// AR2GO pivota de "un solo proceso vendido por demo" a una plataforma de
// agentes de IA de autoservicio (CLAUDE.md §1, decisión 2026-09-06). Copy
// tomado tal cual de la maqueta aprobada (home.html).
export const hero = {
  titulo: "Agentes de IA trabajando para ti",
  apoyo:
    "Contrátalos como a cualquier empleado, dales permisos acotados y deja que hagan el trabajo repetitivo. Cada decisión queda registrada.",
  ctaPrimario: { label: "Empezar gratis", href: "#precios" },
  ctaSecundario: { label: "Ver cómo funciona", href: "#agentes" },
  pieDescripcion:
    "Ya trabajando en contabilidad, cobranza, inventarios, ventas, marketing, atención a clientes y recursos humanos",
  // Cifras confirmadas como reales por el dueño del proyecto (2026-09-06) —
  // no son un placeholder TODO_DATO.
  pieAgentes: "más de 150",
  pieAgentesEtiqueta: "agentes en producción",
  pieDisponibilidad: "99.95%",
  pieDisponibilidadEtiqueta: "de disponibilidad",
} as const;
