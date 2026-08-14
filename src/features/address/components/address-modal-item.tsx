'use client';

import { MapPin, Pencil, Phone, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { cn } from '@/shared/lib/utils/tailwind-cn';

import { IAddress } from '../types/address';

interface AddressModalItemProps {
  address: IAddress;
  isSelected?: boolean;
  onSelect?: (address: IAddress) => void;
  onEdit?: (address: IAddress) => void;
  onDelete?: (address: IAddress) => void;
}

export default function AddressModalItem({
  address,
  isSelected = false,
  onSelect,
  onEdit,
  onDelete,
}: AddressModalItemProps) {
  // Translation
  const t = useTranslations('address');

  // Variables
  const isInteractive = Boolean(onSelect);

  // Functions
  const handleSelect = () => {
    onSelect?.(address);
  };

  const handleEdit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onEdit?.(address);
  };

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onDelete?.(address);
  };

  return (
    <div
      role={isInteractive ? 'button' : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      aria-pressed={isInteractive ? isSelected : undefined}
      onClick={isInteractive ? handleSelect : undefined}
      className={cn(
        `
          group
          relative
          mx-3
          mt-2
          cursor-pointer
          rounded-xl
          border
          bg-ds-bg-plain
          px-1
          pb-4
          pt-6
          transition-colors
        `,
        `
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-ds-bg-primary
        `,
        isSelected ? 'border-maroon-500' : 'border-ds-border-soft hover:border-maroon-700'
      )}
    >
      {/* Address Title */}
      <div
        className="
          absolute
          -top-3
          left-3
          z-10
          bg-ds-bg-plain
          px-2
          text-lg
          font-semibold
          leading-none
          text-maroon-500
        "
      >
        {address.title}
      </div>

      {/* Main Content */}
      <div className="pr-12">
        {/* City and Phone */}
        <div className="flex items-center justify-between gap-4">
          {/* City */}
          <div className="flex min-w-0 items-center gap-2">
            <MapPin
              aria-hidden="true"
              className="
                h-6
                w-6
                shrink-0
                rounded-full
                bg-emerald-500
                p-1
                text-white
              "
            />

            <span className="truncate text-lg font-medium text-ds-text-default">
              {address.city}
            </span>
          </div>

          {/* Phone */}
          <div
            className="
              flex
              shrink-0
              items-center
              gap-1.5
              text-sm
              text-ds-text-muted
            "
          >
            <Phone aria-hidden="true" className="h-4 w-4" />

            <span dir="ltr">{address.phone}</span>
          </div>
        </div>

        {/* Street */}
        <div
          className="
            mt-2
            inline-flex
            max-w-[85%]
            rounded-full
            bg-ds-bg-muted
            px-3
            py-1
          "
        >
          <span className="truncate text-xs text-ds-text-muted">{address.street}</span>
        </div>
      </div>

      {/* Actions */}
      <div
        className="
          absolute
          -right-3
          top-1/2
          z-10
          flex
          -translate-y-1/2
          flex-col
          gap-2
          bg-ds-bg-plain
          py-1
        "
      >
        {/* Edit */}
        <button
          type="button"
          aria-label={t('edit')}
          onClick={handleEdit}
          className="
            flex
            h-8
            w-8
            cursor-pointer
            items-center
            justify-center
            rounded-full
            border
            border-ds-border-soft
            bg-ds-bg-plain
            text-ds-text-muted
            transition-colors
            hover:bg-ds-bg-muted
            hover:text-ds-text-default
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-ds-bg-primary
          "
        >
          <Pencil aria-hidden="true" className="h-4 w-4" />
        </button>

        {/* Delete */}
        <button
          type="button"
          aria-label={t('delete')}
          onClick={handleDelete}
          className="
            flex
            h-8
            w-8
            cursor-pointer
            items-center
            justify-center
            rounded-full
            bg-maroon-500
            text-white
            transition-colors
            hover:bg-maroon-600
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-maroon-500
          "
        >
          <Trash2 aria-hidden="true" className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
