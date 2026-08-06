import React, { Suspense } from 'react';
import { CheckoutButton } from '@/features/cart/order-summary/components/checkout-button';
import { CouponForm } from '@/features/cart/order-summary/components/coupon-form';
import { CouponList } from '@/features/cart/order-summary/components/coupon-list';
import { OrderSummary } from '@/features/cart/order-summary/components/order-summary';
import { SubtotalPrice } from '@/features/cart/order-summary/components/subtotal-price';
import { TotalPrice } from '@/features/cart/order-summary/components/total-price';
import ProductYouMayLike from '@/features/products/components/product-you-may-like/product-you-may-like';
import BestSellerCarouselSkeleton from '@/features/products/skeletons/best-seller-carousel.skeleton';
import ProductsErrorBoundary from '@/shared/components/error-boundary';

interface LayoutProps {
    children: React.ReactNode;
}

export default function layout({ children }: { children: React.ReactNode }, coupons: any) {




  return ( 
    <div>
      <div className="grid grid-cols-3 gap-4 h-screen">
        <section className="col-span-2 ">{children}</section>
        <section className="col-span-1  ">
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
      <div className="h-56 m-15">
        <ProductYouMayLike />
      </div>
    </div>
  );
}
