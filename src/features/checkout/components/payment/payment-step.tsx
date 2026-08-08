'use client';

import { ArrowRight, Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';


import { useCheckoutStepper } from '@/features/checkout/components/checkout-stepper';
import { useCheckout } from '../../context/checkout-context';
import { cn } from '@/shared/lib/utils/tailwind-cn';
import cashIcon from '@/assets/icons/cash.svg';
import creditIcon from '@/assets/icons/credit.svg';
import Image from 'next/image';
import { useCheckoutMutation, usePostPaymentIntentMutation } from '../../hooks/checkout.hook';
import { useTransition } from 'react';
import { PaymentMethod } from '../../types/checkout';
import { toast } from 'sonner';



const paymentMethods :{ id: PaymentMethod, image: string, }[] = [
  {
    id: 'CASH_ON_DELIVERY',
    image: cashIcon,
  },
  {
    id: 'CREDIT_CARD',
    image: creditIcon,
  },
] as const;

export function PaymentStep() {
  //  Translations
  const t = useTranslations('checkout.paymentMethod');
  // States
  const [isPending, startTransition] = useTransition();

  // Mutation
  const { mutateAsync: checkout } = useCheckoutMutation();
  const { mutateAsync: postPaymentIntent } = usePostPaymentIntentMutation();

  // Checkout stepper
  const { goToPreviousStep, isLastStep } = useCheckoutStepper();

  // Checkout context
  const {
    checkout: { paymentMethod , addressId ,couponCode },
    updateCheckout,
  } = useCheckout();

  console.log({paymentMethod})
  // Handle checkout
  function handleCheckout() {
    startTransition(async() => {
      const dataCheckout = await checkout({
        addressId,
        couponCode,
        paymentMethod
      })

      if (!dataCheckout.status) {
        toast.error(dataCheckout.message || "Payment intent failed")
        return
      }
      if (dataCheckout.payload?.order.paymentMethod === "CREDIT_CARD") {
        const dataPostPaymentIntent = await postPaymentIntent(
          dataCheckout.payload?.order.id 
        )
        if (!dataPostPaymentIntent.status) {
          toast.error(dataPostPaymentIntent.message || "Payment intent failed")
          return
        }
        toast.success("Payment intent created successfully")
        // goToPreviousStep()
      }
    })

  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
          <button
          type="button"
          onClick={goToPreviousStep}
          className="rounded-xl flex items-center px-3 py-1.5 hover:bg-zinc-200 bg-zinc-100 dark:bg-zinc-700 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-50 cursor-pointer"
        >
          <ArrowRight size={16} className="me-2 ltr:rotate-180" />
          {t('back')}
        </button>
        <h2 className="text-2xl font-semibold">{t('title')}</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {paymentMethods.map((method) => {
          const imageSrc = method.image;
          const isSelected = paymentMethod === method.id;

          return (
            <button
              key={method.id}
              type="button"
              onClick={() =>
                updateCheckout({ paymentMethod: method.id })
              }
              className={cn(
                'rounded-xl border border-zinc-200 dark:border-zinc-700 p-8 text-center transition-all',
                'hover:border-primary hover:shadow-md flex flex-col items-center justify-center cursor-pointer',
                isSelected
                  ? 'bg-zinc-50 dark:bg-zinc-800'
                  : ''
              )}
            >
              <Image src={imageSrc} height={250} width={200} alt={method.id} />
              <h3 className={cn('text-2xl font-semibold', isSelected && 'text-maroon-600 dark:text-ds-bg-primary')}>
                {method.id === 'CASH_ON_DELIVERY'
                  ? t('cashOnDelivery')
                  : t('creditCard')}
              </h3>

              <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                {method.id === 'CASH_ON_DELIVERY'
                  ? t('cashOnDeliveryDescription')
                  : t('creditCardDescription')}
              </p>
            </button>
          );
        })}
      </div>

      <div className="flex justify-end">
        {isLastStep && (
          <button
            type="button"
            disabled={!paymentMethod || isPending}
            onClick={handleCheckout}
            className="rounded-lg bg-maroon-600 dark:bg-soft-pink-300 text-white dark:text-zinc-700 flex items-center gap-1.5 px-6 py-2.5 transition disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
          >
            {isPending && <Loader2 className='animate-spin transition-all' />}
            {t('checkout')}
            <ArrowRight size={16} className="ms-2 rtl:rotate-180" />
          </button>
        )}
      </div>
    </div>
  );
}