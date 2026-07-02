'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { TypographyH1, TypographyLead, TypographySmall } from '@/components/ui/typography';
import { FiltersDrawer } from '../filter-drawer';
import { PetCard } from '../pet-card';
import { useGetMascotasQuery } from '@/modules/pets/domain/hooks/usePetQueries';

const defaultSpecies = ['dogs', 'cats', 'birds'];

export function CatalogPage() {
    const [selectedSpecies, setSelectedSpecies] = useState<string[]>(defaultSpecies);
    const [selectedAge, setSelectedAge] = useState<string | null>(null);
    const [selectedSize, setSelectedSize] = useState('all');
    const [favorites, setFavorites] = useState<Record<number, boolean>>({});

    const queryParams = {
        page_size: 100,
        // Si todas las especies están seleccionadas (o ninguna), no mandamos filtro (trae todas)
        especie: selectedSpecies.length > 0 && selectedSpecies.length < 3 ? selectedSpecies.join(',') : undefined,
        edad: selectedAge || undefined,
        tamano: selectedSize !== 'all' ? selectedSize : undefined,
    };

    const { data: paginatedData, isLoading, isError } = useGetMascotasQuery(queryParams);
    const petCards = paginatedData?.results || [];

    const toggleFavorite = (id: number) => {
        setFavorites((current) => ({ ...current, [id]: !current[id] }));
    };

    const toggleSpecies = (species: string) => {
        setSelectedSpecies((current) =>
            current.includes(species) ? current.filter((item) => item !== species) : [...current, species],
        );
    };

    const resetFilters = () => {
        setSelectedSpecies(defaultSpecies);
        setSelectedAge(null);
        setSelectedSize('all');
    };

    return (
        <div className="min-h-screen bg-[#faf5f1] text-on-background">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8 xl:px-10">
                <main className="space-y-8">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                        <div className="max-w-3xl">
                            <TypographySmall className="uppercase tracking-[0.3em] text-muted-foreground">Catálogo de Adopción</TypographySmall>
                            <TypographyH1 className="mt-3 text-foreground">
                                Encuentra a tu nuevo mejor amigo
                            </TypographyH1>
                            <TypographyLead className="mt-6">Mostrando 24 adorables mascotas listas para un hogar.</TypographyLead>
                        </div>

                        <div className="flex w-full items-center gap-3 lg:mt-2 lg:w-auto lg:justify-end">
                            <FiltersDrawer
                                selectedSpecies={selectedSpecies}
                                selectedAge={selectedAge}
                                selectedSize={selectedSize}
                                onResetFilters={resetFilters}
                                onToggleSpecies={toggleSpecies}
                                onSelectAge={setSelectedAge}
                                onSelectSize={setSelectedSize}
                            />
                        </div>
                    </div>

                    {isLoading ? (
                        <div className="rounded-2xl border border-border bg-surface p-8 text-center text-muted-foreground shadow-sm">
                            Cargando mascotas desde el backend...
                        </div>
                    ) : isError ? (
                        <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center text-red-700 shadow-sm">
                            No se pudieron cargar las mascotas.
                        </div>
                    ) : (
                        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {petCards.map((pet) => (
                                <PetCard key={pet.id} pet={pet} isFavorite={favorites[pet.id] ?? false} onToggleFavorite={toggleFavorite} />
                            ))}
                        </section>
                    )}

                    <div className="flex justify-center pb-6 pt-2">
                        <Button
                            type="button"
                            variant="outline"
                            className="h-12 rounded-full border-2 border-primary px-8 text-sm font-medium text-primary hover:bg-primary/10"
                        >
                            Cargar más compañeros
                        </Button>
                    </div>
                </main>
            </div>
        </div>
    );
}
