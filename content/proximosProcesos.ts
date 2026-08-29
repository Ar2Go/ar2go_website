export type ProximoProceso = {
  slug: string;
  nombre: string;
  descripcion: string;
};

export const proximosProcesos = {
  eyebrow: "Próximamente",
  titulo: "El mismo modelo, para el resto de tu administración.",
  apoyo:
    "Un proceso empaquetado sirve para giros distintos con configuración mínima. Estos son los siguientes en el roadmap.",
  procesos: [
    {
      slug: "conciliacion-pagos",
      nombre: "Conciliación y aplicación de pagos",
      descripcion:
        "Cruza los pagos que entran contra las facturas pendientes y las marca como pagadas.",
    },
    {
      slug: "cobranza",
      nombre: "Cobranza de cuentas por cobrar",
      descripcion:
        "Da seguimiento a clientes con saldo vencido, con el mismo criterio de escalamiento a un humano.",
    },
    {
      slug: "cuentas-por-pagar",
      nombre: "Cuentas por pagar",
      descripcion:
        "Registra facturas de proveedores y avisa antes de cada fecha de vencimiento.",
    },
  ] satisfies ProximoProceso[],
  listaEspera: {
    titulo: "Avísame cuando esté listo",
    cta: "Avísame",
  },
} as const;
