import { Field, FieldLabel } from '@/shared/ui/field';
import { Input } from '@/shared/ui/input';
import { IInputsProps } from './text-input';

export function NumberInput({ label, disabled }: IInputsProps) {
  return (
    <Field
      // data-invalid
      className="w-full max-w-xs"
      disabled={disabled}
    >
      {/* Label */}
      <FieldLabel htmlFor={label} className={`font-medium text-sm `}>
        {label}
      </FieldLabel>

      {/* Text Input */}
      <Input
        // aria-invalid
        id={label}
        type="number"
        placeholder="Placeholder"
        disabled={disabled}
        className="py-2.5 px-4"
      />
    </Field>
  );
}

// [&::-webkit-inner-spin-button]:opacity-100 [&::-webkit-outer-spin-button]:opacity-100
