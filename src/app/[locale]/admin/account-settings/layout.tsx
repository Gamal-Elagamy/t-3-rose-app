import { authOptions } from '@/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (session?.user.role !== 'ADMIN') {
    redirect('/');
  }

  return (
    <>
      <div>
        <h1 className="mx-auto mt-4 w-11/12 text-2xl font-semibold leading-none">
          Change Password
        </h1>
        <div className="mx-auto mt-4 w-11/12 max-h-96 gap-4 rounded-2xl bg-white p-6">
          {children}
        </div>
      </div>
    </>
  );
}
