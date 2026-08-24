'use client';

import { LogOut, MoreVertical, User } from 'lucide-react';
import { signOut } from 'next-auth/react';

import { Avatar } from '@/shared/components/ui/avatar';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';

import { Link } from '@/i18n/navigation';
import { cn } from '@/shared/lib/utils/tailwind-cn';

interface UserMenuProps {
  user: {
    id: string;
    firstName?: string | null;
    lastName?: string | null;
    email: string;
  };
}

export default function UserMenu({ user }: UserMenuProps) {
  const fullName = `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim();

  return (
    <div className="flex items-center gap-3">
      <div className="hidden md:block">
        <Avatar
          userId={user.id}
          firstName={user.firstName}
          lastName={user.lastName}
          size="default"
        />
      </div>
      {/* User info - Desktop only */}
      <div className="hidden min-w-0 flex-col md:flex">
        <span className="truncate text-sm font-semibold text-zinc-900 dark:text-zinc-50">
          {fullName || 'User'}
        </span>

        <span className="truncate text-xs text-muted-foreground">{user.email}</span>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger
          className={cn(
            'shrink-0 rounded-full focus:outline-none',
            'focus-visible:ring-2 focus-visible:ring-ring'
          )}
          aria-label="Open user menu"
        >
          {/* Mobile: Avatar */}
          <span className="sm:hidden">
            <Avatar
              userId={user.id}
              firstName={user.firstName}
              lastName={user.lastName}
              size="default"
            />
          </span>

          {/* Desktop: Three dots */}
          <span
            className={cn(
              'hidden md:flex',
              'size-8 items-center justify-center rounded-md',
              'text-muted-foreground transition-colors',
              'hover:bg-muted hover:text-foreground'
            )}
          >
            <MoreVertical className="size-5" />
          </span>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          sideOffset={8}
          className="w-44 bg-white dark:bg-zinc-800 border-none outline-none"
        >
          <DropdownMenuItem>
            <Link href="/account-settings" className="flex cursor-pointer items-center gap-2">
              <User className="size-4" />
              <span>Account</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => signOut({ callbackUrl: '/' })}
            className="cursor-pointer text-red-600 focus:text-red-600"
          >
            <LogOut className="size-4" />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
