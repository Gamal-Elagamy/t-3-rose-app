'use client';

import { MapPin, Pencil, Phone, Trash2 } from 'lucide-react';

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
  return (
    <div
      onClick={() => onSelect?.(address)}
      className={`
        group
        relative
        cursor-pointer
        rounded-xl
        border
        bg-white
        mt-2
        mx-3
        px-1
        pb-4
        pt-6
        transition-colors
        ${isSelected ? 'border-maroon-500' : 'border-gray-300 hover:border-maroon-700'}
      `}
    >
      {/* Address title */}
      <div
        className="
          absolute
          -top-3
          left-3
          z-10
          bg-white
          px-2
          text-lg
          font-semibold
          leading-none
          text-maroon-700
        "
      >
        {address.title}
      </div>

      {/* Main content */}
      <div className="pr-12">
        {/* City + Phone */}
        <div className="flex items-center justify-between gap-4">
          {/* City */}
          <div className="flex min-w-0 items-center gap-2">
            <MapPin
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

            <span className="truncate text-lg font-medium text-gray-800">{address.city}</span>
          </div>

          {/* Phone */}
          <div className="flex shrink-0 items-center gap-1.5 text-sm text-gray-600">
            <Phone className="h-4 w-4" />

            <span dir="ltr">{address.phone}</span>
          </div>
        </div>

        {/* Street / Address */}
        <div className="mt-2 inline-flex max-w-[85%] rounded-full bg-gray-100 px-3 py-1">
          <span className="truncate text-xs text-gray-700">{address.street}</span>
        </div>
      </div>

      {/* Actions - same idea as Address title */}
      <div
        className="
         cursor-pointer
          absolute
          -right-3
          top-1/2
          z-10
          flex
          -translate-y-1/2
          flex-col
          gap-2
          bg-white
          py-1
        "
      >
        {/* Edit */}
        <button
          type="button"
          aria-label="Edit address"
          onClick={(event) => {
            event.stopPropagation();
            onEdit?.(address);
          }}
          className="
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-full
            border
            border-gray-300
            bg-white
            text-gray-600
            transition-colors
           cursor-pointer

          "
        >
          <Pencil className="h-4 w-4" />
        </button>

        {/* Delete */}
        <button
          type="button"
          aria-label="Delete address"
          onClick={(event) => {
            event.stopPropagation();
            onDelete?.(address);
          }}
          className="
           cursor-pointer
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-full
            bg-maroon-500
            text-white
            transition-colors
          "
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
