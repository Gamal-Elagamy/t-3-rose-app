import { Card, CardContent } from "@/shared/components/ui/card";
import { ReactNode } from "react";

interface OrderSummaryProps {
  title?: string;

  couponForm: ReactNode;
  couponList?: ReactNode;

  subtotal?: ReactNode;
  totalPrice: ReactNode;

  summaryItems?: ReactNode;
  checkoutButton?: ReactNode;

  className?: string;
}

export function OrderSummary({
  title = "Summary",
  couponForm,
  couponList,
  subtotal,
  summaryItems,
  totalPrice,
  checkoutButton,
  className,
}: OrderSummaryProps) {
  return (
    <div className="flex items-center justify-center px-4 py-6 sm:px-6 lg:px-8">
      <Card className={`w-full max-w-md ${className ?? ""}`}>
        <CardContent className="space-y-4 p-4 sm:p-6">
          <h2 className="text-2xl font-bold">
            {title}
          </h2>

          <div className="space-y-3 rounded-sm bg-zinc-50 p-4">
            {couponForm}

            {couponList}

            {summaryItems}

            {subtotal}

            {totalPrice}
          </div>

          {checkoutButton}
        </CardContent>
      </Card>
    </div>
  );
}