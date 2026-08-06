'use client';

import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { TicketPercent } from 'lucide-react';
import { useState } from 'react';
import UseApplyCoupon from '../hooks/use-apply-coupon';
import { toast } from 'sonner';



export function CouponForm() {
  const [coupon, setCoupon] = useState('');

  const { mutate, isPending } = UseApplyCoupon();


 const handleApplyCoupon = () => {
  if (!coupon.trim()) {
    toast.error("Please enter coupon code");
    return;
  }

  mutate(coupon.trim());
};

  return (
<div className="grid w-full grid-cols-[1fr_auto] gap-2">
  <Input
    className="w-full"
    placeholder="Coupon Code"
    value={coupon} 
    onChange={(e) => setCoupon(e.target.value)}
  />

  <Button
    className="flex h-full items-center justify-center gap-2"
    disabled={isPending }
    onClick={handleApplyCoupon}
  >
    <TicketPercent className="size-5" />
    Apply Coupon
  </Button>
</div>
  );
}
