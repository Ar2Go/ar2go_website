import type { Metadata } from "next";
import { CuentaLanding } from "@/components/cuenta/CuentaLanding";
import { ConfiguracionCuenta } from "@/components/cuenta/ConfiguracionCuenta";
import { SuscripcionResumen } from "@/components/cuenta/SuscripcionResumen";
import { cuenta } from "@/content/cuenta";
import { hayPlanoDeControl, misEmpresas, resumen, type Resumen } from "@/lib/ar2go-customers";
import { personaActual } from "../../persona";

export const metadata: Metadata = {
  title: "Configuración",
  robots: { index: false, follow: false },
};

// Configuración de la cuenta: Perfil (empresa e imagen) y Suscripción (plan
// y productos), con datos de ar2go-customers, y Seguridad (Clerk). Catch-all porque
// Clerk monta sus subpáginas con ruteo por path (/cuenta/configuracion/…).
// Si ar2go-customers no responde, la página sigue: solo la sección
// Suscripción queda sin datos.
export default async function ConfiguracionPage() {
  const t = cuenta.landing.configuracion;
  const p = await personaActual();

  let datos: Resumen | null = null;
  if (hayPlanoDeControl && p) {
    try {
      const { empresas } = await misEmpresas(p.persona);
      if (empresas[0]) datos = await resumen(p.persona, empresas[0].id);
    } catch (e) {
      console.error("[cuenta/configuracion] ar2go-customers no respondió:", e);
    }
  }

  // Mismo criterio que ar2go-customers: PROPIETARIO o ADMIN, y la empresa sin cerrar.
  const puedeEditar =
    !!datos && ["PROPIETARIO", "ADMIN"].includes(datos.rol) && datos.empresa.estado !== "CERRADA";

  return (
    <CuentaLanding
      titulo={t.titulo}
      apoyo={t.apoyo}
      plan={datos?.empresa.plan_nombre ?? null}
      empresa={datos?.empresa.nombre ?? null}
      ancho
    >
      <ConfiguracionCuenta
        empresa={datos?.empresa.nombre ?? null}
        puedeEditar={puedeEditar}
        suscripcion={
          <SuscripcionResumen
            empresa={datos?.empresa.nombre ?? null}
            plan={datos?.empresa.plan_nombre ?? null}
            productos={datos?.productos ?? []}
          />
        }
      />
    </CuentaLanding>
  );
}
