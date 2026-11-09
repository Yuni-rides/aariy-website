import nodemailer from "nodemailer";
import { mailEnv } from "@/config/env";
import { rowsToHtml, rowsToText, type EmailRow } from "./email-body";
import { asLine } from "./sanitize";

const SEND_TIMEOUT_MS = 20_000;

function withTimeout<T>(promise: Promise<T>, ms: number, label: string): Promise<T> {
  let timer: ReturnType<typeof setTimeout>;
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error(`${label} timed out after ${ms}ms`)), ms);
  });
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
}

export interface FormMail {
  /** Recipient inbox, from mailEnv. */
  to: string;
  /** Shown as the sender name; the address is always the authenticated SMTP user. */
  fromName: string;
  subject: string;
  heading: string;
  subheading: string;
  rows: EmailRow[];
  replyTo?: string;
}

/** Sends a form submission as a label/value table. Throws if SMTP is not configured or the send fails. */
export async function sendFormMail({ to, fromName, subject, heading, subheading, rows, replyTo }: FormMail) {
  const { host, port, user, pass } = mailEnv;
  const missing = [!host && "SMTP_HOST", !user && "SMTP_USER", !pass && "SMTP_PASS", !to && "a *_TO_EMAIL inbox"].filter(Boolean);
  if (missing.length) throw new Error(`Email is not configured: missing ${missing.join(", ")}`);

  const transporter = nodemailer.createTransport({ host, port, secure: port === 465, auth: { user, pass } });

  await withTimeout(
    transporter.sendMail({
      from: `"${asLine(fromName)}" <${user}>`,
      to,
      replyTo,
      subject: asLine(subject),
      text: rowsToText(heading, rows),
      html: rowsToHtml(heading, subheading, rows),
    }),
    SEND_TIMEOUT_MS,
    "sendMail",
  );
}
