export type Customer = {
  id: string;
  name: string;
  /** Buyers sign in by a one-time code sent to this address. */
  email: string;
  phone?: string;
};
