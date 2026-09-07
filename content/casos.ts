// Sección "Una solución distinta en cada piso" — tabs por industria. El
// gráfico decorativo de cada panel (panel__art) es SVG único por caso; vive
// en el componente (CasosPorIndustria.tsx), no aquí, porque es trazo
// vectorial, no copy.
export const casos = [
  {
    id: "manufactura",
    tab: "Manufactura",
    titulo:
      "La planta sabe lo que produjo. El corporativo se entera tres días después.",
    descripcion:
      "El agente lee las señales de línea, las cruza con el ERP y publica el estado de producción en cuanto cambia.",
    resultados: [
      "Producción y paros visibles el mismo turno, sin capturas manuales.",
      "Aviso de mantenimiento con las señales que ya emiten los equipos.",
      "Trazabilidad por lote lista para auditoría de cliente.",
    ],
    cifra: { numero: "-31%", etiqueta: "de paro no planeado en los primeros dos trimestres" },
  },
  {
    id: "logistica",
    tab: "Logística",
    titulo: "Seis sistemas para mover una caja del almacén al cliente.",
    descripcion:
      "El agente sigue el pedido de punta a punta y dispara la facturación cuando llega la evidencia de entrega.",
    resultados: [
      "Un solo estatus de pedido, igual para operación y para el cliente.",
      "Alertas de retraso antes de que el cliente marque.",
      "Facturación disparada por evidencia, no por captura.",
    ],
    cifra: { numero: "4.2h", etiqueta: "menos por embarque entre la entrega y la factura" },
  },
  {
    id: "retail",
    tab: "Retail",
    titulo: "El inventario del sistema y el del anaquel nunca coinciden.",
    descripcion:
      "El agente concilia punto de venta, comercio electrónico y centro de distribución sobre una sola fuente de existencias.",
    resultados: [
      "Existencias en tiempo real por tienda y por canal.",
      "Reabasto sugerido con historia de venta y estacionalidad.",
      "Menos cancelaciones por producto vendido y no disponible.",
    ],
    cifra: { numero: "98.6%", etiqueta: "de exactitud de inventario sostenida a doce meses" },
  },
  {
    id: "financiero",
    tab: "Servicios financieros",
    titulo: "Cada nuevo requerimiento regulatorio cuesta un trimestre de desarrollo.",
    descripcion:
      "El agente arma el reporte desde la misma capa de datos que usa la operación y deja el rastro completo para el auditor.",
    resultados: [
      "Reportes reproducibles, con linaje del dato de punta a punta.",
      "Bitácora de accesos y cambios lista para revisión.",
      "Ambientes separados con despliegue controlado y reversible.",
    ],
    cifra: { numero: "3 sem", etiqueta: "para incorporar un nuevo requerimiento de reporte" },
  },
] as const;
