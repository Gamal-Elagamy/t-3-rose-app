import { Field, FieldLabel, FieldSet } from '@/shared/ui/field';
import { Input } from '@/shared/ui/input';

// Interface
interface ITextInputProps {
  label: string;
  disabled?: boolean;
  vlaue?: string;
}

export function TextInput({ label, disabled, vlaue }: ITextInputProps) {
  return (
    <FieldSet className="w-full max-w-xs">
      {/* Field */}
      <Field>
        {/* Label */}
        <FieldLabel
          htmlFor={label}
          className={`font-medium text-sm  ${disabled ? 'text-zinc-400 dark:text-zinc-600' : 'text-zinc-800 dark:text-zinc-50'} `}
        >
          {label}
        </FieldLabel>

        {/* Text Input */}
        <Input
          id={label}
          type="text"
          value={vlaue ?? vlaue}
          placeholder="Placeholder"
          disabled={disabled}
        />
      </Field>
    </FieldSet>
  );
}
