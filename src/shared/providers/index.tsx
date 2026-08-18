import { NextIntlClientProvider } from 'next-intl';
import ReactQueryProvider from './react-query.provider';
import { TanStackDevtools } from '@tanstack/react-devtools';
import { ThemeProvider } from './theme.provider';
import NextAuthProvider from './next-auth.provider';
import CartContextProviders from '@/features/cart/context/cart.context';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextAuthProvider>
      <ThemeProvider>
        <NextIntlClientProvider>
          <ReactQueryProvider>
            <CartContextProviders>{children} </CartContextProviders>
            {process.env.NODE_ENV === 'development' && (
              <TanStackDevtools config={{ defaultOpen: false }} />
            )}
          </ReactQueryProvider>
        </NextIntlClientProvider>
      </ThemeProvider>
    </NextAuthProvider>
  );
}
