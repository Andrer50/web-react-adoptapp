import { Pet } from "@/core/pets/interfaces";

export const petCards: Pet[] = [
  {
    id: 'barnaby',
    name: 'Barnaby',
    species: 'DOG',
    breed: 'Beagle Mix',
    age: 'PUPPY',
    location: 'Portland, OR',
    distance: '2.5 miles away',
    badge: 'Nueva llegada',
    image: '/puppy_max.png',
    gender: 'male',
  },
  {
    id: 'marmalade',
    name: 'Marmalade',
    species: 'CAT',
    breed: 'Domestic Longhair',
    age: 'ADULT',
    location: 'Seattle, WA',
    distance: '12 miles away',
    badge: 'Necesidades especiales',
    image: '/cat_luna.png',
    gender: 'female',
  },
  {
    id: 'sunny',
    name: 'Sunny',
    species: 'DOG',
    breed: 'Golden Retriever',
    age: 'SENIOR',
    location: 'Bend, OR',
    distance: '5.1 miles away',
    badge: 'Especial',
    image: '/hero_dog.png',
    gender: 'male',
  },
];

