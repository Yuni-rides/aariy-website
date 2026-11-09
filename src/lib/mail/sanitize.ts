/** Hard cap so a single field can never blow up the email or the log. */
export const MAX_LEN = 5000;

/** Single line, so header values (name, subject) can never carry a newline. */
export function asLine(value: string): string {
  return value.trim().slice(0, MAX_LEN).replace(/[\r\n]+/g, " ");
}

export function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
