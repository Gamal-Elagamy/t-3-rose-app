// features/header/Header.tsx
'use client';

import { useSession } from 'next-auth/react';

import { UserDropdown } from './components/authenticated-state/user-dropdown/UserDropdown';
import { Notifications } from './components/authenticated-state/notifications/Notifications';
// import { SecondaryNavigation } from './components/unauthenticated-state/secondary-navigation/SecondaryNavigation';

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
        ) : null
        //   <SecondaryNavigation />
        }
      </div>
    </header>
  );
}
