import { apiClient } from '@/lib/http-client';
import { Usuario, UpdateUsuarioRequest, GetUsuariosParams } from '../interfaces';

export const getUsuariosAction = async (params?: GetUsuariosParams): Promise<Usuario[]> => {
  // Nota: El backend Django no tiene paginación por defecto en usuarios, por lo que devuelve una lista plana Usuario[]
  return apiClient.get<Usuario[]>('usuarios/', { params });
};

export const updateUsuarioAction = async (request: UpdateUsuarioRequest): Promise<Usuario> => {
  const { id, ...data } = request;
  return apiClient.patch<Usuario, Partial<UpdateUsuarioRequest>>(`usuarios/${id}/`, data);
};

export const deleteUsuarioAction = async (id: number): Promise<void> => {
  return apiClient.delete<void>(`usuarios/${id}/`);
};

export const buscarUsuarioPorEmailAction = async (email: string): Promise<Usuario> => {
  return apiClient.get<Usuario>('usuarios/buscar/', { params: { email } });
};
