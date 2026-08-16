import { useMutation } from '@tanstack/react-query';
import deleteUserCart from '../api/delete-item-cart';

export default function useDeleteCartItem() {
  const { isPending, mutate } = useMutation({
    mutationFn: deleteUserCart,
  });

  return { isPending, deleteUserCart: mutate };
}
