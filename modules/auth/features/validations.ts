import * as yup from 'yup';
import { RegisterRequest, LoginRequest } from '@/core/auth/interfaces';

export const registerSchema: yup.ObjectSchema<Partial<RegisterRequest>> = yup.object().shape({
  first_name: yup.string().trim().required('El nombre es obligatorio'),
  last_name: yup.string().trim().required('El apellido es obligatorio'),
  telefono: yup
    .string()
    .trim()
    .required('El teléfono es obligatorio')
    .matches(/^[0-9+\-() ]{7,20}$/, 'Formato de teléfono inválido'),
  email: yup.string().trim().required('El correo es obligatorio').email('Correo inválido'),
  password: yup
    .string()
    .required('La contraseña es obligatoria')
    .min(8, 'La contraseña debe tener al menos 8 caracteres'),
});

export const loginSchema: yup.ObjectSchema<Partial<LoginRequest>> = yup.object().shape({
  email: yup.string().trim().required('El correo es obligatorio').email('Correo inválido'),
  password: yup.string().required('La contraseña es obligatoria'),
});
