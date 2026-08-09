'use client';
import { Button } from '@/shared/components/ui/button';
import { UserRoundPen, Lock, LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

export default function AccountSettingsSidebar() {
  const pathname = usePathname();
  const t = useTranslations('accountSettings.sidebar');

  const userSettinsNavLinks = [
    {
      id: 1,
      name: t('profile'),
      href: '/account-settings',
      icon: <UserRoundPen className="w-6 h-6" />,
    },
    {
      id: 2,
      name: t('changePassword'),
      href: '/account-settings/change-password',
      icon: <Lock className="w-6 h-6" />,
    },
  ];
  return (
    <div className="w-75 p-4 bg-ds-bg-subtle shrink-0 flex flex-col border border-ds-border-subtle rounded-lg">
      <ul>
        {userSettinsNavLinks.map((link) => (
          <li key={link.id}>
            <Link
              href={link.href}
              className={`flex items-center gap-3 rounded-lg px-4 py-2.5 mb-2.5 font-medium text-base ${
                pathname.endsWith(link.href)
                  ? 'text-ds-text-inverse bg-ds-bg-inverse'
                  : 'text-ds-text-plain'
              }`}
            >
              {link.icon}
              {link.name}
            </Link>
          </li>
        ))}
      </ul>

      <Button
        onClick={() => signOut({ callbackUrl: '/' })}
        className="bg-ds-bg-muted text-ds-text-danger hover:bg-ds-bg-muted/80 flex items-center gap-2 px-4 py-3 cursor-pointer mt-auto text-md font-normal justify-start"
      >
        <LogOut className="w-6 h-6 text-ds-text-danger rotate-180" />
        {t('logout')}
      </Button>
    </div>
  );
}
