"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { cuenta } from "@/content/cuenta";
import { renombrarEmpresaAccion } from "@/app/(cuenta)/cuenta/acciones";

type Props = {
  // Nombre de la empresa en ar2go-customers; null si todavía no hay.
  empresa: string | null;
  // Solo PROPIETARIO o ADMIN, con la empresa sin cerrar, pueden cambiarlo.
  puedeEditar?: boolean;
};

// Sección "Perfil" de /cuenta/configuracion. Reemplaza la de Clerk: sin
// nombre ni apellido de la persona; la cuenta se identifica por la empresa
// (ar2go-customers). La imagen sí es la de Clerk (user.setProfileImage), con
// botones propios para que se vean sobre el fondo de la página. El nombre de
// la empresa se edita aquí mismo (acción renombrarEmpresaAccion).
export function PerfilEmpresa({ empresa, puedeEditar = false }: Props) {
  const t = cuenta.landing.configuracion.perfil;
  const { user } = useUser();
  const archivo = useRef<HTMLInputElement>(null);
  const [subiendo, setSubiendo] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editando, setEditando] = useState(false);
  const [resultado, guardar, guardando] = useActionState(renombrarEmpresaAccion, { ok: false, error: null });

  // Guardado con éxito: se cierra el campo (la página se vuelve a pintar con
  // el nombre nuevo por revalidatePath).
  useEffect(() => {
    if (resultado.ok) setEditando(false);
  }, [resultado]);

  const correo = user?.primaryEmailAddress?.emailAddress ?? "";
  const inicial = ((empresa || correo).trim()[0] ?? "A").toUpperCase();

  async function cambiarImagen(file: File | null) {
    if (!user) return;
    setError(null);
    setSubiendo(true);
    try {
      await user.setProfileImage({ file });
      // Para que el encabezado (y cualquier otro useUser) vea la imagen nueva.
      await user.reload();
    } catch {
      setError(t.errorImagen);
    } finally {
      setSubiendo(false);
      if (archivo.current) archivo.current.value = "";
    }
  }

  return (
    <div className="config-seccion">
      <h1 className="config-seccion__titulo">{t.titulo}</h1>

      <div className="perfil-imagen">
        {user?.hasImage ? (
          // eslint-disable-next-line @next/next/no-img-element -- URL de Clerk, ya optimizada por su CDN
          <img className="perfil-imagen__foto" src={user.imageUrl} alt="" />
        ) : (
          <span className="perfil-imagen__foto perfil-imagen__foto--inicial" aria-hidden="true">
            {inicial}
          </span>
        )}
        <div className="perfil-imagen__acciones">
          <p className="perfil-imagen__ayuda">{t.ayudaImagen}</p>
          <div className="perfil-imagen__botones">
            <button
              type="button"
              className="btn btn--primary"
              disabled={!user || subiendo}
              onClick={() => archivo.current?.click()}
            >
              {subiendo ? t.subiendo : t.subir}
            </button>
            {user?.hasImage && (
              <button
                type="button"
                className="btn btn--ghost"
                disabled={subiendo}
                onClick={() => cambiarImagen(null)}
              >
                {t.quitar}
              </button>
            )}
          </div>
          {error && (
            <p className="cuenta__aviso" role="alert">
              {error}
            </p>
          )}
          <input
            ref={archivo}
            type="file"
            accept="image/png,image/jpeg,image/webp"
            hidden
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) cambiarImagen(f);
            }}
          />
        </div>
      </div>

      <dl className="config-datos">
        <div>
          <dt>{t.empresa}</dt>
          <dd>
            {editando ? (
              <form action={guardar} className="config-editar">
                <input
                  name="nombre"
                  defaultValue={empresa ?? ""}
                  aria-label={t.nombreEmpresa}
                  minLength={2}
                  maxLength={120}
                  required
                  autoFocus
                  className="config-editar__campo"
                />
                <div className="config-editar__botones">
                  <button type="submit" className="btn btn--primary" disabled={guardando}>
                    {guardando ? t.guardando : t.guardar}
                  </button>
                  <button type="button" className="btn btn--ghost" disabled={guardando} onClick={() => setEditando(false)}>
                    {t.cancelar}
                  </button>
                </div>
                {resultado.error && (
                  <p className="cuenta__aviso" role="alert">
                    {cuenta.avisos[resultado.error] ?? cuenta.avisos.general}
                  </p>
                )}
              </form>
            ) : (
              <span className="config-valor">
                {empresa ?? t.sinEmpresa}
                {empresa && puedeEditar && (
                  <button type="button" className="config-valor__editar" onClick={() => setEditando(true)}>
                    {t.editar}
                  </button>
                )}
                {resultado.ok && (
                  <span className="config-valor__ok" role="status">
                    {t.guardado}
                  </span>
                )}
              </span>
            )}
          </dd>
        </div>
        <div>
          <dt>{t.correo}</dt>
          <dd>{correo}</dd>
        </div>
      </dl>
    </div>
  );
}
