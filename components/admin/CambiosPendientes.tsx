import Link from "next/link";
import { reintentarAccion } from "@/app/admin/acciones";
import { fecha } from "@/components/admin/formato";
import { admin } from "@/content/admin";
import type { CambioPendiente } from "@/lib/ar2go-customers-admin";
import { medidaMaxima, tipografia } from "@/lib/typography";

type Props = { pendientes: CambioPendiente[] | null };

const th = `px-3 py-2 text-left ${tipografia.eyebrow}`;
const td = `px-3 py-3 align-top ${tipografia.cuerpoChico}`;

// Cambios que algún producto todavía no confirma, en todas las empresas
// (ar2go-customers reintenta solo cada 15 min con espera creciente). Los que
// requieren atención van primero y se pueden reintentar a mano. null: la API
// no respondió esta parte, y se dice en vez de esconderla.
export function CambiosPendientes({ pendientes }: Props) {
  const t = admin.pendientes;
  return (
    <section aria-labelledby="pendientes-titulo">
      <h2 id="pendientes-titulo" className={`mt-16 ${tipografia.h3}`}>
        {t.titulo}
      </h2>
      <p className={`mt-2 ${medidaMaxima} ${tipografia.cuerpoChico} text-gris`}>{t.apoyo}</p>
      {pendientes === null ? (
        <p className={`mt-4 ${tipografia.cuerpoChico} text-error`}>{t.sinDatos}</p>
      ) : pendientes.length === 0 ? (
        <p className={`mt-4 ${tipografia.cuerpoChico} text-gris`}>{t.vacio}</p>
      ) : (
        <div className="mt-4 overflow-x-auto rounded-card border border-linea/10">
          <table className="w-full min-w-[820px] border-collapse">
            <thead className="bg-superficie">
              <tr>
                {Object.values(t.columnas).map((c) => (
                  <th key={c} scope="col" className={th}>
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pendientes.map((p) => (
                <tr key={p.suscripcion_id} className="border-t border-linea/10">
                  <td className={td}>
                    <Link
                      href={`/admin/empresas/${p.empresa_id}`}
                      className="text-azul-suave underline-offset-4 hover:underline"
                    >
                      {p.empresa}
                    </Link>
                  </td>
                  <td className={td}>{p.producto}</td>
                  <td className={`${td} font-mono`}>
                    {p.version_aplicada} / {p.version}
                  </td>
                  <td className={td}>
                    {p.requiere_atencion ? (
                      <span className="text-error">{t.requiereAtencion}</span>
                    ) : (
                      <span className="text-gris">
                        {t.siguiente} {fecha(p.proximo_intento_at)}
                      </span>
                    )}
                    <span className="block font-mono text-gris">
                      {p.intentos} {t.intentos}
                    </span>
                  </td>
                  <td className={`${td} break-all text-gris`}>{p.ultimo_error ?? "—"}</td>
                  <td className={td}>
                    <form action={reintentarAccion}>
                      <input type="hidden" name="suscripcion_id" value={p.suscripcion_id} />
                      <button type="submit" className="text-azul-suave underline-offset-4 hover:underline">
                        {t.reintentar}
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
