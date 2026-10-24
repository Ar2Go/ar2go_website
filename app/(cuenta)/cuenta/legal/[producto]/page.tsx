import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { CuentaLanding } from "@/components/cuenta/CuentaLanding";
import { TextoLegal } from "@/components/legal/TextoLegal";
import { cuenta } from "@/content/cuenta";
import {
  ErrorCuenta,
  documentosLegales,
  hayPlanoDeControl,
  misEmpresas,
  resumen,
  type DocumentoLegal,
} from "@/lib/ar2go-customers";
import { aceptarAccion } from "../../acciones";
import { personaActual } from "../../persona";

export const metadata: Metadata = {
  title: "Términos y contrato de datos",
  robots: { index: false, follow: false },
};

type Props = {
  params: Promise<{ producto: string }>;
  searchParams: Promise<{ plan?: string; aviso?: string }>;
};

// Aceptación de los documentos legales de la empresa (D25 de Ar2Go/Ar2Go):
// términos del producto y contrato de encargo de datos. Llega aquí desde
// Activar (ar2go-customers responde ACEPTACION_PENDIENTE) o desde la tarjeta
// de un producto ya activo con una versión nueva. Una casilla por documento;
// la constancia la guarda ar2go-customers con la huella del texto mostrado.
export default async function AceptarLegalPage({ params, searchParams }: Props) {
  const [{ producto }, { plan, aviso }] = await Promise.all([params, searchParams]);
  if (!/^[a-z0-9-]{2,40}$/.test(producto) || !hayPlanoDeControl) notFound();
  const p = await personaActual();
  if (!p) redirect("/iniciar-sesion");
  const { empresas } = await misEmpresas(p.persona);
  if (!empresas[0]) redirect("/cuenta");

  let documentos: DocumentoLegal[];
  let activo = false;
  let rol = "";
  let empresa = "";
  try {
    const [d, r] = await Promise.all([
      documentosLegales(p.persona, empresas[0].id, producto),
      resumen(p.persona, empresas[0].id),
    ]);
    documentos = d.documentos;
    const prod = r.productos.find((x) => x.slug === producto);
    if (!prod) notFound();
    activo = prod.estado === "ACTIVA" || prod.estado === "PRUEBA";
    rol = r.rol;
    empresa = r.empresa.nombre;
  } catch (e) {
    if (e instanceof ErrorCuenta) redirect(`/cuenta?aviso=${encodeURIComponent(e.code)}`);
    throw e;
  }
  if (documentos.length === 0) redirect("/cuenta");

  const t = cuenta.legalEmpresa;
  const pendientes = documentos.filter((d) => !d.aceptado);
  const puedeAceptar = ["PROPIETARIO", "ADMIN"].includes(rol);
  const avisoTexto = aviso ? (cuenta.avisos[aviso] ?? cuenta.avisos.general) : null;
  const planValido = plan === "explorar" || plan === "equipo" ? plan : null;

  // "Versión nueva" solo si el producto ya se usa y hay algo por aceptar.
  const nueva = activo && pendientes.length > 0;
  return (
    <CuentaLanding
      eyebrow={nueva ? t.eyebrowNueva : t.eyebrow}
      titulo={nueva ? t.tituloNueva : t.titulo}
      apoyo={nueva ? t.apoyoNueva : t.apoyo}
    >
      <div className="legal-aceptar">
        {avisoTexto && (
          <p className="cuenta__aviso" role="alert">
            {avisoTexto}
          </p>
        )}
        {pendientes.length === 0 ? (
          <p className="legal-aceptar__nota">{t.nadaPendiente}</p>
        ) : (
          <form action={aceptarAccion}>
            <input type="hidden" name="producto" value={producto} />
            {planValido && <input type="hidden" name="plan" value={planValido} />}
            {activo && <input type="hidden" name="solo_aceptar" value="si" />}
            {documentos.map((d) => (
              <section key={d.slug} className="legal-aceptar__doc" aria-labelledby={`doc-${d.slug}`}>
                <header className="legal-aceptar__encabezado">
                  <h2 id={`doc-${d.slug}`}>{d.titulo}</h2>
                  <span className="cinta__nota">
                    {t.version} {d.version}
                  </span>
                </header>
                <Link href={`/legal/${producto}/${d.slug}`} target="_blank" rel="noopener" className="cinta__legal">
                  {t.leer}
                </Link>
                {d.todo_legal > 0 && <p className="legal-aceptar__borrador">{t.borrador}</p>}
                {d.aceptado ? (
                  <p className="legal-aceptar__nota">{t.yaAceptado}</p>
                ) : (
                  <>
                    <div className="legal-aceptar__texto" tabIndex={0} aria-label={d.titulo}>
                      {/* El título ya va arriba; el texto aceptado (y su huella) lo incluye. */}
                      <TextoLegal texto={d.texto.replace(/^# .+\n+/, "")} />
                    </div>
                    <input type="hidden" name="documento" value={`${d.slug}|${d.version}|${d.sha256}`} />
                    <label className="legal-aceptar__casilla">
                      <input type="checkbox" name="acepto" value={d.slug} required disabled={!puedeAceptar} />
                      <span>{t.casilla(d.titulo, empresa)}</span>
                    </label>
                  </>
                )}
              </section>
            ))}
            <p className="legal-aceptar__nota">{puedeAceptar ? t.constancia : t.soloAdmin}</p>
            <div className="cuenta__acciones">
              {puedeAceptar && (
                <button type="submit" className="btn btn--primary">
                  {activo ? t.aceptar : t.aceptarYActivar}
                </button>
              )}
              <Link href="/cuenta" className="btn btn--ghost">
                {t.cancelar}
              </Link>
            </div>
          </form>
        )}
      </div>
    </CuentaLanding>
  );
}
