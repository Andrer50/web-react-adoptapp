'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUsuarioAction, deleteUsuarioAction } from '@/core/users/actions/userActions';
import { UpdateUsuarioRequest } from '@/core/users/interfaces';

export const useUpdateUsuarioMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateUsuarioRequest) => updateUsuarioAction(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['usuarios'] });
    },
  });
};

export const useDeleteUsuarioMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteUsuarioAction(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['usuarios'] });
    },
  });
};
