// Copy de las páginas de cuenta de cliente (/crear-cuenta, /iniciar-sesion,
// /cuenta). El alta la resuelve Clerk (correo + Google, ver CLAUDE.md §11);
// aquí vive solo el texto que envuelve su formulario.
export const cuenta = {
  crear: {
    eyebrow: "Empezar gratis",
    titulo: "Crea tu cuenta",
    apoyo:
      "Da de alta tu cuenta con tu correo de trabajo o con Google. Configuras tu primer agente en el plan Explorar, sin tarjeta.",
  },
  iniciar: {
    eyebrow: "Tu cuenta",
    titulo: "Inicia sesión",
    apoyo: "Entra con el mismo correo o la misma cuenta de Google con la que te diste de alta.",
  },
  // Sin plano de control configurado (AR2GO_CUSTOMERS_*), /cuenta sigue siendo
  // un cascarón honesto, igual que /admin: lo dice en vez de simular un tablero.
  panel: {
    eyebrow: "Cuenta creada",
    titulo: "Tu cuenta ya está lista",
    apoyo:
      "Estamos terminando de conectar la consola donde configuras tus agentes. Te avisamos a este correo en cuanto puedas entrar.",
    volver: { label: "Volver al inicio", href: "/" },
    cerrarSesion: "Cerrar sesión",
  },
  // Con el plano de control conectado (ar2go-customers, CLAUDE.md §8): la
  // primera vez se pide el nombre de la empresa; después, el plan y los
  // productos que se activan y se abren desde aquí con login único.
  alta: {
    eyebrow: "Un paso más",
    titulo: "¿Cómo se llama tu empresa?",
    apoyo:
      "Es el nombre que verán tu equipo y tus colaboradores en los productos de AR2GO. Lo puedes cambiar después.",
    campo: "Nombre de tu empresa",
    ejemplo: "Panadería La Espiga",
    enviar: "Continuar",
  },
  tablero: {
    eyebrow: "Tu cuenta",
    // "Plan Explorar"
    plan: "Plan",
    apoyo: "Activa los productos que tu negocio necesita y entra a cada uno desde aquí, con tu misma cuenta.",
    productos: "Productos",
    activar: "Activar",
    abrir: "Abrir",
    preparando: "Preparando…",
    proximamente: "Próximamente",
    activo: "Activo",
    suspendido: "Suspendido",
  },
  // Cinta de argonautas en /cuenta (components/cuenta/CintaProductos.tsx).
  cinta: {
    titulo: "Tus argonautas",
    apoyo: "Los que ya trabajan contigo y los que puedes sumar.",
  },
  // Cómo se presenta cada producto del catálogo de ar2go-customers, por su
  // slug. Un producto sin entrada aquí se muestra con el nombre que trae.
  productos: {
    horiq: { nombre: "HorIQ", descripcion: "Argonautas para administrar la asistencia de tu equipo" },
  } as Record<string, { nombre: string; descripcion: string }>,
  // PLACEHOLDER: productos que todavía no existen. Se muestran como
  // "Próximamente", sin botón de contratar, hasta que entren al catálogo de
  // ar2go-customers.
  porVenir: [
    { slug: "nomina", nombre: "Nómina", descripcion: "Argonautas que administran tu nómina" },
    { slug: "contabilidad", nombre: "Contabilidad", descripcion: "Argonautas que concilian tu contabilidad" },
    { slug: "compras", nombre: "Compras", descripcion: "Argonautas que realizan tus compras" },
  ],
  // Mensajes para los códigos de error de ar2go-customers que puede ver la persona.
  avisos: {
    CUOTA_PENDIENTE: "Tu plan todavía no incluye este producto. Te avisamos en cuanto esté disponible.",
    PRODUCTO_NO_LISTO: "Estamos preparando el producto. Intenta abrirlo en unos minutos.",
    PRODUCTO_NO_DISPONIBLE: "Este producto todavía no está disponible.",
    SIN_ACCESO: "Tu usuario no tiene acceso a este producto.",
    ROL_INSUFICIENTE: "Solo quien administra la cuenta puede activar productos.",
    NOMBRE_INVALIDO: "Escribe el nombre de tu empresa (2 a 120 caracteres).",
    SIN_SERVICIO: "No pudimos cargar tu cuenta. Intenta de nuevo en unos minutos.",
    general: "No pudimos completar la acción. Intenta de nuevo.",
  } as Record<string, string>,
  // Aviso de consentimiento: el alta es tratamiento de datos personales
  // (LFPDPPP, ver CLAUDE.md §10), así que la liga al aviso va a la vista.
  legal: {
    prefijo: "Al crear tu cuenta aceptas los",
    terminos: { label: "términos de uso", href: "/terminos" },
    union: "y el",
    aviso: { label: "aviso de privacidad", href: "/aviso-de-privacidad" },
  },
  volverAlSitio: "Volver al sitio",
  // Nav de /cuenta (components/cuenta/CuentaLanding.tsx).
  landing: {
    nav: "Navegación de tu cuenta",
    inicio: "AR2GO, inicio",
  },
} as const;
