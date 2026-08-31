import UpdatePasswordForm from '@/features/account-settings/components/update-password-form';

export default function ChangePasswordPage() {
  return (
    <>
      <div>
        <h1 className="mx-auto mt-4 w-11/12 text-2xl font-semibold leading-none">
          Change Password
        </h1>
        <div className="mx-auto mt-4 w-11/12 max-h-96 gap-4 rounded-2xl bg-white p-6">
          <UpdatePasswordForm />
        </div>
      </div>
    </>
  );
}
