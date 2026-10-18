// Formatos de /admin. Las fechas se muestran en hora de la Ciudad de México,
// que es donde opera el equipo, sin importar la región de la función (iad1).
const formatoFecha = new Intl.DateTimeFormat("es-MX", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "America/Mexico_City",
});

export const fecha = (iso: string | null | undefined) => (iso ? formatoFecha.format(new Date(iso)) : "—");

// Estados del plano de control con color funcional solo cuando significan
// algo (docs/brand.md: --color-exito / --color-error, nunca decorativos).
export function claseEstado(estado: string): string {
  if (estado === "ACTIVA" || estado === "AL_CORRIENTE") return "text-exito";
  if (["SUSPENDIDA", "CANCELADA", "CERRADA", "VENCIDO", "ELIMINADA"].includes(estado)) return "text-error";
  return "text-gris";
}
