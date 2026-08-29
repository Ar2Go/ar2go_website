// BORRADOR — pendiente de revisión por un abogado antes de publicarse como
// definitivo (CLAUDE.md §10). Los campos marcados TODO_LEGAL son datos del
// responsable que todavía no están confirmados; el resto del contenido está
// redactado conforme al artículo 16 de la LFPDPPP pero no sustituye una
// revisión legal.

const RAZON_SOCIAL = "TODO_LEGAL: [Razón social] S.A. de C.V.";
const DOMICILIO_FISCAL =
  "TODO_LEGAL: [calle, número, colonia, municipio, estado, código postal]";

export const legal = {
  razonSocial: RAZON_SOCIAL,
  domicilioFiscal: DOMICILIO_FISCAL,
  ultimaActualizacion: "TODO_LEGAL: fecha de la versión que se publique",

  avisoPrivacidad: {
    titulo: "Aviso de privacidad",
    secciones: [
      {
        titulo: "Responsable del tratamiento de tus datos personales",
        contenido: `${RAZON_SOCIAL}, con domicilio en ${DOMICILIO_FISCAL}, es responsable del tratamiento de tus datos personales conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP).`,
      },
      {
        titulo: "Datos personales que recabamos",
        contenido:
          "Recabamos los datos que nos proporcionas directamente al llenar el formulario de demo o la lista de espera de este sitio: nombre, empresa, número de WhatsApp, giro del negocio y, si nos escribes por WhatsApp, el contenido de esa conversación.",
      },
      {
        titulo: "Finalidades del tratamiento",
        contenido:
          "Finalidades primarias, necesarias para darte el servicio que solicitas: contactarte para agendar y dar seguimiento a la demo del Agente de Leads WhatsApp, y operar el agente dentro de la conversación de WhatsApp de tu negocio si contratas el servicio. Finalidades secundarias, que requieren tu consentimiento aparte y no son necesarias para el servicio: enviarte información comercial sobre nuevos procesos o promociones de AR2GO. Puedes negarte a las finalidades secundarias sin que eso afecte el servicio que solicitaste, dejando sin marcar la casilla correspondiente en el formulario.",
      },
      {
        titulo: "Medios para ejercer tus derechos ARCO",
        contenido:
          "Puedes acceder, rectificar o cancelar tus datos personales, y oponerte a su tratamiento, escribiéndonos por correo o por WhatsApp a los datos de contacto que aparecen en el pie de este sitio. Atenderemos tu solicitud en un plazo razonable conforme a la LFPDPPP.",
      },
      {
        titulo: "Mecanismo de revocación del consentimiento",
        contenido:
          "Puedes revocar el consentimiento que nos diste para el tratamiento de tus datos personales en cualquier momento, por los mismos medios de contacto del punto anterior. La revocación no aplica de forma retroactiva a datos ya tratados conforme al consentimiento vigente en su momento.",
      },
      {
        titulo: "Transferencia de datos",
        contenido:
          "No transferimos tus datos personales a terceros, salvo a los proveedores que necesitamos para operar el servicio (por ejemplo, el proveedor de mensajería de WhatsApp Business y el proveedor de envío de correo), y únicamente para las finalidades descritas en este aviso.",
      },
      {
        titulo: "Uso de cookies y tecnologías de rastreo",
        contenido:
          "Este sitio usa Vercel Analytics, un servicio de analítica que no utiliza cookies. No usamos cookies de rastreo ni de publicidad.",
      },
      {
        titulo: "Cambios a este aviso",
        contenido:
          "Podemos actualizar este aviso de privacidad. La versión vigente siempre está disponible en esta página, con su fecha de última actualización.",
      },
    ],
  },

  terminos: {
    titulo: "Términos de uso",
    secciones: [
      {
        titulo: "Objeto",
        contenido: `Estos términos regulan el uso de este sitio web y la contratación del Agente de Leads WhatsApp de ${RAZON_SOCIAL} ("AR2GO").`,
      },
      {
        titulo: "Descripción del servicio",
        contenido:
          "El Agente de Leads WhatsApp es un agente de inteligencia artificial que opera dentro de un espacio de acciones acotado (ver la sección \"Control y límites\" de la página principal) y escala a un humano en los casos ahí descritos. AR2GO no garantiza resultados específicos de ventas; el servicio consiste en la operación del agente conforme a lo contratado.",
      },
      {
        titulo: "Número de WhatsApp Business",
        contenido:
          "El número de WhatsApp Business que conecta al Agente de Leads es propiedad del cliente. AR2GO lo conecta a su plataforma, pero no lo controla ni impide que el cliente lo use fuera del servicio.",
      },
      {
        titulo: "Pagos",
        contenido:
          "Los montos de implementación y renta vigentes son los publicados en la sección de precio de este sitio, sujetos a cambio con aviso previo. Las tarifas de conversación de Meta/WhatsApp se facturan por separado, al costo.",
      },
      {
        titulo: "Cancelación",
        contenido:
          "TODO_LEGAL: confirmar el mecanismo exacto y el aviso previo requerido para cancelar la renta mensual.",
      },
      {
        titulo: "Limitación de responsabilidad",
        contenido:
          "AR2GO no es responsable de decisiones comerciales tomadas con base en las cotizaciones o respuestas del agente, si estas se generaron a partir de información incorrecta proporcionada por el cliente (catálogo, precios o reglas de escalamiento).",
      },
      {
        titulo: "Ley aplicable",
        contenido:
          "Estos términos se rigen por las leyes de los Estados Unidos Mexicanos. TODO_LEGAL: confirmar la jurisdicción específica (tribunales competentes) antes de publicar.",
      },
    ],
  },
} as const;
