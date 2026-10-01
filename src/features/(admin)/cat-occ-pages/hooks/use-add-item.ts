import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { addCategoriesItemApi } from '../apis/categories-mutations.api';
import { addOccasionItemApi } from '../apis/occasions-mutations.api';

// add categories item Mutation
export default function useAddCategoreItem() {
  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: addCategoriesItemApi,
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { addCategoriesItemApi: mutateAsync, isPending, error };
}

// add occasions item Mutation
export function useAddOccasionItem() {
  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: addOccasionItemApi,
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { addOccasionItemApi: mutateAsync, isPending, error };
}
