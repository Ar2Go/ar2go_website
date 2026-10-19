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
  avisos: {
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
  } as Record<string, string>,
} as const;
