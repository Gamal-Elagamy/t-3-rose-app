export default function CartLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="grid h-screen grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Cart - Checkout */}
        <section className="lg:col-span-2">{children}</section>

        {/* Order Summary */}
        <section className="bg-blue-600 lg:col-span-1"></section>
      </div>

      {/* Products You Might Like */}
      <div className="h-56 bg-yellow-200">Products</div>
    </>
  );
}
