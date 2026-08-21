'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteAddressAction } from '../actions/delete-address.action';

export function useDeleteAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAddressAction,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['addresses'],
      });
    },
  });
}
