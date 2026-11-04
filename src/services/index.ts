/**
 * The only door between UI and data. Pages and server actions import from
 * here; nothing outside src/services knows whether data comes from mocks
 * or the API.
 */
export * from "./catalog.service";
export * from "./brand.service";
export * from "./auth.service";
export * from "./order.service";
export * from "./review.service";
export * from "./support.service";
