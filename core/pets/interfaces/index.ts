import { PetAge, PetSpecies } from "@/core/shared";

export interface Pet {
  id: string;
  name: string;
  species: PetSpecies;
  breed: string;
  age: PetAge;
  location: string;
  distance: string;
  badge: string;
  image: string;
  gender: 'male' | 'female';
  favorite?: boolean;
}