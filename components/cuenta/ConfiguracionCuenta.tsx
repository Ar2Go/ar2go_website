"use client";

import { UserProfile } from "@clerk/nextjs";
import { cuenta } from "@/content/cuenta";
import { PerfilEmpresa } from "@/components/cuenta/PerfilEmpresa";

type Props = {
  // Nombre de la empresa (ar2go-customers), para la sección Perfil.
  empresa: string | null;
  // Si puede cambiar el nombre de la empresa (PROPIETARIO o ADMIN).
  puedeEditar: boolean;
  // Contenido de la sección Suscripción, armado en el servidor con los datos
  // de ar2go-customers.
  suscripcion: React.ReactNode;
};

// Gris oscuro para toda la configuración, en vez de la superficie casi negra
// del resto de los formularios de Clerk (lib/clerk-appearance.ts).
const GRIS = "#2a2e35";

// Perfil de Clerk con las secciones en este orden: Perfil, Suscripción y
// Seguridad. Perfil y Suscripción son nuestras; Seguridad es la de Clerk.
// La página "account" de Clerk (nombre, apellido e imagen) se oculta del
// menú: la cuenta se identifica por la empresa, no por la persona. Ruteo por
// path bajo /cuenta/configuracion (de ahí el catch-all de la página); la
// primera sección es la raíz.
export function ConfiguracionCuenta({ empresa, puedeEditar, suscripcion }: Props) {
  const p = cuenta.landing.configuracion.perfil;
  const t = cuenta.landing.configuracion.suscripcion;
  return (
    <UserProfile
      path="/cuenta/configuracion"
      routing="path"
      appearance={{
        variables: { colorBackground: GRIS, colorInput: "#22252b" },
        elements: {
          navbarButton__account: { display: "none" },
        },
      }}
    >
      <UserProfile.Page
        label={p.etiqueta}
        url="perfil"
        labelIcon={
          <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
            <circle cx="8" cy="5.5" r="2.75" fill="none" stroke="currentColor" strokeWidth="1.3" />
            <path d="M2.75 13.5c.9-2.3 2.9-3.5 5.25-3.5s4.35 1.2 5.25 3.5" fill="none" stroke="currentColor" strokeWidth="1.3" />
          </svg>
        }
      >
        <PerfilEmpresa empresa={empresa} puedeEditar={puedeEditar} />
      </UserProfile.Page>
      <UserProfile.Page
        label={t.etiqueta}
        url="suscripcion"
        labelIcon={
          <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
            <rect x="2" y="3.5" width="12" height="9" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.3" />
            <path d="M2 6.5h12" stroke="currentColor" strokeWidth="1.3" />
          </svg>
        }
      >
        {suscripcion}
      </UserProfile.Page>
      <UserProfile.Page label="account" />
      <UserProfile.Page label="security" />
    </UserProfile>
  );
}
