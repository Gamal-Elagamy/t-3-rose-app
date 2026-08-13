import { CheckoutButton } from "@/features/cart/order-summary/components/checkout-button";
import { CouponSection } from "@/features/cart/order-summary/components/coupon-section";
import { OrderSummary } from "@/features/cart/order-summary/components/order-summary";
import { SubTotalPrice } from "@/features/cart/order-summary/components/subtotal-price";
import { TotalPrice } from "@/features/cart/order-summary/components/total-price";

import { CouponProvider } from "@/features/cart/order-summary/context/coupon-context";
import ProductYouMayLikeSection from "@/features/products/components/product-you-may-like/product-you-may-like-section";
import { IProductId } from "@/features/products/components/product/product-reviews/product-reviews";
import { IProduct } from "@/features/products/types/products";



interface CartLayoutProps {
  children: React.ReactNode;
  product: IProduct
}



export default function CartLayout({ children , product }: CartLayoutProps ) {
  return (
    <>
      <div className="grid h-screen grid-cols-3 gap-4">
        <section className="col-span-2">{children}</section>

         <CouponProvider>
       
    <section className="col-span-1">
    
          <OrderSummary
            couponForm={<CouponSection />}
            totalPrice={<TotalPrice currency="EGP" />}
            subtotal={<SubTotalPrice currency="EGP" />}
            checkoutButton={<CheckoutButton />}
          />
        </section>
      
        </CouponProvider>
        

      
      </div>

      <div className=" ">
       <ProductYouMayLikeSection product={product} />
      </div>
    </>
  );
}
