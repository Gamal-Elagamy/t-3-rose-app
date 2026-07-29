'use client';

import { Link } from '@/i18n/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { IOccasion } from '@/features/occasions/types/occasions';
import { cn } from '@/shared/lib/utils/tailwind-cn';
import { createContext, useContext, useEffect, useState } from 'react';
import { MoveRight, MoveLeft } from 'lucide-react';

interface MostPopularSharedTabsContextValue {
  activeId: string | null;
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

export function MostPopularSharedTabsProvider({ children }: { children: React.ReactNode }) {
  // State
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <MostPopularSharedTabsContext.Provider value={{ activeId, setActiveId }}>
      {children}
    </MostPopularSharedTabsContext.Provider>
  );
}

export function DefaultActiveTabSync({ defaultActiveId }: { defaultActiveId: string }) {
  // State
  const { activeId, setActiveId } = useMostPopularSharedTabs();

  useEffect(() => {
    if (activeId === null && defaultActiveId) {
      setActiveId(defaultActiveId);
    }
  }, [activeId, defaultActiveId, setActiveId]);

  return null;
}

interface MostPopularTabListProps {
  occasions: IOccasion[];
}

export function MostPopularTabList({ occasions }: MostPopularTabListProps) {
  // State
  const { activeId, setActiveId } = useMostPopularSharedTabs();

  return (
    <div className="flex items-center gap-4 md:gap-6 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
      {occasions.map((occasion) => (
        <button
          key={occasion.id}
          type="button"
          onClick={() => setActiveId(occasion.id)}
          className={cn(
            'cursor-pointer text-sm md:text-base font-medium transition-colors whitespace-nowrap',
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
  // State
  const { activeId } = useMostPopularSharedTabs();

  if (activeId !== occasionId) {
    return null;
  }

  return <div className="mt-10">{children}</div>;
}

export function ViewMoreLink() {
  // State
  const { activeId } = useMostPopularSharedTabs();
  // Translation
  const t = useTranslations('home');
  // Variables
  const locale = useLocale();
  const isRTL = locale === 'ar';
  // Functions
  const href = activeId ? `/products?occasion=${activeId}` : '/products';

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
