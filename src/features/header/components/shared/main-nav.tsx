import { Link } from '@/i18n/navigation';
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

  return (
    <nav className="flex items-center justify-center gap-8 bg-ds-bg-primary py-3">
      {navItems.map(({ key, href, icon: Icon }) => (
        <Link
          key={key}
          href={href}
          className="flex items-center gap-1.5 text-sm text-ds-text-inverse hover:opacity-80"
        >
          <Icon className="size-4" />
          {t(`header.navItems.${key}`)}
        </Link>
      ))}
    </nav>
  );
}
