import { CheckoutButton } from '@/features/cart/order-summary/components/checkout-button';
import { CouponForm } from '@/features/cart/order-summary/components/coupon-form';
import { CouponList } from '@/features/cart/order-summary/components/coupon-list';
import { OrderSummary } from '@/features/cart/order-summary/components/order-summary';
import { SubtotalPrice } from '@/features/cart/order-summary/components/subtotal-price';
import { TotalPrice } from '@/features/cart/order-summary/components/total-price';
import { ICoupon } from '@/features/cart/order-summary/types/copons';
import ProductYouMayLike from '@/features/products/components/product-you-may-like/product-you-may-like';
import BestSellerCarouselSkeleton from '@/features/products/skeletons/best-seller-carousel.skeleton';
import ProductsErrorBoundary from '@/shared/components/error-boundary';
import { Suspense } from 'react';

export default function CartLayout({ children }: { children: React.ReactNode }, coupons: ICoupon[]) {
  return (
    <>
      <div className="grid grid-cols-3 gap-4 h-screen">
        {/* Cart - Checkout */}
        <section className="col-span-2">{children}</section>

        {/* Order Summary */}
        <section className="col-span-1 ">
                    <ProductsErrorBoundary>
            <Suspense fallback={<BestSellerCarouselSkeleton />}>
              <OrderSummary
                couponForm={<CouponForm />}
                couponList={<CouponList coupons={coupons} />}
                subtotal={<SubtotalPrice subtotal={225} currency="EGP" />}
                totalPrice={<TotalPrice total={225} currency="EGP" />}
                checkoutButton={<CheckoutButton />}
              />
            </Suspense>
          </ProductsErrorBoundary>
        </section>
      </div>

      {/* Products You Might Like */}
      <div className="h-56 bg-yellow-200">Products</div>
    </>
  );
}
