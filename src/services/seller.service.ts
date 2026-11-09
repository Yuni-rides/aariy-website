import { useMocks } from "@/config/env";
import { apiClient, endpoints } from "@/lib/api";

export type SellerApplicationInput = {
  fullName: string;
  businessName: string;
  email: string;
  phone: string;
};

/** "Become a seller" sign-up; the team reviews it in the admin portal. */
export async function createSellerApplication(input: SellerApplicationInput): Promise<{ applicationId: string }> {
  if (useMocks) return { applicationId: `SA-${Date.now().toString().slice(-6)}` };
  return apiClient.post(endpoints.sellerApplications, input);
}
