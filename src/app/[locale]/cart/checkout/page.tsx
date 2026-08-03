import {
  CheckoutStepper,
  CheckoutStep,
  ShippingStep,
  PaymentStep,
  type StepConfig,
} from '@/features/cart/components';

export default function CheckoutPage() {
  const steps: StepConfig[] = [
    {
      step: 1,
      title: 'Shipping',
    },
    {
      step: 2,
      title: 'Payment',
    },
  ];

  return (
    <div className="px-20 py-15">
      <CheckoutStepper steps={steps} defaultValue={1}>
        {/* Address */}
        <CheckoutStep value={1}>
          <ShippingStep />
        </CheckoutStep>

        {/* Payment */}
        <CheckoutStep value={2}>
          <PaymentStep />
        </CheckoutStep>
      </CheckoutStepper>
    </div>
  );
}
