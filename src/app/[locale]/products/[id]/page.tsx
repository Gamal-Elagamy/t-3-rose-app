import ProductReviews from '@/features/product-page/components/product-reviews/product-reviews';
import RelatedProducts from '@/features/product-page/components/related-products/related-products';

export default async function ProductPage({ params }: PageProps<'/[locale]/products/[id]'>) {
  const { id } = await params;
  return (
    <div>
      <ProductReviews productId={id} />
      <RelatedProducts productId={id} />
    </div>
  );
}
