'use client';

import Image from 'next/image';
import { CloudUpload, Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { photoFileSchema, ProfileFormValues } from '../schemas/profile-form.schema';
import useUploadPhoto from '../hooks/use-upload-photo';
import { toast } from 'sonner';
import { cn } from '@/shared/lib/utils/tailwind-cn';

export default function ProfilePhoto({
  firstName,
  lastName,
}: {
  firstName: string;
  lastName: string;
}) {
  // Translations
  const t = useTranslations('accountSettings.profile');

  const { control, setValue } = useFormContext<ProfileFormValues>();
  const { uploadPhotoAction, isPending } = useUploadPhoto();

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isImageLoading, setIsImageLoading] = useState(true);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate
    const result = photoFileSchema.safeParse(file);
    if (!result.success) {
      e.target.value = '';
      return;
    }

    const imageUrl = URL.createObjectURL(file);
    setPreviewUrl(imageUrl);
    setIsImageLoading(true);

    try {
      const formData = new FormData();
      formData.append('image', file, file.name);

      const res = await uploadPhotoAction(formData);

      setValue('photo', res?.payload?.url || '', { shouldDirty: true, shouldValidate: true });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t('upload-failed'));
      setPreviewUrl(null);
    }
  }

  return (
    <div className="profile-photo flex flex-row items-center gap-4">
      <Controller
        name="photo"
        control={control}
        render={({ field }) => {
          const resolvedSrc = previewUrl ?? field.value ?? '';

          return (
            <div className="relative profile-image w-fit">
              {/* Image */}
              <div className="image-wrapper w-30 h-30 rounded-full border border-ds-border-muted overflow-hidden">
                {resolvedSrc ? (
                  <Image
                    src={resolvedSrc}
                    alt="profile-image"
                    onLoad={() => setIsImageLoading(false)}
                    width={120}
                    height={120}
                    className={cn(
                      'w-full h-full object-cover transition-all duration-500 ease-out',
                      isImageLoading ? 'blur-md scale-105' : 'blur-0 scale-100'
                    )}
                  />
                ) : (
                  <div className="image-placeholder flex items-center justify-center w-full h-full bg-ds-bg-subtle text-ds-text-plain text-2xl font-bold">
                    {firstName.slice(0, 1).toUpperCase() + lastName.slice(0, 1).toUpperCase()}
                  </div>
                )}
              </div>

              {/* Upload Icon */}
              <div className="icon absolute bottom-0 right-0 flex items-center justify-center w-8.5 h-8.5 rounded-full border border-ds-border-muted bg-ds-bg-subtle cursor-pointer">
                {isPending ? (
                  <Loader2 className="size-5 text-ds-text-plain animate-spin" />
                ) : (
                  <CloudUpload className="size-5 text-ds-text-plain" />
                )}
              </div>

              {/* File Input */}
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                disabled={isPending}
                onChange={handleFileChange}
                className="absolute w-full h-full top-0 left-0 bottom-0 right-0 cursor-pointer opacity-0 disabled:cursor-wait"
              />
            </div>
          );
        }}
      />

      <div className="profile-info flex flex-col gap-4">
        <h2 className="font-semibold text-xl text-ds-text-plain">{t('upload-photo-title')}</h2>
        <p className="font-normal text-base text-ds-text-soft">{t('upload-photo-description')}</p>
      </div>
    </div>
  );
}
