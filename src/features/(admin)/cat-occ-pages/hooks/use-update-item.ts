import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { ItemPageType } from '../types/page-type';
import { updateCategoriesItem } from '../apis/categories-mutations.api';
import { updateOccasionsItem } from '../apis/occasions-mutations.api';

type UpdatePayload = {
  id: string;
  title: string;
  description?: string;
};

const updateFnMap: Record<ItemPageType, (payload: UpdatePayload) => Promise<unknown>> = {
  categories: updateCategoriesItem,
  occasions: updateOccasionsItem,
};

export default function useUpdateItem(page: ItemPageType) {
  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: updateFnMap[page],
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });

  return { updateItem: mutateAsync, isPending, error };
}
