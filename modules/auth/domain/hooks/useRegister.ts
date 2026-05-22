'use client';

import { useMutation } from '@tanstack/react-query';
import { registerAction } from '@/core/auth/actions/authActions';
import { RegisterRequest } from '@/core/auth/interfaces';
import { toast } from 'sonner';

export const useRegister = () => {
  return useMutation({
    mutationFn: (data: RegisterRequest) => registerAction(data),
    onSuccess: (data) => {
      // backend may return a message
      const msg = (data as any)?.message || 'Registro correcto';
      toast.success(msg);
    },
    onError: (error: any) => {
      toast.error(error?.message || 'Error al registrar');
    },
  });
};
