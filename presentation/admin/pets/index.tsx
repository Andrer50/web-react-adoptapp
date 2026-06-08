'use client';

import { useState } from 'react';
import { useDebounce } from '@/hooks/use-debounce';
import { TypographyH1, TypographyLead } from '@/components/ui/typography';
import { useGetMascotasQuery } from '@/modules/pets/domain/hooks/usePetQueries';
import { toast } from 'sonner';
import { Mascota } from '@/core/pets/interfaces';

// Componentes modulares
import { PetsFilters } from './components/pets-filters';
import { PetsTable } from './components/pets-table';
import { EditPetDialog } from './components/edit-pet-dialog';
import { DeletePetDialog } from './components/delete-pet-dialog';

export function AdminPetsPage() {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedPet, setSelectedPet] = useState<Mascota | null>(null);

  // Estados de paginación y filtros
  const [page, setPage] = useState(1);
  const [inputValue, setInputValue] = useState('');
  const debouncedSearchName = useDebounce(inputValue, 400);
  const [filterSpecies, setFilterSpecies] = useState('all');
  const [filterSize, setFilterSize] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // Parámetros para la query global
  const queryParams = {
    page,
    nombre: debouncedSearchName || undefined,
    especie: filterSpecies !== 'all' ? filterSpecies : undefined,
    tamano: filterSize !== 'all' ? filterSize : undefined,
    estado: filterStatus !== 'all' ? filterStatus : undefined,
  };

  const { data, isLoading, isError, refetch } = useGetMascotasQuery(queryParams);

  const pets = data?.results || [];
  const totalItems = data?.count || 0;
  const pageSize = 5; // Configurado en backend
  const totalPages = Math.ceil(totalItems / pageSize) || 1;

  const handleResetFilters = () => {
    setInputValue('');
    setFilterSpecies('all');
    setFilterSize('all');
    setFilterStatus('all');
    setPage(1);
    toast.success('Filtros restablecidos');
  };

  const handleInputValueChange = (val: string) => {
    setInputValue(val);
    setPage(1);
  };

  const handleSpeciesChange = (val: string) => {
    setFilterSpecies(val);
    setPage(1);
  };

  const handleSizeChange = (val: string) => {
    setFilterSize(val);
    setPage(1);
  };

  const handleStatusChange = (val: string) => {
    setFilterStatus(val);
    setPage(1);
  };

  const openEditModal = (pet: Mascota) => {
    setSelectedPet(pet);
    setIsEditDialogOpen(true);
  };

  const openDeleteModal = (pet: Mascota) => {
    setSelectedPet(pet);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8 xl:px-10">
        <main className="space-y-8">
          {/* Cabecera */}
          <div>
            <TypographyH1 className="text-foreground">Moderación de Mascotas</TypographyH1>
            <TypographyLead className="mt-2 text-muted-foreground">
              Supervisa todas las mascotas publicadas en el sistema. Edita los detalles de cualquier publicación o elimina perfiles inapropiados.
            </TypographyLead>
          </div>

          {/* Barra de Filtros */}
          <PetsFilters
            inputValue={inputValue}
            setInputValue={handleInputValueChange}
            filterSpecies={filterSpecies}
            setFilterSpecies={handleSpeciesChange}
            filterSize={filterSize}
            setFilterSize={handleSizeChange}
            filterStatus={filterStatus}
            setFilterStatus={handleStatusChange}
            onReset={handleResetFilters}
          />

          {/* Tabla de Resultados */}
          <PetsTable
            pets={pets}
            isLoading={isLoading}
            isError={isError}
            page={page}
            totalPages={totalPages}
            totalItems={totalItems}
            pageSize={pageSize}
            onPageChange={setPage}
            onEdit={openEditModal}
            onDelete={openDeleteModal}
          />
        </main>
      </div>

      {/* Modal de Edición de Mascota */}
      <EditPetDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        pet={selectedPet}
        onSuccess={refetch}
      />

      {/* Modal de Confirmación de Eliminación de Mascota */}
      <DeletePetDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        pet={selectedPet}
        onSuccess={refetch}
      />
    </div>
  );
}
