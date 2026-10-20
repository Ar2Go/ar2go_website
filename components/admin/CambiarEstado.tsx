import { cambiarEstadoAccion } from "@/app/admin/acciones";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { admin } from "@/content/admin";
import { tipografia } from "@/lib/typography";

type Props = { empresaId: string; estado: string; campo: string };

// Tarjeta de /admin/empresas/[id] para suspender, reactivar, cerrar o reabrir
// la empresa. Un formulario por acción disponible, cada uno con motivo y
// casilla de confirmación: el cambio llega a los productos (PUT a HorIQ).
export function CambiarEstado({ empresaId, estado, campo }: Props) {
  const t = admin.estado;
  const acciones = t.disponibles[estado] ?? [];
  return (
    <Card>
      <p className={tipografia.eyebrow}>{t.titulo}</p>
      <p className={`mt-3 ${tipografia.cuerpoChico} text-gris`}>{t.apoyo}</p>
      {acciones.map((accion) => (
        <form
          key={accion}
          action={cambiarEstadoAccion}
          className="mt-6 border-t border-linea/10 pt-5"
        >
          <input type="hidden" name="empresa_id" value={empresaId} />
          <input type="hidden" name="accion" value={accion} />
          <label className={`block ${tipografia.cuerpoChico}`}>
            {t.motivo}
            <input
              name="motivo"
              required
              minLength={3}
              maxLength={500}
              placeholder={t.ejemplo}
              className={campo}
            />
          </label>
          <label
            className={`mt-3 flex items-start gap-2 ${tipografia.cuerpoChico} text-gris`}
          >
            <input
              type="checkbox"
              name="confirmo"
              value="si"
              required
              className="mt-1"
            />
            {t.confirmar}
          </label>
          <Button
            type="submit"
            variant={
              accion === "REACTIVAR" || accion === "REABRIR"
                ? "primary"
                : "ghost"
            }
            className="mt-4"
          >
            {t.acciones[accion] ?? accion}
          </Button>
        </form>
      ))}
    </Card>
  );
}
