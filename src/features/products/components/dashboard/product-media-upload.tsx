'use client';

import { useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import { toast } from 'sonner';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/shared/components/ui/field';
import { Input } from '@/shared/components/ui/input';
import { uploadImage } from '@/shared/actions/upload-image.action';
import { ProductFormData } from '../../types/products';
import { useTranslations } from 'next-intl';
import { getErrorMessage } from '../../schemas/product.schema';

interface ProductMediaUploadProps {
  control: Control<ProductFormData>;
}

export default function ProductMediaUpload({ control }: ProductMediaUploadProps) {
  const t = useTranslations('dashboard.products');
  // State
  const [coverFileName, setCoverFileName] = useState<string | null>(null);
  const [galleryFileNames, setGalleryFileNames] = useState<string[]>([]);
  const [isCoverUploading, setIsCoverUploading] = useState(false);
  const [isGalleryUploading, setIsGalleryUploading] = useState(false);

  return (
    <div className="flex flex-col gap-2.5 md:flex-row">
      {/* Cover */}
      <FieldGroup className="flex-1">
        <Controller
          name="cover"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="cover">
                {t('productCoverImage')} <span className="text-ds-text-danger">*</span>
              </FieldLabel>
              <Input
                id="cover"
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                aria-invalid={fieldState.invalid}
                disabled={isCoverUploading}
                className={coverFileName ? 'hidden' : ''}
                onChange={async (event) => {
                  const file = event.target.files?.[0];
                  if (!file) {
                    setCoverFileName(null);
                    field.onChange('');
                    return;
                  }

                  setIsCoverUploading(true);
                  setCoverFileName(file.name);

                  try {
                    const url = await uploadImage(file);
                    field.onChange(url);
                  } catch (error) {
                    setCoverFileName(null);
                    field.onChange('');
                    toast.error(
                      error instanceof Error ? error.message : t('validation.uploadCoverFailed')
                    );
                  } finally {
                    setIsCoverUploading(false);
                  }
                }}
              />
              {coverFileName && (
                <div className="flex items-center gap-2">
                  <Input
                    type="text"
                    value={
                      isCoverUploading ? t('uploading', { fileName: coverFileName }) : coverFileName
                    }
                    readOnly
                    disabled={isCoverUploading}
                    className="cursor-pointer"
                    onClick={() => {
                      if (!isCoverUploading) {
                        setCoverFileName(null);
                        field.onChange('');
                      }
                    }}
                  />
                  {!isCoverUploading && (
                    <button
                      type="button"
                      onClick={() => {
                        setCoverFileName(null);
                        field.onChange('');
                      }}
                      className="text-xs text-ds-text-muted hover:text-ds-text-danger"
                    >
                      {t('clear')}
                    </button>
                  )}
                </div>
              )}
              {fieldState.invalid && (
                <FieldError
                  errors={[
                    {
                      message: fieldState.error?.message
                        ? getErrorMessage(t, fieldState.error.message)
                        : fieldState.error?.message,
                    },
                  ]}
                />
              )}
            </Field>
          )}
        />
      </FieldGroup>

      {/* Gallery */}
      <FieldGroup className="flex-1">
        <Controller
          name="gallery"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="gallery">
                {t('productGallery')} <span className="text-ds-text-danger">*</span>
              </FieldLabel>
              <Input
                id="gallery"
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                multiple
                aria-invalid={fieldState.invalid}
                disabled={isGalleryUploading}
                className={galleryFileNames.length > 0 ? 'hidden' : ''}
                onChange={async (event) => {
                  const files = Array.from(event.target.files ?? []);
                  if (!files.length) {
                    setGalleryFileNames([]);
                    field.onChange([]);
                    return;
                  }

                  setIsGalleryUploading(true);
                  setGalleryFileNames(files.map((file) => file.name));

                  const urls: string[] = [];
                  const currentGallery = field.value || [];

                  try {
                    for (const file of files) {
                      const url = await uploadImage(file);
                      urls.push(url);
                      field.onChange([...currentGallery, ...urls]);
                    }
                  } catch (error) {
                    setGalleryFileNames([]);
                    field.onChange(currentGallery);
                    toast.error(
                      error instanceof Error ? error.message : t('validation.uploadGalleryFailed')
                    );
                  } finally {
                    setIsGalleryUploading(false);
                  }
                }}
              />
              {galleryFileNames.length > 0 && (
                <div className="flex items-center gap-2">
                  <Input
                    type="text"
                    value={
                      isGalleryUploading
                        ? t('uploading', { fileName: galleryFileNames.join(', ') })
                        : galleryFileNames.join(', ')
                    }
                    readOnly
                    disabled={isGalleryUploading}
                    className="cursor-pointer"
                    onClick={() => {
                      if (!isGalleryUploading) {
                        setGalleryFileNames([]);
                      }
                    }}
                  />
                  {!isGalleryUploading && (
                    <button
                      type="button"
                      onClick={() => {
                        setGalleryFileNames([]);
                      }}
                      className="text-xs text-ds-text-muted hover:text-ds-text-danger"
                    >
                      {t('clear')}
                    </button>
                  )}
                </div>
              )}
              {fieldState.invalid && (
                <FieldError
                  errors={[
                    {
                      message: fieldState.error?.message
                        ? getErrorMessage(t, fieldState.error.message)
                        : fieldState.error?.message,
                    },
                  ]}
                />
              )}
            </Field>
          )}
        />
      </FieldGroup>
    </div>
  );
}
