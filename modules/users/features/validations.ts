import * as yup from 'yup';
import { UpdateUsuarioRequest } from '@/core/users/interfaces';

export const updateUsuarioSchema: yup.AnyObjectSchema = yup.object().shape({
  first_name: yup.string().trim().required('El nombre es obligatorio'),
  last_name: yup.string().trim().required('El apellido es obligatorio'),
  telefono: yup
    .string()
    .trim()
    .required('El teléfono es obligatorio')
    .matches(/^[0-9+\-() ]{7,20}$/, 'Formato de teléfono inválido'),
  tipo_rol: yup.string().oneOf(['ADMIN', 'ALBERGUE', 'USER']).required('El rol es obligatorio'),
  is_active: yup.boolean().required(),
});
