import { NextIntlClientProvider } from 'next-intl';
import ReactQueryProvider from './react-query.provider';
import { TanStackDevtools } from '@tanstack/react-devtools';
import { ThemeProvider } from './theme.provider';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <ReactQueryProvider>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
        {process.env.NODE_ENV === 'development' && (
          <TanStackDevtools config={{ defaultOpen: false }} />
        )}
      </ReactQueryProvider>
    </ThemeProvider>
  );
}
