import AddButton from './add-button';
import ItemSearchInput from './item-search-input';
import { TableData } from './table-list';
import { GetProductsParams } from '@/features/products/apis/products.api';
import PaginationProducts from '@/features/products/components/pagination-products';
import { PRODUCTS_PER_PAGE } from '@/shared/constant/products.constants';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';
import { itemPageConfig } from '../config/item-page.config';
import { ItemPageType } from '../types/page-type';
import { getAllCategories } from '../apis/categories-item.api';
import { getAllOccasions } from '../apis/occasions-item.api';

export default async function ItemListPage({
  page,
  searchParams,
}: {
  page: ItemPageType;
  searchParams: Promise<GetProductsParams & { search?: string }>;
}) {
  const config = itemPageConfig[page];

  // Translations
  const t = await getTranslations(config.translationNamespace);

  // Search Params
  const { page: pageParam, search } = await searchParams;
  const currentPage = Number(pageParam) || 1;

  const getAllItems = page === 'categories' ? getAllCategories : getAllOccasions;

  // Items Data
  const itemsData = await getAllItems({
    page: currentPage,
    limit: PRODUCTS_PER_PAGE,
    ...(search ? { search } : {}),
  });

  // Total Pages
  const totalPages = Number(itemsData.metadata.totalPages ?? 1);

  return (
    <div className="pt-5 px-4">
      {/* Content */}
      <div className="content flex flex-col gap-4.5 p-6 rounded-2xl bg-ds-bg-plain">
        {/* Header */}
        <div className="head flex items-center justify-between">
          <h1 className="font-semibold text-2xl text-ds-text-plain">{t('header')}</h1>

          {/* Add Button */}
          <AddButton page={page} text={t('titleAdd')} />
        </div>

        {/* Search */}
        <Suspense
          fallback={<div className="h-10 w-full animate-pulse rounded-md bg-ds-bg-muted" />}
        >
          <ItemSearchInput page={page} />
        </Suspense>

        {/* Table */}
        <TableData page={page} data={itemsData.data} />
      </div>

      {/* Pagination */}
      {totalPages > 1 && <PaginationProducts page={currentPage} totalPages={totalPages} />}
    </div>
  );
}
