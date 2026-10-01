'use client';
import { usePathname, useRouter } from '@/i18n/navigation';
import { Field, FieldLabel } from '@/shared/components/ui/field';
import { Input } from '@/shared/components/ui/input';
import { useDebounce } from '@/shared/lib/utils/use-debounced';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ItemPageType } from '../types/page-type';
import { itemPageConfig } from '../config/item-page.config';

export default function ItemSearchInput({ page }: { page: ItemPageType }) {
  // Translations
  const t = useTranslations(itemPageConfig[page].translationNamespace);

  // Navigation
  const router = useRouter();

  const pathname = usePathname();
  const searchParams = useSearchParams();

  // State
  const [text, setText] = useState(searchParams.get('search') ?? '');

  // Search Debounce Hook
  const debouncedSearchTerm = useDebounce(text, 500);

  // Effect
  useEffect(() => {
    const currentSearch = searchParams.get('search') ?? '';
    if (debouncedSearchTerm === currentSearch) return;

    const params = new URLSearchParams(searchParams);

    if (debouncedSearchTerm) {
      params.set('search', debouncedSearchTerm);
    } else {
      params.delete('search');
    }

    params.delete('page');

    router.push(`${pathname}?${params.toString()}`);
  }, [debouncedSearchTerm, pathname, router, searchParams]);

  return (
    <div className="search">
      <Field>
        <FieldLabel htmlFor="search">{t('search')}</FieldLabel>
        <Input
          type="search"
          id="search"
          placeholder={t('searchPlaceholder')}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </Field>
    </div>
  );
}
