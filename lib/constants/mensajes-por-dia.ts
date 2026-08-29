// Aparte de lib/schemas/demo.ts para que un componente cliente (DemoForm)
// pueda usar las opciones del <select> sin arrastrar Zod al bundle del
// navegador.
export const opcionesMensajesPorDia = [
  "1-5",
  "6-20",
  "21-50",
  "Más de 50",
] as const;
