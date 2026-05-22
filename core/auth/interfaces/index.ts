export interface User {
  id: number;
  email: string;
  first_name?: string;
  last_name?: string;
  telefono?: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  telefono: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterResponse {
  user: User;
  message: string;
}
