import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/ui/table';
import DeleteButton from './delete-button';
import EditButton from './edit-button';
import { ICategory } from '../../../categories/types/categories';
import { useTranslations } from 'next-intl';
import ActionMenu from './action-menu';
import { IOccasion } from '@/features/occasions/types/occasions';
import { ItemPageType } from '../types/page-type';
import { itemPageConfig } from '../config/item-page.config';

export function TableData({ page, data }: { page: ItemPageType; data: ICategory[] | IOccasion[] }) {
  // Translations
  const t = useTranslations(itemPageConfig[page].translationNamespace);

  // Empty state
  if (data.length === 0) {
    return (
      <div className="h-96 flex items-center justify-center py-10 text-ds-text-secondary">
        {t('table.empty')}
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        {/* Header */}
        <TableRow>
          <TableHead>{t('table.name')}</TableHead>
          <TableHead>{t('table.products')}</TableHead>
          <TableHead className="text-right sr-only">{t('table.actions')}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {/* Row */}
        {data.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium">{item?.title}</TableCell>
            <TableCell className="font-normal">
              {/* {(item as ICategory)?.subCategories?.length || 0} */}
              {(() => {
                const count = 'subCategories' in item ? (item.subCategories?.length ?? 0) : 0;
                return (
                  <>
                    {count} {t('table.productCount', { count })}
                  </>
                );
              })()}
            </TableCell>
            <TableCell className="text-right">
              <div className="hidden md:flex justify-end gap-2.5">
                <EditButton
                  page={page}
                  text={t('edit')}
                  id={item.id}
                  style={'bg-ds-bg-info-fade hover:bg-ds-bg-info-faint rounded-base py-1 px-2'}
                />
                <DeleteButton
                  page={page}
                  text={t('delete')}
                  id={item.id}
                  style={'bg-ds-bg-danger-fade hover:bg-red-100 rounded-base py-1 px-2'}
                />
              </div>

              {/* Mobile dropdown */}
              <div className="md:hidden">
                <ActionMenu page={page} id={item.id} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
