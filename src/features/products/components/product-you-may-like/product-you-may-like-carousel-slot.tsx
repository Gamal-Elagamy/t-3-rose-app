'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/shared/components/ui/carousel';
import { IProduct } from '../../types/products';
import ProductCard from '../product-card';
import SectionTitle from '@/shared/components/section-title';
import { useTranslations } from 'next-intl';


interface ProductYouMayLikeCarouselSlotProps {
  products: IProduct[];
}

export default function ProductYouMayLikeCarouselSlot({
  products,
}: ProductYouMayLikeCarouselSlotProps) {

    const t = useTranslations('order-summary');

  return (
    <Carousel>

        <div className=" my-10">
        <SectionTitle title={t('product-you-may-like')} />
      </div>
      <CarouselContent>
        {products.map((product) => (
          <CarouselItem
            key={product.id}
            className="basis-full md:basis-1/4"
          >
            <ProductCard {...product} />
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}