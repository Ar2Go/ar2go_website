// Copy de /admin: el panel interno del equipo de AR2GO para ver y administrar
// a los clientes (las empresas) del plano de control, ar2go-customers
// (CLAUDE.md §8). No es de cara al cliente.
export const admin = {
  eyebrow: "Panel de administración",
  cerrarSesion: "Cerrar sesión",
  sinConfigurar: {
    titulo: "Falta conectar ar2go-customers",
    apoyo:
      "Este panel lee a los clientes desde ar2go-customers. Faltan AR2GO_CUSTOMERS_URL o AR2GO_CUSTOMERS_SECRETO_ADMIN en el proyecto de Vercel.",
  },
  errorCarga: "No se pudo leer ar2go-customers",
  resumen: {
    empresas: "Empresas",
    sinEmpresa: "Sin empresa",
    // "Explorar · 3"
    porPlan: "Por plan",
  },
  empresas: {
    titulo: "Clientes",
    apoyo: "Empresas dadas de alta en /cuenta, la más reciente primero.",
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
    apoyo:
      "Personas que iniciaron sesión y no terminaron el alta. Quien se registró en Clerk y nunca llegó a /cuenta no aparece aquí.",
    vacio: "Nadie pendiente.",
    columnas: { correo: "Correo", nombre: "Nombre", alta: "Primera visita" },
  },
  detalle: {
    volver: "Todos los clientes",
    datos: "Datos",
    campos: {
      alta: "Alta",
      estado: "Estado",
      plan: "Plan",
      pago: "Pago",
      rfc: "RFC",
      id: "ID",
    },
    miembros: "Personas de la empresa",
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
  estado: {
    titulo: "Estado de la cuenta",
    apoyo:
      "Se manda a cada producto como versión nueva y se aplica cuando lo confirma. Suspendida: solo lectura, sin Activar ni Abrir en /cuenta. Cerrada: sin acceso; los productos conservan los datos (HorIQ, 5 años) y se puede reabrir.",
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
  pendientes: {
    titulo: "Cambios pendientes de confirmar",
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
    REINTENTADO: "Reintento hecho. Si el producto confirmó, ya no aparece en pendientes.",
    SUSCRIPCION_NO_ENCONTRADA: "No existe esa suscripción.",
    ESTADO_CAMBIADO: "Estado cambiado. Revisa abajo que cada producto haya confirmado la versión nueva.",
    TRANSICION_INVALIDA: "Esa acción no aplica al estado actual de la empresa. Recarga la página.",
    EMPRESA_CERRADA: "La empresa está cerrada: reábrela antes de cambiarle el plan.",
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
    ACTIVAR_PRODUCTO: "Activó un producto",
    APROVISIONAR: "Aprovisionamiento al producto",
    CAMBIAR_PLAN: "Cambio de plan",
    SUSPENDER_EMPRESA: "Suspendió la empresa",
    REACTIVAR_EMPRESA: "Reactivó la empresa",
    CERRAR_EMPRESA: "Cerró la cuenta",
    REABRIR_EMPRESA: "Reabrió la cuenta",
    RECONCILIAR: "El producto ya tenía la versión",
    REINTENTAR: "Reintento manual",
  } as Record<string, string>,
} as const;
