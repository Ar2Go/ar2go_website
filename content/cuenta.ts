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
    // Al activar un producto con link de pago (lib/pagos.ts), la empresa en
    // Explorar elige plan. Explorar activa sin pago; Equipo activa con los
    // mismos límites y manda a Stripe: el equipo de AR2GO sube el plan desde
    // /admin al ver el pago (no hay webhooks hasta la fase 3). Los 10
    // empleados los confirmó JD el 2026-10-21 (cuota de Explorar, D9).
    elegirPlan: "Elige tu plan",
    planes: {
      explorar: { nombre: "Plan Explorar", detalle: "$0 · 10 empleados" },
      equipo: { nombre: "Plan Equipo", detalle: "Con pago en línea" },
    },
    notaEquipo: "Empiezas con 10 empleados; subimos tu plan a Equipo al confirmar tu pago.",
    abrir: "Abrir",
    preparando: "Preparando…",
    proximamente: "Próximamente",
    activo: "Activo",
    suspendido: "Suspendido",
    sinAcceso: "Sin acceso",
  },
  // Aviso de /cuenta cuando la empresa no está activa (ar2go-customers la
  // suspende o la cierra desde /admin). Sin Activar ni Abrir mientras dure.
  estadoEmpresa: {
    SUSPENDIDA: {
      aviso:
        "Tu cuenta está suspendida. Mientras tanto no puedes activar ni abrir productos; tus datos siguen guardados. Escríbenos para resolverlo.",
      nota: "Cuenta suspendida",
    },
    CERRADA: {
      aviso:
        "Tu cuenta está cerrada. Tus registros se conservan el tiempo que marca la ley. Escríbenos si quieres reabrirla.",
      nota: "Cuenta cerrada",
    },
  } as Record<string, { aviso: string; nota: string }>,
  // Cinta de argonautas en /cuenta (components/cuenta/CintaProductos.tsx).
  cinta: {
    titulo: "Tus argonautas",
    apoyo: "Los que ya trabajan contigo y los que puedes sumar.",
  },
  // Cómo se presenta cada producto del catálogo de ar2go-customers, por su
  // slug. Un producto sin entrada aquí se muestra con el nombre que trae.
  productos: {
    horiq: { nombre: "HorIQ", descripcion: "Argonautas para administrar la asistencia de tu equipo" },
    postio: { nombre: "Postio", descripcion: "Argonautas que crean y publican el contenido de tus redes" },
  } as Record<string, { nombre: string; descripcion: string }>,
  // PLACEHOLDER: productos que todavía no existen. Se muestran como
  // "Próximamente", sin botón de contratar, hasta que entren al catálogo de
  // ar2go-customers.
  porVenir: [
    { slug: "nomina", nombre: "Nómina", descripcion: "Argonautas que administran tu nómina" },
    { slug: "contabilidad", nombre: "Contabilidad", descripcion: "Argonautas que concilian tu contabilidad" },
    { slug: "compras", nombre: "Compras", descripcion: "Argonautas que realizan tus compras" },
  ],
  // Aceptación de los documentos legales de la empresa antes de activar un
  // producto (D25 de Ar2Go/Ar2Go): app/(cuenta)/cuenta/legal/[producto]. Los
  // textos vienen de ar2go-customers (copia de Ar2Go/docs/legal), no de aquí.
  legalEmpresa: {
    eyebrow: "Antes de activar",
    titulo: "Términos y contrato de datos",
    apoyo:
      "Para usar el producto, quien administra la cuenta acepta en nombre de la empresa sus términos de servicio y el contrato de encargo de datos personales.",
    eyebrowNueva: "Versión nueva",
    tituloNueva: "Revisa los documentos actualizados",
    apoyoNueva:
      "Actualizamos documentos que tu empresa ya había aceptado. Puedes seguir usando el producto; acepta la versión nueva para volver a activarlo si algún día lo cancelas.",
    version: "Versión",
    yaAceptado: "Ya aceptado",
    // "Acepto los Términos de servicio de HorIQ en nombre de Panadería …"
    casilla: (titulo: string, empresa: string) => `Acepto el documento «${titulo}» en nombre de ${empresa}.`,
    constancia:
      "Guardamos la constancia de tu aceptación: quién aceptó, la fecha, la dirección IP, la versión y la huella del texto.",
    borrador:
      "Borrador en revisión legal: este documento todavía tiene datos por completar y no es la versión definitiva.",
    aceptarYActivar: "Aceptar y activar",
    aceptar: "Aceptar",
    cancelar: "Volver a tu cuenta",
    leer: "Leer en otra pestaña",
    soloAdmin: "Solo quien administra la cuenta puede aceptar estos documentos.",
    nadaPendiente: "Tu empresa ya aceptó la versión vigente de estos documentos.",
    // En la tarjeta del producto activo con una versión nueva pendiente.
    nuevaVersion: "Documentos nuevos por aceptar",
  },
  // Mensajes para los códigos de error de ar2go-customers que puede ver la persona.
  avisos: {
    EMPRESA_SUSPENDIDA: "Tu cuenta está suspendida: no puedes activar ni abrir productos. Escríbenos para resolverlo.",
    EMPRESA_CERRADA: "Tu cuenta está cerrada. Escríbenos si quieres reabrirla.",
    CUOTA_PENDIENTE: "Tu plan todavía no incluye este producto. Te avisamos en cuanto esté disponible.",
    PRODUCTO_NO_LISTO: "Estamos preparando el producto. Intenta abrirlo en unos minutos.",
    PRODUCTO_NO_DISPONIBLE: "Este producto todavía no está disponible.",
    SIN_ACCESO: "Tu usuario no tiene acceso a este producto.",
    ROL_INSUFICIENTE: "Solo quien administra la cuenta puede activar productos.",
    NOMBRE_INVALIDO: "Escribe el nombre de tu empresa (2 a 120 caracteres).",
    SIN_SERVICIO: "No pudimos cargar tu cuenta. Intenta de nuevo en unos minutos.",
    ACEPTACION_PENDIENTE: "Antes de activar el producto, acepta sus términos y el contrato de encargo de datos.",
    DOCUMENTO_DESACTUALIZADO: "El documento cambió mientras lo leías. Revisa la versión vigente antes de aceptar.",
    FALTA_CASILLA: "Marca la casilla de cada documento para aceptarlo.",
    DOCUMENTO_NO_ENCONTRADO: "Ese documento no es de este producto.",
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
