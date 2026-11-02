import type { Metadata } from "next";
import { CambiosPendientes } from "@/components/admin/CambiosPendientes";
import { SinConfigurar } from "@/components/admin/Estados";
import { TituloAdmin } from "@/components/admin/TituloAdmin";
import { admin } from "@/content/admin";
import { cambiosPendientes, hayAdminDePlanoDeControl, type CambioPendiente } from "@/lib/ar2go-customers-admin";
import { operadorActual } from "../../operador";

export const metadata: Metadata = {
  title: "Pendientes · Panel de administración",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

type Props = { searchParams: Promise<{ aviso?: string }> };

export default async function PendientesPage({ searchParams }: Props) {
  const operador = await operadorActual();
  const { aviso } = await searchParams;
  let pendientes: CambioPendiente[] | null = null;
  if (hayAdminDePlanoDeControl)
    pendientes = await cambiosPendientes(operador)
      .then((r) => r.pendientes)
      .catch((err) => {
        console.error("[admin] no se pudieron leer los pendientes:", err);
        return null;
      });

  return (
    <>
      <TituloAdmin titulo={admin.menu.pendientes} apoyo={admin.pendientes.subtitulo} aviso={aviso} />
      {hayAdminDePlanoDeControl ? <CambiosPendientes pendientes={pendientes} /> : <SinConfigurar />}
      <p className="muted" style={{ fontSize: 13.5, maxWidth: 760 }}>
        {admin.pendientes.apoyo}
      </p>
    </>
  );
}
