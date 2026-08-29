// Los tiempos por paso son una propuesta operativa, no un dato confirmado
// con el equipo de implementación — revisar antes de publicar que sean
// tiempos que AR2GO pueda cumplir de forma consistente.
export const comoEmpezamos = {
  eyebrow: "Cómo empezamos",
  titulo: "Tres pasos, no un proyecto de tres meses.",
  pasos: [
    {
      numero: "01",
      titulo: "Conectamos tu WhatsApp Business y tu catálogo",
      tiempo: "Mismo día",
    },
    {
      numero: "02",
      titulo: "Configuramos precios, calendario y reglas de escalamiento",
      tiempo: "1–2 días",
    },
    {
      numero: "03",
      titulo: "Revisas conversaciones de prueba y lo activamos",
      tiempo: "Antes de una semana",
    },
  ],
} as const;
