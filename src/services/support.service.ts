import { useMocks } from "@/config/env";
import { apiClient, endpoints } from "@/lib/api";

export type SupportTicketInput = {
  name: string;
  email: string;
  phone?: string;
  orderNumber?: string;
  message: string;
};

/** Contact form creates a ticket in the admin portal (SOW §3.9). */
export async function createSupportTicket(input: SupportTicketInput): Promise<{ ticketId: string }> {
  if (useMocks) return { ticketId: `TK-${Date.now().toString().slice(-6)}` };
  return apiClient.post(endpoints.supportTickets, input);
}
