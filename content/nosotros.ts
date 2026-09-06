export const nosotros = {
  titulo: "Ingeniería, no una demo bonita",
  parrafos: [
    "Creamos la próxima generación de software.",
    "Software que no se usa.",
  ],
  // Última línea de la primera estrofa, con énfasis — se maneja aparte para
  // que el componente pueda ponerla en <strong> sin meter HTML en el content.
  enfasis: "Trabaja.",
  descripcion:
    "En AR2GO diseñamos y construimos agentes de IA listos para activar y poner a trabajar en tu negocio. Cada agente está creado para resolver una función concreta, ejecutar tareas y entregar resultados reales desde el primer día.",
  cierre: "Entendemos el negocio. Construimos el agente. Tú ves el resultado.",
  pasos: [
    {
      numero: "Etapa 01",
      titulo: "Descubre",
      descripcion: "Explora las capacidades que tu empresa necesita y encuentra el agente adecuado.",
    },
    {
      numero: "Etapa 02",
      titulo: "Configura",
      descripcion: "Define qué debe hacer, cómo debe hacerlo y qué necesitas que resuelva.",
    },
    {
      numero: "Etapa 03",
      titulo: "Entrena",
      descripcion: "Enséñale tu negocio para que entienda tus procesos, información y forma de trabajar.",
    },
    {
      numero: "Etapa 04",
      titulo: "Activa",
      descripcion: "Ponlo a trabajar y empieza a generar resultados desde el primer día.",
    },
  ],
} as const;
