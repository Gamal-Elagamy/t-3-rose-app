import { useTranslations } from 'next-intl';
import ProductCard from '@/features/products/components/product-card';
import { IProduct } from '@/features/products/types/products';

interface MostPopularProductsGridProps {
  products: IProduct[];
}

export default function MostPopularProductsGrid({ products }: MostPopularProductsGridProps) {
  const t = useTranslations('home');

  if (products.length === 0) {
    return <p className="text-ds-text-muted text-base">{t('noProductsForOccasion')}</p>;
  }

  return (
    <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
}
