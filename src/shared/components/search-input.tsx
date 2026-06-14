import { Field, FieldLabel } from '@/shared/ui/field';
import { Input } from '@/shared/ui/input';
import { Search } from 'lucide-react';
import { IInputsProps } from './text-input';

export function SearchInput({ label, disabled }: IInputsProps) {
  return (
    <Field
      // data-invalid
      className="w-full max-w-xs"
      disabled={disabled}
    >
      {/* Label */}
      <FieldLabel htmlFor={label} className={`font-medium text-sm`}>
        {label}
      </FieldLabel>

      {/* Search Input */}
      <div className="relative">
        <Input
          // aria-invalid
          id={label}
          type="search"
          placeholder="Search..."
          disabled={disabled}
          className="pl-10"
        />

        {/* Search Icon */}
        <Search
          size={18}
          strokeWidth={1.5}
          className={`text-zinc-400 absolute top-1/2 left-4 -translate-y-1/2 ${disabled && 'text-zinc-600'}`}
        />
      </div>
    </Field>
  );
}
