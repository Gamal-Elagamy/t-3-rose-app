import getProfileData from '@/features/account-settings/api/get-profile-data.api';
import ProfileForm from '@/features/account-settings/components/profile-form';
import ProfileAdminForm from '@/features/admin/components/account-settings/profile-admin-form';
import ProfileFormSkeleton from '@/shared/components/ui/profile-account-skeleton';
import { Suspense } from 'react';

export default function page() {
  return <ProfileAdminForm />;
}
