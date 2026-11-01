import { z } from "zod";

/** Pakistani mobile: 03XXXXXXXXX or +923XXXXXXXXX (spaces/dashes ignored). */
export const pkPhone = z
  .string()
  .transform((v) => v.replace(/[\s-]/g, ""))
  .refine((v) => /^(\+92|0)3\d{9}$/.test(v), "Enter a valid mobile number, e.g. 0300 1234567");

export const PROVINCES = ["Punjab", "Sindh", "Khyber Pakhtunkhwa", "Balochistan", "Islamabad Capital Territory", "Gilgit-Baltistan", "Azad Kashmir"];

/** Text fields of a submitted form, to refill inputs after a failed action. */
export function formValues(formData: FormData): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [key, value] of formData) {
    if (typeof value === "string" && !key.startsWith("$")) out[key] = value;
  }
  return out;
}

/** Flattens zod issues into { field: firstMessage } for form display. */
export function toFieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path.join(".");
    if (key && !out[key]) out[key] = issue.message;
  }
  return out;
}
