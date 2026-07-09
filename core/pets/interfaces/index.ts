export interface Foto {
  id?: number;
  url_imagen: string;
}

export interface Mascota {
  id: number;
  nombre: string;
  especie: string;
  raza: string;
  edad: string;
  color: string;
  tamano: string;
  descripcion: string;
  estado: 'DISPONIBLE' | 'ADOPTADO';
  publicador: number;
  publicador_telefono?: string;
  fotos: Foto[];
}

export interface CreateMascotaRequest {
  nombre: string;
  especie: string;
  raza: string;
  edad: string;
  color: string;
  tamano: string;
  descripcion: string;
  fotos?: { url_imagen: string }[];
}

export interface UpdateMascotaRequest extends Partial<CreateMascotaRequest> {
  id: number;
  estado?: 'DISPONIBLE' | 'ADOPTADO';
}

export interface GetMascotasParams {
  page?: number;
  page_size?: number;
  mis_publicaciones?: boolean;
  especie?: string;
  nombre?: string;
  tamano?: string;
  estado?: string;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

