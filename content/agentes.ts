// Sección "Elige el agente que tu negocio necesita hoy". Cada agente trae
// una miniatura de interfaz (el bloque "shot") con una forma distinta —
// checklist, mensaje o alertas — por eso el contenido de esa miniatura es
// una unión discriminada en vez de forzar un solo formato para las tres.
type FilaChecklist = { tipo: "check"; texto: string; tag?: string };
type FilaAlerta = { tipo: "alerta"; texto: string; tag: string };

type ShotChecklist = {
  variante: "checklist";
  encabezado: string;
  filas: (FilaChecklist | FilaAlerta)[];
};

type ShotMensaje = {
  variante: "mensaje";
  encabezado: string;
  mensaje: string;
  meta: string;
  filaFinal: FilaAlerta;
};

export const agentes: {
  alt: string;
  imagen: string;
  titulo: string;
  descripcion: string;
  shot: ShotChecklist | ShotMensaje;
}[] = [
  {
    alt: "Un agente ejecutando un trámite administrativo de principio a fin",
    imagen: "/home/agente-tramite.webp",
    titulo: "Ejecutan el trámite",
    descripcion:
      "Leen el documento, capturan en el sistema y avanzan el flujo. Se detienen y preguntan cuando el caso sale de lo previsto.",
    shot: {
      variante: "checklist",
      encabezado: "Agente de cuentas por pagar",
      filas: [
        { tipo: "check", texto: "Factura leída y validada" },
        { tipo: "check", texto: "Cargada al sistema" },
        {
          tipo: "alerta",
          texto: "Esperando visto bueno de tesorería",
          tag: "En turno",
        },
      ],
    },
  },
  {
    alt: "Un agente preparando una propuesta lista para revisión",
    imagen: "/home/agente-propuesta.webp",
    titulo: "Crean contigo",
    descripcion:
      "Redactan la propuesta, arman el reporte, preparan la respuesta. Tú revisas y apruebas antes de que salga.",
    shot: {
      variante: "mensaje",
      encabezado: "Agente de propuestas",
      mensaje: "Cotización para Grupo Herrera, lista",
      meta: "3 partidas, vigencia 15 días",
      filaFinal: { tipo: "alerta", texto: "Pendiente de tu visto bueno", tag: "Espera" },
    },
  },
  {
    alt: "Un agente vigilando la operación y levantando alertas",
    imagen: "/home/agente-inventario.webp",
    titulo: "Vigilan y avisan",
    descripcion:
      "Revisan tu operación todo el día y te avisan cuando algo se sale de lo normal. Levantan el ticket antes de que alguien lo note.",
    shot: {
      variante: "checklist",
      encabezado: "Agente de inventario",
      filas: [
        { tipo: "alerta", texto: "Stock de 12 claves bajo mínimo", tag: "Alerta" },
        { tipo: "alerta", texto: "Orden de compra sugerida", tag: "Listo" },
        { tipo: "alerta", texto: "Compras notificado en WhatsApp", tag: "Listo" },
      ],
    },
  },
];
