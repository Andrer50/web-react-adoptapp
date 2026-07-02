import * as yup from 'yup';

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

export const updateProfileSchema: yup.AnyObjectSchema = yup.object().shape({
  first_name: yup.string().trim().required('El nombre es obligatorio'),
  last_name: yup.string().trim().required('El apellido es obligatorio'),
  telefono: yup
    .string()
    .trim()
    .required('El teléfono es obligatorio')
    .matches(/^[0-9+\-() ]{7,20}$/, 'Formato de teléfono inválido'),
  datos_adicionales: yup
    .object()
    .shape({
      ruc: yup.string().trim().optional(),
      ubicacion: yup.string().trim().optional(),
      web: yup.string().trim().optional(),
    })
    .optional(),
});
