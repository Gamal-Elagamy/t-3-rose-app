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
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { SearchBox } from '@/shared/components/search-box';

export function Header() {
  const t = useTranslations();

  const { status } = useSession();
  const isAuthenticated = status === 'authenticated';

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
            </>
          ) : (
            <Link
              href="/login"
              className="text-sm text-ds-text-default outline-none focus-visible:ring-2 focus-visible:ring-ds-bg-primary focus-visible:ring-offset-2"
            >
              {t('header.nav.login')}
            </Link>
          )}

          {/* Visible for both authenticated and unauthenticated users */}
          <CartButton />
          <WishlistButton />

          <ThemeToggle />
          <LanguageSwitcher />
        </div>
      </div>

      {/* Mobile */}
      <div className="flex flex-col gap-3 px-4 py-3 lg:hidden">
        <div className="flex items-center justify-between gap-3">
          <MobileMenu />

          <Logo />

          <div className="flex shrink-0 items-center gap-3">
            {/* Visible for both authenticated and unauthenticated users */}
            <WishlistButton />
            <CartButton />

            {isAuthenticated && <Notifications />}
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
