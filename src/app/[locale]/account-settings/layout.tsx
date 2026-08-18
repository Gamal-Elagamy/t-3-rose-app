import AccountSettingsSidebar from '@/features/account-settings/components/settings-sidebar';
import { getTranslations } from 'next-intl/server';

export default async function AccountSettingsLayout({ children }: { children: React.ReactNode }) {
  const t = await getTranslations('accountSettings');
  return (
    <div className="w-11/12 mx-auto py-8 md:py-15">
      {/* Section Title */}
      <h1 className="text-ds-text-plain text-3xl md:text-5xl font-bold mb-6 md:mb-9">
        {t('title')}
      </h1>

      {/* Settings Sidebar and Content */}
      <div className="flex flex-col md:flex-row gap-6 md:gap-9 h-auto md:h-screen">
        <AccountSettingsSidebar />
        {/* Content */}
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
