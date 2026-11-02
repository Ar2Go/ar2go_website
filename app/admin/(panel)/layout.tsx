import { MenuAdmin } from "@/components/admin/MenuAdmin";
import { cambiosPendientes, hayAdminDePlanoDeControl, listarSolicitudes } from "@/lib/ar2go-customers-admin";
import { operadorActual } from "../operador";

// Panel con barra lateral (como el de Horiq). Cada página vuelve a revisar al operador: el layout
// no se vuelve a ejecutar en cada navegación y las Server Actions no pasan por aquí.
export default async function PanelAdminLayout({ children }: { children: React.ReactNode }) {
  const operador = await operadorActual();
  // Contador del menú; si la API no responde, la página de pendientes lo dice.
  const pendientes = hayAdminDePlanoDeControl
    ? await Promise.all([
        cambiosPendientes(operador).then((r) => r.pendientes.length),
        listarSolicitudes(operador).then((r) => r.solicitudes.length),
      ])
        .then(([cambios, solicitudes]) => cambios + solicitudes)
        .catch(() => null)
    : null;

  return (
    <div className="panel">
      <MenuAdmin operador={operador} pendientes={pendientes} />
      <main className="panel-main">
        <div className="panel-contenido">{children}</div>
      </main>
    </div>
  );
}
