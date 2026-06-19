import { useTranslations } from 'next-intl';

export default function Home() {
  // Translation
  const t = useTranslations();

  return (
    <div className=" dark:bg-black">
      <h1 className="text-3xl font-bold underline text-center text-gray-800 dark:text-white">
        {t('title')}
      </h1>
    </div>
  );
}
