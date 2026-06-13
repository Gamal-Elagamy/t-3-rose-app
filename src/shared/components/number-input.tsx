import { Field, FieldLabel, FieldSet } from '@/shared/ui/field';
import { Input } from '@/shared/ui/input';

// Interface
interface INumberInputProps {
  label: string;
  disabled?: boolean;
}

export function NumberInput({ label, disabled }: INumberInputProps) {
  return (
    <FieldSet className="w-full max-w-xs">
      {/* Field */}
      <Field>
        {/* Label */}
        <FieldLabel
          htmlFor="number-input"
          className={`font-medium text-sm  ${disabled ? 'text-zinc-400 dark:text-zinc-600' : 'text-zinc-800 dark:text-zinc-50'} `}
        >
          {label}
        </FieldLabel>

        {/* Text Input */}
        <Input
          id="number-input"
          type="number"
          placeholder="Placeholder"
          disabled={disabled}
          className="[&::-webkit-inner-spin-button]:opacity-100 [&::-webkit-outer-spin-button]:opacity-100"
        />
      </Field>
    </FieldSet>
  );
}
