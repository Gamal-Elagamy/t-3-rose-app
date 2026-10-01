import { Link, usePathname } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { Home, Gift, LayoutList, PartyPopper, Headset, Info } from 'lucide-react';

const navItems = [
  { key: 'home', href: '/', icon: Home },
  { key: 'products', href: '/products', icon: Gift },
  { key: 'categories', href: '/categories', icon: LayoutList },
  { key: 'occasions', href: '/occasions', icon: PartyPopper },
  { key: 'contact', href: '/contact', icon: Headset },
  { key: 'about', href: '/about', icon: Info },
] as const;

export function MainNav() {
  const t = useTranslations();
  const pathname = usePathname();

  return (
    <nav className="flex items-center justify-start gap-8 overflow-x-auto bg-ds-bg-primary px-4 py-1 lg:justify-center">
      {navItems.map(({ key, href, icon: Icon }) => {
        const isActive = pathname === href;

        return (
          <Link
            key={key}
            href={href}
            aria-current={isActive ? 'page' : undefined}
            className={`flex shrink-0 flex-col items-center gap-1.5 pt-3 text-sm whitespace-nowrap outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ds-text-inverse focus-visible:ring-offset-2 focus-visible:ring-offset-ds-bg-primary ${
              isActive
                ? 'text-ds-text-inverse'
                : 'text-ds-text-inverse/70 hover:text-ds-text-inverse'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <Icon className="size-4 shrink-0" aria-hidden="true" />
              {t(`header.navItems.${key}`)}
            </span>

            <span
              aria-hidden="true"
              className={`h-0.5 w-full rounded-full transition-colors ${
                isActive ? 'bg-ds-text-inverse' : 'bg-transparent'
              }`}
            />
          </Link>
        );
      })}
    </nav>
  );
}
