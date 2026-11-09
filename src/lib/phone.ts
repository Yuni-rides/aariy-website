import { parsePhoneNumberFromString } from "libphonenumber-js/max";
import { z } from "zod";
import { DEFAULT_PHONE_COUNTRY, isPhoneCountry } from "@/config/phone-countries";

/*
 * Server side only: libphonenumber's full metadata is large, so keep this
 * file out of client components. PhoneInput (the browser half) only needs
 * src/config/phone-countries.ts.
 */

const INVALID = "Enter a valid phone number for the selected country";

/** PhoneInput posts the number and the country separately; this pulls them out of a form. */
export function phoneFromForm(formData: FormData, name = "phone") {
  return { number: String(formData.get(name) ?? ""), country: String(formData.get(`${name}Country`) ?? "") };
}

const phoneParts = z.object({ number: z.string(), country: z.string() });

function toInternational({ number, country }: z.infer<typeof phoneParts>, ctx: z.RefinementCtx): string {
  const region = isPhoneCountry(country) ? country : DEFAULT_PHONE_COUNTRY;
  const parsed = parsePhoneNumberFromString(number.trim(), region);
  if (!parsed?.isValid()) {
    ctx.addIssue({ code: "custom", message: INVALID });
    return z.NEVER;
  }
  return parsed.number; // E.164, e.g. +923001234567
}

/** Required phone number from PhoneInput, checked for its country. Comes out as E.164 (+923001234567). */
export const phoneSchema = phoneParts.transform(toInternational);

/** Same as phoneSchema, but an empty number is allowed (comes out as undefined). */
export const optionalPhoneSchema = phoneParts.transform((parts, ctx) =>
  parts.number.trim() === "" ? undefined : toInternational(parts, ctx),
);
