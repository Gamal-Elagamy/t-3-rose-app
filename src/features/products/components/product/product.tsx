import ProductImageGallery from './product-image-gallery';
import ProductInfo from './product-info';
import { IProduct } from '../../types/products';
import ProductReviews from '@/features/products/components/product/product-reviews/product-reviews';
import RelatedProducts from '@/features/products/components/product/related-products/related-products';

interface ProductProps {
  product: IProduct;
}

export default function Product({ product }: ProductProps) {
  return (
    <div className="max-w-11/12 mx-auto px-4 py-8">
      {/* Product gallery & info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-17.5">
        <ProductImageGallery product={product} />
        <ProductInfo product={product} />
      </div>

      {/* Product Reviews */}
      <ProductReviews product={product} />

      {/* Related Product */}
      <RelatedProducts product={product} />
    </div>
  );
}
