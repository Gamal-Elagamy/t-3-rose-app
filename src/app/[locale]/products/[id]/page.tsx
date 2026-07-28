import ProductReviewUser from '@/features/product-page/components/product-reviews/product-review-user';
import ProductReviews from '@/features/product-page/components/product-reviews/product-reviews';
import RelatedProducts from '@/features/product-page/components/related-products/related-products';

export default async function Product({ params }: PageProps<'/[locale]/products/[id]'>) {
  const { id } = await params;
  return (
    <div>
      Product
      <ProductReviews productId={id} />
      <ProductReviewUser productId={id} />
      <RelatedProducts productId={id} />
    </div>
  );
}
