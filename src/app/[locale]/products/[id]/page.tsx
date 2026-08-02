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
}
