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
  { key: 'account', href: '/account', icon: User },
  { key: 'addresses', href: '/addresses', icon: MapPin },
  { key: 'orders', href: '/orders', icon: FileText },
  { key: 'dashboard', href: '/dashboard', icon: LayoutGrid },
] as const;

export function UserDropdown() {
  const t = useTranslations('header.userDropdown');
  const { data: session } = useSession();

  const userName = session?.user?.firstName ?? '';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-1.5 text-ds-text-default outline-none">
        <span className="text-start text-xs leading-tight text-ds-text-muted">
          {t('greeting')}
          <br />
          <span className="text-sm font-semibold text-ds-text-plain">{userName}</span>
        </span>
        <ChevronDown className="size-4 text-ds-text-muted" />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-56 rounded-xl border-none bg-neutral-900 p-3 shadow-soft-lg"
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel className="px-2 py-1 text-sm font-semibold text-ds-bg-primary">
            {userName}
          </DropdownMenuLabel>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="my-2 bg-white/10" />

        {menuItems.map(({ key, href, icon: Icon }) => (
          <DropdownMenuItem
            key={key}
            render={<Link href={href} />}
            className="flex items-center gap-2.5 rounded-lg px-2 py-2 text-sm text-white/90 outline-none transition-colors hover:bg-white/10 focus:bg-white/10"
          >
            <Icon className="size-4" />
            {t(key)}
          </DropdownMenuItem>
        ))}

        <DropdownMenuItem
          onClick={() => signOut()}
          className="flex items-center gap-2.5 rounded-lg px-2 py-2 text-sm text-white/90 outline-none transition-colors hover:bg-white/10 focus:bg-white/10"
        >
          <LogOut className="size-4" />
          {t('logout')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
