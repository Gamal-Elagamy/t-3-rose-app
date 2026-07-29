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
}

export default function BestSellerCarousel({ products }: BestSellerCarouselProps) {
  return (
    <Carousel>
      <CarouselContent>
        {products.map((product) => (
          <CarouselItem
            key={product.id}
            className="basis-1/1 sm:basis-1/2 md:basis-1/2 lg:basis-1/3"
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
