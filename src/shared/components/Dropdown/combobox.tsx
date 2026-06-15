'use client';

import * as React from 'react';

interface ComboboxOption {
  value: string;
  label: string;
}

interface ComboboxProps {
  label?: string;
  placeholder?: string;
  value?: string;
  loading?: boolean;
  options: ComboboxOption[];

  onChange?: (value: string) => void;
}

const Combobox = ({
  label,
  placeholder = 'Select an option',
  value,
  options,
  loading = false,
  onChange,
}: ComboboxProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [query, setQuery] = React.useState('');
  const [highlightedIndex, setHighlightedIndex] = React.useState(-1);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (option: ComboboxOption) => {
    onChange?.(option.value);
    setQuery(option.label);
    setIsOpen(false);
  };
  // OUTSIDE CLICK
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return (
    <div ref={containerRef} className="flex flex-col gap-1 w-full">
      {label && (
        <label className="text-sm font-medium text-foreground">{label}</label>
      )}

      <div className="relative">
        <input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
            setHighlightedIndex(-1);
          }}
          onKeyDown={(e) => {
            if (!isOpen) return;

            if (e.key === 'ArrowDown') {
              e.preventDefault();
              setHighlightedIndex((prev) =>
                prev < filteredOptions.length - 1 ? prev + 1 : 0
              );
            }

            if (e.key === 'ArrowUp') {
              e.preventDefault();
              setHighlightedIndex((prev) =>
                prev > 0 ? prev - 1 : filteredOptions.length - 1
              );
            }

            if (e.key === 'Enter' && highlightedIndex >= 0) {
              handleSelect(filteredOptions[highlightedIndex]);
            }

            if (e.key === 'Escape') {
              setIsOpen(false);
            }
          }}
          className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background text-foreground"
        />

        {isOpen && (
          <ul className="absolute z-10 mt-1 w-full max-h-60 overflow-auto rounded-md border border-border bg-background shadow-md text-sm">
            {loading ? (
              <li className="px-3 py-2 text-muted-foreground">Loading...</li>
            ) : filteredOptions.length === 0 ? (
              <li className="px-3 py-2 text-muted-foreground">
                No options found
              </li>
            ) : (
              filteredOptions.map((opt, index) => (
                <li
                  key={opt.value}
                  onClick={() => handleSelect(opt)}
                  className={`px-3 py-2 cursor-pointer ${
                    highlightedIndex === index
                      ? 'bg-accent text-accent-foreground'
                      : 'hover:bg-accent hover:text-accent-foreground'
                  }`}
                >
                  {opt.label}
                </li>
              ))
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Combobox;
