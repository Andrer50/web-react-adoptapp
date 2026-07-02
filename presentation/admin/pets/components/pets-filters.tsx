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

interface PetsFiltersProps {
  inputValue: string;
  setInputValue: (val: string) => void;
  filterSpecies: string;
  setFilterSpecies: (val: string) => void;
  filterSize: string;
  setFilterSize: (val: string) => void;
  filterStatus: string;
  setFilterStatus: (val: string) => void;
  onReset: () => void;
}

export function PetsFilters({
  inputValue,
  setInputValue,
  filterSpecies,
  setFilterSpecies,
  filterSize,
  setFilterSize,
  filterStatus,
  setFilterStatus,
  onReset,
}: PetsFiltersProps) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-border bg-surface p-4 shadow-sm">
      <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
        <SlidersHorizontal size={14} className="text-primary" />
        <span>Filtros de Búsqueda</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {/* Búsqueda */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            size="xl"
            placeholder="Buscar por nombre..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="pl-9 w-full bg-background border-border focus-visible:ring-primary shadow-none"
          />
        </div>

        {/* Especie */}
        <Select value={filterSpecies} onValueChange={(val) => setFilterSpecies(val || 'all')}>
          <SelectTrigger size="xl" className="w-full border-border bg-background focus:ring-primary">
            <span className="truncate pr-2 block text-left">
              {filterSpecies === 'all'
                ? 'Todas las especies'
                : filterSpecies === 'Perro'
                  ? 'Perros'
                  : filterSpecies === 'Gato'
                    ? 'Gatos'
                    : filterSpecies === 'Ave'
                      ? 'Aves'
                      : 'Otros'}
            </span>
          </SelectTrigger>
          <SelectContent className="rounded-md border-border">
            <SelectItem value="all">Todas las especies</SelectItem>
            <SelectItem value="Perro">Perros</SelectItem>
            <SelectItem value="Gato">Gatos</SelectItem>
            <SelectItem value="Ave">Aves</SelectItem>
            <SelectItem value="Otro">Otros</SelectItem>
          </SelectContent>
        </Select>

        {/* Tamaño */}
        <Select value={filterSize} onValueChange={(val) => setFilterSize(val || 'all')}>
          <SelectTrigger size="xl" className="w-full border-border bg-background focus:ring-primary">
            <span className="truncate pr-2 block text-left">
              {filterSize === 'all' ? 'Todos los tamaños' : filterSize}
            </span>
          </SelectTrigger>
          <SelectContent className="rounded-md border-border">
            <SelectItem value="all">Todos los tamaños</SelectItem>
            <SelectItem value="Pequeño">Pequeño</SelectItem>
            <SelectItem value="Mediano">Mediano</SelectItem>
            <SelectItem value="Grande">Grande</SelectItem>
          </SelectContent>
        </Select>

        {/* Estado */}
        <Select value={filterStatus} onValueChange={(val) => setFilterStatus(val || 'all')}>
          <SelectTrigger size="xl" className="w-full border-border bg-background focus:ring-primary">
            <span className="truncate pr-2 block text-left">
              {filterStatus === 'all'
                ? 'Todos los estados'
                : filterStatus === 'DISPONIBLE'
                  ? 'Disponible'
                  : 'Adoptado'}
            </span>
          </SelectTrigger>
          <SelectContent className="rounded-md border-border">
            <SelectItem value="all">Todos los estados</SelectItem>
            <SelectItem value="DISPONIBLE">Disponible</SelectItem>
            <SelectItem value="ADOPTADO">Adoptado</SelectItem>
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
