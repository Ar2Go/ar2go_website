import Link from "next/link";
import { cuenta } from "@/content/cuenta";
import type { Producto } from "@/lib/ar2go-customers";

type Props = {
  // null: no hay plano de control o la persona todavía no da de alta su
  // empresa.
  empresa: string | null;
  plan: string | null;
  productos: Producto[];
};

// Sección "Suscripción" de /cuenta/configuracion: empresa, plan y productos
// contratados con su estado. Activar o abrir productos sigue en /cuenta.
export function SuscripcionResumen({ empresa, plan, productos }: Props) {
  const t = cuenta.landing.configuracion.suscripcion;
  const e = cuenta.tablero;
  const contratados = productos.filter((p) => p.estado && p.estado !== "CANCELADA");

  return (
    <div className="config-seccion">
      <h1 className="config-seccion__titulo">{t.titulo}</h1>

      {!empresa ? (
        <p className="suscripcion__nota">{t.sinEmpresa}</p>
      ) : (
        <>
          <dl className="config-datos">
            <div>
              <dt>{t.empresa}</dt>
              <dd>{empresa}</dd>
            </div>
            <div>
              <dt>{t.plan}</dt>
              <dd>{plan}</dd>
            </div>
          </dl>

          <h2 className="suscripcion__subtitulo">{t.productos}</h2>
          {contratados.length === 0 ? (
            <p className="suscripcion__nota">{t.sinProductos}</p>
          ) : (
            <ul className="suscripcion__productos">
              {contratados.map((p) => (
                <li key={p.slug}>
                  <span>{cuenta.productos[p.slug]?.nombre ?? p.nombre}</span>
                  <span
                    className={
                      p.estado === "ACTIVA" ? "cuenta__estado" : "cuenta__estado cuenta__estado--alerta"
                    }
                  >
                    {p.estado === "ACTIVA" ? e.activo : p.estado === "SUSPENDIDA" ? e.suspendido : e.preparando}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </>
      )}

      <Link href="/cuenta" className="suscripcion__enlace">
        {t.verArgonautas}
      </Link>
    </div>
  );
}
