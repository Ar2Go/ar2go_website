// Sección 02 — A bordo hoy: fichas de Postio y Horiq. Las cifras de los
// mockups (44 registros, Exp. 00148, etc.) son ilustrativas.
export const aBordo = {
  eyebrow: "02 — A bordo hoy",
  titulo: "Conoce a los primeros en subir.",
  apoyo: "Los dos se activan desde tu cuenta en minutos. Prueba cualquiera gratis.",
  postio: {
    tipo: "argonauta",
    badge: "Argonauta",
    etiqueta: "Contenido para redes sociales",
    nombre: "Postio",
    subtitulo: "Tu equipo de redes sociales, sin tener que armar el equipo.",
    descripcion:
      "Postio aprende la voz de tu marca, planea el mes, escribe cada publicación y la adapta a cada red. Tú solo apruebas.",
    puntos: [
      "Calendario del mes listo en minutos",
      "Textos e ideas visuales por red social",
      "Nada sale sin tu visto bueno",
    ],
    cta: { label: "Poner a Postio a trabajar", href: "/crear-cuenta" },
    mock: {
      titulo: "Cola de publicación",
      periodo: "Noviembre",
      publicaciones: [
        { red: "IG", titulo: "Tres errores que frenan a una PyME al cerrar el mes", cuando: "Lun 18:00", estado: "Programada", tono: "listo" },
        { red: "IN", titulo: "Carrusel: cómo trabajamos con nuestros clientes", cuando: "Mié 09:00", estado: "Espera tu visto bueno", tono: "espera" },
        { red: "FB", titulo: "Promoción de temporada con cupón", cuando: "Jue 13:00", estado: "Programada", tono: "listo" },
        { red: "TT", titulo: "Idea de reel: un día en la oficina", cuando: "Vie 17:30", estado: "Borrador", tono: "neutro" },
      ],
    },
  },
  horiq: {
    tipo: "argotipo",
    badge: "Argotipo",
    etiqueta: "Checador virtual de asistencia",
    nombre: "Horiq",
    subtitulo: "Cada checada se convierte en tu mejor defensa ante una auditoría.",
    descripcion:
      "Tus colaboradores registran su jornada desde el celular y Horiq arma solo el expediente digital de cada uno: seguro, inalterable y más completo de lo que pide la norma. Llega la inspección y tú solo lo descargas.",
    puntos: [
      "Expediente digital automático por colaborador",
      "Registros sellados que nadie puede alterar",
      "Cumple de sobra con la norma y evita multas",
    ],
    cta: { label: "Activar Horiq gratis", href: "/crear-cuenta" },
    mock: {
      titulo: "Expediente digital · Octubre",
      estado: "Listo para auditoría",
      nombre: "Paola Rodríguez Quevedo",
      folio: "Exp. 00148 · Generado automáticamente",
      sello: "Sellado",
      metricas: [
        { valor: "44", etiqueta: "Registros de jornada" },
        { valor: "100%", etiqueta: "Expediente completo" },
      ],
      // Confirmado contra el repo de Horiq (2026-10-31): cada checada guarda
      // ubicación, las checadas van encadenadas por huella y el almacén tiene
      // retención bloqueada. La fila "Firma digital del colaborador" del
      // brief se quitó: Horiq no recaba firma del trabajador.
      incluye: [
        { concepto: "Entradas y salidas con fecha, hora y ubicación", estado: "Incluido" },
        { concepto: "Historial inalterable y respaldado", estado: "Incluido" },
        { concepto: "Exportación lista para inspección", estado: "Un clic" },
      ],
    },
  },
} as const;
