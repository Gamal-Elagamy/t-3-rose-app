'use client';

import { useMemo } from 'react';
import { FormProvider, useForm, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from '@/i18n/navigation';
import { toast } from 'sonner';
import { IProduct, ProductFormData } from '../types/products';
import {
  createProductFormSchema,
  updateProductFormSchema,
  DiscountType,
} from '../schemas/product.schema';
import { createProduct, updateProduct } from '../actions/products.action';
import { parseGallery } from '../lib/product-media.utils';

// Utils
function calculateListPrice(
  price: string,
  discountValue: string | undefined,
  discountType: DiscountType
): string {
  const priceAfterDiscount = parseFloat(price) || 0;
  const discount = parseFloat(discountValue ?? '') || 0;

  if (discount <= 0) return price;

  if (discountType === 'PERCENT') {
    if (discount >= 100) return '0';
    return (priceAfterDiscount / (1 - discount / 100)).toFixed(2);
  }

  return (priceAfterDiscount + discount).toFixed(2);
}

function getDefaultValues(product?: IProduct): ProductFormData {
  const discountType = (product?.discountType as ProductFormData['discountType']) ?? 'PERCENT';
  const discountValue = product?.discountValue ?? '';
  const price = product?.price ?? '';
  const listPrice = product ? calculateListPrice(price, discountValue, discountType) : '';

  return {
    title: product?.title ?? '',
    description: product?.description ?? '',
    stock: product?.stock !== undefined ? String(product.stock) : '',
    listPrice,
    price,
    discountType,
    discountValue,
    categoryId: product?.categoryId ?? '',
    cover: product?.cover ?? '',
    gallery: parseGallery(product?.gallery),
    occasionId: product?.occasions?.[0]?.id ?? '',
  };
}

function buildCreateProductPayload(data: ProductFormData) {
  return {
    title: data.title,
    description: data.description,
    stock: parseInt(data.stock, 10),
    price: parseFloat(data.price),
    discountType: data.discountType,
    discountValue: data.discountValue ? parseFloat(data.discountValue) : 0,
    categoryId: data.categoryId,
    // occasionId: data.occasionId,
    cover: data.cover ?? '',
    gallery: data.gallery,
  };
}

function buildUpdateProductPayload(
  data: ProductFormData,
  product: IProduct
): Parameters<typeof updateProduct>[1] {
  const payload: Parameters<typeof updateProduct>[1] = {};
  // const discountValue = data.discountValue ? parseFloat(data.discountValue) : 0;
  const submitPrice = parseFloat(data.price);

  if (data.title !== product.title) payload.title = data.title;
  // if (data.description !== product.description) payload.description = data.description;
  if (parseInt(data.stock, 10) !== product.stock) {
    payload.stock = parseInt(data.stock, 10);
  }
  if (submitPrice !== parseFloat(product.price ?? '0')) {
    payload.price = submitPrice;
  }
  // if (data.discountType !== product.discountType) payload.discountType = data.discountType;
  // if (discountValue !== parseFloat(product.discountValue ?? '0')) {
  //   payload.discountValue = discountValue;
  // }
  // if (data.categoryId !== product.categoryId) payload.categoryId = data.categoryId;

  // const originalOccasionId = product.occasions?.[0]?.id ?? '';
  // if (data.occasionId !== originalOccasionId) {
  //   payload.occasionId = data.occasionId;
  // }

  // if (data.cover && data.cover !== product.cover) {
  //   payload.cover = data.cover;
  // }

  // const originalGallery = parseGallery(product.gallery);
  // if (JSON.stringify(data.gallery) !== JSON.stringify(originalGallery)) {
  //   payload.gallery = data.gallery;
  // }

  return payload;
}

interface UseProductFormOptions {
  mode: 'create' | 'update';
  product?: IProduct;
  productId?: string;
}

export function useProductForm({ mode, product, productId }: UseProductFormOptions) {
  const router = useRouter();
  const isUpdate = mode === 'update';

  const defaultValues = useMemo(() => getDefaultValues(product), [product]);
  const schema = isUpdate ? updateProductFormSchema : createProductFormSchema;

  const productForm = useForm<ProductFormData>({
    resolver: zodResolver(schema) as Resolver<ProductFormData>,
    defaultValues,
    mode: 'onChange',
  });

  const onSubmit = async (data: ProductFormData) => {
    try {
      if (isUpdate && productId && product) {
        const payload = buildUpdateProductPayload(data, product);

        if (Object.keys(payload).length === 0) {
          toast.info('No changes to update');
          return;
        }

        await updateProduct(productId, payload);
        toast.success('Product updated successfully');
        router.push('/admin/products');
        return;
      }

      // @ts-expect-error - TODO: fix this later
      await createProduct(buildCreateProductPayload(data));

      toast.success('Product created successfully');
      router.push('/admin/products');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Something went wrong');
    }
  };

  return {
    productForm,
    onSubmit,
    isUpdate,
  };
}

export { FormProvider };
