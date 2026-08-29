// TODO_PRECIO: montos en revisión (brief inicial). Confirmar antes de
// publicar — cambiar aquí es un PR de una línea, no se toca el JSX.
export const precio = {
  implementacion: {
    label: "Implementación",
    monto: "$9,000 MXN",
    frecuencia: "pago único",
  },
  renta: {
    label: "Renta mensual",
    monto: "$2,900 MXN",
    frecuencia: "al mes",
    incluye: "300 conversaciones incluidas",
  },
  notaMeta:
    "Las tarifas de conversación de Meta (WhatsApp Business) se facturan al costo, por separado.",
} as const;
