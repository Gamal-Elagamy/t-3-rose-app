'use server';

import { ICategory } from '@/features/categories/types/categories';
import { AddItemsFields } from '../schema/add-categories.schema';
import { addItemRequest, deleteItemRequest, updateItemRequest } from './item-api-factory';

export async function addCategoriesItemApi(fields: AddItemsFields) {
  return addItemRequest('categories', fields);
}

export async function updateCategoriesItem(payload: {
  id: string;
  title: string;
  description?: string;
}) {
  return updateItemRequest<ICategory, 'category'>('categories', payload);
}

export async function deleteCategoriesItem(id: string) {
  return deleteItemRequest<ICategory, 'category'>('categories', id);
}
