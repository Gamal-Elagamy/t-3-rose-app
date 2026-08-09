import AccountSettingsSidebar from '@/features/account-settings/components/settings-sidebar';

export default function AccountSettingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-11/12 mx-auto py-15">
      {/* Section Title */}
      <h1 className="text-ds-text-plain text-5xl font-bold mb-9">Account Settings</h1>

      {/* Settings Sidebar and Content */}
      <div className="flex gap-9 h-screen">
        <AccountSettingsSidebar />
        {/* Content */}
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
