export const nav = {
  links: [
    { label: "Resumen", href: "#inicio" },
    { label: "Tripulación", href: "#agentes" },
    { label: "Nosotros", href: "#nosotros" },
    { label: "Precios", href: "#precios" },
  ],
  // Alta y acceso de clientes con Clerk (correo + Google) — distinto del
  // login de Google de /admin, que administra la fábrica, no clientes.
  iniciarSesion: { label: "Iniciar sesión", href: "/iniciar-sesion" },
  crearCuenta: { label: "Crear cuenta", href: "/crear-cuenta" },
} as const;

export const footer = {
  tagline: "Argonautas y argotipos conectados a la operación real de tu empresa.",
  columnas: [
    {
      titulo: "Producto",
      enlaces: [
        { label: "Argonautas", href: "#agentes" },
        { label: "Argotipos", href: "#agentes" },
        { label: "Precios", href: "#precios" },
      ],
    },
    {
      titulo: "Empresa",
      enlaces: [
        { label: "Nosotros", href: "#nosotros" },
      ],
    },
  ],
} as const;
