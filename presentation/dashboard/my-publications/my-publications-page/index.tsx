'use client';

import { useState, useEffect } from 'react';
import {
  Plus,
  Search,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Edit3,
  Trash2,
  SlidersHorizontal,
  AlertCircle,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { TypographyH1, TypographyLead } from '@/components/ui/typography';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import { CreatePetForm } from '../create-pet-form';
import { useGetMascotasQuery } from '@/modules/pets/domain/hooks/usePetQueries';
import { toast } from 'sonner';
import { Mascota } from '@/core/pets/interfaces';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export function MyPublicationsPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedPet, setSelectedPet] = useState<Mascota | null>(null);

  // Estados de paginación y filtros
  const [page, setPage] = useState(1);
  const [inputValue, setInputValue] = useState('');
  const [searchName, setSearchName] = useState('');
  const [filterSpecies, setFilterSpecies] = useState('all');
  const [filterSize, setFilterSize] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // Debounce para el input de búsqueda de nombre (400ms)
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchName(inputValue);
      setPage(1); // Reset a pág 1 cuando se cambia la búsqueda
    }, 400);

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue]);

  // Construcción de parámetros para la query del backend
  const queryParams = {
    mis_publicaciones: true,
    page,
    nombre: searchName || undefined,
    especie: filterSpecies !== 'all' ? filterSpecies : undefined,
    tamano: filterSize !== 'all' ? filterSize : undefined,
    estado: filterStatus !== 'all' ? filterStatus : undefined,
  };

  const { data, isLoading, isError, refetch } = useGetMascotasQuery(queryParams);

  const myPets = data?.results || [];
  const totalItems = data?.count || 0;
  const pageSize = 5; // Sincronizado con MascotaPagination en backend
  const totalPages = Math.ceil(totalItems / pageSize) || 1;

  const handleResetFilters = () => {
    setInputValue('');
    setSearchName('');
    setFilterSpecies('all');
    setFilterSize('all');
    setFilterStatus('all');
    setPage(1);
    toast.success('Filtros restablecidos');
  };

  const handleEdit = (pet: Mascota) => {
    setSelectedPet(pet);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (nombre: string) => {
    toast.error(`Eliminar mascota "${nombre}" (Función en desarrollo)`);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8 xl:px-10">
        <main className="space-y-8">
          {/* Cabecera */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="max-w-2xl">
              <TypographyH1 className="mt-3 text-foreground">Mis Publicaciones</TypographyH1>
              <TypographyLead className="mt-6 text-muted-foreground">
                Gestiona las mascotas que has publicado para adopción.
              </TypographyLead>
            </div>

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger>
                <Button className="h-12 rounded-xl px-6 font-semibold shadow-sm w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary-hover">
                  <Plus className="mr-2" size={20} />
                  Nueva Publicación
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-lg overflow-y-auto bg-surface border-l border-border p-0">
                <SheetHeader className="border-b border-border px-6 py-6 bg-background sticky top-0 z-10">
                  <SheetTitle className="scroll-m-20 text-2xl font-semibold tracking-tight text-foreground">
                    Publicar Mascota
                  </SheetTitle>
                </SheetHeader>
                <div className="p-6">
                  <CreatePetForm onSuccess={() => {
                    setIsOpen(false);
                    refetch();
                  }} />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Barra de Filtros */}
          <div className="flex flex-col gap-3 rounded-2xl border border-border bg-surface p-4 shadow-sm">
            <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              <SlidersHorizontal size={14} className="text-primary" />
              <span>Filtros de Búsqueda</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {/* Búsqueda por Nombre */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Buscar por nombre..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="pl-9 h-11 w-full bg-background border-border rounded-xl focus-visible:ring-primary shadow-none"
                />
              </div>

              {/* Filtrar Especie */}
              <Select
                value={filterSpecies}
                onValueChange={(val) => {
                  setFilterSpecies(val || 'all');
                  setPage(1);
                }}
              >
                <SelectTrigger className="h-11 w-full rounded-xl border-border bg-background focus:ring-primary text-sm flex items-center justify-between overflow-hidden">
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
                <SelectContent className="rounded-xl border-border">
                  <SelectItem value="all">Todas las especies</SelectItem>
                  <SelectItem value="Perro">Perros</SelectItem>
                  <SelectItem value="Gato">Gatos</SelectItem>
                  <SelectItem value="Ave">Aves</SelectItem>
                  <SelectItem value="Otro">Otros</SelectItem>
                </SelectContent>
              </Select>

              {/* Filtrar Tamaño */}
              <Select
                value={filterSize}
                onValueChange={(val) => {
                  setFilterSize(val || 'all');
                  setPage(1);
                }}
              >
                <SelectTrigger className="h-11 w-full rounded-xl border-border bg-background focus:ring-primary text-sm flex items-center justify-between overflow-hidden">
                  <span className="truncate pr-2 block text-left">
                    {filterSize === 'all' ? 'Todos los tamaños' : filterSize}
                  </span>
                </SelectTrigger>
                <SelectContent className="rounded-xl border-border">
                  <SelectItem value="all">Todos los tamaños</SelectItem>
                  <SelectItem value="Pequeño">Pequeño</SelectItem>
                  <SelectItem value="Mediano">Mediano</SelectItem>
                  <SelectItem value="Grande">Grande</SelectItem>
                </SelectContent>
              </Select>

              {/* Filtrar Estado */}
              <Select
                value={filterStatus}
                onValueChange={(val) => {
                  setFilterStatus(val || 'all');
                  setPage(1);
                }}
              >
                <SelectTrigger className="h-11 w-full rounded-xl border-border bg-background focus:ring-primary text-sm flex items-center justify-between overflow-hidden">
                  <span className="truncate pr-2 block text-left">
                    {filterStatus === 'all' ? 'Todos los estados' : filterStatus === 'DISPONIBLE' ? 'Disponible' : 'Adoptado'}
                  </span>
                </SelectTrigger>
                <SelectContent className="rounded-xl border-border">
                  <SelectItem value="all">Todos los estados</SelectItem>
                  <SelectItem value="DISPONIBLE">Disponible</SelectItem>
                  <SelectItem value="ADOPTADO">Adoptado</SelectItem>
                </SelectContent>
              </Select>

              {/* Limpiar Filtros */}
              <Button
                type="button"
                variant="outline"
                onClick={handleResetFilters}
                className="h-11 w-full rounded-xl border-border text-foreground hover:bg-surface-container font-semibold gap-2 active:scale-95"
              >
                <RotateCcw size={16} />
                Restablecer
              </Button>
            </div>
          </div>

          {/* Tabla de Resultados */}
          <div className="rounded-2xl border border-border bg-surface overflow-hidden shadow-sm">
            <Table>
              <TableHeader className="bg-muted/40">
                <TableRow>
                  <TableHead className="w-[80px] pl-6 font-semibold">Foto</TableHead>
                  <TableHead className="font-semibold">Nombre</TableHead>
                  <TableHead className="font-semibold">Especie</TableHead>
                  <TableHead className="font-semibold">Raza</TableHead>
                  <TableHead className="font-semibold">Edad</TableHead>
                  <TableHead className="font-semibold">Tamaño</TableHead>
                  <TableHead className="font-semibold">Color</TableHead>
                  <TableHead className="font-semibold">Estado</TableHead>
                  <TableHead className="text-right pr-6 font-semibold">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  // Loader en esqueleto
                  Array.from({ length: pageSize }).map((_, idx) => (
                    <TableRow key={idx} className="animate-pulse">
                      <TableCell className="pl-6 py-4">
                        <div className="h-10 w-10 bg-muted rounded-lg" />
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="h-4 w-28 bg-muted rounded" />
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="h-4 w-16 bg-muted rounded" />
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
                  ))
                ) : isError ? (
                  <TableRow>
                    <TableCell colSpan={9} className="h-32 text-center text-red-500 font-semibold">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <AlertCircle size={24} />
                        <span>No se pudieron cargar tus publicaciones del backend.</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : myPets.length > 0 ? (
                  myPets.map((pet) => {
                    const imageUrl = pet.fotos?.[0]?.url_imagen || '/dog_toby.png';
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
                          {pet.especie}
                        </TableCell>
                        <TableCell className="text-muted-foreground py-3.5">
                          {pet.raza}
                        </TableCell>
                        <TableCell className="text-muted-foreground py-3.5">
                          {pet.edad}
                        </TableCell>
                        <TableCell className="py-3.5">
                          <Badge variant="secondary" className="bg-primary/10 text-primary border-0 text-[11px] font-semibold">
                            {pet.tamano}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground py-3.5">
                          {pet.color}
                        </TableCell>
                        <TableCell className="py-3.5">
                          <Badge
                            className={`border-0 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                              pet.estado === 'DISPONIBLE'
                                ? 'bg-[#b75037] text-white'
                                : 'bg-[#f2a65e] text-[#4f2606]'
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
                              onClick={() => handleEdit(pet)}
                              className="h-8 w-8 rounded-full bg-background hover:bg-muted text-foreground border border-border shadow-sm active:scale-90"
                              title="Editar"
                            >
                              <Edit3 size={14} />
                            </Button>
                            <Button
                              type="button"
                              size="icon-sm"
                              variant="ghost"
                              onClick={() => handleDelete(pet.nombre)}
                              className="h-8 w-8 rounded-full bg-background hover:bg-red-50 text-red-500 border border-border shadow-sm active:scale-90"
                              title="Eliminar"
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
                    <TableCell colSpan={9} className="h-64 text-center">
                      <div className="flex flex-col items-center justify-center p-8">
                        <div className="rounded-full bg-primary/10 p-4 mb-4">
                          <Plus className="text-primary" size={32} />
                        </div>
                        <h3 className="text-lg font-semibold text-foreground mb-1">No se encontraron publicaciones</h3>
                        <p className="text-sm text-muted-foreground max-w-sm mb-4">
                          Intenta cambiar los términos de búsqueda o filtros, o publica una nueva mascota.
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>

            {/* Paginación */}
            {!isLoading && !isError && myPets.length > 0 && (
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
                    onClick={() => setPage((p) => Math.max(p - 1, 1))}
                    className="h-9 w-9 rounded-xl border-border text-foreground hover:bg-surface-container active:scale-95 disabled:opacity-40"
                    title="Anterior"
                  >
                    <ChevronLeft size={16} />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon-sm"
                    disabled={page >= totalPages}
                    onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                    className="h-9 w-9 rounded-xl border-border text-foreground hover:bg-surface-container active:scale-95 disabled:opacity-40"
                    title="Siguiente"
                  >
                    <ChevronRight size={16} />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Modal de Edición */}
      <Dialog open={isEditDialogOpen} onOpenChange={(open) => {
        setIsEditDialogOpen(open);
        if (!open) setSelectedPet(null);
      }}>
        <DialogContent className="w-full sm:max-w-lg overflow-y-auto max-h-[85vh] bg-surface border border-border p-0">
          <DialogHeader className="border-b border-border px-6 py-6 bg-background sticky top-0 z-10">
            <DialogTitle className="scroll-m-20 text-2xl font-semibold tracking-tight text-foreground">
              Editar Mascota
            </DialogTitle>
          </DialogHeader>
          <div className="p-6">
            {selectedPet && (
              <CreatePetForm
                pet={selectedPet}
                onSuccess={() => {
                  setIsEditDialogOpen(false);
                  setSelectedPet(null);
                  refetch();
                }}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

