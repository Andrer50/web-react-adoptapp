'use client';

import { HeartHandshake, PawPrint, Award, MessageCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TypographyH1, TypographyLead } from '@/components/ui/typography';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Link from 'next/link';
import { useSessionContext } from '@/contexts/session-context';
import { useBuscarUsuarioPorEmailQuery } from '@/modules/users/domain/hooks/useUserQueries';
import { useGetAdopcionesQuery } from '@/modules/adoptions/domain/hooks/useAdoptionQueries';
import { downloadAdoptionCertificate } from '@/presentation/dashboard/my-publications/my-publications-page/utils/certificate';
import { Adopcion } from '@/core/adoptions/interfaces';
import { Usuario } from '@/core/users/interfaces';
import { getRelativeImageUrl } from '@/lib/utils';
import { toast } from 'sonner';

export function MyAdoptionsPage() {
  const { session } = useSessionContext();
  const email = session?.user?.email || '';

  const { data: userData, isLoading: isLoadingUser } = useBuscarUsuarioPorEmailQuery(email, !!email);
  const { data: adoptions = [], isLoading: isLoadingAdoptions, isError } = useGetAdopcionesQuery();

  const currentUserId = userData?.id || session?.user?.id;

  // Filtrar adopciones donde el usuario actual sea el adoptante
  const myAdoptions = adoptions.filter(
    (adoption) =>
      currentUserId &&
      (String(adoption.adoptante) === String(currentUserId) ||
        String(adoption.adoptante_detalle?.id) === String(currentUserId))
  );

  const handleDownloadCertificate = (adoption: Adopcion) => {
    if (!adoption.mascota_detalle) {
      toast.error('No se pudieron obtener los detalles de la mascota.');
      return;
    }
    // downloadAdoptionCertificate espera (Mascota, Adopcion)
    // El objeto de adopcion del backend ya viene con adoptante_detalle, pero si no, le inyectamos los datos del usuario actual
    const adoptionWithDetails: Adopcion = {
      ...adoption,
      adoptante_detalle: adoption.adoptante_detalle || userData || ({
        id: 0,
        tipo_rol: 'USER',
        is_active: true,
        first_name: session?.user?.name?.split(' ')[0] || '',
        last_name: session?.user?.name?.split(' ').slice(1).join(' ') || '',
        username: session?.user?.email || 'Adoptante',
        email: session?.user?.email || '',
      } as Usuario),
    };
    downloadAdoptionCertificate(adoption.mascota_detalle, adoptionWithDetails);
  };

  const handleContactShelter = (petName: string, phone: string | undefined) => {
    if (!phone) {
      toast.error('Este albergue o usuario no cuenta con un teléfono de contacto registrado.');
      return;
    }

    let phoneClean = phone.replace(/\D/g, '');
    if (phoneClean.length === 9) {
      phoneClean = '51' + phoneClean; // Anteponer código de Perú
    }

    const message = `Hola, te escribo por el seguimiento de la mascota ${petName} que adopté.`;
    const url = `https://wa.me/${phoneClean}?text=${encodeURIComponent(message)}`;

    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const isLoading = isLoadingUser || isLoadingAdoptions;

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

          {isLoading ? (
            <div className="rounded-2xl border border-border bg-surface overflow-hidden shadow-sm">
              <Table>
                <TableHeader className="bg-muted/40">
                  <TableRow>
                    <TableHead className="w-[80px] pl-6 font-semibold">Foto</TableHead>
                    <TableHead className="font-semibold">Mascota</TableHead>
                    <TableHead className="font-semibold">Especie/Raza</TableHead>
                    <TableHead className="font-semibold">Fecha de Adopción</TableHead>
                    <TableHead className="text-right pr-6 font-semibold">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Array.from({ length: 3 }).map((_, idx) => (
                    <TableRow key={idx} className="animate-pulse">
                      <TableCell className="pl-6 py-4">
                        <div className="h-10 w-10 bg-muted rounded-lg" />
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="h-4 w-24 bg-muted rounded" />
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="h-4 w-32 bg-muted rounded" />
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="h-4 w-28 bg-muted rounded" />
                      </TableCell>
                      <TableCell className="text-right pr-6 py-4">
                        <div className="inline-flex gap-2 justify-end w-full">
                          <div className="h-8 w-8 bg-muted rounded-full" />
                          <div className="h-8 w-8 bg-muted rounded-full" />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : isError ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center text-red-700 shadow-sm flex flex-col items-center justify-center gap-2">
              <AlertCircle size={24} />
              <span className="font-semibold">No se pudieron cargar tus adopciones del servidor.</span>
            </div>
          ) : myAdoptions.length > 0 ? (
            <div className="rounded-2xl border border-border bg-surface overflow-hidden shadow-sm">
              <Table>
                <TableHeader className="bg-muted/40">
                  <TableRow>
                    <TableHead className="w-[80px] pl-6 font-semibold">Foto</TableHead>
                    <TableHead className="font-semibold">Mascota</TableHead>
                    <TableHead className="font-semibold">Especie/Raza</TableHead>
                    <TableHead className="font-semibold">Fecha de Adopción</TableHead>
                    <TableHead className="text-right pr-6 font-semibold">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {myAdoptions.map((adoption) => {
                    const pet = adoption.mascota_detalle;
                    if (!pet) return null;

                    const imageUrl = getRelativeImageUrl(pet.fotos?.[0]?.url_imagen) || '/dog_toby.png';
                    const adoptionDate = new Date(adoption.fecha_adopcion).toLocaleDateString('es-ES', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    });

                    return (
                      <TableRow key={adoption.id} className="hover:bg-muted/10 transition-colors">
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
                          {pet.especie} <span className="mx-1 text-muted-foreground/30">•</span> {pet.raza}
                        </TableCell>
                        <TableCell className="text-muted-foreground py-3.5">
                          {adoptionDate}
                        </TableCell>
                        <TableCell className="text-right pr-6 py-3.5">
                          <div className="inline-flex gap-2 justify-end">
                            {/* Botón para contactar al albergue / publicador */}
                            <Button
                              type="button"
                              size="icon-sm"
                              variant="ghost"
                              onClick={() => handleContactShelter(pet.nombre, pet.publicador_telefono)}
                              className="h-8 w-8 rounded-full bg-background hover:bg-green-50 text-green-600 border border-border shadow-sm active:scale-90"
                              title="Contactar al Albergue"
                            >
                              <MessageCircle size={14} />
                            </Button>

                            {/* Botón para descargar el Certificado de Adopción */}
                            <Button
                              type="button"
                              size="icon-sm"
                              variant="ghost"
                              onClick={() => handleDownloadCertificate(adoption)}
                              className="h-8 w-8 rounded-full bg-background hover:bg-orange-50 text-orange-600 border border-border shadow-sm active:scale-90"
                              title="Descargar Certificado de Adopción"
                            >
                              <Award size={14} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-surface py-20 text-center">
              <div className="mb-4 rounded-full bg-primary/10 p-4">
                <HeartHandshake className="text-primary" size={32} />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-foreground">Aún no tienes adopciones registradas</h3>
              <p className="max-w-sm text-muted-foreground">
                Cuando tengas adopciones activas, podrás ver aquí el seguimiento y los detalles.
              </p>
              <Button as={Link} href="/dashboard/home" className="mt-6 h-11 rounded-xl bg-primary px-5 font-semibold text-primary-foreground hover:bg-primary-hover">
                <PawPrint className="mr-2" size={18} />
                Explorar catálogo
              </Button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
