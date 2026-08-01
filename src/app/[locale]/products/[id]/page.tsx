import ProductReviews from '@/features/product-page/components/product-reviews/product-reviews';
import RelatedProducts from '@/features/product-page/components/related-products/related-products';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  return (
    <div>
      <ProductReviews productId={id} />
      <RelatedProducts productId={id} />
    </div>
  );
}
