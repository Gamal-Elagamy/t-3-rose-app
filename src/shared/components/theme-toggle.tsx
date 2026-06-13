'use client';

import { useSyncExternalStore } from 'react';
import { useTheme } from 'next-themes';
import { useTranslations } from 'next-intl';

export function ThemeToggle() {
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const { theme, setTheme } = useTheme();

  const t = useTranslations('theme');

  if (!mounted) {
    return (
      <button
        type="button"
        title="toggle button"
        className="size-10 rounded-full bg-background/50 backdrop-blur-sm border border-border"
      />
    );
  }

  return (
    <>
      <p>{t('toggle')}</p>

      <button
        type="button"
        title="toggle button"
        className="size-20 rounded-full bg-background/50 backdrop-blur-sm border border-border"
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      >
        {theme === 'dark' ? (
          <span>{t('dark')}🌙</span>
        ) : (
          <span>{t('light')}☀️</span>
        )}
      </button>
    </>
  );
}
