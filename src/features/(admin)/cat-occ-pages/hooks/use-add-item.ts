import { useMutation } from '@tanstack/react-query';
import addCategoriesItemApi from '../apis/add-categories-item.api';
import { toast } from 'sonner';
import addOccasionItemApi from '../apis/add-occassion-item.api';

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
