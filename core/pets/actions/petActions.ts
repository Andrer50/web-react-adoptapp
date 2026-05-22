import { apiClient } from '@/lib/http-client';
import { Mascota, CreateMascotaRequest } from '../interfaces';

export const getMascotasAction = async (): Promise<Mascota[]> => {
  return apiClient.get<Mascota[]>('mascotas/');
};

export const createMascotaAction = async (request: CreateMascotaRequest): Promise<Mascota> => {
  return apiClient.post<Mascota, CreateMascotaRequest>('mascotas/', request);
};

// Si hubiera update o delete se añadirían aquí siguiendo el mismo patrón
