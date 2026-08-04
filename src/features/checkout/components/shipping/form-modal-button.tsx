'use client';
import { Button } from '@/shared/components/ui/button';

export default function AddressFormModalButton() {
  return (
    <Button
      variant="outline"
      className="w-full border-none mb-6 bg-ds-bg-primary-fade text-ds-text-primary"
    >
      Add a New Address
    </Button>
  );
}
