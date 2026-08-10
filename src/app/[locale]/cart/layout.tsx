import { CheckoutButton } from "@/features/cart/order-summary/components/checkout-button";
import { CouponSection } from "@/features/cart/order-summary/components/coupon-section";
import { OrderSummary } from "@/features/cart/order-summary/components/order-summary";
import { SubtotalPrice } from "@/features/cart/order-summary/components/subtotal-price";
import { TotalPrice } from "@/features/cart/order-summary/components/total-price";



interface CartLayoutProps {
  children: React.ReactNode;
}

export default function CartLayout({ children }: CartLayoutProps) {
  return (
    <>
      <div className="grid h-screen grid-cols-3 gap-4">
        <section className="col-span-2">{children}</section>

        <section className="col-span-1">
          <OrderSummary
            couponForm={<CouponSection />}
            subtotal={<SubtotalPrice currency="EGP" />}
            totalPrice={<TotalPrice currency="EGP" />}
            checkoutButton={<CheckoutButton />}
          />
        </section>
      </div>

      <div className="h-56 bg-yellow-200">Products</div>
    </>
  );
}
