import ProductForm from '@/features/products/components/dashboard/product-form';

export default function AddProductPage() {
  return (
    <div className="p-7">
      {/* Title */}
      <h1 className="text-2xl font-bold text-ds-text-plain">Add a New Product</h1>

      {/* Form */}
      <div className="my-6 rounded-3xl bg-ds-bg-plain p-6">
        <ProductForm mode="create" />
      </div>
    </div>
  );
}
