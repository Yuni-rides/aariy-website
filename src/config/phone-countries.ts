export const phoneCountries = [
  { code: "PK", name: "Pakistan", dial: "92" },
  { code: "AE", name: "United Arab Emirates", dial: "971" },
  { code: "SA", name: "Saudi Arabia", dial: "966" },
  { code: "QA", name: "Qatar", dial: "974" },
  { code: "OM", name: "Oman", dial: "968" },
  { code: "KW", name: "Kuwait", dial: "965" },
  { code: "BH", name: "Bahrain", dial: "973" },
  { code: "GB", name: "United Kingdom", dial: "44" },
  { code: "US", name: "United States", dial: "1" },
  { code: "CA", name: "Canada", dial: "1" },
  { code: "AU", name: "Australia", dial: "61" },
  { code: "NZ", name: "New Zealand", dial: "64" },
  { code: "IE", name: "Ireland", dial: "353" },
  { code: "DE", name: "Germany", dial: "49" },
  { code: "FR", name: "France", dial: "33" },
  { code: "IT", name: "Italy", dial: "39" },
  { code: "ES", name: "Spain", dial: "34" },
  { code: "NL", name: "Netherlands", dial: "31" },
  { code: "BE", name: "Belgium", dial: "32" },
  { code: "CH", name: "Switzerland", dial: "41" },
  { code: "AT", name: "Austria", dial: "43" },
  { code: "SE", name: "Sweden", dial: "46" },
  { code: "NO", name: "Norway", dial: "47" },
  { code: "DK", name: "Denmark", dial: "45" },
  { code: "TR", name: "Turkey", dial: "90" },
  { code: "MY", name: "Malaysia", dial: "60" },
  { code: "SG", name: "Singapore", dial: "65" },
  { code: "HK", name: "Hong Kong", dial: "852" },
  { code: "CN", name: "China", dial: "86" },
  { code: "JP", name: "Japan", dial: "81" },
  { code: "KR", name: "South Korea", dial: "82" },
  { code: "IN", name: "India", dial: "91" },
  { code: "BD", name: "Bangladesh", dial: "880" },
  { code: "LK", name: "Sri Lanka", dial: "94" },
  { code: "AF", name: "Afghanistan", dial: "93" },
  { code: "ZA", name: "South Africa", dial: "27" },
] as const;

export type PhoneCountryCode = (typeof phoneCountries)[number]["code"];

export const DEFAULT_PHONE_COUNTRY: PhoneCountryCode = "PK";

export function isPhoneCountry(code: string): code is PhoneCountryCode {
  return phoneCountries.some((c) => c.code === code);
}
