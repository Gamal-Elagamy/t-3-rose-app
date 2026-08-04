import { authOptions } from '@/auth';
import {
  CheckoutStepper,
  CheckoutStep,
  ShippingStep,
  PaymentStep,
  type StepConfig,
} from '@/features/checkout/components';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

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

export default async function CheckoutPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

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
