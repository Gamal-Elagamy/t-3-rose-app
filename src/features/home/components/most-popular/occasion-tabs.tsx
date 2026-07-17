'use client';

import { IOccasion } from '@/features/occasions/types/occasions';
import { cn } from '@/shared/lib/utils/tailwind-cn';
import { createContext, useContext, useState } from 'react';

const OccasionTabsContext = createContext<{
  activeId: string;
  setActiveId: (id: string) => void;
} | null>(null);

function useOccasionTabs() {
  const context = useContext(OccasionTabsContext);
  if (!context) {
    throw new Error('Occasion tab components must be used within OccasionTabs');
  }
  return context;
}

interface OccasionTabsProps {
  occasions: IOccasion[];
  children: React.ReactNode;
}

export function OccasionTabs({ occasions, children }: OccasionTabsProps) {
  const [activeId, setActiveId] = useState(occasions[1]?.id ?? '');

  return (
    <OccasionTabsContext.Provider value={{ activeId, setActiveId }}>
      {children}
    </OccasionTabsContext.Provider>
  );
}

interface OccasionTabListProps {
  occasions: IOccasion[];
}

export function OccasionTabList({ occasions }: OccasionTabListProps) {
  const { activeId, setActiveId } = useOccasionTabs();

  return (
    <div className="flex items-center gap-6">
      {occasions.map((occasion) => (
        <button
          key={occasion.id}
          type="button"
          onClick={() => setActiveId(occasion.id)}
          className={cn(
            'cursor-pointer text-base font-medium transition-colors',
            activeId === occasion.id ? 'text-maroon-600' : 'text-zinc-700 hover:text-maroon-600'
          )}
        >
          {occasion.title}
        </button>
      ))}
    </div>
  );
}

interface OccasionTabPanelProps {
  occasionId: string;
  children: React.ReactNode;
}

export function OccasionTabPanel({ occasionId, children }: OccasionTabPanelProps) {
  const { activeId } = useOccasionTabs();

  if (activeId !== occasionId) {
    return null;
  }

  return <div className="mt-10">{children}</div>;
}
