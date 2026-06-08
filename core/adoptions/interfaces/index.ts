import { Mascota } from '@/core/pets/interfaces';
import { Usuario } from '@/core/users/interfaces';

export interface Adopcion {
  id: number;
  mascota: number;
  adoptante: number;
  fecha_adopcion: string;
  mascota_detalle?: Mascota;
  adoptante_detalle?: Usuario;
}

export interface CreateAdopcionRequest {
  mascota: number;
  adoptante: number;
}
