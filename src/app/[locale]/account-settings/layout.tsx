import AccountSettingsSidebar from '@/features/account-settings/components/settings-sidebar';
import { getTranslations } from 'next-intl/server';

export default async function AccountSettingsLayout({ children }: { children: React.ReactNode }) {
  const t = await getTranslations('accountSettings');
  return (
    <div className="w-11/12 mx-auto py-15">
      {/* Section Title */}
      <h1 className="text-ds-text-plain text-5xl font-bold mb-9">{t('title')}</h1>

      {/* Settings Sidebar and Content */}
      <div className="flex gap-9 h-screen">
        <AccountSettingsSidebar />
        {/* Content */}
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
