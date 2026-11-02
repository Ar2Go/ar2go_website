// Copy de /admin: el panel interno del equipo de AR2GO para ver y administrar
// a los clientes (las empresas) del plano de control, ar2go-customers
// (CLAUDE.md §8). No es de cara al cliente.
export const admin = {
  eyebrow: "Panel de administración",
  cerrarSesion: "Cerrar sesión",
  cerrarAviso: "Cerrar aviso",
  // Barra lateral (components/admin/MenuAdmin.tsx), como la del panel de Horiq.
  menu: {
    boton: "Menú",
    clientes: "Clientes",
    pendientes: "Pendientes",
    sinEmpresa: "Sin empresa",
    seguridad: "Seguridad",
    porConfirmar: "por confirmar",
    equipo: "Equipo AR2GO",
    rol: "Administración",
  },
  sinConfigurar: {
    titulo: "Falta conectar ar2go-customers",
    apoyo:
      "Este panel lee a los clientes desde ar2go-customers. Faltan AR2GO_CUSTOMERS_URL o AR2GO_CUSTOMERS_SECRETO_ADMIN en el proyecto de Vercel.",
  },
  errorCarga: "No se pudo leer ar2go-customers",
  resumen: {
    empresas: "Empresas",
    sinEmpresa: "Sin empresa",
    sinEmpresaApoyo: "Entraron y no dieron de alta su empresa",
    activas: "activas",
    // "Explorador · 3"
    porPlan: "Por plan",
  },
  empresas: {
    titulo: "Clientes",
    apoyo: "empresas dadas de alta en /cuenta",
    lista: "Empresas, la más reciente primero",
    empresa: "empresa",
    empresasPlural: "empresas",
    vacio: "Todavía no hay empresas.",
    columnas: {
      nombre: "Empresa",
      alta: "Alta",
      plan: "Plan",
      propietario: "Propietario",
      usuarios: "Usuarios",
      productos: "Productos",
      estado: "Estado",
    },
    ninguno: "—",
  },
  sinEmpresa: {
    titulo: "Entraron a /cuenta sin dar de alta su empresa",
    subtitulo: "personas sin empresa en AR2GO",
    apoyo:
      "Personas que iniciaron sesión y no terminaron el alta. Quien se registró en Clerk y nunca llegó a /cuenta no aparece aquí.",
    vacio: "Nadie pendiente.",
    columnas: { correo: "Correo", nombre: "Nombre", alta: "Primera visita" },
  },
  detalle: {
    volver: "Todos los clientes",
    datos: "Datos",
    campos: {
      empresa: "Empresa",
      correo: "Correo",
      responsable: "Responsable",
      alta: "Alta",
      estado: "Estado",
      plan: "Plan",
      pago: "Pago",
      rfc: "RFC",
      id: "ID",
    },
    miembros: "Personas de la empresa",
    columnasMiembros: { nombre: "Nombre", rol: "Rol", alta: "Alta" },
    suscripciones: "Productos",
    sinSuscripciones: "No ha activado productos.",
    columnasSuscripcion: {
      producto: "Producto",
      estado: "Estado",
      limites: "Límites",
      version: "Versión (aplicada / deseada)",
      error: "Último error",
    },
    pendiente: "Pendiente de confirmar",
    sinLimite: "sin límite",
    bitacora: "Bitácora",
    bitacoraApoyo: "Últimas 50 entradas. Solo inserción: nada de aquí se edita ni se borra.",
    columnasBitacora: { fecha: "Fecha", actor: "Quién", accion: "Acción", detalle: "Detalle" },
  },
  // Documentos legales de la empresa (D25): constancias de aceptación en /cuenta.
  legal: {
    titulo: "Documentos legales",
    apoyo:
      "Términos y contrato de encargo que la empresa acepta en /cuenta antes de activar un producto. Cada constancia guarda la huella del texto que vio la persona.",
    exigida: "Activar exige aceptarlos (LEGAL_EXIGE_ACEPTACION encendida).",
    noExigida: "Activar todavía no exige aceptarlos (LEGAL_EXIGE_ACEPTACION apagada).",
    exigidaCorta: "Exigida",
    noExigidaCorta: "No exigida",
    // "terminos-horiq 0.2 tiene 9 marcas TODO_LEGAL"
    todoLegal: (doc: string, version: string, n: number) =>
      `${doc} ${version} tiene ${n} ${n === 1 ? "marca" : "marcas"} TODO_LEGAL: no se publica a clientes reales.`,
    // ar2go-customers no pudo leer su copia del documento (todo_legal = -1): revisar sus logs.
    noLegible: (doc: string) => `No se pudo leer ${doc} en ar2go-customers: revisa sus logs antes de exigir la aceptación.`,
    sinAceptaciones: "La empresa no ha aceptado ningún documento.",
    columnas: {
      fecha: "Fecha",
      documento: "Documento",
      version: "Versión",
      quien: "Quién aceptó",
      ip: "IP",
      huella: "Huella del texto",
    },
  },
  cambiarPlan: {
    titulo: "Cambiar plan",
    apoyo:
      "Sin cobro todavía (Stripe pendiente). Los productos activos reciben los límites del plan nuevo; el cambio se aplica cuando cada producto lo confirma.",
    plan: "Plan nuevo",
    motivo: "Motivo (queda en la bitácora)",
    ejemplo: "Cliente piloto, acordado con dirección",
    enviar: "Cambiar plan",
  },
  // Ciclo de vida de la empresa (ar2go-customers, src/cicloVida.ts). Las
  // acciones que se ofrecen dependen del estado actual.
  // Seguridad (app/admin/(panel)/seguridad): correos y dominios bloqueados.
  seguridad: {
    titulo: "Seguridad",
    subtitulo: "correos y dominios que no pueden crear una cuenta",
    lista: "Correos y dominios bloqueados",
    campo: "Correo o dominio",
    ejemplo: "persona@correo.com o @dominio.com",
    agregar: "Bloquear",
    vacio: "No hay correos ni dominios bloqueados.",
    correo: "Correo",
    dominio: "Dominio",
    enClerk: "Bloqueado",
    sinClerk: "No se pudo bloquear",
    alEntrar: "Se borra al entrar",
    quitar: "Quitar",
    columnas: { valor: "Correo o dominio", tipo: "Tipo", clerk: "Clerk", quien: "Agregó", fecha: "Fecha", accion: "" },
  },
  // Herramientas habilitadas (components/admin/Herramientas.tsx).
  herramientas: {
    titulo: "Herramientas habilitadas",
    noDisponible: "No configurada",
    pendiente: "Por confirmar",
    // "Día 12 de 61" del acceso de prueba (plan Explorador).
    prueba: (p: { dia: number; total: number; vencida: boolean }) =>
      p.vencida ? "Prueba vencida" : `Día ${p.dia} de ${p.total}`,
    // "Solicitó hace 3 h"
    solicitud: (hace: string) => `Solicitó ${hace}`,
  },
  estado: {
    titulo: "Activar o desactivar cuenta",
    activar: "Activar cuenta",
    desactivar: "Desactivar cuenta",
    apoyo:
      "Se manda a cada producto como versión nueva y se aplica cuando lo confirma. Suspendida: solo lectura, sin Activar ni Abrir en /cuenta. Cerrada: sin acceso; los productos conservan los datos (Horiq, 5 años) y se puede reabrir.",
    motivo: "Motivo (queda en la bitácora)",
    ejemplo: "Falta de pago de octubre",
    confirmar: "Confirmo que es una empresa de prueba o que el cliente ya fue avisado.",
    acciones: {
      SUSPENDER: "Suspender",
      REACTIVAR: "Reactivar",
      CERRAR: "Cerrar cuenta",
      REABRIR: "Reabrir cuenta",
    } as Record<string, string>,
    // Qué se puede hacer desde cada estado; lo mismo valida ar2go-customers.
    disponibles: {
      ACTIVA: ["SUSPENDER", "CERRAR"],
      SUSPENDIDA: ["REACTIVAR", "CERRAR"],
      CERRADA: ["REABRIR"],
    } as Record<string, string[]>,
  },
  // Borrado total de la empresa (components/admin/EliminarEmpresa.tsx). Solo
  // aparece mientras ar2go-customers lo permite (ADMIN_PERMITE_ELIMINAR=si):
  // es para limpiar cuentas de prueba y se apaga antes de tener clientes reales.
  eliminar: {
    titulo: "Eliminar cuenta",
    apoyo:
      "Borra todo y no se puede deshacer: en Horiq, trabajadores, checadas, selfies y expedientes; en AR2GO, la empresa, su plan, productos y bitácora. En Clerk, la cuenta de cada persona que no esté en otra empresa y la organización.",
    motivo: "Motivo (queda en la bitácora general)",
    ejemplo: "Cuenta de prueba",
    enviar: "Eliminar para siempre",
    enCurso: "Eliminando…",
  },
  // Solicitudes de acceso del plan Explorador (components/admin/SolicitudesAcceso.tsx).
  solicitudes: {
    titulo: "Solicitudes de acceso",
    porAtender: "por atender",
    porAtenderPlural: "por atender",
    vacio: "Nadie está esperando acceso.",
    sinDatos: "No se pudieron leer las solicitudes.",
    aprobar: "Dar acceso",
    aprobando: "Dando acceso…",
    rechazar: "Rechazar",
    rechazando: "Rechazando…",
    columnas: { empresa: "Empresa", herramienta: "Herramienta", quien: "Solicitó", espera: "Esperando", accion: "" },
  },
  pendientes: {
    titulo: "Cambios pendientes de confirmar",
    subtitulo: "solicitudes de acceso y cambios por confirmar",
    porConfirmar: "por confirmar",
    apoyo:
      "Versiones que algún producto todavía no confirma. ar2go-customers las reintenta solo cada 15 minutos con espera creciente; a los 6 intentos, o si el producto las rechaza, se detiene y requieren que alguien las revise.",
    vacio: "Todo confirmado.",
    sinDatos: "No se pudieron leer los pendientes.",
    columnas: {
      empresa: "Empresa",
      producto: "Producto",
      version: "Versión (aplicada / deseada)",
      estado: "Reintentos",
      error: "Último error",
      accion: "",
    },
    requiereAtencion: "Requiere atención",
    siguiente: "Siguiente:",
    intentos: "intentos",
    reintentar: "Reintentar ahora",
  },
  avisos: {
    EMPRESA_ELIMINADA: "Cliente eliminado por completo: en AR2GO, en sus productos y en Clerk.",
    BLOQUEO_INVALIDO: "Escribe un correo (persona@correo.com) o un dominio (@dominio.com).",
    BLOQUEO_NO_ENCONTRADO: "Ese bloqueo ya no existe.",
    CLERK_SIN_BLOQUEO:
      "Quedó bloqueado en AR2GO, pero Clerk no lo agregó a su lista de bloqueo. Si se registra, se borra de Clerk al entrar a /cuenta.",
    ACCESO_APROBADO: "Acceso dado por 2 meses. La herramienta ya aparece activa en su cuenta.",
    SOLICITUD_RECHAZADA: "Solicitud rechazada.",
    SOLICITUD_NO_ENCONTRADA: "Esa solicitud ya no existe.",
    SOLICITUD_RESUELTA: "Esa solicitud ya la atendió alguien más.",
    CLERK_PENDIENTE:
      "Cliente eliminado en AR2GO y en sus productos, pero Clerk no borró todo. Bórralo a mano en el panel de Clerk:",
    ELIMINAR_DESACTIVADO: "El borrado total está desactivado en ar2go-customers (ADMIN_PERMITE_ELIMINAR).",
    CONFIRMACION_INVALIDA: "El nombre no coincide. Escribe el nombre exacto de la empresa para eliminarla.",
    PRODUCTO_NO_ELIMINO:
      "Un producto no confirmó el borrado y no se eliminó nada. El error quedó en la bitácora de abajo; revisa que el producto tenga AR2GO_PERMITE_ELIMINAR=si.",
    REINTENTADO: "Reintento hecho. Si el producto confirmó, ya no aparece en pendientes.",
    SUSCRIPCION_NO_ENCONTRADA: "No existe esa suscripción.",
    ESTADO_CAMBIADO: "Estado cambiado. Revisa abajo que cada producto haya confirmado la versión nueva.",
    TRANSICION_INVALIDA: "Esa acción no aplica al estado actual de la empresa. Recarga la página.",
    EMPRESA_CERRADA: "La cuenta está cerrada: actívala antes de hacer cambios.",
    PRODUCTO_NO_DISPONIBLE: "Esa herramienta no está configurada en este ambiente.",
    CONFIRMACION_FALTANTE: "Marca la casilla de confirmación antes de cambiar el estado.",
    PLAN_CAMBIADO: "Plan cambiado. Revisa abajo que cada producto haya confirmado la versión nueva.",
    MOTIVO_INVALIDO: "Escribe un motivo de al menos 3 caracteres.",
    PLAN_INVALIDO: "Ese plan no existe.",
    EMPRESA_NO_ENCONTRADA: "No existe esa empresa.",
    ADMIN_NO_CONFIGURADO: "La API de administración de ar2go-customers está apagada (falta ADMIN_SECRETOS_VERIFICACION).",
    FIRMA_INVALIDA: "ar2go-customers rechazó la firma: revisa que los dos secretos de admin coincidan.",
    general: "No se pudo completar. Intenta de nuevo.",
  } as Record<string, string>,
  // Cómo se lee cada acción de la bitácora de ar2go-customers.
  acciones: {
    CREAR_EMPRESA: "Alta de la empresa",
    ACTIVAR_PRODUCTO: "Habilitó una herramienta",
    SOLICITAR_ACCESO: "Solicitó acceso a una herramienta",
    APROBAR_ACCESO: "Dio acceso de prueba (2 meses)",
    RECHAZAR_ACCESO: "Rechazó la solicitud de acceso",
    VENCER_ACCESO: "Venció el acceso de prueba",
    BLOQUEAR_ACCESO: "Bloqueó un correo o dominio",
    DESBLOQUEAR_ACCESO: "Quitó un bloqueo",
    DESACTIVAR_PRODUCTO: "Deshabilitó una herramienta",
    FIJAR_SELECCION: "Quedó fija la selección de herramientas",
    APROVISIONAR: "Aprovisionamiento al producto",
    CAMBIAR_PLAN: "Cambio de plan",
    SUSPENDER_EMPRESA: "Suspendió la empresa",
    REACTIVAR_EMPRESA: "Reactivó la empresa",
    CERRAR_EMPRESA: "Cerró la cuenta",
    REABRIR_EMPRESA: "Reabrió la cuenta",
    RECONCILIAR: "El producto ya tenía la versión",
    REINTENTAR: "Reintento manual",
    ELIMINAR_EMPRESA_FALLIDO: "Intentó eliminar la empresa (un producto no confirmó)",
    ACEPTAR_DOCUMENTO_LEGAL: "Aceptó un documento legal",
  } as Record<string, string>,
} as const;
