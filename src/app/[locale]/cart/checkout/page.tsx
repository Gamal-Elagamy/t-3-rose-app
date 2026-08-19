import {
  CheckoutStepper,
  CheckoutStep,
  ShippingStep,
  type StepConfig,
  PaymentStep,
} from '@/features/checkout/components';

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

export default async function CheckoutPage({ params }: { params: Promise<{ locale: 'en' | 'ar' }> }) {
  const { locale } = await params;

  return (
    <div className="px-20 py-15">
      <CheckoutStepper steps={steps} defaultValue={1}>
        {/* Address */}
        <CheckoutStep value={1}>
          <ShippingStep locale={locale} />
        </CheckoutStep>

        {/* Payment */}
        <CheckoutStep value={2}>
          <PaymentStep />
        </CheckoutStep>
      </CheckoutStepper>
    </div>
  );
}
