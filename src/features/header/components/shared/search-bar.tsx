'use client';

import { useState } from 'react';
import { useRouter } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { Search } from 'lucide-react';

export function SearchBar() {
  // Translation
  const t = useTranslations();

  // Hooks
  const router = useRouter();

  // State
  const [query, setQuery] = useState('');

  // Handlers
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/products?search=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-1 items-center">
      <div className="flex w-full items-center gap-2 rounded-full border border-ds-border-default px-4 py-2.5">
        <Search className="size-4 shrink-0 text-ds-text-muted" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t('header.nav.searchPlaceholder')}
          className="w-full bg-transparent text-sm text-ds-text-default outline-none placeholder:text-ds-text-muted"
        />
      </div>
    </form>
  );
}
