import { eliminarEmpresaAccion } from "@/app/admin/acciones";
import { BotonEnviar } from "@/components/admin/BotonEnviar";
import { admin } from "@/content/admin";

type Props = { empresaId: string; nombre: string };

// Borrado total de la empresa en /admin/empresas/[id], solo mientras
// ar2go-customers lo permite (ADMIN_PERMITE_ELIMINAR=si, en pruebas). Basta el
// motivo: el nombre que ar2go-customers revisa antes de borrar lo manda el
// formulario. Como la Zona de riesgo de Horiq.
export function EliminarEmpresa({ empresaId, nombre }: Props) {
  const t = admin.eliminar;
  return (
    <section className="card card-peligro" aria-labelledby="eliminar-titulo">
      <div className="card-head">
        <span id="eliminar-titulo" className="card-title">
          {t.titulo}
        </span>
      </div>
      <form action={eliminarEmpresaAccion} className="card-cuerpo">
        <p className="muted" style={{ fontSize: 13.5 }}>
          {t.apoyo}
        </p>
        <input type="hidden" name="empresa_id" value={empresaId} />
        <input type="hidden" name="confirmacion" value={nombre} />
        <div className="row" style={{ alignItems: "flex-end" }}>
          <label className="campo grow">
            {t.motivo}
            <input name="motivo" required minLength={3} maxLength={500} placeholder={t.ejemplo} />
          </label>
          <BotonEnviar className="btn btn-danger" enCurso={t.enCurso}>
            {t.enviar}
          </BotonEnviar>
        </div>
      </form>
    </section>
  );
}
