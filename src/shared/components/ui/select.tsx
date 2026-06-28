'use client';

import * as React from 'react';
import { Select as SelectPrimitive } from '@base-ui/react/select';

import { cn } from '@/shared/lib/utils/tailwind-cn';
import { ChevronDownIcon, CheckIcon, ChevronUpIcon } from 'lucide-react';

const Select = SelectPrimitive.Root;

function SelectGroup({ className, ...props }: SelectPrimitive.Group.Props) {
  return (
    <SelectPrimitive.Group
      data-slot="select-group"
      className={cn('scroll-my-1', className)}
      {...props}
    />
  );
}

function SelectValue({ className, ...props }: SelectPrimitive.Value.Props) {
  return (
    <SelectPrimitive.Value
      data-slot="select-value"
      className={cn(
        // Default
        'flex flex-1 text-left text-ds-text-plain',

        // Placeholder
        'data-placeholder:text-ds-text-muted',

        // Disabled
        'group-data-[disabled=true]/field:text-ds-text-muted',
        className
      )}
      {...props}
    />
  );
}

function SelectTrigger({
  className,
  size = 'default',
  children,
  ...props
}: SelectPrimitive.Trigger.Props & {
  size?: 'sm' | 'default';
}) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        // Base
        'flex w-fit items-center justify-between gap-1.5 rounded-lg border bg-ds-bg-plain px-4 text-sm whitespace-nowrap transition-colors outline-none select-none',
        '[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*="size-"])]:size-4',
        '*:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-1.5',

        // Size
        'data-[size=default]:h-12.25',
        'data-[size=sm]:h-7 data-[size=sm]:rounded-[min(var(--radius-md),10px)]',

        // Default
        'border-ds-border-soft text-ds-text-plain placeholder:text-ds-text-muted',

        // Hover
        'hover:border-ds-border-default not-disabled:hover:[box-shadow:var(--ring-default)]',

        // Focus
        'focus:border-ds-border-primary focus:[box-shadow:var(--ring-default)]',

        // Disabled
        'disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-ds-bg-muted disabled:text-ds-text-muted disabled:border-transparent',

        // Invalid
        'not-disabled:aria-invalid:border-destructive not-disabled:aria-invalid:ring-1 not-disabled:aria-invalid:ring-destructive/20',

        // Placeholder
        'data-placeholder:text-zinc-400',
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon
        render={<ChevronDownIcon className="pointer-events-none size-4 text-ds-text-muted" />}
      />
    </SelectPrimitive.Trigger>
  );
}

function SelectContent({
  className,
  children,
  side = 'bottom',
  sideOffset = 4,
  align = 'start',
  alignOffset = 0,
  alignItemWithTrigger = false,
  ...props
}: SelectPrimitive.Popup.Props &
  Pick<
    SelectPrimitive.Positioner.Props,
    'align' | 'alignOffset' | 'side' | 'sideOffset' | 'alignItemWithTrigger'
  >) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        alignItemWithTrigger={alignItemWithTrigger}
        className="isolate z-50"
      >
        <SelectPrimitive.Popup
          data-slot="select-content"
          data-align-trigger={alignItemWithTrigger}
          className={cn(
            // Base
            'relative isolate z-50 overflow-x-hidden overflow-y-auto border rounded-lg',
            'max-h-(--available-height) w-(--anchor-width) min-w-36',
            'origin-(--transform-origin)',

            // Default
            'bg-ds-bg-plain border-ds-border-soft shadow-subtle',

            // Animation
            'duration-100',
            'data-[align-trigger=true]:animate-none',
            'data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95',
            'data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95',

            // Side
            'data-[side=bottom]:slide-in-from-top-2',
            'data-[side=top]:slide-in-from-bottom-2',
            'data-[side=left]:slide-in-from-right-2',
            'data-[side=right]:slide-in-from-left-2',
            'data-[side=inline-end]:slide-in-from-left-2',
            'data-[side=inline-start]:slide-in-from-right-2',

            className
          )}
          {...props}
        >
          <SelectScrollUpButton />
          <SelectPrimitive.List>{children}</SelectPrimitive.List>
          <SelectScrollDownButton />
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  );
}

function SelectLabel({ className, ...props }: SelectPrimitive.GroupLabel.Props) {
  return (
    <SelectPrimitive.GroupLabel
      data-slot="select-label"
      className={cn(
        // Default
        'p-4 text-sm',
        className
      )}
      {...props}
    />
  );
}

function SelectItem({ className, children, ...props }: SelectPrimitive.Item.Props) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        // Base
        'relative flex w-full cursor-default items-center gap-1.5 rounded-md outline-hidden select-none',
        'p-4 pr-8 text-sm',
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        '*:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2',

        // Default
        'text-ds-text-plain',

        // Hover
        'hover:bg-ds-bg-muted',

        // Selected
        'data-[selected]:bg-ds-bg-muted data-[selected]:font-medium data-[selected]:text-ds-text-primary',

        // Focus
        'focus:bg-accent focus:text-accent-foreground',
        'not-data-[variant=destructive]:focus:**:text-accent-foreground',

        // Disabled
        'data-disabled:pointer-events-none data-disabled:opacity-50',
        className
      )}
      {...props}
    >
      <SelectPrimitive.ItemText className="flex flex-1 shrink-0 gap-2 whitespace-nowrap">
        {children}
      </SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator
        render={
          <span className="pointer-events-none absolute right-2 flex size-4 items-center justify-center" />
        }
      >
        <CheckIcon className="pointer-events-none" />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  );
}

function SelectSeparator({ className, ...props }: SelectPrimitive.Separator.Props) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn(
        // Default
        'pointer-events-none -mx-1 my-1 h-px bg-border',
        className
      )}
      {...props}
    />
  );
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpArrow>) {
  return (
    <SelectPrimitive.ScrollUpArrow
      data-slot="select-scroll-up-button"
      className={cn(
        // Base
        'top-0 z-10 flex w-full cursor-default items-center justify-center py-1',
        "[&_svg:not([class*='size-'])]:size-4",

        // Default
        'bg-popover',
        className
      )}
      {...props}
    >
      <ChevronUpIcon />
    </SelectPrimitive.ScrollUpArrow>
  );
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownArrow>) {
  return (
    <SelectPrimitive.ScrollDownArrow
      data-slot="select-scroll-down-button"
      className={cn(
        // Base
        'bottom-0 z-10 flex w-full cursor-default items-center justify-center py-1',
        "[&_svg:not([class*='size-'])]:size-4",

        // Default
        'bg-popover',
        className
      )}
      {...props}
    >
      <ChevronDownIcon />
    </SelectPrimitive.ScrollDownArrow>
  );
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
