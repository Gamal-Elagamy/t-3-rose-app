'use client';

import { useSession } from 'next-auth/react';

import { UserDropdown } from './components/authenticated-state/user-dropdown/user-dropdown';
import { Notifications } from './components/authenticated-state/notifications/Notifications';
import { Logo } from './components/shared/logo';
import { SearchBar } from './components/shared/search-bar';
import { WishlistButton } from './components/shared/wishlist';
import { CartButton } from './components/shared/cart-button';
import { MainNav } from './components/shared/main-nav';
import LanguageSwitcher from '@/shared/components/language-switcher';
import { ThemeToggle } from '@/shared/components/theme-toggle';
import { MobileMenu } from './components/shared/mobile-menu';
import { SearchBox } from '@/shared/components/search-box';
import { useCart } from '../cart/context/cart.context';
import { LoginPopover } from '../auth/components/login-popover/login-popover';

export function Header() {
  // Cart Context
  const { cartDataProducts } = useCart();

  // Hooks
  const { status } = useSession();
  const isAuthenticated = status === 'authenticated';

  // Items Count
  const itemsCount = cartDataProducts.length;

  return (
    <header className="sticky top-0 z-50 bg-ds-bg-plain">
      {/* Desktop */}
      <div className="hidden items-center gap-6 px-6 py-4 lg:flex">
        <Logo />

        <SearchBox />

        <div className="flex shrink-0 items-center gap-4">
          {isAuthenticated ? (
            <>
              <UserDropdown />
              <Notifications />
              <WishlistButton />
            </>
          ) : (
            <LoginPopover />
          )}
          <CartButton count={itemsCount} />
          <ThemeToggle />
          <LanguageSwitcher />
        </div>
      </div>

      {/* Mobile */}
      <div className="flex flex-col gap-3 px-4 py-3 lg:hidden">
        <div className="flex items-center justify-between gap-3">
          <MobileMenu />

          <Logo />
          <div className="flex items-center gap-4">
            <CartButton count={itemsCount} />
            {isAuthenticated && <Notifications />}
            <WishlistButton />
          </div>
        </div>

        <SearchBar />
      </div>

      {/* Main Navigation */}
      <div className="hidden lg:block">
        <MainNav />
      </div>
    </header>
  );
}
