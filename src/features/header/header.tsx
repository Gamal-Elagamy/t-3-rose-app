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
interface HeaderProps {
  wishlistCount: number;
}
import { useCart } from '../cart/context/cart.context';

export function Header({ wishlistCount }: HeaderProps) {
  // Translation
  const t = useTranslations();

  // Cart Context
  const { cartDataProducts } = useCart();

  // Hooks
  const { status } = useSession();
  const isAuthenticated = status === 'authenticated';

  // Items Count
  const itemsCount = cartDataProducts.length;

  return (
    <header>
      {/* desktop */}
      <div className="hidden  items-center gap-6 px-6 py-4 lg:flex">
        <Logo />
        {/* <DeliverTo /> */}
        <SearchBox />
        <div className="flex shrink-0 items-center gap-4">
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <UserDropdown />
              <Notifications />
              <CartButton />
              

              <WishlistButton />
            </div>
          ) : (
            <Link href="/login" className="text-sm text-ds-text-default">
              {t('header.nav.login')}
            </Link>
          )}
          <WishlistButton authenticatedCount={wishlistCount} />
          <CartButton count={itemsCount} />
          <ThemeToggle />
          <LanguageSwitcher />
        </div>
      </div>
      {/* mobile */}
      <div className="flex flex-col gap-3 px-4 py-3 lg:hidden">
        <div className="flex items-center justify-between">
          <MobileMenu />
          <Logo />
          <div className="flex items-center gap-4">
            <CartButton count={itemsCount} />
            {isAuthenticated && <Notifications />}
          </div>
        </div>

        <SearchBar />
      </div>
      <div className="hidden lg:block">
        <MainNav />
      </div>
    </header>
  );
}
