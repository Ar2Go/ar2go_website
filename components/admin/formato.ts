// Formatos de /admin. Las fechas se muestran en hora de la Ciudad de México,
// que es donde opera el equipo, sin importar la región de la función (iad1).
const formatoFecha = new Intl.DateTimeFormat("es-MX", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "America/Mexico_City",
});

export const fecha = (iso: string | null | undefined) => (iso ? formatoFecha.format(new Date(iso)) : "—");

// Pastilla de estado con los colores del panel de Horiq (app/admin/admin.css).
export function badgeEstado(estado: string): string {
  if (estado === "ACTIVA" || estado === "AL_CORRIENTE") return "badge verde";
  if (estado === "SUSPENDIDA" || estado === "VENCIDO") return "badge ambar";
  if (["CANCELADA", "CERRADA", "ELIMINADA"].includes(estado)) return "badge rojo";
  return "badge";
}

// "ACTIVA" → "Activa"; "AL_CORRIENTE" → "Al corriente".
export const textoEstado = (estado: string) =>
  estado.charAt(0) + estado.slice(1).toLowerCase().replaceAll("_", " ");
