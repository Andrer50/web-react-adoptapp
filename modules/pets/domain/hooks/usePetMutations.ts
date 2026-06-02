'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createMascotaAction, uploadImageAction, updateMascotaAction } from '@/core/pets/actions/petActions';
import { CreateMascotaRequest, UpdateMascotaRequest, Mascota } from '@/core/pets/interfaces';

export const useCreateMascotaMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateMascotaRequest) => createMascotaAction(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mascotas'] });
    },
  });
};

export const useUploadImageMutation = () => {
  return useMutation({
    mutationFn: (file: File) => uploadImageAction(file),
  });
};

export const useUpdateMascotaMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateMascotaRequest) => updateMascotaAction(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mascotas'] });
    },
  });
};

