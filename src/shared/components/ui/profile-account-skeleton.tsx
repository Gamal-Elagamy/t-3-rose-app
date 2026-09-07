import { Skeleton } from './skeleton';

export default function ProfileFormSkeleton() {
  return (
    <div className="relative w-full flex flex-col gap-4 p-5">
      {/* Profile Photo */}
      <div className="profile-photo flex flex-row items-center gap-4">
        <div className="relative profile-image w-fit">
          <Skeleton className="bg-zinc-300 dark:bg-zinc-600 w-30 h-30 rounded-full" />
          <Skeleton className="bg-zinc-300 dark:bg-zinc-600 absolute bottom-0 right-0 w-8.5 h-8.5 rounded-full" />
        </div>

        <div className="profile-info flex flex-col gap-4">
          <Skeleton className="bg-zinc-300 dark:bg-zinc-600 h-6 w-32" />
          <Skeleton className="bg-zinc-300 dark:bg-zinc-600 h-4 w-72" />
        </div>
      </div>

      {/* Inputs */}
      <div className="inputs flex flex-col gap-2.5">
        {/* First & Last Name */}
        <div className="flex flex-row items-center gap-5">
          <div className="flex-1 flex flex-col gap-2">
            <Skeleton className="bg-zinc-300 dark:bg-zinc-600 h-4 w-20" />
            <Skeleton className="bg-zinc-300 dark:bg-zinc-600 h-10 w-full rounded-md" />
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <Skeleton className="bg-zinc-300 dark:bg-zinc-600 h-4 w-20" />
            <Skeleton className="bg-zinc-300 dark:bg-zinc-600 h-10 w-full rounded-md" />
          </div>
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2">
          <Skeleton className="bg-zinc-300 dark:bg-zinc-600 h-4 w-16" />
          <Skeleton className="bg-zinc-300 dark:bg-zinc-600 h-10 w-full rounded-md" />
        </div>

        {/* Phone */}
        <div className="flex flex-col gap-2">
          <Skeleton className="bg-zinc-300 dark:bg-zinc-600 h-4 w-16" />
          <Skeleton className="bg-zinc-300 dark:bg-zinc-600 h-10 w-full rounded-md" />
        </div>

        {/* Gender */}
        <div className="flex flex-col gap-2">
          <Skeleton className="bg-zinc-300 dark:bg-zinc-600 h-4 w-16" />
          <Skeleton className="bg-zinc-300 dark:bg-zinc-600 h-10 w-full rounded-md" />
        </div>
      </div>

      {/* Buttons */}
      <div className="actions pt-15 flex items-center justify-between">
        <Skeleton className="bg-zinc-300 dark:bg-zinc-600 h-5 w-32" />
        <Skeleton className="bg-zinc-300 dark:bg-zinc-600 h-11 w-57 rounded-md" />
      </div>
    </div>
  );
}
