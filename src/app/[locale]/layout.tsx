import type { Metadata } from 'next';
import { cn } from '@/shared/lib/utils/tailwind-cn';
import Providers from '@/shared/providers';
import { hasLocale } from 'next-intl';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { LayoutProps } from '@/shared/lib/types/locale';

import { Sarabun, Tajawal, Zain } from 'next/font/google';

// Fonts
const zain = Zain({
  subsets: ['arabic'],
  variable: '--font-zain',
  weight: ['300', '400', '700', '800'],
  fallback: ['system-ui', 'sans-serif'],
});

const sarabun = Sarabun({
  subsets: ['latin'],
  variable: '--font-en',
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  fallback: ['system-ui', 'sans-serif'],
});

const tajawal = Tajawal({
  subsets: ['arabic'],
  variable: '--font-ar',
  weight: ['200', '300', '400', '500', '700', '800', '900'],
  fallback: ['system-ui', 'sans-serif'],
});

type LocaleLayoutProps = LayoutProps<{
  locale: string;
}>;

export async function generateMetadata({ params }: LocaleLayoutProps): Promise<Metadata> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const t = await getTranslations({ locale });

  return {
    title: t('app-name'),
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
      className={cn('h-full', 'antialiased', sarabun.variable, tajawal.variable, zain.variable)}
      suppressHydrationWarning
    >
      <body className={locale === 'ar' ? 'font-tajawal' : 'font-sarabun'}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
