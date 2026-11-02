import { admin } from "@/content/admin";

type Props = {
  titulo: string;
  apoyo?: string;
  aviso?: string | null;
  // Dato que completa el aviso (p. ej. los ids que Clerk no borró).
  detalleAviso?: string | null;
  acciones?: React.ReactNode;
};

const hoy = new Intl.DateTimeFormat("es-MX", { dateStyle: "full", timeZone: "America/Mexico_City" });

// Encabezado de cada página de /admin, como el del panel de Horiq: título, fecha de hoy y,
// si la página volvió de una acción, el aviso con su resultado (?aviso=<código>).
export function TituloAdmin({ titulo, apoyo, aviso, detalleAviso, acciones }: Props) {
  const fecha = hoy.format(new Date());
  const textoAviso = aviso ? (admin.avisos[aviso] ?? admin.avisos.general) : null;
  const esExito = !!aviso && EXITOS.has(aviso);
  return (
    <>
      <div className="spread" style={{ alignItems: "flex-end" }}>
        <div className="stack panel-titulo" style={{ ["--gap" as string]: "4px" }}>
          <h1>{titulo}</h1>
          <span className="muted" style={{ fontSize: 14 }}>
            {fecha.charAt(0).toUpperCase() + fecha.slice(1)}
            {apoyo && ` · ${apoyo}`}
          </span>
        </div>
        {acciones}
      </div>
      {textoAviso && (
        <div role={esExito ? "status" : "alert"} className={`aviso ${esExito ? "verde" : "rojo"}`}>
          {textoAviso}
          {detalleAviso && <b style={{ display: "block", marginTop: 4, overflowWrap: "anywhere" }}>{detalleAviso}</b>}
        </div>
      )}
    </>
  );
}

const EXITOS = new Set(["REINTENTADO", "EMPRESA_ELIMINADA", "PLAN_CAMBIADO", "ESTADO_CAMBIADO"]);
