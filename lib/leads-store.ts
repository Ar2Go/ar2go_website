export type Lead = {
  tipo: "demo" | "lista-espera";
  nombre?: string;
  empresa?: string;
  whatsapp?: string;
  giro?: string;
  mensajesPorDia?: string;
  correo?: string;
  procesoInteres?: string;
  aceptaContactoComercial?: boolean;
  creadoEn: string;
};

export interface LeadsStore {
  guardar(lead: Lead): Promise<void>;
}

// Implementación mínima: registra el lead en los logs de la función
// (visibles en el dashboard de Vercel). Es la opción con menos partes
// móviles mientras no hay base de datos ni cuenta de un servicio externo
// (Airtable, Google Sheets, etc.) — ver CLAUDE.md §11. El correo de
// notificación (lib/email.ts) es, por ahora, la vía real para enterarse de
// un lead nuevo; este log es el respaldo.
//
// Cambiar de almacén más adelante es reemplazar esta clase por otra que
// implemente LeadsStore, sin tocar a quien la llama.
class ConsoleLeadsStore implements LeadsStore {
  async guardar(lead: Lead): Promise<void> {
    console.log("[lead]", JSON.stringify(lead));
  }
}

export const leadsStore: LeadsStore = new ConsoleLeadsStore();
