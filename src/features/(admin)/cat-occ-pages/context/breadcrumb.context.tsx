'use client';
import { createContext, useContext, useState, useCallback } from 'react';

interface BreadcrumbContextType {
  extra?: string;
  setExtra: (text?: string) => void;
}

const BreadcrumbContext = createContext<BreadcrumbContextType | null>(null);

export function BreadcrumbProvider({ children }: { children: React.ReactNode }) {
  const [extra, setExtra] = useState<string | undefined>(undefined);

  const updateExtra = useCallback((text?: string) => setExtra(text), []);

  return (
    <BreadcrumbContext.Provider value={{ extra, setExtra: updateExtra }}>
      {children}
    </BreadcrumbContext.Provider>
  );
}

export function useBreadcrumb() {
  const ctx = useContext(BreadcrumbContext);
  if (!ctx) throw new Error('useBreadcrumb must be used within BreadcrumbProvider');
  return ctx;
}
