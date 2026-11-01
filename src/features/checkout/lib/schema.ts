import { z } from "zod";
import { PROVINCES, pkPhone } from "@/lib/validation";

export const checkoutSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name"),
  phone: pkPhone,
  email: z.union([z.literal(""), z.email("Enter a valid email")]).optional(),
  line1: z.string().trim().min(5, "Enter your street address"),
  line2: z.string().trim().optional(),
  city: z.string().trim().min(2, "Enter your city"),
  province: z.enum(PROVINCES, "Choose a province"),
  postalCode: z.string().trim().optional(),
  paymentMethod: z.enum(["cod", "card"], "Choose a payment method"),
  lines: z
    .array(z.object({ variantId: z.string(), quantity: z.number().int().positive() }))
    .min(1, "Your basket is empty"),
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;
