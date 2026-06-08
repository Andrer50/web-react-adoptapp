import { Search, RotateCcw, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface UsersFiltersProps {
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  roleFilter: string;
  setRoleFilter: (val: string) => void;
  statusFilter: string;
  setStatusFilter: (val: string) => void;
  onReset: () => void;
}

export function UsersFilters({
  searchTerm,
  setSearchTerm,
  roleFilter,
  setRoleFilter,
  statusFilter,
  setStatusFilter,
  onReset,
}: UsersFiltersProps) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-border bg-surface p-4 shadow-sm">
      <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
        <SlidersHorizontal size={14} className="text-primary" />
        <span>Filtros de Búsqueda</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Búsqueda */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            size="xl"
            placeholder="Buscar usuario o email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 w-full bg-background border-border focus-visible:ring-primary shadow-none"
          />
        </div>

        {/* Rol */}
        <Select value={roleFilter} onValueChange={(val) => setRoleFilter(val || 'all')}>
          <SelectTrigger size="xl" className="w-full border-border bg-background focus:ring-primary">
            <span className="truncate pr-2 block text-left">
              {roleFilter === 'all'
                ? 'Todos los roles'
                : roleFilter === 'ADMIN'
                  ? 'Administrador'
                  : roleFilter === 'ALBERGUE'
                    ? 'Albergue'
                    : 'Adoptante'}
            </span>
          </SelectTrigger>
          <SelectContent className="rounded-xl border-border">
            <SelectItem value="all">Todos los roles</SelectItem>
            <SelectItem value="ADMIN">Administradores</SelectItem>
            <SelectItem value="ALBERGUE">Albergues</SelectItem>
            <SelectItem value="USER">Adoptantes</SelectItem>
          </SelectContent>
        </Select>

        {/* Estado */}
        <Select value={statusFilter} onValueChange={(val) => setStatusFilter(val || 'all')}>
          <SelectTrigger size="xl" className="w-full border-border bg-background focus:ring-primary">
            <span className="truncate pr-2 block text-left">
              {statusFilter === 'all'
                ? 'Todos los estados'
                : statusFilter === 'active'
                  ? 'Activos'
                  : 'Inactivos / Baneados'}
            </span>
          </SelectTrigger>
          <SelectContent className="rounded-xl border-border">
            <SelectItem value="all">Todos los estados</SelectItem>
            <SelectItem value="active">Activos</SelectItem>
            <SelectItem value="inactive">Inactivos / Baneados</SelectItem>
          </SelectContent>
        </Select>

        {/* Restablecer */}
        <Button
          type="button"
          variant="outline"
          size="xl"
          onClick={onReset}
          className="w-full border-border text-foreground hover:bg-surface-container font-semibold gap-2 active:scale-95"
        >
          <RotateCcw size={16} />
          Restablecer
        </Button>
      </div>
    </div>
  );
}
