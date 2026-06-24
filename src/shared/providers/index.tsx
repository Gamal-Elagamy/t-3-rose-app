import { NextIntlClientProvider } from 'next-intl';
import ReactQueryProvider from './providers/react-query.provider';
import { TanStackDevtools } from '@tanstack/react-devtools';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProvider>
      <NextIntlClientProvider>{children}</NextIntlClientProvider>
      {process.env.NODE_ENV === 'development' && (
        <TanStackDevtools config={{ defaultOpen: false }} />
      )}
    </ReactQueryProvider>
  );
}
