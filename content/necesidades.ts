// Sección 04 — Para cualquier negocio: tabs por necesidad, no por industria.
// No nombra productos ni argonautas por venir.
export const necesidades = {
  eyebrow: "04 — Para cualquier negocio",
  titulo: "Sabemos lo que cuesta sacar adelante un negocio.",
  apoyo:
    "Un despacho, una tienda, un taller o una clínica: cada uno con su propia forma de trabajar. Elige lo que hoy te quita más tiempo y mira cómo la tripulación te ayuda a resolverlo.",
  etiquetaItems: "Lo que tu tripulación hace por ti",
  // Flechas que aparecen cuando los tabs no caben (móvil).
  verMas: "Ver más necesidades",
  verAnteriores: "Ver necesidades anteriores",
  tabs: [
    {
      id: "conocer",
      tab: "Que me conozcan",
      titulo: "Publicar todos los días no debería depender de que te sobre tiempo.",
      descripcion:
        "Sabes que tu negocio tiene que estar en redes, pero entre clientes y pendientes nunca se hace. Tu marca se queda callada justo cuando más la necesitas.",
      items: [
        "Un calendario de publicaciones para todo el mes",
        "Textos adaptados a Instagram, Facebook, LinkedIn y TikTok",
        "Promociones y anuncios de temporada listos a tiempo",
      ],
    },
    {
      id: "equipo",
      tab: "Ordenar a mi equipo",
      titulo: "Saber quién llegó no debería requerir una lista en papel.",
      descripcion:
        "Seas cinco o cincuenta, en una oficina o en varias ubicaciones. Cada registro queda guardado y en orden para cuando alguien lo pida.",
      items: [
        "Registro de entradas y salidas desde el celular",
        "Expediente digital de cada colaborador, generado solo",
        "Todo listo ante una auditoría, sin multas ni sorpresas",
      ],
    },
    {
      id: "vender",
      tab: "Vender y cobrar",
      titulo: "Cotizar rápido y cobrar a tiempo, sin que se te escape ninguna.",
      descripcion:
        "Las ventas se pierden por responder tarde y el dinero se atora por no dar seguimiento. Dos tareas que nadie disfruta y todos necesitan.",
      items: [
        "Cotizaciones con tus precios, listas para enviar",
        "Seguimiento a cada factura vencida",
        "Llamadas para confirmar pedidos y pagos",
      ],
    },
    {
      id: "atender",
      tab: "Atender clientes",
      titulo: "Responder a cualquier hora, sin estar pegado al teléfono.",
      descripcion:
        "Tus clientes escriben por WhatsApp, por chat y por teléfono, y esperan respuesta ya. Contestar todo tú solo no escala.",
      items: [
        "Respuestas inmediatas por WhatsApp y chat, a cualquier hora",
        "Dudas frecuentes resueltas sin intervención",
        "Solo los casos complejos llegan a una persona",
      ],
    },
    {
      id: "numeros",
      tab: "Llevar los números",
      titulo: "Las cuentas claras, sin esperar al cierre del mes para enterarte.",
      descripcion:
        "Facturas, gastos, flujo de efectivo. Lo que más importa para tomar decisiones suele ser lo último que se actualiza.",
      items: [
        "Gastos y facturas clasificados al día",
        "Flujo de efectivo actualizado y alertas a tiempo",
        "Reportes listos para tu contador y para la nómina",
      ],
    },
  ],
} as const;
