'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateAddressAction } from '../actions/update-address.action';

export function useUpdateAddress(onSuccess?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateAddressAction,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['addresses'],
      });

      onSuccess?.();
    },
  });
}
