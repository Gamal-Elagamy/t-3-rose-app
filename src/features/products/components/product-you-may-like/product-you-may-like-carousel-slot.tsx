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

interface ProductYouMayLikeCarouselProps {
  products: IProduct[];
}

export default function ProductYouMayLikeCarousel({
  products,
}: ProductYouMayLikeCarouselProps) {
  return (
    <section>

      <Carousel>
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
    </section>
  );
}