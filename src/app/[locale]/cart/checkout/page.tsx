import {
  CheckoutStepper,
  CheckoutStep,
  ShippingStep,
  PaymentStep,
  type StepConfig,
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

export default async function CheckoutPage({ params }: { params: { locale: 'en' | 'ar' } }) {
  const locale = params.locale;

  return (
    <div className="px-4 py-8 sm:px-6 sm:py-10 md:px-10 md:py-12 lg:px-20 lg:py-15">
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
