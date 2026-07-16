'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { IOccasion } from '@/features/occasions/types/occasions';
import { cn } from '@/shared/lib/utils/tailwind-cn';
import { createContext, useContext, useState } from 'react';
import { MoveRight, MoveLeft } from 'lucide-react';

interface MostPopularSharedTabsContextValue {
  activeId: string;
  setActiveId: (id: string) => void;
}

const MostPopularSharedTabsContext = createContext<MostPopularSharedTabsContextValue | null>(null);

function useMostPopularSharedTabs() {
  const context = useContext(MostPopularSharedTabsContext);
  if (!context) {
    throw new Error('Most popular tabs must be used within MostPopularSharedTabsProvider');
  }
  return context;
}

export function MostPopularSharedTabsProvider({
  children,
  defaultActiveId,
}: {
  children: React.ReactNode;
  defaultActiveId?: string;
}) {
  const [activeId, setActiveId] = useState(defaultActiveId || '__initial__');

  return (
    <MostPopularSharedTabsContext.Provider value={{ activeId, setActiveId }}>
      {children}
    </MostPopularSharedTabsContext.Provider>
  );
}

interface MostPopularTabListProps {
  occasions: IOccasion[];
}

export function MostPopularTabList({ occasions }: MostPopularTabListProps) {
  const { activeId, setActiveId } = useMostPopularSharedTabs();

  return (
    <div className="flex items-center gap-6">
      {occasions.map((occasion) => (
        <button
          key={occasion.id}
          type="button"
          onClick={() => setActiveId(occasion.id)}
          className={cn(
            'cursor-pointer text-base font-medium transition-colors',
            activeId === occasion.id
              ? 'text-ds-text-primary'
              : 'text-ds-text-muted hover:text-ds-text-primary'
          )}
        >
          {occasion.title}
        </button>
      ))}
    </div>
  );
}

interface MostPopularTabPanelProps {
  occasionId: string;
  children: React.ReactNode;
}

export function MostPopularTabPanel({ occasionId, children }: MostPopularTabPanelProps) {
  const { activeId } = useMostPopularSharedTabs();

  if (activeId !== occasionId) {
    return null;
  }

  return <div className="mt-10">{children}</div>;
}

export function ViewMoreLink() {
  const { activeId } = useMostPopularSharedTabs();
  const t = useTranslations('home');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const href =
    activeId && activeId !== '__initial__' ? `/products?occasion=${activeId}` : '/products';

  return (
    <div className="flex justify-end mt-6">
      <Link
        href={href}
        className="text-ds-text-primary flex items-center gap-2.5 transition-colors text-base font-medium"
      >
        {t('viewMore')}{' '}
        {isRTL ? <MoveLeft className="w-5 h-5" /> : <MoveRight className="w-5 h-5" />}
      </Link>
    </div>
  );
}
