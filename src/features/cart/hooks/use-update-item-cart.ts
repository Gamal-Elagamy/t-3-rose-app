import { useMutation } from '@tanstack/react-query';
import updateUserCart from '../api/update-item-cart';

export default function useUpdateCartItem() {
  const { isPending, mutate } = useMutation({
    mutationFn: updateUserCart,
  });

  return { isPending, updateUserCart: mutate };
}
