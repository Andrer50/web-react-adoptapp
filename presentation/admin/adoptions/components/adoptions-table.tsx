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
import { HeartHandshake, AlertCircle, Trash2 } from 'lucide-react';
import { Adopcion } from '@/core/adoptions/interfaces';

interface AdoptionsTableProps {
  adoptions: Adopcion[];
  isLoading: boolean;
  isError: boolean;
  onDelete: (adoption: Adopcion) => void;
}

export function AdoptionsTable({ adoptions, isLoading, isError, onDelete }: AdoptionsTableProps) {
  if (isLoading) {
    return (
      <div className="rounded-2xl border border-border bg-surface overflow-hidden shadow-sm">
        <Table>
          <TableHeader className="bg-muted/40">
            <TableRow>
              <TableHead className="w-[80px] pl-6 font-semibold">Foto</TableHead>
              <TableHead className="font-semibold">Mascota</TableHead>
              <TableHead className="font-semibold">Adoptante (Usuario)</TableHead>
              <TableHead className="font-semibold">Contacto</TableHead>
              <TableHead className="font-semibold">Fecha Adopción</TableHead>
              <TableHead className="font-semibold">Estado de Proceso</TableHead>
              <TableHead className="text-right pr-6 font-semibold">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, idx) => (
              <TableRow key={idx} className="animate-pulse">
                <TableCell className="pl-6 py-4">
                  <div className="h-10 w-10 bg-muted rounded-lg" />
                </TableCell>
                <TableCell className="py-4">
                  <div className="h-4 w-28 bg-muted rounded mb-1" />
                  <div className="h-3 w-16 bg-muted rounded" />
                </TableCell>
                <TableCell className="py-4">
                  <div className="h-4 w-32 bg-muted rounded mb-1" />
                  <div className="h-3 w-40 bg-muted rounded" />
                </TableCell>
                <TableCell className="py-4">
                  <div className="h-4 w-24 bg-muted rounded" />
                </TableCell>
                <TableCell className="py-4">
                  <div className="h-4 w-20 bg-muted rounded" />
                </TableCell>
                <TableCell className="py-4">
                  <div className="h-6 w-16 bg-muted rounded-full" />
                </TableCell>
                <TableCell className="text-right pr-6 py-4">
                  <div className="h-8 w-8 bg-muted rounded-full ml-auto" />
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
          <span>No se pudieron cargar los registros de adopción.</span>
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
            <TableHead className="font-semibold">Mascota</TableHead>
            <TableHead className="font-semibold">Adoptante (Usuario)</TableHead>
            <TableHead className="font-semibold">Contacto</TableHead>
            <TableHead className="font-semibold">Fecha Adopción</TableHead>
            <TableHead className="font-semibold">Estado de Proceso</TableHead>
            <TableHead className="text-right pr-6 font-semibold">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {adoptions.length > 0 ? (
            adoptions.map((adoption) => {
              const pet = adoption.mascota_detalle;
              const adopter = adoption.adoptante_detalle;
              const imageUrl = pet?.fotos?.[0]?.url_imagen || '/dog_toby.png';

              return (
                <TableRow key={adoption.id} className="hover:bg-muted/10 transition-colors">
                  <TableCell className="pl-6 py-3.5">
                    <div className="h-10 w-10 relative rounded-lg overflow-hidden border border-border/60 bg-muted shadow-sm">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={imageUrl}
                        alt={pet?.nombre || 'Mascota'}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/dog_toby.png';
                        }}
                      />
                    </div>
                  </TableCell>
                  <TableCell className="py-3.5">
                    <div className="font-bold text-foreground">
                      {pet ? pet.nombre : <span className="italic text-muted-foreground/60">Mascota eliminada</span>}
                    </div>
                    {pet && (
                      <div className="text-xs text-muted-foreground">
                        {pet.especie} - {pet.raza}
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="py-3.5">
                    <div className="font-semibold text-foreground">
                      {adopter ? `${adopter.first_name || ''} ${adopter.last_name || ''}`.trim() || adopter.username : 'Desconocido'}
                    </div>
                    {adopter && (
                      <div className="text-xs text-muted-foreground">
                        {adopter.email}
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="text-muted-foreground py-3.5 text-sm">
                    {adopter?.telefono ? adopter.telefono : <span className="italic text-muted-foreground/60">-</span>}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-xs py-3.5">
                    {new Date(adoption.fecha_adopcion).toLocaleDateString()} a las{' '}
                    {new Date(adoption.fecha_adopcion).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </TableCell>
                  <TableCell className="py-3.5">
                    <Badge className="border-0 bg-green-100 text-green-700 hover:bg-green-200 font-bold uppercase tracking-wider text-[10px] gap-1 px-2.5 py-0.5">
                      <HeartHandshake size={10} />
                      Completada
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right pr-6 py-3.5">
                    <Button
                      type="button"
                      size="icon-sm"
                      variant="ghost"
                      onClick={() => onDelete(adoption)}
                      className="h-8 w-8 rounded-full bg-background hover:bg-red-50 text-red-500 border border-border shadow-sm active:scale-90"
                      title="Eliminar registro / Revertir Adopción"
                    >
                      <Trash2 size={14} />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="h-64 text-center">
                <div className="flex flex-col items-center justify-center p-8">
                  <div className="rounded-full bg-primary/10 p-4 mb-4">
                    <HeartHandshake className="text-primary" size={32} />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">No hay adopciones registradas</h3>
                  <p className="text-sm text-muted-foreground max-w-sm">
                    Cuando los usuarios adopten mascotas, los registros aparecerán aquí automáticamente.
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
