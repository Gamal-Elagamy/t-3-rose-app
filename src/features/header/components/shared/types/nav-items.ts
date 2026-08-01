import { Home, Gift, LayoutList, PartyPopper, Headset, Info } from 'lucide-react';

export const navItems = [
  { key: 'home', href: '/', icon: Home },
  { key: 'products', href: '/products', icon: Gift },
  { key: 'categories', href: '/categories', icon: LayoutList },
  { key: 'occasions', href: '/occasions', icon: PartyPopper },
  { key: 'contact', href: '/contact', icon: Headset },
  { key: 'about', href: '/about', icon: Info },
] as const;
