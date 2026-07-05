import Image from 'next/image';

import imageUrl from '@/assets/images/auth/auth-image.png';
import AuthFooter from '@/features/auth/components/auth-footer';
import AuthHeader from '@/features/auth/components/auth-header';

type AuthLayoutProps = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="grid h-screen grid-cols-1 overflow-hidden md:grid-cols-2">
      {/* Left Side */}
      <section className="flex flex-col overflow-y-auto bg-ds-bg-plain gap-10 min-w-96">
        <AuthHeader />

        <div className="flex flex-1 items-center justify-center">{children}</div>

        <AuthFooter />
      </section>

      {/* Right Side */}
      <aside className="relative hidden h-screen md:block">
        <Image src={imageUrl} alt="Authentication" fill priority className="object-cover" />
      </aside>
    </main>
  );
}
