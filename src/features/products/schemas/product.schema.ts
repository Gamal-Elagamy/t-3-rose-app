import { z } from 'zod';
import { useTranslations } from 'next-intl';

export function getErrorMessage(t: ReturnType<typeof useTranslations>, key: string): string {
  try {
    return t(key as never);
  } catch {
    return key;
  }
}

export const discountTypeEnum = z.enum(['PERCENT', 'FIXED']);
export type DiscountType = z.infer<typeof discountTypeEnum>;

export const productFormFieldsSchema = z.object({
  title: z.string().min(1, 'validation.titleRequired'),
  description: z.string().min(1, 'validation.descriptionRequired'),
  listPrice: z.string().refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
    message: 'validation.priceRequired',
  }),
  discountType: discountTypeEnum.default('PERCENT'),
  discountValue: z.string().optional(),
  price: z.string().refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) >= 0, {
    message: 'validation.priceAfterDiscountRequired',
  }),
  stock: z.string().refine((val) => !isNaN(parseInt(val, 10)) && parseInt(val, 10) >= 0, {
    message: 'validation.quantityRequired',
  }),
  categoryId: z.string().min(1, 'validation.categoryRequired'),
  occasionId: z.string().min(1, 'validation.occasionRequired'),
  cover: z.string().optional(),
  gallery: z.array(z.string()).default([]),
});

export const createProductFormSchema = productFormFieldsSchema.superRefine((data, ctx) => {
  if (!data.cover) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'validation.coverRequired',
      path: ['cover'],
    });
  }

  if (!data.gallery.length) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'validation.galleryRequired',
      path: ['gallery'],
    });
  }
});

export const updateProductFormSchema = productFormFieldsSchema;

export type ProductFormValues = z.infer<typeof productFormFieldsSchema>;
