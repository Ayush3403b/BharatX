import { useId } from "react";
import { cn } from "../../utils/cn";
import { Icon } from "../../utils/icons";

const baseField =
  "w-full rounded-xl border bg-night-800/70 px-4 py-3 text-base md:text-[14.5px] text-ink-50 placeholder:text-ink-600 outline-none transition-all duration-300";
const okBorder = "border-white/10 focus:border-pulse-400/60 focus:ring-2 focus:ring-pulse-400/15";
const errBorder = "border-ember-400/60 focus:border-ember-400 focus:ring-2 focus:ring-ember-400/15";

export function FieldLabel({
  htmlFor,
  children,
  required,
}: {
  htmlFor: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2 flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink-400"
    >
      {children}
      {required && <span className="text-gold-400">*</span>}
    </label>
  );
}

export function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-2 flex items-center gap-1.5 text-[12px] text-ember-300">
      <Icon name="triangle-alert" width={12} height={12} />
      {message}
    </p>
  );
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  requiredMark?: boolean;
}

export function Input({ label, error, requiredMark, className, id, ...rest }: InputProps) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  const errorId = `${fieldId}-error`;
  return (
    <div className={className}>
      <FieldLabel htmlFor={fieldId} required={requiredMark}>
        {label}
      </FieldLabel>
      <input
        id={fieldId}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        className={cn(baseField, error ? errBorder : okBorder)}
        {...rest}
      />
      <FieldError id={errorId} message={error} />
    </div>
  );
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  requiredMark?: boolean;
  counterMax?: number;
}

export function Textarea({
  label,
  error,
  requiredMark,
  counterMax,
  className,
  id,
  value,
  ...rest
}: TextareaProps) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  const errorId = `${fieldId}-error`;
  const len = typeof value === "string" ? value.length : 0;
  return (
    <div className={className}>
      <div className="flex items-end justify-between">
        <FieldLabel htmlFor={fieldId} required={requiredMark}>
          {label}
        </FieldLabel>
        {counterMax && (
          <span className="mb-2 font-mono text-[10px] tabular-nums text-ink-600">
            {len}/{counterMax}
          </span>
        )}
      </div>
      <textarea
        id={fieldId}
        value={value}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        className={cn(baseField, "min-h-[130px] resize-y", error ? errBorder : okBorder)}
        {...rest}
      />
      <FieldError id={errorId} message={error} />
    </div>
  );
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  requiredMark?: boolean;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export function Select({
  label,
  error,
  requiredMark,
  options,
  placeholder,
  className,
  id,
  ...rest
}: SelectProps) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  const errorId = `${fieldId}-error`;
  return (
    <div className={className}>
      <FieldLabel htmlFor={fieldId} required={requiredMark}>
        {label}
      </FieldLabel>
      <div className="relative">
        <select
          id={fieldId}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={cn(
            baseField,
            "appearance-none pr-10",
            !rest.value && "text-ink-500",
            error ? errBorder : okBorder,
          )}
          {...rest}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((o) => (
            <option key={o.value} value={o.value} className="bg-night-800 text-ink-100">
              {o.label}
            </option>
          ))}
        </select>
        <Icon
          name="chevron-down"
          width={15}
          height={15}
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ink-500"
        />
      </div>
      <FieldError id={errorId} message={error} />
    </div>
  );
}
