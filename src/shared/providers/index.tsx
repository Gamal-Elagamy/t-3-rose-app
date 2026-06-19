import { NextIntlClientProvider } from 'next-intl';
import ReactQueryProvider from './providers/react-query.provider';
import { TanStackDevtools } from '@tanstack/react-devtools';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProvider>
      <TanStackDevtools config={{ defaultOpen: false }} />
      <NextIntlClientProvider> {children}</NextIntlClientProvider>
    </ReactQueryProvider>
  );
}
