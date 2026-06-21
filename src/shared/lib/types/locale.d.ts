import { ReactNode } from 'react';

export interface LayoutProps<T> {
  children: ReactNode;
  params: Promise<T>;
}
