'use client';

import { useQuery } from '@tanstack/react-query';
import { getMascotasAction } from '@/core/pets/actions/petActions';
import { GetMascotasParams } from '@/core/pets/interfaces';

export const useGetMascotasQuery = (params?: GetMascotasParams) => {
  return useQuery({
    queryKey: ['mascotas', params],
    queryFn: () => getMascotasAction(params),
  });
};
