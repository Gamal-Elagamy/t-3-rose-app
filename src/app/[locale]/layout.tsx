import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { cn } from '@/shared/lib/utils/tailwind-cn';
import Providers from '@/shared/providers';
import { hasLocale } from 'next-intl';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { LayoutProps } from '@/shared/lib/types/locale';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
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
    title: t('app_name'),
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
      className={cn('h-full', 'antialiased', inter.variable)}
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
