import getCategoriesItem, {
  getAllCategories,
} from '@/features/(admin)/cat-occ-pages/apis/categories-item.api';
import getOccasionsItem, {
  getAllOccasions,
} from '@/features/(admin)/cat-occ-pages/apis/occasions-item.api';

export const itemPageConfig = {
  categories: {
    translationNamespace: 'dashboard.categoriesPage',
    getAll: getAllCategories,
    getOne: getCategoriesItem,
    listPath: '/admin/categories',
    updateTitleKey: 'updateCategory',
  },
  occasions: {
    translationNamespace: 'dashboard.occasionsPage',
    getAll: getAllOccasions,
    getOne: getOccasionsItem,
    listPath: '/admin/occasions',
    updateTitleKey: 'updateOccasion',
  },
} as const;
