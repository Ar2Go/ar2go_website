import type { Metadata } from "next";
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
// Cerrar sesión vive en el menú "Mi cuenta" de CuentaLanding, en los tres casos.
export default async function CuentaPage({ searchParams }: Props) {
  const { aviso } = await searchParams;
  const p = await personaActual();
  const avisoTexto = aviso ? (cuenta.avisos[aviso] ?? cuenta.avisos.general) : null;

  if (!hayPlanoDeControl || !p) {
    return (
      <CuentaLanding
        titulo={cuenta.tablero.titulo}
        apoyo={cuenta.tablero.apoyo}
        anuncio={cuenta.panel.apoyo}
        cinta={<CintaProductos productos={null} puedeActivar={false} />}
      />
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
        {avisoNodo}
        {!sinServicio && <AltaEmpresa />}
      </CuentaLanding>
    );
  }

  const t = cuenta.tablero;
  const estadoEmpresa = cuenta.estadoEmpresa[datos.empresa.estado] ?? null;
  const puedeActivar = !estadoEmpresa && ["PROPIETARIO", "ADMIN"].includes(datos.rol);
  return (
    <CuentaLanding
      titulo={t.titulo}
      apoyo={t.apoyo}
      plan={datos.empresa.plan_nombre}
      empresa={datos.empresa.nombre}
      cinta={
        <CintaProductos
            productos={datos.productos}
            puedeActivar={puedeActivar}
            maxProductos={datos.empresa.max_productos ?? null}
            bloqueo={estadoEmpresa?.nota}
          />
      }
    >
      {/* Correo y plan viven en la tarjeta "Mi cuenta"; aquí solo avisos. */}
      {estadoEmpresa && (
        <p className="cuenta__aviso" role="status">
          {estadoEmpresa.aviso}
        </p>
      )}
      {avisoNodo}
    </CuentaLanding>
  );
}
