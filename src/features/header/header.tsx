'use client';

import { useSession } from 'next-auth/react';

import { UserDropdown } from './components/authenticated-state/user-dropdown/user-dropdown';
import { Notifications } from './components/authenticated-state/notifications/Notifications';

export function Header() {
  const { data: session, status } = useSession();
  const isAuthenticated = status === 'authenticated';

  return (
    <header>
      <div className="flex items-center justify-between">
        {isAuthenticated ? (
          <div className="flex items-center gap-4">
            <UserDropdown />
            <Notifications />
          </div>
        ) : null}
      </div>
    </header>
  );
}
