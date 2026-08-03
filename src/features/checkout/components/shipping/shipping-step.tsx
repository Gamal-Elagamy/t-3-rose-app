'use client';

import { MoveRight } from 'lucide-react';
import { useCheckoutStepper } from '@/features/checkout/components/checkout-stepper';
import { Button } from '@/shared/components/ui/button';

export function ShippingStep() {
  const { goToNextStep } = useCheckoutStepper();

  return (
    <div className="py-6">
      <h2 className="text-2xl font-bold mb-4">Shipping Address</h2>
      <p>Enter your shipping details here.</p>
      <Button onClick={goToNextStep}>
        Next <MoveRight />
      </Button>
    </div>
  );
}
