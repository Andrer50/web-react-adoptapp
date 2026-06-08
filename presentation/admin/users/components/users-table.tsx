import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import { Edit3, Trash2, AlertCircle } from 'lucide-react';
import { Usuario } from '@/core/users/interfaces';

interface UsersTableProps {
  users: Usuario[];
  isLoading: boolean;
  isError: boolean;
  onEdit: (user: Usuario) => void;
  onDelete: (user: Usuario) => void;
}

export function UsersTable({ users, isLoading, isError, onEdit, onDelete }: UsersTableProps) {
  const getRoleBadge = (role: string) => {
    if (role === 'ADMIN') {
      return (
        <Badge className="border-0 bg-red-100 text-red-700 hover:bg-red-200 font-bold uppercase tracking-wider text-[10px]">
          Administrador
        </Badge>
      );
    }
    if (role === 'ALBERGUE') {
      return (
        <Badge className="border-0 bg-blue-100 text-blue-700 hover:bg-blue-200 font-bold uppercase tracking-wider text-[10px]">
          Albergue
        </Badge>
      );
    }
    return (
      <Badge className="border-0 bg-orange-100 text-orange-700 hover:bg-orange-200 font-bold uppercase tracking-wider text-[10px]">
        Adoptante
      </Badge>
    );
  };

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-border bg-surface overflow-hidden shadow-sm">
        <Table>
          <TableHeader className="bg-muted/40">
            <TableRow>
              <TableHead className="pl-6 font-semibold">Username / Email</TableHead>
              <TableHead className="font-semibold">Nombre Completo</TableHead>
              <TableHead className="font-semibold">Teléfono</TableHead>
              <TableHead className="font-semibold">Rol del Sistema</TableHead>
              <TableHead className="font-semibold">Estado</TableHead>
              <TableHead className="font-semibold">Fecha Registro</TableHead>
              <TableHead className="text-right pr-6 font-semibold">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, idx) => (
              <TableRow key={idx} className="animate-pulse">
                <TableCell className="pl-6 py-4">
                  <div className="h-4 w-32 bg-muted rounded mb-1" />
                  <div className="h-3 w-40 bg-muted rounded" />
                </TableCell>
                <TableCell className="py-4">
                  <div className="h-4 w-28 bg-muted rounded" />
                </TableCell>
                <TableCell className="py-4">
                  <div className="h-4 w-24 bg-muted rounded" />
                </TableCell>
                <TableCell className="py-4">
                  <div className="h-6 w-20 bg-muted rounded-full" />
                </TableCell>
                <TableCell className="py-4">
                  <div className="h-6 w-16 bg-muted rounded-full" />
                </TableCell>
                <TableCell className="py-4">
                  <div className="h-4 w-20 bg-muted rounded" />
                </TableCell>
                <TableCell className="text-right pr-6 py-4">
                  <div className="inline-flex gap-2">
                    <div className="h-8 w-8 bg-muted rounded-full" />
                    <div className="h-8 w-8 bg-muted rounded-full" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-2xl border border-border bg-surface p-8 text-center text-red-500 font-semibold shadow-sm">
        <div className="flex flex-col items-center justify-center gap-2">
          <AlertCircle size={24} />
          <span>No se pudieron cargar los usuarios del servidor.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-surface overflow-hidden shadow-sm">
      <Table>
        <TableHeader className="bg-muted/40">
          <TableRow>
            <TableHead className="pl-6 font-semibold">Username / Email</TableHead>
            <TableHead className="font-semibold">Nombre Completo</TableHead>
            <TableHead className="font-semibold">Teléfono</TableHead>
            <TableHead className="font-semibold">Rol del Sistema</TableHead>
            <TableHead className="font-semibold">Estado</TableHead>
            <TableHead className="font-semibold">Fecha Registro</TableHead>
            <TableHead className="text-right pr-6 font-semibold">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length > 0 ? (
            users.map((user) => (
              <TableRow key={user.id} className="hover:bg-muted/10 transition-colors">
                <TableCell className="pl-6 py-3.5">
                  <div className="font-semibold text-foreground">{user.username}</div>
                  <div className="text-xs text-muted-foreground">{user.email}</div>
                </TableCell>
                <TableCell className="text-muted-foreground py-3.5">
                  {user.first_name || user.last_name
                    ? `${user.first_name || ''} ${user.last_name || ''}`.trim()
                    : <span className="italic text-muted-foreground/60">No registrado</span>}
                </TableCell>
                <TableCell className="text-muted-foreground py-3.5">
                  {user.telefono ? user.telefono : <span className="italic text-muted-foreground/60">-</span>}
                </TableCell>
                <TableCell className="py-3.5">
                  {getRoleBadge(user.tipo_rol)}
                </TableCell>
                <TableCell className="py-3.5">
                  <Badge
                    className={`border-0 font-bold uppercase text-[10px] tracking-wide ${
                      user.is_active
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {user.is_active ? 'Activo' : 'Inactivo'}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground text-xs py-3.5">
                  {user.date_joined ? new Date(user.date_joined).toLocaleDateString() : '-'}
                </TableCell>
                <TableCell className="text-right pr-6 py-3.5">
                  <div className="inline-flex gap-2 justify-end">
                    <Button
                      type="button"
                      size="icon-sm"
                      variant="ghost"
                      onClick={() => onEdit(user)}
                      className="h-8 w-8 rounded-full bg-background hover:bg-muted text-foreground border border-border shadow-sm active:scale-90"
                      title="Editar Rol"
                    >
                      <Edit3 size={14} />
                    </Button>
                    <Button
                      type="button"
                      size="icon-sm"
                      variant="ghost"
                      onClick={() => onDelete(user)}
                      className="h-8 w-8 rounded-full bg-background hover:bg-red-50 text-red-500 border border-border shadow-sm active:scale-90"
                      title="Eliminar Usuario"
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="h-64 text-center">
                <div className="flex flex-col items-center justify-center p-8">
                  <h3 className="text-lg font-semibold text-foreground mb-1">No se encontraron usuarios</h3>
                  <p className="text-sm text-muted-foreground max-w-sm">
                    Intenta modificar los términos de búsqueda o filtros.
                  </p>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
