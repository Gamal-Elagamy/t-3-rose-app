import { NextIntlClientProvider } from 'next-intl';
import ReactQueryProvider from './react-query.provider';
import { TanStackDevtools } from '@tanstack/react-devtools';
import { ThemeProvider } from './theme.provider';
import NextAuthProvider from './nexف-auth.provider';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextAuthProvider>
      <ThemeProvider>
        <ReactQueryProvider>
          <NextIntlClientProvider>{children}</NextIntlClientProvider>
          {process.env.NODE_ENV === 'development' && (
            <TanStackDevtools config={{ defaultOpen: false }} />
          )}
        </ReactQueryProvider>
      </ThemeProvider>
    </NextAuthProvider>
  );
}
