import { useTranslations } from 'next-intl';
import LanguageSwitcher from '@/shared/components/language-switcher';

export default function Home() {
  // Translation
  const t = useTranslations();

  return (
    <div className="dark:bg-black">
      <LanguageSwitcher />
      <h1 className="text-center text-3xl font-bold text-gray-800 underline dark:text-white">
        {t('title')}
      </h1>
    </div>
  );
}
