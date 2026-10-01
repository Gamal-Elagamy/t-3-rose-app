'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { User } from 'lucide-react';

import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui/popover';

import { LoginPopoverForm } from './login-popover-form';

export function LoginPopover() {
  const t = useTranslations();
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      {/* Login Trigger */}
      <PopoverTrigger
        nativeButton={false}
        onMouseEnter={() => setOpen(true)}
        render={
          <Link
            href="/login"
            className="flex items-center gap-1.5 border-none p-2 text-sm text-ds-text-default transition-colors hover:text-ds-text-primary sm:gap-2"
          >
            <User className="size-4 shrink-0 sm:size-5" />

            <span>{t('header.nav.login')}</span>
          </Link>
        }
      />

      {/* Login Popover */}
      <PopoverContent
        align="end"
        side="bottom"
        sideOffset={8}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className="
          w-[calc(100vw-2rem)]
          max-w-100
          overflow-hidden
          rounded-xl
          bg-white
          p-0
          dark:bg-ds-bg-plain
          sm:w-100
          sm:rounded-2xl
        "
      >
        {/* Login / Register Tabs */}
        <div className="grid w-full grid-cols-2 border-b border-ds-border-muted">
          {/* Login Tab */}
          <div className="flex min-h-12 items-center justify-center rounded-tl-xl bg-ds-bg-primary px-3 py-2 text-sm font-medium text-ds-text-inverse sm:min-h-14 sm:px-4 sm:text-base">
            {t('login.button')}
          </div>

          {/* Register Tab */}
          <Link
            href="/register"
            className="flex min-h-12 items-center justify-center rounded-tr-xl px-3 py-2 text-sm font-medium text-ds-text-default transition-colors hover:bg-black/5 sm:min-h-14 sm:px-4 sm:text-base dark:hover:bg-white/5"
          >
            {t('login.register')}
          </Link>
        </div>

        {/* Login Form */}
        <LoginPopoverForm onSuccess={() => setOpen(false)} />
      </PopoverContent>
    </Popover>
  );
}
