import { esc, MAX_LEN } from "./sanitize";

export interface EmailRow {
  label: string;
  value: string;
}

export function rowsToText(heading: string, rows: EmailRow[]): string {
  return [heading, "", ...rows.map((row) => `${row.label}: ${row.value.slice(0, MAX_LEN)}`)].join("\n");
}

/** Branded label/value table, the same shape for every form on the site. */
export function rowsToHtml(heading: string, subheading: string, rows: EmailRow[]): string {
  return `
    <div style="font-family:Arial,Helvetica,sans-serif;color:#151d32;line-height:1.5">
      <h2 style="margin:0 0 4px;color:#e8794a">${esc(heading)}</h2>
      <p style="margin:0 0 20px;color:#818181;font-size:13px">${esc(subheading)}</p>
      <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%;max-width:640px">
        ${rows
          .map(
            (row) => `
          <tr>
            <td style="padding:8px 12px;border:1px solid #e6e8ee;background:#f7f8fa;font-size:13px;font-weight:600;width:38%">${esc(row.label)}</td>
            <td style="padding:8px 12px;border:1px solid #e6e8ee;font-size:13px;white-space:pre-wrap">${esc(row.value.slice(0, MAX_LEN))}</td>
          </tr>`,
          )
          .join("")}
      </table>
    </div>
  `;
}
