export const control = {
  eyebrow: "Control y límites",
  titulo: "El agente no decide nada que tú no le hayas dado permiso de decidir.",
  apoyo:
    "Opera dentro de un espacio de acciones acotado: responde con tu catálogo, cotiza a precio de lista, agenda y da seguimiento. Todo lo demás lo escala a un humano.",
  escalamientos: [
    "El prospecto pide un descuento o una condición especial.",
    "Se pide un compromiso de fecha de entrega.",
    "Es un cliente existente con un reclamo.",
    "El tema toca algo legal.",
    "Llevan tres intercambios sin avanzar.",
  ],
  auditoria: {
    titulo: "Tablero de auditoría",
    descripcion:
      "Cada conversación queda registrada. El dueño del negocio puede leerla completa, en cualquier momento, para ver exactamente qué dijo el agente.",
  },
} as const;
