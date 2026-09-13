import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { deleteCategoriesItem } from '../apis/categories-mutations.api';
import { deleteOccasionsItem } from '../apis/occasions-mutations.api';

// Categories Mutation
export default function useDeleteCategorieItem() {
  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: deleteCategoriesItem,
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { deleteCategoriesItem: mutateAsync, isPending, error };
}

// Occasions Mutation
export function useDeleteOccasionItem() {
  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: deleteOccasionsItem,
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { deleteOccasionsItem: mutateAsync, isPending, error };
}
