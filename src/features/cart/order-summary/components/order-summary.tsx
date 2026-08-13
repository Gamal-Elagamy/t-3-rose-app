import { Card, CardContent } from "@/shared/components/ui/card";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
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
  totalPrice,
  subtotal,
  summaryItems,
  checkoutButton,
  className,
}: OrderSummaryProps) {

    const t = useTranslations("order-summary");
  


  return (
    <div className="flex items-center justify-center sm:px-6 lg:px-8 ">
      <Card className={`w-full max-w-md ${className ?? ""}`}>
        <CardContent className="space-y-4 p-4 sm:p-6">
          <h2 className="text-2xl font-bold">
            <h1>{t("title" , {title})}</h1>
          </h2>

          <div className="space-y-3 rounded-sm bg-zinc-50 p-4 dark:bg-zinc-800">
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