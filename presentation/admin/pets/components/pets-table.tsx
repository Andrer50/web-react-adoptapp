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
import { Edit3, Trash2, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { Mascota } from '@/core/pets/interfaces';
import { getRelativeImageUrl } from '@/lib/utils';


interface PetsTableProps {
  pets: Mascota[];
  isLoading: boolean;
  isError: boolean;
  page: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (newPage: number) => void;
  onEdit: (pet: Mascota) => void;
  onDelete: (pet: Mascota) => void;
}

export function PetsTable({
  pets,
  isLoading,
  isError,
  page,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  onEdit,
  onDelete,
}: PetsTableProps) {
  if (isLoading) {
    return (
      <div className="rounded-2xl border border-border bg-surface overflow-hidden shadow-sm">
        <Table>
          <TableHeader className="bg-muted/40">
            <TableRow>
              <TableHead className="w-[80px] pl-6 font-semibold">Foto</TableHead>
              <TableHead className="font-semibold">Nombre</TableHead>
              <TableHead className="font-semibold">Especie / Raza</TableHead>
              <TableHead className="font-semibold">Edad</TableHead>
              <TableHead className="font-semibold">Tamaño</TableHead>
              <TableHead className="font-semibold">Publicador ID</TableHead>
              <TableHead className="font-semibold">Estado</TableHead>
              <TableHead className="text-right pr-6 font-semibold">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: pageSize }).map((_, idx) => (
              <TableRow key={idx} className="animate-pulse">
                <TableCell className="pl-6 py-4">
                  <div className="h-10 w-10 bg-muted rounded-lg" />
                </TableCell>
                <TableCell className="py-4">
                  <div className="h-4 w-28 bg-muted rounded" />
                </TableCell>
                <TableCell className="py-4">
                  <div className="h-4 w-24 bg-muted rounded" />
                </TableCell>
                <TableCell className="py-4">
                  <div className="h-4 w-12 bg-muted rounded" />
                </TableCell>
                <TableCell className="py-4">
                  <div className="h-4 w-16 bg-muted rounded" />
                </TableCell>
                <TableCell className="py-4">
                  <div className="h-4 w-16 bg-muted rounded" />
                </TableCell>
                <TableCell className="py-4">
                  <div className="h-6 w-20 bg-muted rounded-full" />
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
          <span>No se pudieron cargar las publicaciones del servidor.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-surface overflow-hidden shadow-sm">
      <Table>
        <TableHeader className="bg-muted/40">
          <TableRow>
            <TableHead className="w-[80px] pl-6 font-semibold">Foto</TableHead>
            <TableHead className="font-semibold">Nombre</TableHead>
            <TableHead className="font-semibold">Especie / Raza</TableHead>
            <TableHead className="font-semibold">Edad</TableHead>
            <TableHead className="font-semibold">Tamaño</TableHead>
            <TableHead className="font-semibold">Publicador ID</TableHead>
            <TableHead className="font-semibold">Estado</TableHead>
            <TableHead className="text-right pr-6 font-semibold">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pets.length > 0 ? (
            pets.map((pet) => {
              const imageUrl = getRelativeImageUrl(pet.fotos?.[0]?.url_imagen) || '/dog_toby.png';
              return (
                <TableRow key={pet.id} className="hover:bg-muted/10 transition-colors">
                  <TableCell className="pl-6 py-3.5">
                    <div className="h-10 w-10 relative rounded-lg overflow-hidden border border-border/60 bg-muted shadow-sm">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={imageUrl}
                        alt={pet.nombre}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/dog_toby.png';
                        }}
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-bold text-foreground py-3.5">
                    {pet.nombre}
                  </TableCell>
                  <TableCell className="text-muted-foreground py-3.5">
                    {pet.especie} / {pet.raza}
                  </TableCell>
                  <TableCell className="text-muted-foreground py-3.5">
                    {pet.edad}
                  </TableCell>
                  <TableCell className="py-3.5">
                    <Badge variant="secondary" className="bg-primary/10 text-primary border-0 text-[11px] font-semibold">
                      {pet.tamano}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-xs py-3.5 font-mono">
                    ID #{pet.publicador}
                  </TableCell>
                  <TableCell className="py-3.5">
                    <Badge
                      className={`border-0 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                        pet.estado === 'DISPONIBLE'
                          ? 'bg-primary text-white'
                          : 'bg-orange-200 text-orange-800'
                      }`}
                    >
                      {pet.estado}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right pr-6 py-3.5">
                    <div className="inline-flex gap-2 justify-end">
                      <Button
                        type="button"
                        size="icon-sm"
                        variant="ghost"
                        onClick={() => onEdit(pet)}
                        className="h-8 w-8 rounded-full bg-background hover:bg-muted text-foreground border border-border shadow-sm active:scale-90"
                        title="Editar Mascota"
                      >
                        <Edit3 size={14} />
                      </Button>
                      <Button
                        type="button"
                        size="icon-sm"
                        variant="ghost"
                        onClick={() => onDelete(pet)}
                        className="h-8 w-8 rounded-full bg-background hover:bg-red-50 text-red-500 border border-border shadow-sm active:scale-90"
                        title="Eliminar Mascota"
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={8} className="h-64 text-center">
                <div className="flex flex-col items-center justify-center p-8">
                  <h3 className="text-lg font-semibold text-foreground mb-1">No se encontraron mascotas</h3>
                  <p className="text-sm text-muted-foreground max-w-sm">
                    Intenta cambiar los términos de búsqueda o filtros.
                  </p>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Paginación */}
      {pets.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t border-border bg-muted/20">
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Mostrando {Math.min((page - 1) * pageSize + 1, totalItems)} a{' '}
            {Math.min(page * pageSize, totalItems)} de {totalItems} mascotas
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-muted-foreground mr-2">
              Página {page} de {totalPages}
            </span>
            <Button
              type="button"
              variant="outline"
              size="icon-sm"
              disabled={page === 1}
              onClick={() => onPageChange(Math.max(page - 1, 1))}
              className="h-9 w-9 rounded-xl border-border text-foreground hover:bg-surface-container active:scale-95 disabled:opacity-40"
            >
              <ChevronLeft size={16} />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon-sm"
              disabled={page >= totalPages}
              onClick={() => onPageChange(Math.min(page + 1, totalPages))}
              className="h-9 w-9 rounded-xl border-border text-foreground hover:bg-surface-container active:scale-95 disabled:opacity-40"
            >
              <ChevronRight size={16} />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
