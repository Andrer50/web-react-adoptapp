import * as yup from 'yup';

export const createPetSchema = yup.object().shape({
  nombre: yup.string().trim().required('El nombre es obligatorio'),
  especie: yup.string().required('La especie es obligatoria'),
  raza: yup.string().trim().required('La raza es obligatoria'),
  edad: yup.string().trim().required('La edad es obligatoria'),
  color: yup.string().trim().required('El color es obligatorio'),
  tamano: yup.string().required('El tamaño es obligatorio'),
  descripcion: yup.string().trim().required('La descripción es obligatoria'),
  fotos: yup
    .array()
    .of(
      yup.object().shape({
        url_imagen: yup.string().required('La URL es obligatoria'),
      })
    )
    .min(1, 'Debes cargar al menos una imagen'),
  estado: yup.string().oneOf(['DISPONIBLE', 'ADOPTADO']).optional(),
});
