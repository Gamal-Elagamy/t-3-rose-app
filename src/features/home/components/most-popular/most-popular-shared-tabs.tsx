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
    <div
      role="tablist"
      aria-label="Product occasions"
      className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-hide md:gap-6 md:pb-0"
    >
      {occasions.map((occasion) => {
        const isActive = activeId === occasion.id;
        const tabId = `most-popular-tab-${occasion.id}`;
        const panelId = `most-popular-panel-${occasion.id}`;

        return (
          <button
            key={occasion.id}
            id={tabId}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-controls={panelId}
            tabIndex={isActive ? 0 : -1}
            onClick={() => setActiveId(occasion.id)}
            className={cn(
              'cursor-pointer whitespace-nowrap text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-ds-bg-primary focus-visible:ring-offset-2 md:text-base',
              isActive ? 'text-ds-text-primary' : 'text-ds-text-muted hover:text-ds-text-primary'
            )}
          >
            {occasion.title}
          </button>
        );
      })}
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

  const tabId = `most-popular-tab-${occasionId}`;
  const panelId = `most-popular-panel-${occasionId}`;

  return (
    <div
      id={panelId}
      role="tabpanel"
      aria-labelledby={tabId}
      tabIndex={0}
      className="mt-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-ds-bg-primary focus-visible:ring-offset-2"
    >
      {children}
    </div>
  );
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
    <div className="mt-6 flex justify-end">
      <Link
        href={href}
        className="flex items-center gap-2.5 text-base font-medium text-ds-text-primary transition-colors focus-visible:ring-2 focus-visible:ring-ds-bg-primary focus-visible:ring-offset-2 focus-visible:outline-none"
      >
        {t('viewMore')}{' '}
        {isRTL ? (
          <MoveLeft className="h-5 w-5" aria-hidden="true" />
        ) : (
          <MoveRight className="h-5 w-5" aria-hidden="true" />
        )}
      </Link>
    </div>
  );
}
