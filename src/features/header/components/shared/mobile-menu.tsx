'use client';

import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { Menu, X, User, Package, LogOut, MapPin } from 'lucide-react';
import { navItems } from './types/nav-items';

import { useUserLocation } from './deliver-to/hooks/use-user-location';
import LanguageSwitcher from '@/shared/components/language-switcher';
import { ThemeToggle } from '@/shared/components/theme-toggle';

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
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label={t('header.mobile.openMenu')}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        className="text-ds-text-default outline-none focus-visible:ring-2 focus-visible:ring-ds-bg-primary focus-visible:ring-offset-2 lg:hidden"
      >
        <Menu className="size-6" aria-hidden="true" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex overflow-x-hidden bg-black/50 lg:hidden">
          <div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-menu-title"
            className="flex h-full w-[min(20rem,calc(100vw-1rem))] flex-col gap-6 overflow-x-hidden overflow-y-auto bg-ds-bg-plain p-4"
          >
            <div className="flex items-center justify-between">
              <span id="mobile-menu-title" className="text-lg font-semibold text-ds-text-default">
                {t('header.mobile.menu')}
              </span>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label={t('header.mobile.closeMenu')}
                className="rounded-md text-ds-text-default outline-none focus-visible:ring-2 focus-visible:ring-ds-bg-primary focus-visible:ring-offset-2"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>

            {/* Deliver to */}
            <div className="flex items-center gap-2 text-sm text-ds-text-default">
              <MapPin className="size-4 shrink-0" aria-hidden="true" />

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
                  className="flex items-center gap-2.5 rounded-md px-2 py-2.5 text-sm text-ds-text-default outline-none hover:bg-ds-bg-subtle focus-visible:ring-2 focus-visible:ring-ds-bg-primary focus-visible:ring-inset"
                >
                  <Icon className="size-4 shrink-0" aria-hidden="true" />
                  {t(`header.navItems.${key}`)}
                </Link>
              ))}
            </nav>

            <div className="h-px bg-ds-border-subtle" aria-hidden="true" />

            {/* Account section */}
            {isAuthenticated ? (
              <div className="flex flex-col gap-1">
                <p className="px-2 text-sm font-semibold text-ds-text-default">
                  {session?.user?.firstName}
                </p>

                <Link
                  href="/account"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2.5 rounded-md px-2 py-2.5 text-sm text-ds-text-default outline-none hover:bg-ds-bg-subtle focus-visible:ring-2 focus-visible:ring-ds-bg-primary focus-visible:ring-inset"
                >
                  <User className="size-4 shrink-0" aria-hidden="true" />
                  {t('header.userDropdown.account')}
                </Link>

                <Link
                  href="/orders"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2.5 rounded-md px-2 py-2.5 text-sm text-ds-text-default outline-none hover:bg-ds-bg-subtle focus-visible:ring-2 focus-visible:ring-ds-bg-primary focus-visible:ring-inset"
                >
                  <Package className="size-4 shrink-0" aria-hidden="true" />
                  {t('header.userDropdown.orders')}
                </Link>

                <button
                  type="button"
                  onClick={() => signOut()}
                  className="flex items-center gap-2.5 rounded-md px-2 py-2.5 text-start text-sm text-ds-text-default outline-none hover:bg-ds-bg-subtle focus-visible:ring-2 focus-visible:ring-ds-bg-primary focus-visible:ring-inset"
                >
                  <LogOut className="size-4 shrink-0" aria-hidden="true" />
                  {t('header.userDropdown.logout')}
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="rounded-md bg-ds-bg-primary px-4 py-2.5 text-center text-sm font-semibold text-ds-text-inverse outline-none focus-visible:ring-2 focus-visible:ring-ds-bg-primary focus-visible:ring-offset-2"
              >
                {t('header.nav.login')}
              </Link>
            )}

            {/* Settings */}
            <div className="mt-auto flex items-center justify-between border-t border-ds-border-subtle pt-4">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
