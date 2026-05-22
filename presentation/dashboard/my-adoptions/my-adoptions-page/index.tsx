'use client';

import { HeartHandshake, PawPrint } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TypographyH1, TypographyLead } from '@/components/ui/typography';

export function MyAdoptionsPage() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8 xl:px-10">
                <main className="space-y-8">
                    <div className="max-w-2xl">
                        <TypographyH1 className="mt-3 text-foreground">Mis Adopciones</TypographyH1>
                        <TypographyLead className="mt-6 text-muted-foreground">
                            Aquí verás el historial de adopciones y seguimiento de tus mascotas.
                        </TypographyLead>
                    </div>

                    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-surface py-20 text-center">
                        <div className="mb-4 rounded-full bg-primary/10 p-4">
                            <HeartHandshake className="text-primary" size={32} />
                        </div>
                        <h3 className="mb-2 text-xl font-semibold text-foreground">Aún no tienes adopciones registradas</h3>
                        <p className="max-w-sm text-muted-foreground">
                            Cuando tengas adopciones activas, podrás ver aquí el seguimiento y los detalles.
                        </p>
                        <Button className="mt-6 h-11 rounded-xl bg-primary px-5 font-semibold text-primary-foreground hover:bg-primary-hover">
                            <PawPrint className="mr-2" size={18} />
                            Explorar catálogo
                        </Button>
                    </div>
                </main>
            </div>
        </div>
    );
}
