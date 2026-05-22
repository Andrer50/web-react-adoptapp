'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TypographyH1, TypographyLead } from '@/components/ui/typography';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { CreatePetForm } from '../create-pet-form';
import { MyPublicationCard } from '../my-publication-card';
import { useGetMascotasQuery } from '@/modules/pets/domain/hooks/usePetQueries';

export function MyPublicationsPage() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: myPets = [], isLoading, isError } = useGetMascotasQuery();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8 xl:px-10">
        <main className="space-y-8">
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
                  <CreatePetForm onSuccess={() => setIsOpen(false)} />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {isLoading ? (
            <div className="rounded-2xl border border-border bg-surface p-8 text-center text-muted-foreground shadow-sm">
              Cargando tus publicaciones desde el backend...
            </div>
          ) : isError ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center text-red-700 shadow-sm">
              No se pudieron cargar tus publicaciones.
            </div>
          ) : myPets.length > 0 ? (
            <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {myPets.map((pet) => (
                <MyPublicationCard
                  key={pet.id}
                  pet={pet}
                  onEdit={(id) => {
                    // TODO: abrir editor de publicación
                    console.log('edit', id);
                  }}
                  onDelete={(id) => {
                    // TODO: confirmar y eliminar publicación
                    console.log('delete', id);
                  }}
                />
              ))}
            </section>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-20 text-center">
              <div className="rounded-full bg-primary/10 p-4 mb-4">
                <Plus className="text-primary" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">No tienes publicaciones</h3>
              <p className="text-muted-foreground max-w-sm">
                Aún no has registrado ninguna mascota. Haz clic en Nueva Publicación para empezar.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
