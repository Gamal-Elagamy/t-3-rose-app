'use client';

import Image from 'next/image';
import ProfileImage from '@/assets/images/account-settings/profile-image.png';
import { CloudUpload, Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { photoFileSchema, ProfileFormValues } from '../schemas/profile-form.schema';
import useUploadPhoto from '../hooks/use-upload-photo';
import { toast } from 'sonner';

export default function ProfilePhoto() {
  // Translations
  const t = useTranslations('accountSettings.profile');

  const { control, setValue } = useFormContext<ProfileFormValues>();
  const { uploadPhotoAction, isPending } = useUploadPhoto();

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate
    const result = photoFileSchema.safeParse(file);
    if (!result.success) {
      const message = result.error.issues[0]?.message;
      e.target.value = '';
      return;
    }

    const imageUrl = URL.createObjectURL(file);
    setPreviewUrl(imageUrl);

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

  function getPublicApiBaseUrl(): string {
    const url = process.env.NEXT_PUBLIC_ASSET_BASE_URL;
    if (!url) {
      throw new Error('NEXT_PUBLIC_ASSET_BASE_URL is not defined');
    }
    return url;
  }

  return (
    <div className="profile-photo flex flex-row items-center gap-4">
      <Controller
        name="photo"
        control={control}
        render={({ field }) => (
          <div className="relative profile-image w-fit">
            {/* Image */}
            <div className="image-wrapper w-30 h-30 rounded-full border border-ds-border-muted overflow-hidden">
              <Image
                // src={previewUrl ?? field.value ?? ProfileImage}
                src={
                  previewUrl ??
                  (field.value ? `${getPublicApiBaseUrl()}${field.value}` : ProfileImage)
                }
                alt="profile-image"
                width={120}
                height={120}
                className="w-full h-full object-cover"
              />
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
        )}
      />

      <div className="profile-info flex flex-col gap-4">
        <h2 className="font-semibold text-xl text-ds-text-plain">{t('upload-photo-title')}</h2>
        <p className="font-normal text-base text-ds-text-soft">{t('upload-photo-description')}</p>
      </div>
    </div>
  );
}
