'use client';

import Image from 'next/image';
import { CloudUpload, Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { Controller, useForm, useFormContext } from 'react-hook-form';
import { FileField, photoFileSchema, ProfileFormValues } from '../schemas/profile-form.schema';
import useUploadPhoto from '../hooks/use-upload-photo';
import { toast } from 'sonner';
import { cn } from '@/shared/lib/utils/tailwind-cn';
import { zodResolver } from '@hookform/resolvers/zod';
import { IUser } from '@/shared/lib/types/user';

export default function ProfilePhoto({ user }: { user: IUser }) {
  // Translations
  const t = useTranslations('accountSettings.profile');

  // State
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isImageLoading, setIsImageLoading] = useState(false);

  // Context
  const profileForm = useFormContext<ProfileFormValues>();

  // Mutation
  const { uploadPhotoAction, isPending } = useUploadPhoto();

  // Form
  const form = useForm<FileField>({
    resolver: zodResolver(photoFileSchema),
    mode: 'onChange',
    defaultValues: {
      photo: user.photo ?? '',
    },
  });

  // Effects
  useEffect(() => {
    const unsubscribe = form.subscribe({
      name: 'photo',
      formState: { values: true, errors: true, isValid: true },
      callback: ({ values, errors, isValid }) => {
        // Error Message
        const errorMessage = errors?.photo?.message;

        if (errorMessage) {
          toast.error(errorMessage);
          return;
        }

        if (isValid && values?.photo instanceof File) {
          const localPreview = URL.createObjectURL(values.photo);
          setPreviewUrl(localPreview);
          setIsImageLoading(false);

          uploadPhotoAction(values, {
            onSuccess(data) {
              profileForm.setValue('photo', data.payload?.url, { shouldDirty: true });
            },
            onError: () => {
              toast.error(t('upload-failed'));
              setPreviewUrl(null);
              form.resetField('photo');
            },
          });
        }
      },
    });

    return () => unsubscribe();
  }, [form, uploadPhotoAction, profileForm, t]);

  return (
    <div className="profile-photo flex flex-row items-center gap-4">
      <Controller
        name="photo"
        control={form.control}
        render={({ field: { onChange } }) => {
          const resolvedSrc = previewUrl ?? (user.photo || null);

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
                    {user?.firstName.slice(0, 1).toUpperCase() +
                      user?.lastName.slice(0, 1).toUpperCase()}
                  </div>
                )}
              </div>

              {/* Upload Icon */}
              <div className="icon absolute bottom-0 right-0 flex items-center justify-center w-8.5 h-8.5 rounded-full border border-ds-border-muted bg-ds-bg-subtle cursor-pointer">
                {isPending || isImageLoading ? (
                  <Loader2 className="size-5 text-ds-text-plain animate-spin" />
                ) : (
                  <CloudUpload className="size-5 text-ds-text-plain" />
                )}
              </div>

              <label htmlFor="profile-photo-upload" className="sr-only">
                {t('upload-photo-title')}
              </label>

              {/* File Input */}
              <input
                id="profile-photo-upload"
                type="file"
                accept="image/jpeg,image/png,image/gif,image/webp"
                disabled={isPending}
                onChange={(e) => onChange(e.target.files?.[0] || null)}
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
