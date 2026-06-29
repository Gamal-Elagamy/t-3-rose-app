import Image from 'next/image';

import imageUrl from '@/assets/images/auth/auth-image.png';
import AuthFooter from '@/features/auth/components/footer';
import AuthHeader from '@/features/auth/components/header';

type AuthLayoutProps = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="h-screen overflow-hidden">
      <div className="grid h-full grid-cols-1 md:grid-cols-2">
        {/* Left Side */}
        <section className="flex h-full flex-col bg-ds-bg-plain">
          <AuthHeader />

          <div className="flex flex-1 items-center justify-center">{children}</div>

          <AuthFooter />
        </section>

        {/* Right Side */}
        <aside className="relative hidden h-full md:block">
          <Image src={imageUrl} alt="Authentication" fill priority className="object-cover" />
        </aside>
      </div>
    </main>
  );
}
