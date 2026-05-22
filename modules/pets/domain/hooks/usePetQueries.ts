'use client';

import { useQuery } from '@tanstack/react-query';
import { getMascotasAction } from '@/core/pets/actions/petActions';

export const useGetMascotasQuery = () => {
  return useQuery({
    queryKey: ['mascotas'],
    queryFn: getMascotasAction,
  });
};
