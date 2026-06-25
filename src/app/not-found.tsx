import Link from 'next/link';
import { routing } from '@/i18n/routing';

export default function NotFound() {
  return (
    <html lang={routing.defaultLocale}>
      <body className="h-full flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-red-700">404 - Not Found</h1>
        <p>The page you are looking for does not exist.</p>
        <Link className="text-red-500" href={`/${routing.defaultLocale}/`}>
          Go back to Home
        </Link>
      </body>
    </html>
  );
}
