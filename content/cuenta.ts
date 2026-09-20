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
  // /cuenta es un cascarón honesto, igual que /admin: la plataforma donde
  // corren los agentes todavía no está conectada a este sitio, así que la
  // página lo dice en vez de simular un tablero que no existe.
  panel: {
    eyebrow: "Cuenta creada",
    titulo: "Tu cuenta ya está lista",
    apoyo:
      "Estamos terminando de conectar la consola donde configuras tus agentes. Te avisamos a este correo en cuanto puedas entrar.",
    volver: { label: "Volver al inicio", href: "/" },
    cerrarSesion: "Cerrar sesión",
  },
  // Aviso de consentimiento: el alta es tratamiento de datos personales
  // (LFPDPPP, ver CLAUDE.md §10), así que la liga al aviso va a la vista.
  legal: {
    prefijo: "Al crear tu cuenta aceptas los",
    terminos: { label: "términos de uso", href: "/terminos" },
    union: "y el",
    aviso: { label: "aviso de privacidad", href: "/aviso-de-privacidad" },
  },
  volverAlSitio: "Volver al sitio",
} as const;
