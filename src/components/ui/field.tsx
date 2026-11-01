import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

const control =
  "w-full rounded-md border border-line bg-surface px-3 text-sm text-ink placeholder:text-muted focus:border-ink focus:outline-none aria-[invalid=true]:border-danger";

type FieldProps = {
  label: string;
  name: string;
  error?: string;
  hint?: string;
  children?: ReactNode;
};

/** Label + control + error, wired with ids so screen readers announce errors. */
export function Field({ label, name, error, hint, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-sm font-medium">
        {label}
      </label>
      {children}
      {hint && !error && (
        <p id={`${name}-hint`} className="text-xs text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${name}-error`} role="alert" className="text-xs text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

export function Input({ className, error, ...props }: ComponentProps<"input"> & { error?: string }) {
  return (
    <input
      id={props.name}
      aria-invalid={Boolean(error)}
      aria-describedby={error ? `${props.name}-error` : undefined}
      className={cn(control, "h-11", className)}
      {...props}
    />
  );
}

export function Textarea({ className, error, ...props }: ComponentProps<"textarea"> & { error?: string }) {
  return (
    <textarea
      id={props.name}
      aria-invalid={Boolean(error)}
      aria-describedby={error ? `${props.name}-error` : undefined}
      className={cn(control, "min-h-32 py-2.5", className)}
      {...props}
    />
  );
}

export function Select({ className, error, ...props }: ComponentProps<"select"> & { error?: string }) {
  return (
    <select
      id={props.name}
      aria-invalid={Boolean(error)}
      aria-describedby={error ? `${props.name}-error` : undefined}
      className={cn(control, "h-11", className)}
      {...props}
    />
  );
}
