import ProductCardSkeleton from './product-card.skeleton';

export default function BestSellerCarouselSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <ProductCardSkeleton i={i} key={i} />
      ))}
    </div>
  );
}
