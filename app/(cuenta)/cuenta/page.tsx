import type { Metadata } from "next";
import Link from "next/link";
import { CuentaLanding } from "@/components/cuenta/CuentaLanding";
import { AltaEmpresa } from "@/components/cuenta/AltaEmpresa";
import { CintaProductos } from "@/components/cuenta/CintaProductos";
import { cuenta } from "@/content/cuenta";
import { hayPlanoDeControl, misEmpresas, resumen, type Resumen } from "@/lib/ar2go-customers";
import { personaActual } from "./persona";

export const metadata: Metadata = {
  title: "Tu cuenta",
  robots: { index: false, follow: false },
};

type Props = { searchParams: Promise<{ aviso?: string }> };

// Aquí aterriza el usuario después de crear su cuenta o iniciar sesión.
// Con ar2go-customers configurado (CLAUDE.md §8, "Plano de control"):
//   1. sin empresa todavía → se pide su nombre y se da de alta;
//   2. con empresa → plan y productos, para activarlos y abrirlos.
// Sin configurar, sigue siendo el cascarón honesto de antes.
// Cerrar sesión vive en el nav de CuentaLanding, en los tres casos.
export default async function CuentaPage({ searchParams }: Props) {
  const { aviso } = await searchParams;
  const p = await personaActual();
  const avisoTexto = aviso ? (cuenta.avisos[aviso] ?? cuenta.avisos.general) : null;

  if (!hayPlanoDeControl || !p) {
    return (
      <CuentaLanding
        eyebrow={cuenta.panel.eyebrow}
        titulo={cuenta.panel.titulo}
        apoyo={cuenta.panel.apoyo}
        cinta={<CintaProductos productos={null} puedeActivar={false} />}
      >
        {p && <p className="cuenta__correo">{p.persona.correo}</p>}
        <div className="cuenta__acciones">
          <Link href={cuenta.panel.volver.href} className="btn btn--primary">
            {cuenta.panel.volver.label}
          </Link>
        </div>
      </CuentaLanding>
    );
  }

  let datos: Resumen | null = null;
  let sinServicio = false;
  try {
    const { empresas } = await misEmpresas(p.persona);
    if (empresas[0]) datos = await resumen(p.persona, empresas[0].id);
  } catch (e) {
    console.error("[cuenta] ar2go-customers no respondió:", e);
    sinServicio = true;
  }

  const avisoVisible = sinServicio ? cuenta.avisos.SIN_SERVICIO : avisoTexto;
  const avisoNodo = avisoVisible && (
    <p className="cuenta__aviso" role="alert">
      {avisoVisible}
    </p>
  );

  if (!datos) {
    return (
      <CuentaLanding eyebrow={cuenta.alta.eyebrow} titulo={cuenta.alta.titulo} apoyo={cuenta.alta.apoyo}>
        <p className="cuenta__correo">{p.persona.correo}</p>
        {avisoNodo}
        {!sinServicio && <AltaEmpresa />}
      </CuentaLanding>
    );
  }

  const t = cuenta.tablero;
  return (
    <CuentaLanding
      eyebrow={t.eyebrow}
      titulo={datos.empresa.nombre}
      apoyo={t.apoyo}
      cinta={
        <CintaProductos productos={datos.productos} puedeActivar={["PROPIETARIO", "ADMIN"].includes(datos.rol)} />
      }
    >
      <p className="cuenta__correo">
        {p.persona.correo} · {t.plan} {datos.empresa.plan_nombre}
      </p>
      {avisoNodo}
    </CuentaLanding>
  );
}
