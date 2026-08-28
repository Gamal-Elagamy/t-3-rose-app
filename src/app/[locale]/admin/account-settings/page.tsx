import getProfileData from "@/features/admin/apis/get-profile-data.api";
import ProfileForm from "@/features/admin/components/account-settings/profile-form";
import ProfileFormSkeleton from "@/shared/components/ui/profile-account-skeleton";
import { Suspense } from "react";


export default function page() {
    const profileData = getProfileData();
  return (
    <Suspense fallback={<ProfileFormSkeleton />}>
         <ProfileForm profileData={profileData} />
       </Suspense>
  )
}
