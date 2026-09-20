export const nav = {
  links: [
    { label: "Resumen", href: "#inicio" },
    { label: "Agentes", href: "#agentes" },
    { label: "Nosotros", href: "#nosotros" },
    { label: "Precios", href: "#precios" },
  ],
  // Alta y acceso de clientes con Clerk (correo + Google) — distinto del
  // login de Google de /admin, que administra la fábrica, no clientes.
  iniciarSesion: { label: "Iniciar sesión", href: "/iniciar-sesion" },
  crearCuenta: { label: "Crear cuenta", href: "/crear-cuenta" },
} as const;

export const footer = {
  tagline:
    "Tecnología que te impulsa. Agentes de IA conectados a la operación real de tu empresa.",
  columnas: [
    {
      titulo: "Producto",
      enlaces: [
        { label: "Agentes", href: "#agentes" },
        { label: "Precios", href: "#precios" },
        { label: "Conectores", href: "#" },
        { label: "Documentación", href: "#" },
      ],
    },
    {
      titulo: "Empresa",
      enlaces: [
        { label: "Nosotros", href: "#nosotros" },
        { label: "Seguridad", href: "#" },
        { label: "Blog", href: "#" },
        { label: "Trabaja con nosotros", href: "#" },
      ],
    },
  ],
} as const;
