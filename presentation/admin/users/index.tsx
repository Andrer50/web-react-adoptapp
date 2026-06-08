"use client"
import { useState, useMemo } from 'react';
import { TypographyH1, TypographyLead } from '@/components/ui/typography';
import { useGetUsuariosQuery } from '@/modules/users/domain/hooks/useUserQueries';
import { toast } from 'sonner';
import { Usuario } from '@/core/users/interfaces';

// Componentes modulares
import { UsersFilters } from './components/users-filters';
import { UsersTable } from './components/users-table';
import { EditUserDialog } from './components/edit-user-dialog';
import { DeleteUserDialog } from './components/delete-user-dialog';

export function AdminUsersPage() {
  const { data: users = [], isLoading, isError, refetch } = useGetUsuariosQuery();

  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Modal states
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<Usuario | null>(null);

  // Filter application
  const filteredUsers = useMemo(() => {
    let result = users;

    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (u) =>
          u.username.toLowerCase().includes(term) ||
          u.email.toLowerCase().includes(term) ||
          (u.first_name && u.first_name.toLowerCase().includes(term)) ||
          (u.last_name && u.last_name.toLowerCase().includes(term))
      );
    }

    if (roleFilter !== 'all') {
      result = result.filter((u) => u.tipo_rol === roleFilter);
    }

    if (statusFilter !== 'all') {
      const activeState = statusFilter === 'active';
      result = result.filter((u) => u.is_active === activeState);
    }

    return result;
  }, [users, searchTerm, roleFilter, statusFilter]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setRoleFilter('all');
    setStatusFilter('all');
    toast.success('Filtros restablecidos');
  };

  const openEditModal = (user: Usuario) => {
    setSelectedUser(user);
    setIsEditDialogOpen(true);
  };

  const openDeleteModal = (user: Usuario) => {
    setSelectedUser(user);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8 xl:px-10">
        <main className="space-y-8">
          {/* Cabecera */}
          <div>
            <TypographyH1 className="text-foreground">Gestión de Usuarios</TypographyH1>
            <TypographyLead className="mt-2 text-muted-foreground">
              Visualiza la lista de usuarios, ajusta sus roles en el sistema (Adoptante, Albergue, Administrador) o gestiona su estado.
            </TypographyLead>
          </div>

          {/* Barra de Filtros */}
          <UsersFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            roleFilter={roleFilter}
            setRoleFilter={setRoleFilter}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            onReset={handleResetFilters}
          />

          {/* Tabla de Resultados */}
          <UsersTable
            users={filteredUsers}
            isLoading={isLoading}
            isError={isError}
            onEdit={openEditModal}
            onDelete={openDeleteModal}
          />
        </main>
      </div>

      {/* Modal de Edición de Usuario */}
      <EditUserDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        user={selectedUser}
        onSuccess={refetch}
      />

      {/* Modal de Confirmación de Eliminación */}
      <DeleteUserDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        user={selectedUser}
        onSuccess={refetch}
      />
    </div>
  );
}
