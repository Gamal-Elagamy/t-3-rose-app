'use client';

import { Logo } from '@/features/header/components/shared/logo';
import { usePathname } from '@/i18n/navigation';
import { SidebarTrigger } from '@/shared/components/ui/sidebar';
import { IUser } from '@/shared/lib/types/user';

import UserMenu from './user-menu';

export function SiteHeader({ user }: { user: IUser }) {
  const pathName = usePathname();

  return (
    <header className="flex shrink-0 items-center gap-2 bg-white py-2 dark:bg-zinc-800">
      <div className="flex w-full items-center justify-between gap-1 px-4 py-2 lg:gap-2">
        <div className="flex items-center gap-2">
          <Logo width={60} height={57} href="/admin" className="md:hidden" />

          <p className="text-sm md:text-base">
            {pathName.split('/')[1].slice(0, 1).toLocaleUpperCase()}
            {pathName.split('/')[1].slice(1)}
          </p>
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <UserMenu user={user} />

          <SidebarTrigger className="-ml-1 bg-transparent p-0 text-zinc-700 hover:bg-transparent dark:text-white" />
        </div>
      </div>
    </header>
  );
}