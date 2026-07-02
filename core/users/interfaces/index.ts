export interface Usuario {
  id: number;
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
  tipo_rol: 'ADMIN' | 'ALBERGUE' | 'USER';
  telefono?: string;
  is_active: boolean;
  date_joined?: string;
  datos_adicionales?: Record<string, unknown>;
}

export interface UpdateUsuarioRequest {
  id: number;
  email?: string;
  first_name?: string;
  last_name?: string;
  tipo_rol?: 'ADMIN' | 'ALBERGUE' | 'USER';
  telefono?: string;
  is_active?: boolean;
  datos_adicionales?: Record<string, unknown>;
}

export interface GetUsuariosParams {
  page?: number;
  page_size?: number;
  search?: string;
  tipo_rol?: string;
}
