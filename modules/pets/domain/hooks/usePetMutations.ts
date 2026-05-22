'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createMascotaAction } from '@/core/pets/actions/petActions';
import { CreateMascotaRequest, Mascota } from '@/core/pets/interfaces';

export const useCreateMascotaMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateMascotaRequest) => createMascotaAction(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mascotas'] });
    },
  });
};
