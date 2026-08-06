import { BestSellerCarouselSlot } from '@/features/home/components/best-seller/best-seller-section';
import SectionTitle from '@/shared/components/section-title';
import { getProducts } from '../../apis/products.api';

export default function ProductYouMayLike() {
  return (
    <div>
      <SectionTitle title={'Product You May Like'} />

      <BestSellerCarouselSlot productsPromise={getProducts({ limit: 10 })} />
    </div>
  );
}
