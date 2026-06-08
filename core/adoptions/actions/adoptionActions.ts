import { apiClient } from '@/lib/http-client';
import { Adopcion, CreateAdopcionRequest } from '../interfaces';

export const getAdopcionesAction = async (): Promise<Adopcion[]> => {
  // Nota: El backend Django no tiene paginación en adopciones, por lo que devuelve una lista plana Adopcion[]
  return apiClient.get<Adopcion[]>('adopciones/');
};

export const createAdopcionAction = async (request: CreateAdopcionRequest): Promise<Adopcion> => {
  return apiClient.post<Adopcion, CreateAdopcionRequest>('adopciones/', request);
};

export const deleteAdopcionAction = async (id: number): Promise<void> => {
  return apiClient.delete<void>(`adopciones/${id}/`);
};
