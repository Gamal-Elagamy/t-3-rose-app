'use client';

import { Field, FieldError, FieldLabel } from '@/shared/components/ui/field';
import { Input } from '@/shared/components/ui/input';
import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import useUploadImage from '../hooks/use-upload-image';
import { uploadImageSchema } from '../schema/add-categories.schema';
import { Loader2 } from 'lucide-react';
import { getErrorMessage } from '../../../auth/register/lib/utils/field-error';
import { useTranslations } from 'next-intl';

export default function UploadImage({ t }: { t: ReturnType<typeof useTranslations> }) {
  // State
  const [fileName, setFileName] = useState<string | null>(null);

  // Context
  const categoriesForm = useFormContext();

  // Mutation
  const { uploadImageAction, isPending: isUploading } = useUploadImage();

  // Function Upload Image
  function handleFileChange(file: File | undefined) {
    if (!file) return;

    const result = uploadImageSchema.shape.image.safeParse(file);
    if (!result.success) {
      categoriesForm.setError('image', {
        message: result.error.issues[0]?.message,
      });
      return;
    }

    setFileName(file.name);
    categoriesForm.clearErrors('image');

    uploadImageAction(
      { image: file },
      {
        onSuccess(data) {
          categoriesForm.setValue('image', data.payload?.url, {
            shouldDirty: true,
            shouldValidate: true,
          });
        },
        onError() {
          categoriesForm.setError('image', { message: 'uploadFailed' });
          setFileName(null);
        },
      }
    );
  }

  return (
    <Controller
      name="image"
      control={categoriesForm.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={field.name}>
            {t('fields.image.label')}
            <span className="text-ds-text-danger">*</span>
          </FieldLabel>
          <Input
            accept="image/*"
            type="file"
            id={field.name}
            aria-invalid={fieldState.invalid}
            autoComplete="off"
            fileName={fileName}
            onChange={(e) => handleFileChange(e.target.files?.[0])}
          />
          {fileName && (
            <p className="text-sm text-ds-text-plain mt-1 truncate">
              {isUploading && (
                <span className="text-ds-text-primary flex items-center gap-1">
                  <Loader2 className="size-3.5 animate-spin" /> {t('fields.image.uploading')}
                </span>
              )}
            </p>
          )}
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
  );
}
