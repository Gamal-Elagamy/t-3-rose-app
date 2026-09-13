'use client';

import { Field, FieldError, FieldLabel } from '@/shared/components/ui/field';
import { Input } from '@/shared/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { Category } from '../../../products/types/product-details';
import { Button } from '@/shared/components/ui/button';
import { Image as ImageIcon, X } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from '@/i18n/navigation';
import { getErrorMessage } from '@/features/auth/register/lib/utils/field-error';
import { useTranslations } from 'next-intl';
import { IOccasion } from '@/features/occasions/types/occasions';
import { ItemPageType } from '../types/page-type';
import { itemPageConfig } from '../config/item-page.config';
import { useModalLock } from '../hooks/use-modal-lock';
import { EditItemsFields, editItemsSchema } from '../schema/add-categories.schema';
import useUpdateItem from '../hooks/use-update-item';

export default function EditForm({
  editData,
  translations,
  page,
}: {
  editData?: Category | IOccasion;
  translations: Parameters<typeof useTranslations>[0];
  page: ItemPageType;
}) {
  // Translations
  const t = useTranslations(translations);

  // Navigation
  const router = useRouter();

  // State
  const [showImage, setShowImage] = useState(false);

  // Mutation
  const { updateItem, isPending: isSubmitting } = useUpdateItem(page);

  // Lock modal Effect
  useModalLock(showImage, () => setShowImage(false));

  // Form
  const form = useForm<EditItemsFields>({
    resolver: zodResolver(editItemsSchema),
    defaultValues: {
      title: editData?.title || '',
      description: editData?.description || '',
    },
  });

  // Function Submit
  function onSubmit(data: { title: string; description: string }) {
    const payload = {
      id: editData?.id || '',
      title: data.title,
      description: data.description,
    };

    updateItem(payload, {
      onSuccess: () => {
        router.push(itemPageConfig[page].listPath);
        form.reset();
      },
    });
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="md:w-3/4 flex flex-col gap-4.5">
      {/* Item Title */}
      <Controller
        name="title"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>
              {t('fields.name.label')}
              <span className="text-ds-text-danger">*</span>
            </FieldLabel>

            <Input
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              autoComplete="off"
            />
            {fieldState.invalid && fieldState.error?.message && (
              <FieldError
                errors={[
                  {
                    message: getErrorMessage(t, `fields.errors.${fieldState.error.message}`),
                  },
                ]}
              />
            )}
          </Field>
        )}
      />

      {/* Item Description */}
      <Controller
        name="description"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>
              {t('fields.description.label')}
              <span className="text-ds-text-danger">*</span>
            </FieldLabel>
            <Input
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              autoComplete="off"
            />
            {fieldState.invalid && fieldState.error?.message && (
              <FieldError
                errors={[
                  {
                    message: getErrorMessage(t, `fields.errors.${fieldState.error.message}`),
                  },
                ]}
              />
            )}
          </Field>
        )}
      />

      {/* Item Image */}
      <button
        type="button"
        onClick={() => setShowImage(!showImage)}
        className="md:w-fit md:ms-auto p-2.5 rounded-lg border border-black/8 flex items-center gap-1.5 text-ds-text-info cursor-pointer"
      >
        <ImageIcon className="size-4.5" />
        <p className="font-normal text-sm">{t('fields.image.view')}</p>
      </button>

      {/* Image */}
      {showImage && (
        <div
          onClick={() => setShowImage(false)}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        >
          <X className="absolute top-4 inset-e-4 text-ds-text-soft cursor-pointer" />
          <div className="w-100 h-100">
            <Image
              onClick={(e) => e.stopPropagation()}
              src={editData?.image || ''}
              alt={editData?.title || ''}
              className="w-full h-full object-cover"
              width={400}
              height={400}
            />
          </div>
        </div>
      )}

      {/* Button */}
      <Button
        disabled={!form.formState.isDirty || form.formState.isSubmitting || isSubmitting}
        type="submit"
        className="mt-32 cursor-pointer"
      >
        {t('update')}
      </Button>
    </form>
  );
}
