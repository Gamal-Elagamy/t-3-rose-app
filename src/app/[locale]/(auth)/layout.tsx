import Image from 'next/image';
import imageUrl from '@/assets/images/auth/auth-image.png';
import AuthHeader from '@/features/auth/components/header';
import AuthFooter from '@/features/auth/components/footer';

type AuthLayoutProps = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="min-h-screen">
      <div className="grid min-h-screen grid-cols-1 md:grid-cols-2">
        {/* Left Side */}
        <section className="flex items-center justify-center  h-screen flex-col gap-10 bg-ds-bg-plain">
          {/* Header */}
          <AuthHeader />

          {/* Content */}
          <div className="flex-1">{children}</div>

          {/* Footer */}
          <AuthFooter />
        </section>

        {/* Right Side */}
        <aside className="relative hidden h-screen md:block pt-15 pb-15 pr-5 pl-5 gap-3">
          <Image src={imageUrl} alt="Authentication" fill priority className="object-cover" />
        </aside>
      </div>
    </main>
  );
}
