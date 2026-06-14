'use client';

interface SelectProps {
  label?: string;
  placeholder?: string;
  options: { value: string; label: string }[];
  disabled?: boolean;
  error?: string;
  onChange?: (value: string) => void;
}

const Select = ({
  label,
  placeholder = 'Select an option',
  options,
  disabled = false,
  error,
  onChange,
}: SelectProps) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && <label className="text-sm font-medium ">{label}</label>}
      <select
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background text-foreground disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <option value="" disabled selected>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
};

export default Select;
