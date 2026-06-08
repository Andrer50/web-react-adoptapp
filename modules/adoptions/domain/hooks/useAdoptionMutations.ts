'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createAdopcionAction, deleteAdopcionAction } from '@/core/adoptions/actions/adoptionActions';
import { CreateAdopcionRequest } from '@/core/adoptions/interfaces';

export const useCreateAdopcionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateAdopcionRequest) => createAdopcionAction(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adopciones'] });
      queryClient.invalidateQueries({ queryKey: ['mascotas'] });
    },
  });
};

export const useDeleteAdopcionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteAdopcionAction(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adopciones'] });
      queryClient.invalidateQueries({ queryKey: ['mascotas'] });
    },
  });
};
