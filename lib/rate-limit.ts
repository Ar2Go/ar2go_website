// Rate limit en memoria, por IP. Vive dentro del proceso de la función
// serverless: no es un límite duro y global entre instancias (eso pediría
// Upstash/Vercel KV), pero es la opción con menos partes móviles y basta
// para frenar el abuso más obvio de un formulario público. Cambiarlo por
// un límite distribuido es reemplazar este archivo.
const intentosPorIp = new Map<string, number[]>();

const VENTANA_MS = 60_000;
const MAX_INTENTOS_POR_VENTANA = 5;

export function excedeLimite(ip: string): boolean {
  const ahora = Date.now();
  const marcasVigentes = (intentosPorIp.get(ip) ?? []).filter(
    (marca) => ahora - marca < VENTANA_MS,
  );
  marcasVigentes.push(ahora);
  intentosPorIp.set(ip, marcasVigentes);
  return marcasVigentes.length > MAX_INTENTOS_POR_VENTANA;
}

export function ipDesdeEncabezados(encabezados: Headers): string {
  const forwardedFor = encabezados.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() ?? "desconocida";
  }
  return encabezados.get("x-real-ip") ?? "desconocida";
}
