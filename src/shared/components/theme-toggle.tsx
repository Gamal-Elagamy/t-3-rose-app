'use client';

import { useSyncExternalStore } from 'react';
import { Sun, Monitor, Moon } from 'lucide-react';
import { Button } from './ui/button';
import { useTheme } from 'next-themes';
import { useTranslations } from 'next-intl';
import { IThemeOptions } from '../lib/types/theme';
import { cn } from '../lib/utils/tailwind-cn';

export function ThemeToggle() {
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const { theme, setTheme } = useTheme();
  const t = useTranslations('theme');

  const options: IThemeOptions[] = [
    {
      value: 'light',
      icon: <Sun className="w-6 h-6" />,
      label: t('light'),
    },
    {
      value: 'system',
      icon: <Monitor className="w-6 h-6" />,
      label: t('system'),
    },
    {
      value: 'dark',
      icon: <Moon className="w-6 h-6" />,
      label: t('dark'),
    },
  ];

  if (!mounted) {
    return (
      <div className="flex items-center justify-center h-10 rounded-full bg-ds-bg-plain border border-ds-border-soft w-fit p-0.75">
        {options.map((opt) => (
          <Button
            key={opt.value}
            variant="ghost"
            type="button"
            aria-label={opt.label}
            onClick={() => setTheme(opt.value)}
            className={cn('flex items-center justify-center rounded-full w-8.5 h-8.5')}
          >
            {opt.icon}
          </Button>
        ))}
      </div>
    );
  }

  return (
    <div
      role="group"
      aria-label={t('toggle')}
      className="flex items-center justify-center h-10 rounded-full bg-ds-bg-plain border border-ds-border-soft w-fit p-0.75"
    >
      {options.map((opt) => {
        const isActive = theme === opt.value;

        return (
          <Button
            key={opt.value}
            variant="ghost"
            type="button"
            aria-label={opt.label}
            aria-pressed={isActive}
            onClick={() => setTheme(opt.value)}
            className={cn(
              'flex items-center justify-center rounded-full w-8.5 h-8.5 cursor-pointer',
              isActive && 'bg-ds-bg-soft dark:bg-ds-bg-muted'
            )}
          >
            {opt.icon}
          </Button>
        );
      })}
    </div>
  );
}
