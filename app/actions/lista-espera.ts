"use server";

import { headers } from "next/headers";
import { enviarNotificacionLead } from "@/lib/email";
import { leadsStore } from "@/lib/leads-store";
import { excedeLimite, ipDesdeEncabezados } from "@/lib/rate-limit";
import { listaEsperaSchema } from "@/lib/schemas/lista-espera";

export type EstadoListaEspera =
  | { status: "idle" }
  | { status: "error"; mensaje: string }
  | { status: "exito" };

export async function enviarListaEspera(
  _estadoPrevio: EstadoListaEspera,
  formData: FormData,
): Promise<EstadoListaEspera> {
  const ip = ipDesdeEncabezados(await headers());

  if (excedeLimite(ip)) {
    return {
      status: "error",
      mensaje: "Hiciste varios intentos seguidos. Espera un minuto.",
    };
  }

  const resultado = listaEsperaSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!resultado.success) {
    return {
      status: "error",
      mensaje: resultado.error.issues[0]?.message ?? "Revisa tu correo.",
    };
  }

  if (resultado.data.sitio_web) {
    return { status: "exito" };
  }

  const lead = {
    tipo: "lista-espera" as const,
    correo: resultado.data.correo,
    procesoInteres: resultado.data.proceso,
    creadoEn: new Date().toISOString(),
  };

  try {
    await leadsStore.guardar(lead);
  } catch (error) {
    console.error("[lista-espera] error al guardar el lead", error);
    return {
      status: "error",
      mensaje: "No pudimos guardar tu correo. Inténtalo de nuevo en un momento.",
    };
  }

  try {
    await enviarNotificacionLead(lead);
  } catch (error) {
    console.error(
      "[lista-espera] error al enviar el correo de notificación",
      error,
    );
  }

  return { status: "exito" };
}
