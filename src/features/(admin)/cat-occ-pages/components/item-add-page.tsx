'use client';
import useAddCategoreItem, { useAddOccasionItem } from '../hooks/use-add-item';
import { AddItemsFields, addItemsSchema } from '../schema/add-categories.schema';
import UploadImage from './upload-image';
import { Button } from '@/shared/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/shared/components/ui/field';
import { Input } from '@/shared/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { getErrorMessage } from '@/features/auth/register/lib/utils/field-error';
import { useRouter } from '@/i18n/navigation';
import { itemPageConfig } from '../config/item-page.config';
import { ItemPageType } from '../types/page-type';

export default function ItemAddPage({ page }: { page: ItemPageType }) {
  const config = itemPageConfig[page];

  // Translations
  const t = useTranslations(config.translationNamespace);

  // Navigation
  const router = useRouter();

  // Mutation
  const { addCategoriesItemApi, isPending: isPendingCategory } = useAddCategoreItem();
  const { addOccasionItemApi, isPending: isPendingOccasion } = useAddOccasionItem();
  const addItem = page === 'categories' ? addCategoriesItemApi : addOccasionItemApi;
  const isPending = page === 'categories' ? isPendingCategory : isPendingOccasion;

  // Form
  const form = useForm<AddItemsFields>({
    resolver: zodResolver(addItemsSchema),
    defaultValues: {
      title: '',
      description: '',
      image: '',
    },
  });

  // Function Submit
  const onSubmit = (data: AddItemsFields) => {
    addItem(data, {
      onSuccess: () => {
        router.push(config.listPath);
        form.reset();
      },
    });
  };

  return (
    <FormProvider {...form}>
      <div className="pt-5 px-4">
        <h1 className="font-semibold text-2xl text-ds-text-plain mb-6">{t('titleAdd')}</h1>
        {/* Content */}
        <div className="content flex flex-col gap-4.5 p-6 rounded-2xl bg-ds-bg-plain">
          {/* Form */}
          <form className="md:w-3/4 flex flex-col gap-4.5" onSubmit={form.handleSubmit(onSubmit)}>
            {/* Item Name */}
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
                    placeholder={t('fields.name.placeholder')}
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
                    placeholder={t('fields.description.placeholder')}
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
            <UploadImage t={t} />

            {/* Button */}
            <Button
              disabled={form.formState.isSubmitting || !form.formState.isDirty || isPending}
              type="submit"
              className="mt-32 cursor-pointer"
            >
              {t('add')}
            </Button>
          </form>
        </div>
      </div>
    </FormProvider>
  );
}
