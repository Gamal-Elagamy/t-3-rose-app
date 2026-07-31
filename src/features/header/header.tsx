'use client';

import { useSession } from 'next-auth/react';

import { UserDropdown } from './components/authenticated-state/user-dropdown/user-dropdown';
import { Notifications } from './components/authenticated-state/notifications/Notifications';
import { Logo } from './components/shared/logo';
import { DeliverTo } from './components/shared/deliver-to';
import { SearchBar } from './components/shared/search-bar';
import { WishlistButton } from './components/shared/wishlist';
import { CartButton } from './components/shared/cart-button';
import { MainNav } from './components/shared/main-nav';
import LanguageSwitcher from '@/shared/components/language-switcher';

export function Header() {
  const { data: session, status } = useSession();
  const isAuthenticated = status === 'authenticated';

  return (
    <header>
      <div className="flex items-center gap-6 px-6 py-4">
        <Logo />
        <DeliverTo city="cairo" />
        <SearchBar />
        <div className="flex shrink-0 items-center gap-4">
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <UserDropdown />
              <Notifications />
              <CartButton />
              <WishlistButton />
            </div>
          ) : null}
          <LanguageSwitcher />
        </div>
      </div>
      <MainNav />
    </header>
  );
}
