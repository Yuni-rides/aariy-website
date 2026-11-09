"use client";

import {
  AE, AF, AT, AU, BD, BE, BH, CA, CH, CN, DE, DK, ES, FR, GB, HK,
  IE, IN, IT, JP, KR, KW, LK, MY, NL, NO, NZ, OM, PK, QA, SA, SE, SG, TR, US, ZA,
} from "country-flag-icons/react/3x2";
import { useState, type ComponentProps } from "react";
import { ChevronDownIcon } from "@/components/icons";
import {
  DEFAULT_PHONE_COUNTRY,
  isPhoneCountry,
  phoneCountries,
  type PhoneCountryCode,
} from "@/config/phone-countries";
import { cn } from "@/lib/utils";

const flags: Record<PhoneCountryCode, typeof PK> = {
  AE, AF, AT, AU, BD, BE, BH, CA, CH, CN, DE, DK, ES, FR, GB, HK,
  IE, IN, IT, JP, KR, KW, LK, MY, NL, NO, NZ, OM, PK, QA, SA, SE, SG, TR, US, ZA,
};

type PhoneInputProps = Omit<ComponentProps<"input">, "type" | "name" | "defaultValue"> & {
  name: string;
  defaultValue?: string;
  /** Country picked before (ISO code), e.g. refilled after a failed submit. */
  defaultCountry?: string;
  error?: string;
};

/**
 * Phone number with a country picker in front. Submits two fields: the
 * number as typed (`name`) and the country's ISO code (`${name}Country`);
 * the server joins and checks them with phoneSchema.
 *
 * The picker is a native <select> laid over the flag, so it works with the
 * keyboard, screen readers and phone pickers without extra code.
 */
export function PhoneInput({ name, defaultValue, defaultCountry, error, className, ...props }: PhoneInputProps) {
  const initial = defaultCountry && isPhoneCountry(defaultCountry) ? defaultCountry : DEFAULT_PHONE_COUNTRY;
  const [country, setCountry] = useState<PhoneCountryCode>(initial);
  // React resets the form after a server action, putting the select back to its
  // default; follow the refilled default so the flag and the select agree.
  const [lastInitial, setLastInitial] = useState(initial);
  if (initial !== lastInitial) {
    setLastInitial(initial);
    setCountry(initial);
  }
  const selected = phoneCountries.find((c) => c.code === country)!;
  const Flag = flags[country];

  return (
    <div
      className={cn(
        "flex h-11 w-full rounded-md border border-line bg-surface focus-within:border-ink",
        error && "border-danger",
        className,
      )}
    >
      <div className="relative flex shrink-0 items-center gap-1.5 rounded-l-md border-r border-line bg-subtle px-3 text-sm text-ink focus-within:ring-2 focus-within:ring-ink/20">
        <Flag aria-hidden className="h-4 w-6 shrink-0 rounded-[3px]" />
        <span aria-hidden>+{selected.dial}</span>
        <ChevronDownIcon aria-hidden width={14} height={14} className="text-muted" />
        <select
          // Uncontrolled, like the number field, so a form reset restores the refilled country.
          key={initial}
          name={`${name}Country`}
          defaultValue={initial}
          onChange={(e) => setCountry(e.target.value as PhoneCountryCode)}
          aria-label="Country code"
          className="absolute inset-0 cursor-pointer opacity-0"
        >
          {phoneCountries.map((c) => (
            <option key={c.code} value={c.code}>
              {c.name} (+{c.dial})
            </option>
          ))}
        </select>
      </div>
      <input
        id={name}
        name={name}
        defaultValue={defaultValue}
        type="tel"
        inputMode="tel"
        autoComplete="tel-national"
        placeholder={country === "PK" ? "300 1234567" : "Phone number"}
        maxLength={20}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        className="min-w-0 flex-1 rounded-r-md bg-transparent px-3 text-sm text-ink placeholder:text-muted focus:outline-none"
        {...props}
      />
    </div>
  );
}
