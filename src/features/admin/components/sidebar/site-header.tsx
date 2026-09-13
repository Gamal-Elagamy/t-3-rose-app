'use client';
import { Logo } from '@/features/header/components/shared/logo';
import { usePathname } from '@/i18n/navigation';
import { SidebarTrigger } from '@/shared/components/ui/sidebar';
import UserMenu from './user-menu';
import { IUser } from '@/shared/lib/types/user';
import { useMemo } from 'react';
import { useBreadcrumb } from '@/features/(admin)/cat-occ-pages/context/breadcrumb.context';

const SEGMENT_LABELS: Record<string, string> = {
  admin: 'Dashboard',
  categories: 'Categories',
  occasions: 'Occasions',
  add: 'Add',
  edit: 'Update',
  products: 'Products',
};

function formatSegment(segment: string) {
  return SEGMENT_LABELS[segment] ?? segment.charAt(0).toUpperCase() + segment.slice(1);
}

export function SiteHeader({ user }: { user: IUser }) {
  const pathName = usePathname();
  const { extra } = useBreadcrumb();

  const breadcrumb = useMemo(() => {
    const segments = pathName.split('/').filter(Boolean);
    const isEditPage = segments.includes('edit');

    const base = segments
      .filter((seg) => !/^[0-9a-fA-F-]{4,}$/.test(seg))
      .map(formatSegment)
      .join(' / ');

    return isEditPage && extra ? `${base}: ${extra}` : base;
  }, [pathName, extra]);

  return (
    <header className="flex shrink-0 items-center gap-2 bg-white dark:bg-zinc-800 py-2">
      <div className="flex w-full items-center justify-between gap-1 py-2 px-4 lg:gap-2">
        <div className="flex gap-2 items-center">
          <Logo width={60} height={57} href="/admin" className="md:hidden" />
          <p className="text-sm md:text-base">{breadcrumb}</p>
        </div>
        <div className="flex items-center gap-1 md:hidden">
          <UserMenu user={user} />
          <SidebarTrigger className="-ml-1 bg-transparent p-0 hover:bg-transparent text-zinc-700 dark:text-white" />
        </div>
      </div>
    </header>
  );
}
