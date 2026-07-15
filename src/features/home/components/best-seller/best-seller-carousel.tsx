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
          <CarouselItem key={product.id} className="basis-2/3 md:basis-1/3">
            <ProductCard {...product} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
