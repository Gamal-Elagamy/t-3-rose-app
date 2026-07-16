import Link from 'next/link';
import { Badge } from '@/shared/components/ui/badge';
import { Star } from 'lucide-react';
import Image from 'next/image';
import { IProduct } from '../types/products';
import AddToCart from './add-to-cart';
import AddToWishlist from './add-to-wishlist';
import { calculateOriginalPrice, formatPrice } from '@/shared/lib/utils/price.utils';
import { useTranslations } from 'next-intl';

export default function ProductCard({
  id,
  title,
  rating,
  price,
  discountType,
  discountValue,
  cover,
  stock,
  createdAt,
}: IProduct) {
  const t = useTranslations('product');
  const totalStars = 5;
  const filledStars = Math.round((rating / 5) * totalStars);

  const currentPrice = Number(price);
  const originalPrice = calculateOriginalPrice(
    currentPrice,
    discountType as 'PERCENT' | 'FIXED',
    Number(discountValue)
  );

  // Check if product is new (created within last week)
  const isNew = () => {
    if (!createdAt) return false;
    const createdDate = new Date(createdAt);
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    return createdDate >= weekAgo;
  };

  // Check if product is hot (discount > 25%)
  const isHot = () => {
    if (discountType === 'PERCENT' && discountValue) {
      return Number(discountValue) > 25;
    }
    return false;
  };

  return (
    <Link href={`/products/${id}`}>
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

        {/* badges */}
        <div className="absolute top-2 right-2 flex gap-1.5">
          {stock === 0 && <Badge>{t('outOfStock')}</Badge>}
          {isNew() && <Badge className="bg-white text-zinc-700 hover:bg-white">{t('new')}</Badge>}
          {isHot() && (
            <Badge className="bg-maroon-50 text-maroon-600 hover:bg-maroon-50">{t('hot')}</Badge>
          )}
        </div>

        {/* add to wishlist */}
        <AddToWishlist />
      </div>

      {/* title */}
      <h4 className="line-clamp-1 text-lg font-semibold text-ds-text-primary my-3">{title}</h4>

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
          <div className="flex items-center gap-2.5 mt-3">
            <span className="text-base text-ds-text-primary">{formatPrice(currentPrice)}</span>

            <span className="text-base text-zinc-400 line-through">
              {formatPrice(originalPrice)}
            </span>
          </div>
        </div>

        {/* add to cart */}
        <AddToCart />
      </div>
    </Link>
  );
}
