'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { useSession, signOut } from 'next-auth/react';
import { User, MapPin, FileText, LayoutGrid, LogOut, ChevronDown } from 'lucide-react';

const menuItems = [
  { key: 'account', href: '/account-settings', icon: User },
  { key: 'addresses', href: '/addresses', icon: MapPin },
  { key: 'orders', href: '/orders', icon: FileText },
  { key: 'dashboard', href: '/dashboard', icon: LayoutGrid },
] as const;

export function UserDropdown() {
  const t = useTranslations('header.userDropdown');
  const { data: session } = useSession();

  const userName = session?.user?.firstName ?? '';
  const role = session?.user?.role;

  const items = menuItems.filter(
    (item) => item.key !== 'dashboard' || role === 'ADMIN' || role === 'SUPER_ADMIN'
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={userName ? `${t('greeting')} ${userName}` : t('greeting')}
        className="flex items-center gap-1.5 text-ds-text-default outline-none focus-visible:ring-2 focus-visible:ring-ds-bg-primary focus-visible:ring-offset-2"
      >
        <span className="text-start text-xs leading-tight text-ds-text-muted">
          {t('greeting')}
          <br />
          <span className="text-sm font-semibold text-ds-text-plain">{userName}</span>
        </span>

        <ChevronDown className="size-4 shrink-0 text-ds-text-muted" aria-hidden="true" />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-auto max-w-[calc(100vw-2rem)] rounded-xl border-none bg-ds-bg-plain p-3 shadow-soft-lg"
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel className="px-2 py-1 text-sm font-semibold text-ds-bg-primary">
            {userName}
          </DropdownMenuLabel>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="my-2 bg-ds-border-subtle" />

        {items.map(({ key, href, icon: Icon }) => (
          <DropdownMenuItem
            key={key}
            render={<Link href={href} />}
            className="flex items-center gap-2.5 rounded-lg px-2 py-2 text-sm text-ds-text-default outline-none transition-colors hover:bg-ds-bg-subtle focus:bg-ds-bg-subtle focus-visible:ring-2 focus-visible:ring-ds-bg-primary focus-visible:ring-inset"
          >
            <Icon className="size-4 shrink-0" aria-hidden="true" />
            {t(key)}
          </DropdownMenuItem>
        ))}

        <DropdownMenuItem
          onClick={() => signOut({ callbackUrl: '/' })}
          className="flex items-center gap-2.5 rounded-lg px-2 py-2 text-sm text-ds-text-default outline-none transition-colors hover:bg-ds-bg-subtle focus:bg-ds-bg-subtle focus-visible:ring-2 focus-visible:ring-ds-bg-primary focus-visible:ring-inset"
        >
          <LogOut className="size-4 shrink-0" aria-hidden="true" />
          {t('logout')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
