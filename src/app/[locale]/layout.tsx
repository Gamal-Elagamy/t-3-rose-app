import type { Metadata } from 'next';
import { Geist_Mono, Inter } from 'next/font/google';
import { cn } from '@/shared/lib/utils/tailwind-cn';
import Providers from '@/shared/providers';
import { hasLocale, Locale } from 'next-intl';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { LayoutProps } from '@/shared/lib/types/locale';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

type LocaleLayoutProps = LayoutProps<{
  locale: Locale;
}>;

export async function generateMetadata({ params }: LocaleLayoutProps): Promise<Metadata> {
  const paramsResult = await params;
  const locale = paramsResult.locale;
  const t = await getTranslations({ locale });
  const title = t('app_name');
  return {
    title,
  };
}
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LoacaleLayout({ children, params }: LocaleLayoutProps) {
  // Ensure that the incoming `locale` is valid
  const paramsResult = await params;
  const locale = paramsResult.locale;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  // Enable static rendering
  setRequestLocale(locale);
  return (
    <html
      lang={locale}
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
      className={cn('h-full', 'antialiased', inter.className, geistMono.variable, inter.variable)}
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
