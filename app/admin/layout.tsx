import "./admin.css";

// Todo /admin (también el acceso) usa la experiencia visual del panel de Horiq: claro, con la
// barra lateral blanca. Los estilos viven bajo .adm (admin.css) y no tocan el resto del sitio.
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="adm">{children}</div>;
}
