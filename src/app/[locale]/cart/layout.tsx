import { CheckoutProvider } from "@/features/checkout/providers/checkout-provider";

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="grid grid-cols-3 gap-4 h-screen">
        {/* Cart - Checkout */}
        <section className="col-span-2">
          <CheckoutProvider>
            {children}
          </CheckoutProvider>
        </section>

        {/* Order Summary */}
        <section className="col-span-1 bg-blue-600 "></section>
      </div>

      {/* Products You Might Like */}
      <div className="h-56 bg-yellow-200">Products</div>
    </>
  );
}
