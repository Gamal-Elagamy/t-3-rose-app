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
    <nav className="flex items-center justify-center gap-8 bg-ds-bg-primary py-1">
      {navItems.map(({ key, href, icon: Icon }) => {
        const isActive = pathname === href;
        return (
          <Link
            key={key}
            href={href}
            className={`flex flex-col items-center gap-1.5 pt-3 text-sm transition-colors ${
              isActive
                ? 'text-ds-text-inverse'
                : 'text-ds-text-inverse/70 hover:text-ds-text-inverse'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <Icon className="size-4" />
              {t(`header.navItems.${key}`)}
            </span>
            <span
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
