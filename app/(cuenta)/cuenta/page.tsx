import type { Metadata } from "next";
import Link from "next/link";
import { SignOutButton } from "@clerk/nextjs";
import { CuentaSplit } from "@/components/layout/CuentaSplit";
import { AltaEmpresa } from "@/components/cuenta/AltaEmpresa";
import { ProductosCuenta } from "@/components/cuenta/ProductosCuenta";
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
export default async function CuentaPage({ searchParams }: Props) {
  const { aviso } = await searchParams;
  const p = await personaActual();
  const avisoTexto = aviso ? (cuenta.avisos[aviso] ?? cuenta.avisos.general) : null;

  const cerrarSesion = (
    <SignOutButton redirectUrl="/">
      <button type="button" className="btn btn--ghost">
        {cuenta.panel.cerrarSesion}
      </button>
    </SignOutButton>
  );

  if (!hayPlanoDeControl || !p) {
    return (
      <CuentaSplit eyebrow={cuenta.panel.eyebrow} titulo={cuenta.panel.titulo} apoyo={cuenta.panel.apoyo}>
        {p && <p className="cuenta__correo">{p.persona.correo}</p>}
        <div className="cuenta__acciones">
          <Link href={cuenta.panel.volver.href} className="btn btn--primary">
            {cuenta.panel.volver.label}
          </Link>
          {cerrarSesion}
        </div>
      </CuentaSplit>
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

  if (!datos) {
    return (
      <CuentaSplit eyebrow={cuenta.alta.eyebrow} titulo={cuenta.alta.titulo} apoyo={cuenta.alta.apoyo}>
        <p className="cuenta__correo">{p.persona.correo}</p>
        {avisoVisible && (
          <p className="cuenta__aviso" role="alert">
            {avisoVisible}
          </p>
        )}
        {!sinServicio && <AltaEmpresa />}
        <div className="cuenta__acciones">{cerrarSesion}</div>
      </CuentaSplit>
    );
  }

  const t = cuenta.tablero;
  return (
    <CuentaSplit eyebrow={t.eyebrow} titulo={datos.empresa.nombre} apoyo={t.apoyo}>
      <p className="cuenta__correo">
        {p.persona.correo} · {t.plan} {datos.empresa.plan_nombre}
      </p>
      {avisoVisible && (
        <p className="cuenta__aviso" role="alert">
          {avisoVisible}
        </p>
      )}
      <ProductosCuenta productos={datos.productos} puedeActivar={["PROPIETARIO", "ADMIN"].includes(datos.rol)} />
      <div className="cuenta__acciones">{cerrarSesion}</div>
    </CuentaSplit>
  );
}
