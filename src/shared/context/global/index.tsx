import ReactQueryProvider from './providers/reaqt-query.provider';
import { TanStackDevtools } from '@tanstack/react-devtools';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProvider>
      <TanStackDevtools config={{ defaultOpen: false }} />
      {children}
    </ReactQueryProvider>
  );
}
