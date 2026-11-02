import { cambiarEstadoAccion } from "@/app/admin/acciones";
import { badgeEstado, textoEstado } from "@/components/admin/formato";
import { admin } from "@/content/admin";

type Props = { empresaId: string; estado: string };

// Activar o desactivar la cuenta en /admin/empresas/[id]. Desactivar es suspender (solo lectura, sin
// Activar ni Abrir en /cuenta); activar reactiva una suspendida o reabre una cerrada. Pide motivo y
// confirmación porque el cambio llega a los productos.
export function CambiarEstado({ empresaId, estado }: Props) {
  const t = admin.estado;
  const accion = estado === "ACTIVA" ? "SUSPENDER" : estado === "SUSPENDIDA" ? "REACTIVAR" : "REABRIR";
  const activar = accion !== "SUSPENDER";
  return (
    <div className="card">
      <div className="card-head">
        <span className="card-title">{t.titulo}</span>
        <span className={badgeEstado(estado)}>{textoEstado(estado)}</span>
      </div>
      <form action={cambiarEstadoAccion} className="card-cuerpo">
        <input type="hidden" name="empresa_id" value={empresaId} />
        <input type="hidden" name="accion" value={accion} />
        <label className="campo">
          {t.motivo}
          <input name="motivo" required minLength={3} maxLength={500} placeholder={t.ejemplo} />
        </label>
        <label className="casilla">
          <input type="checkbox" name="confirmo" value="si" required />
          {t.confirmar}
        </label>
        <div className="card-pie">
          <button type="submit" className={activar ? "btn btn-primary" : "btn btn-danger"}>
            {activar ? t.activar : t.desactivar}
          </button>
        </div>
      </form>
    </div>
  );
}
