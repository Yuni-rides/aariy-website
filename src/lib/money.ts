import type { CurrencyCode, Money } from "@/types";

/** Minor units per major unit. PKR has 100 paisa, even though prices display without decimals. */
const MINOR_UNITS: Record<CurrencyCode, number> = {
  PKR: 100,
  AED: 100,
  GBP: 100,
  USD: 100,
  CAD: 100,
};

const LOCALE: Record<CurrencyCode, string> = {
  PKR: "en-PK",
  AED: "en-AE",
  GBP: "en-GB",
  USD: "en-US",
  CAD: "en-CA",
};

export function money(amount: number, currency: CurrencyCode = "PKR"): Money {
  return { amount: Math.round(amount), currency };
}

export function toMajor(value: Money): number {
  return value.amount / MINOR_UNITS[value.currency];
}

export function formatMoney(value: Money): string {
  return new Intl.NumberFormat(LOCALE[value.currency], {
    style: "currency",
    currency: value.currency,
    currencyDisplay: "code",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(toMajor(value));
}

export function addMoney(a: Money, b: Money): Money {
  if (a.currency !== b.currency) throw new Error("Cannot add money in different currencies");
  return { amount: a.amount + b.amount, currency: a.currency };
}

export function multiplyMoney(value: Money, qty: number): Money {
  return { amount: value.amount * qty, currency: value.currency };
}

export function sumMoney(values: Money[], currency: CurrencyCode = "PKR"): Money {
  return values.reduce(addMoney, money(0, currency));
}

export function discountPercent(price: Money, compareAt?: Money): number | null {
  if (!compareAt || compareAt.amount <= price.amount) return null;
  return Math.round(((compareAt.amount - price.amount) / compareAt.amount) * 100);
}
