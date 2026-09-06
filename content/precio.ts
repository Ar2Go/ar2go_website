// Modelo de precios de autoservicio (Explorar/Equipo/Empresa) — reemplaza el
// modelo anterior de implementación + renta de un solo proceso (CLAUDE.md
// §1, decisión 2026-09-06, pivote de negocio). Montos confirmados como
// reales por el dueño del proyecto, no son TODO_PRECIO.
export const precio = {
  eyebrow: "Precios",
  titulo: "Precios claros, sin sorpresas al final del mes",
  apoyo: "Empieza gratis con un agente. Cambias de plan cuando el consumo lo pida, no antes.",
  planes: [
    {
      nombre: "Explorar",
      destacado: false,
      monto: "$0",
      periodo: "para siempre",
      para: "Para probar con un caso real antes de comprometer presupuesto.",
      incluye: [
        "1 agente activo",
        "500 ejecuciones al mes",
        "Conectores estándar",
        "Historial de 7 días",
      ],
      cta: { label: "Crear cuenta", href: "#" },
    },
    {
      nombre: "Equipo",
      destacado: true,
      badge: "El más elegido",
      monto: "$4,900",
      periodo: "MXN al mes",
      para: "Para el área que ya tiene un proceso identificado y quiere escalarlo.",
      incluye: [
        "Hasta 10 agentes activos",
        "25,000 ejecuciones al mes",
        "Todos los conectores, incluido tu ERP",
        "Ambientes de prueba y producción",
        "Soporte en horario hábil",
      ],
      cta: { label: "Empezar 14 días gratis", href: "#" },
    },
    {
      nombre: "Empresa",
      destacado: false,
      monto: "A medida",
      periodo: null,
      para: "Para operaciones con requisitos regulatorios o despliegue en tu propia nube.",
      incluye: [
        "Agentes y ejecuciones sin límite",
        "Despliegue en tu nube o en sitio",
        "Inicio de sesión único y control de accesos",
        "Acuerdo de nivel de servicio e ingeniero asignado",
      ],
      cta: { label: "Hablar con ventas", href: "#contacto" },
    },
  ],
  notaMeta: "Precios en pesos mexicanos, sin IVA. Una ejecución es cada vez que un agente completa una tarea.",
} as const;
