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
  variant: 'default' | 'related';
}

export default function BestSellerCarousel({ products, variant }: BestSellerCarouselProps) {
  // Related Condition
  const isRelated = variant === 'related';
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
