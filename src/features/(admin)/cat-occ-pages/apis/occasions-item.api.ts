import { IOccasion } from '@/features/occasions/types/occasions';
import { getItemFactoryApi } from './get-data-factory';

const apiFactory = getItemFactoryApi<IOccasion, 'occasion'>('occasions', 'occasion');

export const getAllOccasions = apiFactory.getAllItems;
export const getOccasionsItem = apiFactory.getItem;
