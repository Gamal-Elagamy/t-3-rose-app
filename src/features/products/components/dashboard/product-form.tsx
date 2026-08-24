'use client';

import { useState } from 'react';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Field, FieldLabel, FieldError, FieldGroup } from '@/shared/components/ui/field';
import { FormProvider, useProductForm } from '../../hooks/use-product-form.hook';
import { Controller, useFormContext } from 'react-hook-form';
import { Textarea } from '@/shared/components/ui/textarea';
import PriceInputs from './price-inputs';
import { ControlledCombobox } from './controlled-combobox';
import { useCategoriesQuery } from '@/features/categories/hooks/categories.hook';
import { useOccasionsQuery } from '@/features/occasions/hooks/occasions.hook';
import { IProduct, ProductFormData } from '../../types/products';
import ProductMediaUpload from './product-media-upload';
import UpdateProductMediaLinks from './update-product-media-links';

interface ProductFormProps {
  mode: 'create' | 'update';
  product?: IProduct;
  productId?: string;
}

function ProductFormFields({ mode, product }: { mode: 'create' | 'update'; product?: IProduct }) {
  // Hooks
  const { control } = useFormContext<ProductFormData>();
  // Variable
  const isUpdate = mode === 'update';

  // State
  const [categorySearch, setCategorySearch] = useState('');
  const [occasionSearch, setOccasionSearch] = useState('');

  // Data
  const { data: categories = [], isLoading: categoriesLoading } =
    useCategoriesQuery(categorySearch);
  const { data: occasions = [], isLoading: occasionsLoading } = useOccasionsQuery(occasionSearch);

  return (
    <div className="space-y-4.5">
      {/* Title */}
      <FieldGroup>
        <Controller
          name="title"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="title">
                Title <span className="text-ds-text-danger">*</span>
              </FieldLabel>
              <Input
                {...field}
                id="title"
                aria-invalid={fieldState.invalid}
                type="text"
                placeholder="Enter product title"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      {/* Description */}
      <FieldGroup>
        <Controller
          name="description"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="description">
                Description <span className="text-ds-text-danger">*</span>
              </FieldLabel>
              <Textarea
                {...field}
                id="description"
                aria-invalid={fieldState.invalid}
                placeholder="Enter product description"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      {/* Price */}
      <PriceInputs />

      {/* Stock */}
      <FieldGroup>
        <Controller
          name="stock"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="stock">
                Quantity <span className="text-ds-text-danger">*</span>
              </FieldLabel>
              <Input
                {...field}
                id="stock"
                aria-invalid={fieldState.invalid}
                type="number"
                min={0}
                placeholder="Example: 200"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      {/* Media Uploads */}
      {!isUpdate && <ProductMediaUpload control={control} />}

      {/* Category */}
      <ControlledCombobox
        name="categoryId"
        control={control}
        label="Category"
        required
        data={categories}
        product={product}
        onSearchChange={setCategorySearch}
        loading={categoriesLoading}
        fallbackOption={(selectedValue, product) => {
          if (selectedValue && product?.category && product.category.id === selectedValue) {
            return { value: product.category.id, label: product.category.title };
          }
          return null;
        }}
      />

      {/* Occasion */}
      <ControlledCombobox
        name="occasionId"
        control={control}
        label="Occasion"
        required
        data={occasions}
        product={product}
        onSearchChange={setOccasionSearch}
        loading={occasionsLoading}
        fallbackOption={(selectedValue, product) => {
          const selectedOccasion =
            product?.occasions?.find((occasion) => occasion.id === selectedValue) ??
            product?.occasions?.[0];
          if (selectedValue && selectedOccasion) {
            return { value: selectedOccasion.id, label: selectedOccasion.title };
          }
          return null;
        }}
      />

      {/* Update Media Links */}
      {isUpdate && <UpdateProductMediaLinks control={control} />}
    </div>
  );
}

export default function ProductForm({ mode, product, productId }: ProductFormProps) {
  // Hooks
  const { productForm, onSubmit, isUpdate } = useProductForm({ mode, product, productId });

  // Variable
  const isSubmitting = productForm.formState.isSubmitting;
  const isValid = productForm.formState.isValid;

  return (
    <FormProvider {...productForm}>
      {/* Form */}
      <form onSubmit={productForm.handleSubmit(onSubmit)} className="space-y-30 md:w-3/4">
        <ProductFormFields mode={mode} product={product} />

        {/* Submit Button */}
        <Button
          type="submit"
          isLoading={isSubmitting}
          disabled={!isValid || isSubmitting}
          className="w-full"
        >
          {isUpdate ? 'Update Product' : 'Add Product'}
        </Button>
      </form>
    </FormProvider>
  );
}
