import { getProduct } from '@/features/products/apis/products.api';
import ProductImageGallery from '@/features/products/components/product-image-gallery';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function Product({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProduct(id);

  return (
    <div className="max-w-11/12 mx-auto px-4 py-8">
      {/* Product gallary & info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-17.5">
        <ProductImageGallery product={product} />
      </div>
    </div>
  );
}
