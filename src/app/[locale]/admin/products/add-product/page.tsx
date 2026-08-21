import AddProductForm from '@/features/products/components/dashboard/add-product-form';

export default function AddProductPage() {
  return (
    <>
      <div className="p-7 ">
        {/* Add Product Form Title */}
        <h1 className="text-2xl font-bold text-ds-text-plain">Add a New Product</h1>

        {/* Add Product Form */}
        <div className="my-6 p-6 bg-ds-bg-plain rounded-3xl">
          <AddProductForm />
        </div>
      </div>
    </>
  );
}
