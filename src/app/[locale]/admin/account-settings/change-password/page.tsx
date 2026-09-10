import { getTranslations } from 'next-intl/server';

import UpdatePasswordForm from '@/features/account-settings/components/update-password-form';

export default async function ChangePasswordPage() {
  const t = await getTranslations('change-password');

  return (
    <div>
      <h1 className="mx-auto mt-4 w-11/12 text-2xl font-semibold leading-none">{t('title')}</h1>
      <div className="mx-auto mt-4 max-h-96 w-11/12 gap-4 rounded-2xl bg-white dark:bg-zinc-800 p-6">
        <UpdatePasswordForm />
      </div>
    </div>
  );
}
