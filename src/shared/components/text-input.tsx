import { Field, FieldLabel } from '@/shared/ui/field';
import { Input } from '@/shared/ui/input';

// Interface
export interface IInputsProps {
  label: string;
  disabled?: boolean;
  vlaue?: string;
}

export function TextInput({ label, disabled, vlaue }: IInputsProps) {
  return (
    <Field
      //  data-invalid
      className="w-full max-w-xs"
    >
      {/* Label */}
      <FieldLabel
        htmlFor={label}
        className={`font-medium text-sm  ${disabled ? 'text-zinc-400 dark:text-zinc-600' : 'text-zinc-800 dark:text-zinc-50'} `}
      >
        {label}
      </FieldLabel>

      {/* Text Input */}
      <Input
        // aria-invalid
        id={label}
        type="text"
        value={vlaue ?? vlaue}
        placeholder="Placeholder"
        disabled={disabled}
      />
    </Field>
  );
}
