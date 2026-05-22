'use client';

import { useFormik } from 'formik';
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
import { ageFilters } from '@/modules/pets/features/constants';

interface CreatePetFormProps {
  onSuccess: () => void;
}

export function CreatePetForm({ onSuccess }: CreatePetFormProps) {
  const formik = useFormik({
    initialValues: {
      name: '',
      species: '',
      breed: '',
      age: '',
      gender: '',
      location: '',
      distance: '',
      badge: '',
      image: '',
    },
    onSubmit: (values) => {
      console.log('Nueva publicación:', values);
      onSuccess();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6">
      <AppInputGroup
        label="Nombre"
        inputProps={{
          id: 'name',
          name: 'name',
          placeholder: 'Ej. Firulais',
          value: formik.values.name,
          onChange: formik.handleChange,
          required: true,
        }}
      />

      <div className="space-y-2">
        <Label className="text-sm font-semibold text-foreground">Especie</Label>
        <Select
          onValueChange={(value) => formik.setFieldValue('species', value)}
          value={formik.values.species}
          required
        >
          <SelectTrigger className="h-12 w-full rounded-xl border-border bg-surface text-foreground focus:ring-primary shadow-sm px-4">
            <SelectValue placeholder="Selecciona una especie" />
          </SelectTrigger>
          <SelectContent className="rounded-xl border-border">
            <SelectItem value="dogs">Perro</SelectItem>
            <SelectItem value="cats">Gato</SelectItem>
            <SelectItem value="birds">Ave</SelectItem>
            <SelectItem value="other">Otro</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <AppInputGroup
        label="Raza"
        inputProps={{
          id: 'breed',
          name: 'breed',
          placeholder: 'Ej. Mestizo',
          value: formik.values.breed,
          onChange: formik.handleChange,
          required: true,
        }}
      />

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-sm font-semibold text-foreground">Edad</Label>
          <Select
            onValueChange={(value) => formik.setFieldValue('age', value)}
            value={formik.values.age}
            required
          >
            <SelectTrigger className="h-12 w-full rounded-xl border-border bg-surface text-foreground focus:ring-primary shadow-sm px-4">
              <SelectValue placeholder="Edad" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-border">
              {ageFilters.map((age) => (
                <SelectItem key={age.id} value={age.id}>{age.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-semibold text-foreground">Sexo</Label>
          <Select
            onValueChange={(value) => formik.setFieldValue('gender', value)}
            value={formik.values.gender}
            required
          >
            <SelectTrigger className="h-12 w-full rounded-xl border-border bg-surface text-foreground focus:ring-primary shadow-sm px-4">
              <SelectValue placeholder="Sexo" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-border">
              <SelectItem value="male">Macho</SelectItem>
              <SelectItem value="female">Hembra</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <AppInputGroup
          label="Ubicación"
          inputProps={{
            id: 'location',
            name: 'location',
            placeholder: 'Ej. Lima',
            value: formik.values.location,
            onChange: formik.handleChange,
            required: true,
          }}
        />
        <AppInputGroup
          label="Distancia"
          inputProps={{
            id: 'distance',
            name: 'distance',
            placeholder: 'Ej. 5 km',
            value: formik.values.distance,
            onChange: formik.handleChange,
          }}
        />
      </div>

      <AppInputGroup
        label="Etiqueta"
        inputProps={{
          id: 'badge',
          name: 'badge',
          placeholder: 'Ej. Nueva llegada',
          value: formik.values.badge,
          onChange: formik.handleChange,
        }}
      />

      <AppInputGroup
        label="URL de la Imagen"
        inputProps={{
          id: 'image',
          name: 'image',
          type: 'url',
          placeholder: 'https://ejemplo.com/imagen.jpg',
          value: formik.values.image,
          onChange: formik.handleChange,
          required: true,
        }}
      />

      <div className="pt-4 pb-2">
        <Button
          type="submit"
          className="w-full h-12 rounded-xl font-bold bg-primary hover:bg-primary-hover text-white shadow-sm"
        >
          Publicar Mascota
        </Button>
      </div>
    </form>
  );
}
