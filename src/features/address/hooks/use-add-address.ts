'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { addAddressAction } from '../actions/add-address.action';

export function useAddAddress(onSuccess?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addAddressAction,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['addresses'],
      });

      onSuccess?.();
    },
  });
}