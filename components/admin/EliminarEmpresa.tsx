import { eliminarEmpresaAccion } from "@/app/admin/acciones";
import { admin } from "@/content/admin";
import { tipografia } from "@/lib/typography";

type Props = { empresaId: string; nombre: string; campo: string };

// Borrado total de la empresa en /admin/empresas/[id], solo mientras
// ar2go-customers lo permite (ADMIN_PERMITE_ELIMINAR=si, en pruebas). Pide
// escribir el nombre exacto y un motivo; ar2go-customers vuelve a revisar el
// nombre antes de borrar.
export function EliminarEmpresa({ empresaId, nombre, campo }: Props) {
  const t = admin.eliminar;
  return (
    <section className="mt-4 rounded-card border border-error/40 bg-error/5 p-6" aria-labelledby="eliminar-titulo">
      <p id="eliminar-titulo" className={`${tipografia.eyebrow} text-error`}>
        {t.titulo}
      </p>
      <p className={`mt-3 ${tipografia.cuerpoChico} text-gris`}>{t.apoyo}</p>
      <form action={eliminarEmpresaAccion} className="mt-4 grid gap-4 md:grid-cols-2">
        <input type="hidden" name="empresa_id" value={empresaId} />
        <label className={`block ${tipografia.cuerpoChico}`}>
          {t.confirmacion}
          <input name="confirmacion" required autoComplete="off" placeholder={nombre} className={campo} />
        </label>
        <label className={`block ${tipografia.cuerpoChico}`}>
          {t.motivo}
          <input name="motivo" required minLength={3} maxLength={500} placeholder={t.ejemplo} className={campo} />
        </label>
        <div className="md:col-span-2">
          {/* No es un Button: sus variantes son de marca y esta acción va en el color de error. */}
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-btn border border-error/60 px-5 py-3 text-base font-medium text-error transition-colors duration-[120ms] hover:bg-error/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-azul"
          >
            {t.enviar}
          </button>
        </div>
      </form>
    </section>
  );
}
