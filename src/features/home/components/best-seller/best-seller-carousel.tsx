'use client';

import ProductCard from '@/features/products/components/product-card';
import { IProduct } from '@/features/products/types/products';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/shared/components/ui/carousel';

interface BestSellerCarouselProps {
  products: IProduct[];
  itemsPerView?: number;
}

export default function BestSellerCarousel({ products, itemsPerView }: BestSellerCarouselProps) {
  // Related Condition
  const isRelated = itemsPerView === 4;
  return (
    <Carousel>
      <CarouselContent>
        {products.map((product) => (
          <CarouselItem
            key={product.id}
            className={`basis-1/1  ${isRelated ? 'md:basis-1/4' : 'md:basis-1/3'}`}
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
