// Campo trampa para bots: un humano nunca lo ve ni lo llena (fuera de
// pantalla, sin tabIndex, oculto para lectores de pantalla). Si llega con
// valor, el Server Action correspondiente descarta el envío en silencio.
export function HoneypotField() {
  return (
    <input
      type="text"
      name="sitio_web"
      tabIndex={-1}
      autoComplete="off"
      aria-hidden="true"
      className="absolute left-[-9999px] h-px w-px overflow-hidden"
    />
  );
}
