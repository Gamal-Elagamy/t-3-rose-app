import { z } from 'zod';

export const discountTypeEnum = z.enum(['PERCENT', 'FIXED']);
export type DiscountType = z.infer<typeof discountTypeEnum>;

export const productFormFieldsSchema = z.object({
  title: z.string().min(1, 'Product title is required'),
  description: z.string().min(1, 'Product description is required'),
  listPrice: z.string().refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
    message: 'Please enter a valid price',
  }),
  discountType: discountTypeEnum.default('PERCENT'),
  discountValue: z.string().optional(),
  price: z.string().refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) >= 0, {
    message: 'Please enter a valid price after discount',
  }),
  stock: z.string().refine((val) => !isNaN(parseInt(val, 10)) && parseInt(val, 10) >= 0, {
    message: 'Product quantity is required',
  }),
  categoryId: z.string().min(1, 'Please select a category for the product'),
  occasionId: z.string().min(1, 'Please select an occasion for the product'),
  cover: z.string().optional(),
  gallery: z.array(z.string()).default([]),
});

export const createProductFormSchema = productFormFieldsSchema.superRefine((data, ctx) => {
  if (!data.cover) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Product cover is required',
      path: ['cover'],
    });
  }

  if (!data.gallery.length) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Product gallery images are required',
      path: ['gallery'],
    });
  }
});

export const updateProductFormSchema = productFormFieldsSchema;

export type ProductFormValues = z.infer<typeof productFormFieldsSchema>;
