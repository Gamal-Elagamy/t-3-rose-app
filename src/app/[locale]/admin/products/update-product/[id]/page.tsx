import ProductForm from '@/features/products/components/dashboard/product-form';
import { getProduct } from '@/features/products/apis/products.api';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

interface UpdateProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function UpdateProductPage({ params }: UpdateProductPageProps) {
  // Params
  const { id } = await params;

  // Variables
  let product;
  try {
    product = await getProduct(id);
  } catch {
    notFound();
  }

  const t = await getTranslations('dashboard.products');

  return (
    <div className="p-7">
      {/* Title */}
      <h1 className="text-2xl font-bold text-ds-text-plain line-clamp-1">
        {t('updateProductPageTitle', { title: product.title })}
      </h1>

      {/* Form */}
      <div className="my-6 rounded-3xl bg-ds-bg-plain p-6">
        <ProductForm mode="update" product={product} productId={id} />
      </div>
    </div>
  );
}
