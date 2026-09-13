import { itemPageConfig } from '../config/item-page.config';
import { ItemPageType } from '../types/page-type';
import EditForm from './edit-form';
import { getTranslations } from 'next-intl/server';
import { SetBreadcrumbExtra } from './set-breadcrumb-extra';
import { getCategoriesItem } from '../apis/categories-item.api';
import { getOccasionsItem } from '../apis/occasions-item.api';

export default async function ItemEditPage({
  page,
  searchParams,
}: {
  page: ItemPageType;
  searchParams: Promise<{ id: string }>;
}) {
  const config = itemPageConfig[page];

  // Translations
  const t = await getTranslations(config.translationNamespace);

  const { id } = await searchParams;

  const getOneItem = page === 'categories' ? getCategoriesItem : getOccasionsItem;

  // Item Data
  const item = await getOneItem(id);

  return (
    <div className="pt-5 px-4">
      <SetBreadcrumbExtra text={item?.title} />

      <h1 className="font-semibold text-2xl text-ds-text-plain mb-6">
        {t(config.updateTitleKey)} {item?.title}
      </h1>
      {/* Content */}
      <div className="content flex flex-col gap-4.5 p-6 rounded-2xl bg-ds-bg-plain">
        {/* Form */}
        <EditForm page={page} translations={config.translationNamespace} editData={item} />
      </div>
    </div>
  );
}
