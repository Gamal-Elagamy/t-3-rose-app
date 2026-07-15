import { Badge } from '@/shared/components/ui/badge';
import { Star } from 'lucide-react';
import Image from 'next/image';
import { IProduct } from '../types/products';
import AddToCart from './add-to-cart';
import AddToWishlist from './add-to-wishlist';

export default function ProductCard({
  title,
  rating,
  price,
  discountType,
  discountValue,
  cover,
  stock,
}: IProduct) {
  const totalStars = 5;
  const filledStars = Math.round((rating / 5) * totalStars);

  const currentPrice = Number(price);

  const originalPrice =
    discountType === 'PERCENT'
      ? currentPrice / (1 - Number(discountValue) / 100)
      : currentPrice + Number(discountValue);

  const formatPrice = (value: number) => `${value.toFixed(2)} EGP`;

  return (
    <>
      <div className="relative h-[300px] w-full rounded-2xl overflow-hidden">
        {/* product image */}
        <Image
          src={cover}
          alt={title}
          fill
          loading="eager"
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* out of stock badge */}
        {stock !== 0 && <Badge className="absolute top-2 right-2">Out of Stock</Badge>}

        {/* add to wishlist */}
        <AddToWishlist />
      </div>

      {/* title */}
      <h4 className="line-clamp-2 text-lg font-semibold text-ds-text-primary my-3">{title}</h4>

      <div className="flex justify-between items-end">
        <div>
          {/* rating */}
          <div className="flex items-center gap-1">
            {Array.from({ length: totalStars }).map((_, index) => (
              <Star
                key={index}
                size={18}
                className={
                  index < filledStars
                    ? 'fill-yellow-500 text-yellow-500'
                    : 'fill-transparent text-yellow-500'
                }
              />
            ))}
          </div>

          {/* price */}
          <div className="flex items-center gap-2.5">
            <span className="text-base text-ds-text-primary">{formatPrice(currentPrice)}</span>

            <span className="text-base text-zinc-400 line-through">
              {formatPrice(originalPrice)}
            </span>
          </div>
        </div>

        {/* add to cart */}
        <AddToCart />
      </div>
    </>
  );
}
