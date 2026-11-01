/** ISO 4217 code. PKR only at launch; others are added per market (SOW §2.2). */
export type CurrencyCode = "PKR" | "AED" | "GBP" | "USD" | "CAD";

/** Money is always integer minor units + currency, matching the API (SOW §2.2). */
export type Money = {
  amount: number;
  currency: CurrencyCode;
};

export type ImageAsset = {
  url: string;
  alt: string;
  width: number;
  height: number;
};

export type Paginated<T> = {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
};

/** Result shape returned by server actions to client forms. */
export type ActionResult<T = undefined> =
  | { ok: true; data: T; message?: string }
  | {
      ok: false;
      error: string;
      fieldErrors?: Record<string, string>;
      /** Echo of submitted text fields: React resets forms after an action, so inputs refill from these. */
      values?: Record<string, string>;
    };
