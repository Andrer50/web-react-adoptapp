export interface Foto {
  id: number;
  url_imagen: string;
}

export interface Mascota {
  id: number;
  nombre: string;
  especie: string;
  raza: string;
  descripcion: string;
  estado: 'DISPONIBLE' | 'ADOPTADO';
  publicador: number;
  fotos: Foto[];
}

export interface CreateMascotaRequest {
  nombre: string;
  especie: string;
  raza: string;
  descripcion: string;
}

export interface UpdateMascotaRequest extends Partial<CreateMascotaRequest> {
  id: number;
  estado?: 'DISPONIBLE' | 'ADOPTADO';
}
