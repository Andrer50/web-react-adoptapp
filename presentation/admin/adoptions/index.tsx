'use client';

import { useState } from 'react';
import { TypographyH1, TypographyLead } from '@/components/ui/typography';
import { useGetAdopcionesQuery } from '@/modules/adoptions/domain/hooks/useAdoptionQueries';
import { Adopcion } from '@/core/adoptions/interfaces';

// Componentes modulares
import { AdoptionsTable } from './components/adoptions-table';
import { DeleteAdoptionDialog } from './components/delete-adoption-dialog';

export function AdminAdoptionsPage() {
  const { data: adoptions = [], isLoading, isError, refetch } = useGetAdopcionesQuery();

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedAdoption, setSelectedAdoption] = useState<Adopcion | null>(null);

  const openDeleteModal = (adoption: Adopcion) => {
    setSelectedAdoption(adoption);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8 xl:px-10">
        <main className="space-y-8">
          {/* Cabecera */}
          <div>
            <TypographyH1 className="text-foreground">Historial de Adopciones</TypographyH1>
            <TypographyLead className="mt-2 text-muted-foreground">
              Consulta las conexiones exitosas realizadas a través de la plataforma. Administra y mantén la trazabilidad de los animales adoptados.
            </TypographyLead>
          </div>

          {/* Tabla de Resultados */}
          <AdoptionsTable
            adoptions={adoptions}
            isLoading={isLoading}
            isError={isError}
            onDelete={openDeleteModal}
          />
        </main>
      </div>

      {/* Modal de Confirmación para deshacer Adopción */}
      <DeleteAdoptionDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        adoption={selectedAdoption}
        onSuccess={refetch}
      />
    </div>
  );
}
