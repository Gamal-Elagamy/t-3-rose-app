import getProfileData from '@/features/account-settings/api/get-profile-data.api';
import ProfileForm from '@/features/account-settings/components/profile-form';
import ProfileFormSkeleton from '@/shared/components/ui/delete-account-skeleton';
import { Suspense } from 'react';

export default function UpdateProfilePage() {
  const profileData = getProfileData();
  return (
    <Suspense fallback={<ProfileFormSkeleton />}>
      <ProfileForm profileData={profileData} />
    </Suspense>
  );
}
