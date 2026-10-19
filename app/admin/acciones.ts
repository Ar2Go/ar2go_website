"use server";

// Acciones de /admin. Llaman a la API de administración de ar2go-customers
// desde el servidor (lib/ar2go-customers-admin.ts); el resultado se muestra
// como aviso en la página de la empresa (?aviso=<código>).
import { redirect } from "next/navigation";
import { z } from "zod";
import { ErrorCuenta } from "@/lib/ar2go-customers";
import { cambiarPlan } from "@/lib/ar2go-customers-admin";
import { operadorActual } from "./operador";

const datosCambioPlan = z.object({
  empresa_id: z.uuid(),
  plan: z.string().regex(/^[a-z0-9-]{2,40}$/),
  motivo: z.string().trim().min(3).max(500),
});

export async function cambiarPlanAccion(datos: FormData) {
  const operador = await operadorActual();
  const d = datosCambioPlan.safeParse(Object.fromEntries(datos));
  const empresaId = String(datos.get("empresa_id") ?? "");
  const destino = (aviso: string) =>
    redirect(`/admin/empresas/${encodeURIComponent(empresaId)}?aviso=${encodeURIComponent(aviso)}`);
  if (!d.success) destino("MOTIVO_INVALIDO");
  try {
    await cambiarPlan(operador, d.data!.empresa_id, d.data!.plan, d.data!.motivo);
  } catch (e) {
    if (e instanceof ErrorCuenta) destino(e.code);
    throw e; // redirect() de Next se propaga
  }
  destino("PLAN_CAMBIADO");
}
