import { CheckoutButton } from '@/features/cart/order-summary/components/checkout-button';
import { CouponSection } from '@/features/cart/order-summary/components/coupon-section';
import { OrderSummary } from '@/features/cart/order-summary/components/order-summary';
import { SubTotalPrice } from '@/features/cart/order-summary/components/subtotal-price';
import { TotalPrice } from '@/features/cart/order-summary/components/total-price';
import { CouponProvider } from '@/features/cart/order-summary/context/coupon-context';
import { CheckoutProvider } from '@/features/checkout/providers/checkout-provider';
import { getYouMayLikeProducts } from '@/features/products/apis/product-you-may-like.api';
import ProductYouMayLikeCarouselSlot from '@/features/products/components/product-you-may-like/product-you-may-like-carousel-slot';

interface CartLayoutProps {
  children: React.ReactNode;
}

export default async function CartLayout({ children }: CartLayoutProps) {
  const products = await getYouMayLikeProducts();
  return (
    <CheckoutProvider>
      <div className="flex flex-col lg:grid lg:grid-cols-3 gap-4 lg:gap-8 min-h-[calc(100vh-200px)] px-4 md:px-8 pt-8">
        <section className="lg:col-span-2">{children}</section>

        <CouponProvider>
          <section aria-label="Order summary" className="lg:col-span-1">
              <OrderSummary
                couponForm={<CouponSection />}
                totalPrice={<TotalPrice currency="EGP" />}
                subtotal={<SubTotalPrice currency="EGP" />}
                checkoutButton={<CheckoutButton />}
              />
            </section>
          </CouponProvider>
        </div>

        {/* Product You May Like */}
        <section className="mx-4 my-10 sm:mx-6 lg:mx-10 lg:my-20">
          <ProductYouMayLikeCarouselSlot products={products} />
        </section>
      </CheckoutProvider>

  );
}
