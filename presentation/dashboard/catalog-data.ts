import { Mascota } from "@/core/pets/interfaces";

export const petCards: Mascota[] = [
  {
    id: 1,
    nombre: 'Barnaby',
    especie: 'DOG',
    raza: 'Beagle Mix',
    edad: '3 meses',
    color: 'Tricolor',
    tamano: 'Mediano',
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
    edad: '2 años',
    color: 'Naranja',
    tamano: 'Pequeño',
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
    edad: '8 años',
    color: 'Dorado',
    tamano: 'Grande',
    descripcion: 'SENIOR | Bend, OR | 5.1 miles away',
    estado: 'DISPONIBLE',
    publicador: 1,
    fotos: [{ id: 3, url_imagen: '/hero_dog.png' }],
  },
];

