// Copy de las páginas de cuenta de cliente (/crear-cuenta, /iniciar-sesion,
// /cuenta). El alta la resuelve Clerk (correo + Google, ver CLAUDE.md §11);
// aquí vive solo el texto que envuelve su formulario.
export const cuenta = {
  crear: {
    eyebrow: "Empezar gratis",
    titulo: "Crea tu cuenta",
    apoyo:
      "Da de alta tu cuenta con tu correo de trabajo o con Google. Configuras tu primer argonauta o argotipo en el plan Explorador, sin tarjeta.",
  },
  iniciar: {
    eyebrow: "Tu cuenta",
    titulo: "Inicia sesión",
    apoyo: "Entra con el mismo correo o la misma cuenta de Google con la que te diste de alta.",
  },
  // Sin plano de control configurado (AR2GO_CUSTOMERS_*), /cuenta sigue siendo
  // un cascarón honesto, igual que /admin: lo dice en vez de simular un tablero.
  panel: {
    apoyo:
      "Estamos terminando de conectar la consola donde configuras tus agentes. Te avisamos a este correo en cuanto puedas entrar.",
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
    titulo: "Panel de control",
    // "Plan Explorador"
    plan: "Plan",
    apoyo: "Aquí activas y abres tus argonautas y argotipos.",
    productos: "Productos",
    activar: "Activar",
    // Planes de AR2GO (D37), de la empresa: limitan cuántos productos tiene
    // activos. Se cambian en Configuración → Suscripción (lib/pagos.ts).
    planes: {
      explorador: { nombre: "Plan Explorador", detalle: "Gratis · 1 producto" },
      navegante: { nombre: "Plan Navegante", detalle: "US$499 al mes · hasta 5 productos" },
      timonel: { nombre: "Plan Timonel", detalle: "US$999 al mes · sin límite" },
    } as Record<string, { nombre: string; detalle: string }>,
    // Ya tiene activos todos los productos que incluye su plan.
    limite: "Tu plan ya no incluye más productos.",
    cambiarPlan: "Cambiar plan",
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
  // Dos familias de productos en /cuenta: argonautas (agentes que trabajan
  // solos) y argotipos (herramientas que usa el equipo).
  cinta: {
    argonautas: { titulo: "Argonautas", apoyo: "Agentes autónomos" },
    argotipos: { titulo: "Argotipos", apoyo: "Herramientas inteligentes" },
  },
  // Cómo se presenta cada producto del catálogo de ar2go-customers, por su
  // slug. Un producto sin entrada aquí se muestra con el nombre que trae.
  productos: {
    horiq: { nombre: "Horiq", tipo: "argotipo", descripcion: "Administra la asistencia de tu equipo" },
    postio: {
      nombre: "Postio",
      tipo: "argonauta",
      descripcion: "Argonautas que crean y publican el contenido de tus redes",
    },
  } as Record<string, { nombre: string; tipo: "argonauta" | "argotipo"; descripcion: string }>,
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
    // "Acepto los Términos de servicio de Horiq en nombre de Panadería …"
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
    SELECCION_FIJADA: "Tu selección de productos queda fija hasta el próximo mes; después podrás cambiarla.",
    LIMITE_PRODUCTOS: "Tu plan ya no incluye más productos. Cambia de plan en Configuración para activar otro.",
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
    inicio: "AR2GO, inicio",
    lema: "Todos tus argonautas en un solo lugar.",
    lemaApoyo: "Una sola cuenta para activar y abrir cada producto de AR2GO.",
    cerrarAviso: "Cerrar aviso",
    menu: {
      titulo: "Mi cuenta",
      plan: "Plan",
      configuracion: "Configuración",
      volver: "Inicio",
    },
    // /cuenta/configuracion: perfil y seguridad son de Clerk; suscripción es
    // nuestra (plan de la empresa y productos contratados).
    configuracion: {
      titulo: "Configuración",
      apoyo: "Tu perfil, la suscripción de tu empresa y la seguridad de tu cuenta.",
      perfil: {
        etiqueta: "Perfil",
        titulo: "Perfil",
        empresa: "Empresa",
        sinEmpresa: "Todavía sin empresa",
        correo: "Correo",
        editar: "Editar",
        guardar: "Guardar",
        guardando: "Guardando…",
        cancelar: "Cancelar",
        nombreEmpresa: "Nombre de la empresa",
        guardado: "Nombre actualizado.",
        ayudaImagen: "Imagen o logotipo de tu cuenta. PNG, JPG o WebP.",
        subir: "Subir imagen",
        subiendo: "Subiendo…",
        quitar: "Quitar",
        errorImagen: "No se pudo guardar la imagen. Intenta con otro archivo.",
      },
      suscripcion: {
        etiqueta: "Suscripción",
        titulo: "Suscripción",
        empresa: "Empresa",
        plan: "Plan",
        productos: "Tus argonautas y argotipos",
        // Selección fija (D38): al llenar los lugares del plan no se puede
        // desactivar nada hasta el día 1 del mes siguiente.
        fijaHasta: (fecha: string) => `Selección fija hasta el ${fecha}`,
        confirmarLlenar: (nombre: string, fecha: string) =>
          `Con ${nombre} llenas los lugares de tu plan: tu selección queda fija hasta el ${fecha} y no podrás desactivar ninguno antes.`,
        confirmarDesactivar: (nombre: string) =>
          `¿Desactivar ${nombre}? Tu equipo deja de tener acceso; los datos se conservan y puedes activarlo otra vez.`,
        tipos: { argonauta: "Argonauta", argotipo: "Argotipo" },
        cambiarPlan: "Cambiar plan",
        actual: "Actual",
        notaPago: "Subimos tu plan al confirmar tu pago.",
        sinPago: "Pago en línea pronto",
        productosIncluidos: (activos: number, max: number | null) =>
          max === null ? `${activos} productos activos · sin límite` : `${activos} de ${max} productos activos`,
        sinProductos: "Todavía no activas ningún producto.",
        sinEmpresa:
          "Cuando tu empresa esté conectada a AR2GO, aquí verás tu plan y los productos que tienes activos.",
      },
    },
    // Pie de la foto, abajo a la derecha.
    coordenadas: [`6°14'39"N 75°34'25"W`, `25°32'38"N 103°25'08"W`],
  },
} as const;
