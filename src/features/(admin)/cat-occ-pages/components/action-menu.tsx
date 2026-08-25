'use client';

import { useEffect, useRef, useState } from 'react';
import { MoreVerticalIcon } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import EditButton from './edit-button';
import DeleteButton from './delete-button';
import { useTranslations } from 'next-intl';
import { ItemPageType } from '../types/page-type';
import { itemPageConfig } from '../config/item-page.config';

export default function ActionMenu({ id, page }: { id: string; page: ItemPageType }) {
  // Translations
  const t = useTranslations(itemPageConfig[page].translationNamespace);

  // State
  const [isOpen, setIsOpen] = useState(false);

  // Ref
  const menuRef = useRef<HTMLDivElement>(null);

  // Effect
  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div ref={menuRef} className="md:hidden relative">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="ghost"
        size="icon-sm"
        className="size-8 text-ds-text-muted border border-ds-border-soft cursor-pointer"
      >
        <MoreVerticalIcon />
        <span className="sr-only">Open menu</span>
      </Button>

      {isOpen && (
        <div className="w-40 bg-ds-bg-plain border border-ds-border-soft absolute top-full right-0 mt-2 z-10">
          <EditButton
            text={t('edit')}
            style={
              'py-2.5 w-full justify-start border-b border-b-ds-border-soft dark:hover:bg-ds-bg-info-fade'
            }
            id={id}
            page={page}
          />

          <DeleteButton
            text={t('delete')}
            style={'py-2.5 w-full justify-start dark:hover:bg-red-100'}
            id={id}
            page={page}
          />
        </div>
      )}
    </div>
  );
}
