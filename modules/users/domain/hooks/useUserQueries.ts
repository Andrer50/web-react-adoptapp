'use client';

import { useQuery } from '@tanstack/react-query';
import { getUsuariosAction, buscarUsuarioPorEmailAction } from '@/core/users/actions/userActions';
import { GetUsuariosParams } from '@/core/users/interfaces';

export const useGetUsuariosQuery = (params?: GetUsuariosParams) => {
  return useQuery({
    queryKey: ['usuarios', params],
    queryFn: () => getUsuariosAction(params),
  });
};

export const useBuscarUsuarioPorEmailQuery = (email: string, enabled: boolean) => {
  return useQuery({
    queryKey: ['usuario-buscar', email],
    queryFn: () => buscarUsuarioPorEmailAction(email),
    enabled: enabled && email.trim() !== '',
    retry: false,
  });
};
