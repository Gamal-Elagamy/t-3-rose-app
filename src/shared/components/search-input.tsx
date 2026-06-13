import { Field, FieldLabel, FieldSet } from '@/shared/ui/field';
import { Input } from '@/shared/ui/input';
import { Search } from 'lucide-react';

// Interface
interface ISearchInputProps {
  disabled?: boolean;
}

export function SearchInput({ disabled }: ISearchInputProps) {
  return (
    <FieldSet className="w-full max-w-xs">
      {/* Field */}
      <Field>
        {/* Label */}
        <FieldLabel
          htmlFor="search-input"
          className={`font-medium text-sm  ${disabled ? 'text-zinc-400 dark:text-zinc-600' : 'text-zinc-800 dark:text-zinc-50'} `}
        >
          Search
        </FieldLabel>

        {/* Search Input */}
        <div className="relative">
          <Input
            id="search-input"
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
    </FieldSet>
  );
}
