// Planes de AR2GO (D37, 2026-10-25, pedido de Héctor): Explorador, Navegante y
// Timonel reemplazan a Explorar/Equipo/Empresa. El plan es de la empresa y
// limita cuántos argonautas o argotipos tiene activos (ar2go-customers,
// migración 0008). Montos confirmados por el dueño del proyecto.
export const precio = {
  eyebrow: "06 — Precios",
  titulo: "Precios claros. Sin sorpresas al final del mes.",
  apoyo: "Empieza gratis con un tripulante. Sube de rango cuando tu operación lo pida, no antes.",
  planes: [
    {
      nombre: "Explorador",
      destacado: false,
      monto: "$0",
      periodo: "MXN, para siempre",
      para: "Para probar AR2GO con un caso real antes de comprometer presupuesto.",
      incluye: ["1 argonauta o argotipo activo", "Horiq con hasta 10 trabajadores"],
      cta: { label: "Crear cuenta gratis", href: "/crear-cuenta" },
    },
    {
      nombre: "Navegante",
      destacado: true,
      monto: "US$499",
      periodo: "al mes",
      para: "Para la empresa que ya opera con AR2GO y quiere abrir otro frente.",
      incluye: ["Hasta 5 argonautas o argotipos activos", "Horiq sin límite de trabajadores"],
      cta: { label: "Crear cuenta", href: "/crear-cuenta" },
    },
    {
      nombre: "Timonel",
      destacado: false,
      monto: "US$999",
      periodo: "al mes",
      para: "Para llevar toda la operación con AR2GO.",
      incluye: [
        "Toda la tripulación: argonautas y argotipos",
        "Cada nuevo argonauta, en cuanto zarpa",
        "Sin límites de uso",
      ],
      cta: { label: "Crear cuenta", href: "/crear-cuenta" },
    },
  ],
  notaMeta: "Precios sin IVA. Explorador en pesos mexicanos; Navegante y Timonel en dólares estadounidenses.",
} as const;
