'use client';
import { Button } from '@/shared/components/ui/button';
import { useCheckoutStepper } from '@/features/checkout/components/checkout-stepper';
import { MoveRight } from 'lucide-react';

export default function AddressNextStepButton({
  selectedAddressId,
}: {
  selectedAddressId: string | undefined;
}) {
  const { goToNextStep } = useCheckoutStepper();

  return (
    <div className="flex justify-end">
      <Button
        onClick={goToNextStep}
        disabled={!selectedAddressId}
        className="bg-ds-bg-primary text-ds-text-inverse hover:bg-ds-bg-primary-saturated"
      >
        Next <MoveRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
}
