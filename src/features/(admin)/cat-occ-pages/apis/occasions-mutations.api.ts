'use server';

import { AddItemsFields } from '../schema/add-categories.schema';
import { addItemRequest, deleteItemRequest, updateItemRequest } from './item-api-factory';
import { IOccasion } from '@/features/occasions/types/occasions';

export async function addOccasionItemApi(fields: AddItemsFields) {
  return addItemRequest('occasions', fields);
}

export async function updateOccasionsItem(payload: {
  id: string;
  title: string;
  description?: string;
}) {
  return updateItemRequest<IOccasion, 'occasion'>('occasions', payload);
}

export async function deleteOccasionsItem(id: string) {
  return deleteItemRequest<IOccasion, 'occasion'>('occasions', id);
}
