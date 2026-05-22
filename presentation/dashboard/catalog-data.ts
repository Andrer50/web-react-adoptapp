import { Mascota } from "@/core/pets/interfaces";

export const petCards: Mascota[] = [
  {
    id: 1,
    nombre: 'Barnaby',
    especie: 'DOG',
    raza: 'Beagle Mix',
    descripcion: 'PUPPY | Portland, OR | 2.5 miles away',
    estado: 'DISPONIBLE',
    publicador: 1,
    fotos: [{ id: 1, url_imagen: '/puppy_max.png' }],
  },
  {
    id: 2,
    nombre: 'Marmalade',
    especie: 'CAT',
    raza: 'Domestic Longhair',
    descripcion: 'ADULT | Seattle, WA | 12 miles away',
    estado: 'DISPONIBLE',
    publicador: 1,
    fotos: [{ id: 2, url_imagen: '/cat_luna.png' }],
  },
  {
    id: 3,
    nombre: 'Sunny',
    especie: 'DOG',
    raza: 'Golden Retriever',
    descripcion: 'SENIOR | Bend, OR | 5.1 miles away',
    estado: 'DISPONIBLE',
    publicador: 1,
    fotos: [{ id: 3, url_imagen: '/hero_dog.png' }],
  },
];
