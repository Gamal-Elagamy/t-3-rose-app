import { Field, FieldLabel } from '@/shared/ui/field';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';
import { IInputsProps } from './text-input';

const items = [
  { label: 'Select an option', value: null },
  { label: 'Select 1', value: 'Select 1' },
  { label: 'Select 2', value: 'Select 2' },
  { label: 'Select 3', value: 'Select 3' },
  { label: 'Select 4', value: 'Select 4' },
  { label: 'Select 5', value: 'Select 5' },
];

export function SelectInput({ label, disabled }: IInputsProps) {
  return (
    <Field
      // data-invalid
      className="w-full max-w-xs"
      disabled={disabled}
    >
      {/* Label */}
      <FieldLabel>{label}</FieldLabel>

      {/* Select */}
      <Select items={items}>
        {/* Select Trigger */}
        <SelectTrigger
          className="w-full max-w-xs"
          disabled={disabled}
          // aria-invalid
        >
          <SelectValue />
        </SelectTrigger>

        {/* Select Content */}
        <SelectContent>
          {/* Select Group */}
          <SelectGroup>
            {/* Select Label */}
            <SelectLabel>Select</SelectLabel>

            {/* Select Items */}
            {items.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      {/* Error Message */}
      {/* <FieldError>Please select an option.</FieldError> */}
    </Field>
  );
}
