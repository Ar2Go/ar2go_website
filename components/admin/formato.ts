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

// Cuánto lleva algo esperando: "hace 5 min", "hace 3 h", "hace 2 días".
export function transcurrido(iso: string, ahora = Date.now()): string {
  const min = Math.max(0, Math.floor((ahora - new Date(iso).getTime()) / 60_000));
  if (min < 1) return "hace un momento";
  if (min < 60) return `hace ${min} min`;
  const h = Math.floor(min / 60);
  if (h < 24) return `hace ${h} h`;
  const d = Math.floor(h / 24);
  return `hace ${d} ${d === 1 ? "día" : "días"}`;
}

// Acceso de prueba (2 meses hasta `hasta`): días que lleva y días que dura, para "Día 12 de 61".
export function diaDePrueba(hasta: string, ahora = Date.now()): { dia: number; total: number; vencida: boolean } {
  const fin = new Date(hasta);
  const inicio = new Date(fin);
  inicio.setMonth(inicio.getMonth() - 2);
  const dia = 86_400_000;
  const total = Math.round((fin.getTime() - inicio.getTime()) / dia);
  const transcurridos = Math.floor((ahora - inicio.getTime()) / dia) + 1;
  return { dia: Math.min(Math.max(transcurridos, 1), total), total, vencida: ahora >= fin.getTime() };
}
