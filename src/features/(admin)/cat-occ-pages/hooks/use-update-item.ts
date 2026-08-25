import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { updateCategoriesItem } from '../apis/categories-item.api';
import { updateOccasionsItem } from '../apis/occasions-item.api';

// Update Categorie Item Mutation
export default function useUpdateCategorieItem() {
  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: updateCategoriesItem,
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { updateCategoriesItem: mutateAsync, isPending, error };
}

// Update Occacion Item Mutation
export function useUpdateOccasionItem() {
  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: updateOccasionsItem,
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { updateOccasionsItem: mutateAsync, isPending, error };
}
