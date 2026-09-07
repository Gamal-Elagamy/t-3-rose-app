import getProfileData from '@/features/account-settings/api/get-profile-data.api';
import ProfileForm from '@/features/account-settings/components/profile-form';
import ProfileFormSkeleton from '@/shared/components/ui/profile-account-skeleton';
import { useTranslations } from 'next-intl';
import { Suspense } from 'react';

export default function ProfileAdminForm() {
  const t = useTranslations('accountSettings.profile');

  const profileData = getProfileData();
  return (
    <div className="relative w-full space-y-4 p-4 sm:space-y-5 sm:p-6 md:p-8 lg:space-y-6 lg:p-10">
      <h1 className="w-full text-xl font-semibold sm:text-2xl">{t('account-settings-dashoard')}</h1>
      <Suspense fallback={<ProfileFormSkeleton />}>
        <ProfileForm profileData={profileData} />
      </Suspense>
    </div>
  );
}
