import { ICategory } from '@/features/categories/types/categories';
import { Category } from '@/features/products/types/product-details';
import { getItemFactoryApi } from './get-data-factory';

const apiFactory = getItemFactoryApi<ICategory, 'category', Category>('categories', 'category');

export const getAllCategories = apiFactory.getAllItems;
export const getCategoriesItem = apiFactory.getItem;
