'use client';

import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { Menu, X, User, Package, LogOut, MapPin } from 'lucide-react';
import { navItems } from './types/nav-items';

import { useUserLocation } from './deliver-to/hooks/use-user-location';
import LanguageSwitcher from '@/shared/components/language-switcher';

export function MobileMenu() {
  // Translation
  const t = useTranslations();

  // Hooks
  const { data: session, status } = useSession();
  const { city, isLoading: locationLoading } = useUserLocation();

  // State
  const [isOpen, setIsOpen] = useState(false);

  const isAuthenticated = status === 'authenticated';

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        aria-label={t('header.mobile.openMenu')}
        className="text-ds-text-default lg:hidden"
      >
        <Menu className="size-6" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex bg-black/50 lg:hidden">
          <div className="flex h-full w-full max-w-xs flex-col gap-6 overflow-y-auto bg-ds-bg-plain p-4">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-ds-text-default">
                {t('header.mobile.menu')}
              </span>
              <button onClick={() => setIsOpen(false)} aria-label={t('header.mobile.closeMenu')}>
                <X className="size-5" />
              </button>
            </div>

            {/* Deliver to */}
            <div className="flex items-center gap-2 text-sm text-ds-text-default">
              <MapPin className="size-4" />
              {locationLoading
                ? t('header.nav.locating')
                : (city ?? t('header.nav.selectLocation'))}
            </div>

            {/* Nav links */}
            <nav className="flex flex-col gap-1">
              {navItems.map(({ key, href, icon: Icon }) => (
                <Link
                  key={key}
                  href={href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2.5 rounded-md px-2 py-2.5 text-sm text-ds-text-default hover:bg-ds-bg-subtle"
                >
                  <Icon className="size-4" />
                  {t(`header.navItems.${key}`)}
                </Link>
              ))}
            </nav>

            <div className="h-px bg-ds-border-subtle" />

            {/* Account section */}
            {isAuthenticated ? (
              <div className="flex flex-col gap-1">
                <p className="px-2 text-sm font-semibold text-ds-text-default">
                  {session?.user?.firstName}
                </p>
                <Link
                  href="/account"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2.5 rounded-md px-2 py-2.5 text-sm text-ds-text-default hover:bg-ds-bg-subtle"
                >
                  <User className="size-4" />
                  {t('header.userDropdown.account')}
                </Link>
                <Link
                  href="/orders"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2.5 rounded-md px-2 py-2.5 text-sm text-ds-text-default hover:bg-ds-bg-subtle"
                >
                  <Package className="size-4" />
                  {t('header.userDropdown.orders')}
                </Link>
                <button
                  onClick={() => signOut()}
                  className="flex items-center gap-2.5 rounded-md px-2 py-2.5 text-start text-sm text-ds-text-default hover:bg-ds-bg-subtle"
                >
                  <LogOut className="size-4" />
                  {t('header.userDropdown.logout')}
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="rounded-md bg-ds-bg-primary px-4 py-2.5 text-center text-sm font-semibold text-ds-text-inverse"
              >
                {t('header.nav.login')}
              </Link>
            )}

            <div className="mt-auto">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
