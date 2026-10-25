// Planes de AR2GO (D37, 2026-10-25, pedido de Héctor): Explorador, Navegante y
// Timonel reemplazan a Explorar/Equipo/Empresa. El plan es de la empresa y
// limita cuántos argonautas o argotipos tiene activos (ar2go-customers,
// migración 0008). Montos confirmados por el dueño del proyecto.
export const precio = {
  eyebrow: "Precios",
  titulo: "Precios claros, sin sorpresas al final del mes",
  apoyo: "Empieza gratis con un argonauta o argotipo. Cambias de plan cuando lo necesites, no antes.",
  planes: [
    {
      nombre: "Explorador",
      destacado: false,
      monto: "$0",
      periodo: "MXN, para siempre",
      para: "Para probar AR2GO con un caso real antes de comprometer presupuesto.",
      incluye: ["1 argonauta o argotipo activo", "HorIQ con hasta 10 trabajadores"],
      cta: { label: "Crear cuenta", href: "/crear-cuenta" },
    },
    {
      nombre: "Navegante",
      destacado: true,
      badge: "El más elegido",
      monto: "US$499",
      periodo: "al mes",
      para: "Para la empresa que ya opera con AR2GO y quiere sumar otro frente.",
      incluye: ["Hasta 5 argonautas o argotipos activos", "HorIQ sin límite de trabajadores"],
      cta: { label: "Crear cuenta", href: "/crear-cuenta" },
    },
    {
      nombre: "Timonel",
      destacado: false,
      monto: "US$999",
      periodo: "al mes",
      para: "Para llevar toda la operación con AR2GO.",
      incluye: ["Todos los argonautas y argotipos", "Sin límites de uso"],
      cta: { label: "Crear cuenta", href: "/crear-cuenta" },
    },
  ],
  notaMeta: "Precios sin IVA. Explorador en pesos mexicanos; Navegante y Timonel en dólares estadounidenses.",
} as const;
