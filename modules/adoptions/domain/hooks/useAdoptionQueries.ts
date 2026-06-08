'use client';

import { useQuery } from '@tanstack/react-query';
import { getAdopcionesAction } from '@/core/adoptions/actions/adoptionActions';

export const useGetAdopcionesQuery = () => {
  return useQuery({
    queryKey: ['adopciones'],
    queryFn: () => getAdopcionesAction(),
  });
};
