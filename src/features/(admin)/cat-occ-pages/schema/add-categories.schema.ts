import z from 'zod';

// Categories Schema
export const addItemsSchema = z.object({
  title: z.string().min(1, 'nameRequired'),
  description: z.string().min(1, 'descriptionRequired'),
  image: z.string().min(1, 'imageRequired'),
});

// Edit Schema
export const editItemsSchema = addItemsSchema.pick({ title: true, description: true });

// Image Schema
export const uploadImageSchema = z.object({
  image: z
    .file()
    .max(5 * 1024 * 1024, 'imageTooLarge')
    .refine((file) => ['image/jpeg', 'image/png', 'image/webp'].includes(file.type), {
      message: 'imageInvalidType',
    }),
});

// Categories Fields Type
export type AddItemsFields = z.infer<typeof addItemsSchema>;

// Edit Fields Type
export type EditItemsFields = z.infer<typeof editItemsSchema>;

// Image Field Type
export type UploadImageFields = z.infer<typeof uploadImageSchema>;
