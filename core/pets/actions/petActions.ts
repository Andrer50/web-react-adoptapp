import { apiClient } from '@/lib/http-client';
import { Mascota, CreateMascotaRequest, UpdateMascotaRequest, GetMascotasParams, PaginatedResponse } from '../interfaces';

export const getMascotasAction = async (params?: GetMascotasParams): Promise<PaginatedResponse<Mascota>> => {
  return apiClient.get<PaginatedResponse<Mascota>>('mascotas/', { params });
};

export const createMascotaAction = async (request: CreateMascotaRequest): Promise<Mascota> => {
  return apiClient.post<Mascota, CreateMascotaRequest>('mascotas/', request);
};

export const uploadImageAction = async (file: File): Promise<{ url: string }> => {
  const formData = new FormData();
  formData.append('file', file);
  return apiClient.post<{ url: string }, FormData>('upload/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const updateMascotaAction = async (request: UpdateMascotaRequest): Promise<Mascota> => {
  const { id, ...data } = request;
  return apiClient.put<Mascota, Partial<CreateMascotaRequest> & { estado?: 'DISPONIBLE' | 'ADOPTADO' }>(`mascotas/${id}/`, data);
};

