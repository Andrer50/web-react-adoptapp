export const ageFilters = [
  { id: 'puppy', label: 'Cachorro' },
  { id: 'young', label: 'Joven' },
  { id: 'adult', label: 'Adulto' },
  { id: 'senior', label: 'Mayor' },
] as const;

export const sizeFilters = [
  { id: 'all', label: 'Todos los tamaños' },
  { id: 'small', label: 'Pequeño' },
  { id: 'medium', label: 'Mediano' },
  { id: 'large', label: 'Grande' },
] as const;

export const sortOptions = [
  { id: 'newest', label: 'Más recientes' },
  { id: 'nearest', label: 'Más cercanos' },
  { id: 'adoption', label: 'Listos para adopción' },
] as const;
