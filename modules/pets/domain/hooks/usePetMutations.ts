'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createMascotaAction,
  uploadImageAction,
  updateMascotaAction,
  deleteMascotaAction,
} from '@/core/pets/actions/petActions';
import { CreateMascotaRequest, UpdateMascotaRequest } from '@/core/pets/interfaces';

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

export const useDeleteMascotaMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteMascotaAction(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mascotas'] });
    },
  });
};
