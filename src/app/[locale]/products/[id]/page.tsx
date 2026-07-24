<<<<<<< HEAD
import ProductReviews from '@/features/product-page/components/product-reviews/product-reviews';
import RelatedProducts from '@/features/product-page/components/related-products/related-products';

export default async function Product({ params }: PageProps<'/[locale]/products/[id]'>) {
  const { id } = await params;
  return (
    <div>
      Product
      <ProductReviews productId={id} />
      <RelatedProducts productId={id} />
    </div>
  );
=======
import { getProduct } from '@/features/products/apis/products.api';
import Product from '@/features/products/components/product/product';
import { notFound } from 'next/navigation';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;

  const product = await getProduct(id).catch(() => {
    notFound();
  });

  return <Product product={product} />;
>>>>>>> 74cb294f3e29c7d56305bc056f6623f3ffd49f61
}
