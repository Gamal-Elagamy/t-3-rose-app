import Link from 'next/link';
import { routing } from '@/i18n/routing';
import Image from 'next/image';

export default function NotFound() {
  return (
    <html lang={routing.defaultLocale}>
      <body className="flex min-h-screen items-center justify-center bg-background px-6">
        <main className="w-full max-w-md rounded-xl border bg-card p-8 text-center shadow-sm">
          <Image
            src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"
            alt="404 Not Found"
            className="mx-auto mb-6 h-56 w-auto rounded-lg"
            width={200}
            height={200}
          />

          <h1 className="mb-2 text-4xl font-bold">404</h1>

          <h2 className="mb-3 text-xl font-semibold">Page Not Found</h2>

          <p className="mb-6 text-muted-foreground">
            Sorry, the page you are looking for doesn&apos;t exist or has been moved.
          </p>

          <Link
            href={`/${routing.defaultLocale}/`}
            className="inline-flex rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            Go back Home
          </Link>
        </main>
      </body>
    </html>
  );
}
