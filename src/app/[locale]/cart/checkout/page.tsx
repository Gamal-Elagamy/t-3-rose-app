import {
  CheckoutStepper,
  CheckoutStep,
  ShippingStep,
  PaymentStep,
  type StepConfig,
} from '@/features/checkout/components';
import { CheckoutProvider } from '@/features/checkout/providers/checkout-provider';

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
      <CheckoutProvider>
        <CheckoutStepper steps={steps} defaultValue={2}>
          {/* Address */}
          <CheckoutStep value={1}>
            <ShippingStep locale={locale} />
          </CheckoutStep>

          {/* Payment */}
          <CheckoutStep value={2}>
            <PaymentStep />
          </CheckoutStep>
        </CheckoutStepper>
      </CheckoutProvider>
    </div>
  );
}
