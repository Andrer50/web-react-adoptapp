'use client';

import { useState, useRef } from 'react';
import { useFormik } from 'formik';
import { createPetSchema } from '@/modules/pets/features/validations';
import { toast } from 'sonner';
import {
  Plus,
  Trash2,
  Image as ImageIcon,
  Sparkles,
  Tag,
  Clock,
  Palette,
  FileText,
  AlertCircle,
  Loader2,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { AppInputGroup } from '@/components/ui/InputGroup';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Mascota } from '@/core/pets/interfaces';
import {
  useCreateMascotaMutation,
  useUploadImageMutation,
  useUpdateMascotaMutation,
} from '@/modules/pets/domain/hooks/usePetMutations';
import { getRelativeImageUrl } from '@/lib/utils';


const calculateAgeString = (birthDate: Date): string => {
  const today = new Date();
  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();

  if (months < 0 || (months === 0 && today.getDate() < birthDate.getDate())) {
    years--;
    months += 12;
  }

  if (years > 0) {
    if (years >= 8) {
      return `${years} años (Mayor)`;
    }
    return years === 1 ? '1 año' : `${years} años`;
  }

  if (months === 0) {
    return 'Menos de 1 mes';
  }

  return months === 1 ? '1 mes' : `${months} meses`;
};

const parseAgeStringToDate = (ageStr: string): Date => {
  const today = new Date();
  if (!ageStr) return today;

  const numMatch = ageStr.match(/(\d+)\s*(mes|año)/i);
  if (numMatch) {
    const value = parseInt(numMatch[1], 10);
    const type = numMatch[2].toLowerCase();

    if (type.includes('mes')) {
      today.setMonth(today.getMonth() - value);
    } else if (type.includes('año')) {
      today.setFullYear(today.getFullYear() - value);
    }
  }
  return today;
};

interface CreatePetFormProps {
  pet?: Mascota;
  onSuccess: () => void;
}

export function CreatePetForm({ pet, onSuccess }: CreatePetFormProps) {
  const createMascotaMutation = useCreateMascotaMutation();
  const updateMascotaMutation = useUpdateMascotaMutation();
  const uploadImageMutation = useUploadImageMutation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageUrlError, setImageUrlError] = useState('');

  const formik = useFormik({
    initialValues: {
      nombre: pet?.nombre || '',
      especie: pet?.especie || '',
      raza: pet?.raza || '',
      edad: pet?.edad || '',
      fechaNacimiento: pet?.edad ? parseAgeStringToDate(pet.edad).toISOString().split('T')[0] : '',
      color: pet?.color || '',
      tamano: pet?.tamano || '',
      descripcion: pet?.descripcion || '',
      fotos: pet?.fotos || [] as { url_imagen: string }[],
      estado: pet?.estado || 'DISPONIBLE',
    },
    validationSchema: createPetSchema,
    onSubmit: async (values, helpers) => {
      try {
        if (pet) {
          await updateMascotaMutation.mutateAsync({
            id: pet.id,
            nombre: values.nombre,
            especie: values.especie,
            raza: values.raza,
            edad: values.edad,
            color: values.color,
            tamano: values.tamano,
            descripcion: values.descripcion,
            fotos: values.fotos,
            estado: values.estado as 'DISPONIBLE' | 'ADOPTADO',
          });
          toast.success('¡Mascota actualizada con éxito!');
        } else {
          await createMascotaMutation.mutateAsync({
            nombre: values.nombre,
            especie: values.especie,
            raza: values.raza,
            edad: values.edad,
            color: values.color,
            tamano: values.tamano,
            descripcion: values.descripcion,
            fotos: values.fotos,
          });
          toast.success('¡Mascota publicada con éxito!');
        }

        helpers.resetForm();
        setImageUrlError('');
        onSuccess();
      } catch (error) {
        const actionText = pet ? 'actualizar' : 'publicar';
        const message = error instanceof Error ? error.message : `Error al ${actionText} la mascota`;
        toast.error(message);
      }
    },
  });

  const handleFechaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateVal = e.target.value;
    formik.setFieldValue('fechaNacimiento', dateVal);
    if (dateVal) {
      const computedAge = calculateAgeString(new Date(dateVal + 'T00:00:00'));
      formik.setFieldValue('edad', computedAge);
    } else {
      formik.setFieldValue('edad', '');
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setImageUrlError('');

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // Validar tipo
      if (!file.type.startsWith('image/')) {
        setImageUrlError('Solo se permiten archivos de imagen.');
        continue;
      }

      try {
        const result = await uploadImageMutation.mutateAsync(file);
        formik.setFieldValue('fotos', [...formik.values.fotos, { url_imagen: result.url }]);
        toast.success(`Imagen "${file.name}" cargada con éxito`);
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Error al cargar la imagen';
        setImageUrlError(`Error al cargar ${file.name}: ${message}`);
        toast.error(`No se pudo subir la imagen: ${file.name}`);
      }
    }

    // Resetear valor para permitir seleccionar el mismo archivo
    event.target.value = '';
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveImage = (index: number) => {
    const currentFotos = [...formik.values.fotos];
    currentFotos.splice(index, 1);
    formik.setFieldValue('fotos', currentFotos);
  };

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6">
      {/* Fila 1: Nombre y Especie */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <AppInputGroup
            label="Nombre"
            icon={<Sparkles size={16} className="text-muted-foreground" />}
            inputProps={{
              id: 'nombre',
              name: 'nombre',
              placeholder: 'Ej. Firulais',
              value: formik.values.nombre,
              onChange: formik.handleChange,
            }}
          />
          {formik.touched.nombre && formik.errors.nombre && (
            <span className="text-xs text-red-500 font-medium flex items-center gap-1 mt-1">
              <AlertCircle size={12} />
              {formik.errors.nombre}
            </span>
          )}
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-semibold text-foreground">Especie</Label>
          <Select
            onValueChange={(value) => formik.setFieldValue('especie', value)}
            value={formik.values.especie}
          >
            <SelectTrigger className="h-12 w-full rounded-xl border-border bg-surface text-foreground focus:ring-primary shadow-sm px-4">
              <SelectValue placeholder="Selecciona especie" />
            </SelectTrigger>
            <SelectContent className="rounded-md border-border">
              <SelectItem value="Perro">Perro</SelectItem>
              <SelectItem value="Gato">Gato</SelectItem>
              <SelectItem value="Ave">Ave</SelectItem>
              <SelectItem value="Otro">Otro</SelectItem>
            </SelectContent>
          </Select>
          {formik.touched.especie && formik.errors.especie && (
            <span className="text-xs text-red-500 font-medium flex items-center gap-1 mt-1">
              <AlertCircle size={12} />
              {formik.errors.especie}
            </span>
          )}
        </div>
      </div>

      {/* Fila 2: Raza y Edad */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <AppInputGroup
            label="Raza"
            icon={<Tag size={16} className="text-muted-foreground" />}
            inputProps={{
              id: 'raza',
              name: 'raza',
              placeholder: 'Ej. Golden Retriever',
              value: formik.values.raza,
              onChange: formik.handleChange,
            }}
          />
          {formik.touched.raza && formik.errors.raza && (
            <span className="text-xs text-red-500 font-medium flex items-center gap-1 mt-1">
              <AlertCircle size={12} />
              {formik.errors.raza}
            </span>
          )}
        </div>

        <div className="space-y-1">
          <AppInputGroup
            label="Fecha de nacimiento"
            icon={<Clock size={16} className="text-muted-foreground" />}
            inputProps={{
              id: 'fechaNacimiento',
              name: 'fechaNacimiento',
              type: 'date',
              value: formik.values.fechaNacimiento,
              onChange: handleFechaChange,
              max: new Date().toISOString().split('T')[0],
            }}
          />
          {formik.values.edad && (
            <p className="text-xs text-muted-foreground mt-1.5 font-medium flex items-center gap-1">
              <Sparkles size={12} className="text-primary animate-pulse" />
              Edad calculada: <span className="font-semibold text-foreground">{formik.values.edad}</span>
            </p>
          )}
          {formik.touched.edad && formik.errors.edad && (
            <span className="text-xs text-red-500 font-medium flex items-center gap-1 mt-1">
              <AlertCircle size={12} />
              {formik.errors.edad}
            </span>
          )}
        </div>
      </div>

      {/* Fila 3: Color y Tamaño */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1">
          <AppInputGroup
            label="Color"
            icon={<Palette size={16} className="text-muted-foreground" />}
            inputProps={{
              id: 'color',
              name: 'color',
              placeholder: 'Ej. Café con blanco',
              value: formik.values.color,
              onChange: formik.handleChange,
            }}
          />
          {formik.touched.color && formik.errors.color && (
            <span className="text-xs text-red-500 font-medium flex items-center gap-1 mt-1">
              <AlertCircle size={12} />
              {formik.errors.color}
            </span>
          )}
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-semibold text-foreground">Tamaño</Label>
          <Select
            onValueChange={(value) => formik.setFieldValue('tamano', value)}
            value={formik.values.tamano}
          >
            <SelectTrigger className="h-12 w-full rounded-xl border-border bg-surface text-foreground focus:ring-primary shadow-sm px-4">
              <SelectValue placeholder="Selecciona tamaño" />
            </SelectTrigger>
            <SelectContent className="rounded-md border-border">
              <SelectItem value="Pequeño">Pequeño</SelectItem>
              <SelectItem value="Mediano">Mediano</SelectItem>
              <SelectItem value="Grande">Grande</SelectItem>
            </SelectContent>
          </Select>
          {formik.touched.tamano && formik.errors.tamano && (
            <span className="text-xs text-red-500 font-medium flex items-center gap-1 mt-1">
              <AlertCircle size={12} />
              {formik.errors.tamano}
            </span>
          )}
        </div>
      </div>

      {/* Descripción */}
      <div className="space-y-2">
        <Label htmlFor="descripcion" className="text-sm font-semibold text-foreground flex items-center gap-1.5">
          <FileText size={16} className="text-muted-foreground" />
          Descripción
        </Label>
        <textarea
          id="descripcion"
          name="descripcion"
          placeholder="Cuéntanos un poco sobre el temperamento, comportamiento y personalidad de la mascota..."
          value={formik.values.descripcion}
          onChange={formik.handleChange}
          className="w-full min-h-[100px] bg-surface border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary shadow-sm p-4 text-foreground text-sm placeholder:text-muted-foreground transition-all duration-200 outline-none resize-y"
        />
        {formik.touched.descripcion && formik.errors.descripcion && (
          <span className="text-xs text-red-500 font-medium flex items-center gap-1">
            <AlertCircle size={12} />
            {formik.errors.descripcion}
          </span>
        )}
      </div>

      {/* Cargar Múltiples Fotos */}
      <div className="space-y-3">
        <Label className="text-sm font-semibold text-foreground flex items-center gap-1.5">
          <ImageIcon size={16} className="text-muted-foreground" />
          Imágenes de la Mascota
        </Label>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          multiple
          accept="image/*"
          className="hidden"
        />

        <Button
          type="button"
          variant="outline"
          disabled={uploadImageMutation.isPending}
          onClick={triggerFileSelect}
          className="w-full h-16 rounded-xl flex items-center justify-center border-dashed border-2 border-primary/40 bg-primary/5 hover:bg-primary/10 hover:border-primary transition-all duration-200 gap-2 active:scale-98 cursor-pointer"
        >
          {uploadImageMutation.isPending ? (
            <span className="flex items-center gap-2 text-muted-foreground font-semibold">
              <Loader2 className="animate-spin h-5 w-5 text-primary" />
              Subiendo imagen...
            </span>
          ) : (
            <span className="flex items-center gap-2 text-primary font-bold">
              <Plus size={20} />
              Cargar archivos de Imagen (PNG, JPG, etc...)
            </span>
          )}
        </Button>

        {imageUrlError && (
          <span className="text-xs text-red-500 font-medium flex items-center gap-1">
            <AlertCircle size={12} />
            {imageUrlError}
          </span>
        )}

        {/* Listado / Previsualización de imágenes */}
        {formik.values.fotos.length > 0 ? (
          <div className="space-y-2 mt-2">
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Imágenes cargadas ({formik.values.fotos.length})
            </div>
            <div className="grid grid-cols-3 gap-3">
              {formik.values.fotos.map((foto, index) => (
                <div
                  key={index}
                  className="group relative aspect-square rounded-xl border border-outline-variant/60 overflow-hidden bg-muted shadow-sm hover:shadow hover:scale-[1.03] transition-all duration-200"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={getRelativeImageUrl(foto.url_imagen)}
                    alt={`Preview ${index + 1}`}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://placehold.co/150?text=Error+Carga';
                    }}
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon-xs"
                      onClick={() => handleRemoveImage(index)}
                      className="h-7 w-7 rounded-full bg-red-500 hover:bg-red-600 border-0 flex items-center justify-center shadow-md active:scale-90"
                      aria-label="Eliminar imagen"
                    >
                      <Trash2 size={14} className="text-white" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-border p-4 text-center text-xs text-muted-foreground bg-surface-container-lowest">
            No has cargado ninguna imagen. Presiona el botón de arriba para seleccionar tus fotos de mascota (se requiere al menos 1).
          </div>
        )}

        {formik.touched.fotos && formik.errors.fotos && typeof formik.errors.fotos === 'string' && (
          <span className="text-xs text-red-500 font-medium flex items-center gap-1 mt-1">
            <AlertCircle size={12} />
            {formik.errors.fotos}
          </span>
        )}
      </div>

      {/* Botón de Enviar */}
      <div className="pt-4 pb-2">
        <Button
          type="submit"
          loading={pet ? updateMascotaMutation.isPending : createMascotaMutation.isPending}
          className="w-full h-12 rounded-xl font-bold bg-primary hover:bg-primary-hover text-white shadow-sm transition-all duration-200 active:scale-[0.98]"
        >
          {pet
            ? (updateMascotaMutation.isPending ? 'Guardando...' : 'Guardar Cambios')
            : (createMascotaMutation.isPending ? 'Publicando...' : 'Publicar Mascota')
          }
        </Button>
      </div>
    </form>
  );
}



