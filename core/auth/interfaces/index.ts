export interface User {
  id: number;
  email: string;
  first_name?: string;
  last_name?: string;
  telefono?: string;
  tipo_rol?: 'ADMIN' | 'ALBERGUE' | 'USER';
  datos_adicionales?: Record<string, any>;
}

export interface RegisterRequest {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  telefono: string;
  tipo_rol?: 'USER' | 'ALBERGUE';
  datos_adicionales?: {
    ruc?: string;
    web?: string;
    ubicacion?: string;
    [key: string]: any;
  };
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterResponse {
  user: User;
  message: string;
}
