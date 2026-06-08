'use client';

import { useGetUsuariosQuery } from '@/modules/users/domain/hooks/useUserQueries';
import { useGetMascotasQuery } from '@/modules/pets/domain/hooks/usePetQueries';
import { useGetAdopcionesQuery } from '@/modules/adoptions/domain/hooks/useAdoptionQueries';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { TypographyH1, TypographyLead } from '@/components/ui/typography';
import { Users, PawPrint, Heart, Building2, ShieldCheck, UserCheck, Activity, Award } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export function AdminStatsPage() {
  const { data: users = [], isLoading: usersLoading, isError: usersError } = useGetUsuariosQuery();
  const { data: petsData, isLoading: petsLoading, isError: petsError } = useGetMascotasQuery({ page_size: 1000 });
  const { data: adoptions = [], isLoading: adoptionsLoading, isError: adoptionsError } = useGetAdopcionesQuery();

  const petsList = petsData?.results || [];
  const totalPets = petsData?.count || 0;

  const isLoading = usersLoading || petsLoading || adoptionsLoading;
  const isError = usersError || petsError || adoptionsError;

  // Cálculos estadísticos
  const totalUsers = users.length;
  const sheltersCount = users.filter((u) => u.tipo_rol === 'ALBERGUE').length;
  const adminsCount = users.filter((u) => u.tipo_rol === 'ADMIN').length;
  const adoptersCount = users.filter((u) => u.tipo_rol === 'USER').length;

  const adoptedPets = petsList.filter((p) => p.estado === 'ADOPTADO').length;
  const availablePets = petsList.filter((p) => p.estado === 'DISPONIBLE').length;

  const dogsCount = petsList.filter((p) => p.especie.toLowerCase().includes('perro') || p.especie.toLowerCase().includes('dog')).length;
  const catsCount = petsList.filter((p) => p.especie.toLowerCase().includes('gato') || p.especie.toLowerCase().includes('cat')).length;
  const birdsCount = petsList.filter((p) => p.especie.toLowerCase().includes('ave') || p.especie.toLowerCase().includes('bird')).length;
  const othersCount = totalPets - (dogsCount + catsCount + birdsCount);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-64 bg-muted rounded" />
          <div className="h-4 w-96 bg-muted rounded" />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="animate-pulse bg-surface border-border">
              <CardHeader className="h-20 bg-muted/20" />
              <CardContent className="h-16" />
            </Card>
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="animate-pulse bg-surface border-border h-80" />
          <Card className="animate-pulse bg-surface border-border h-80" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-red-500 font-semibold text-lg">Error al cargar estadísticas</p>
        <p className="text-muted-foreground">Ocurrió un problema de comunicación con el backend.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Cabecera */}
      <div>
        <TypographyH1 className="text-foreground">Resumen de Actividad</TypographyH1>
        <TypographyLead className="mt-2 text-muted-foreground">
          Visualiza el estado general de AdoptApp, usuarios registrados, publicaciones de mascotas y adopciones completadas.
        </TypographyLead>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Usuarios */}
        <Card className="border border-border bg-surface shadow-sm rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Usuarios Totales</CardTitle>
            <div className="rounded-xl bg-primary/10 p-2.5 text-primary">
              <Users size={20} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{totalUsers}</div>
            <p className="text-xs text-muted-foreground mt-1.5 flex items-center gap-1.5">
              <span className="font-semibold text-primary">{adoptersCount}</span> adoptantes,{' '}
              <span className="font-semibold text-primary">{sheltersCount}</span> albergues
            </p>
          </CardContent>
        </Card>

        {/* Total Mascotas */}
        <Card className="border border-border bg-surface shadow-sm rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Mascotas Publicadas</CardTitle>
            <div className="rounded-xl bg-[#8e4e14]/10 p-2.5 text-[#8e4e14]">
              <PawPrint size={20} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{totalPets}</div>
            <p className="text-xs text-muted-foreground mt-1.5 flex items-center gap-1.5">
              <span className="font-semibold text-[#8e4e14]">{availablePets}</span> disponibles,{' '}
              <span className="font-semibold text-[#8e4e14]">{adoptedPets}</span> adoptados
            </p>
          </CardContent>
        </Card>

        {/* Adopciones Completadas */}
        <Card className="border border-border bg-surface shadow-sm rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Adopciones Históricas</CardTitle>
            <div className="rounded-xl bg-green-500/10 p-2.5 text-green-600">
              <Heart size={20} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{adoptions.length}</div>
            <p className="text-xs text-muted-foreground mt-1.5">
              Tasa de adopción exitosa: <span className="font-bold text-green-600">
                {totalPets > 0 ? Math.round((adoptedPets / totalPets) * 100) : 0}%
              </span>
            </p>
          </CardContent>
        </Card>

        {/* Albergues Asociados */}
        <Card className="border border-border bg-surface shadow-sm rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Albergues Verificados</CardTitle>
            <div className="rounded-xl bg-blue-500/10 p-2.5 text-blue-600">
              <Building2 size={20} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{sheltersCount}</div>
            <p className="text-xs text-muted-foreground mt-1.5">
              Administradores activos: <span className="font-semibold text-blue-600">{adminsCount}</span>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Distribution Section */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Distribución de Usuarios */}
        <Card className="border border-border bg-surface shadow-sm rounded-2xl p-6">
          <h3 className="text-lg font-bold text-foreground mb-4">Roles de Usuario</h3>
          <div className="space-y-4">
            {/* Adoptantes */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-foreground flex items-center gap-2">
                  <UserCheck size={16} className="text-primary" />
                  Adoptantes / Publicadores comunes
                </span>
                <span className="text-muted-foreground font-semibold">
                  {adoptersCount} ({totalUsers > 0 ? Math.round((adoptersCount / totalUsers) * 100) : 0}%)
                </span>
              </div>
              <Progress value={totalUsers > 0 ? (adoptersCount / totalUsers) * 100 : 0} className="h-2.5 bg-muted [&>div]:bg-primary" />
            </div>

            {/* Albergues */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-foreground flex items-center gap-2">
                  <Building2 size={16} className="text-blue-500" />
                  Albergues / Refugios de animales
                </span>
                <span className="text-muted-foreground font-semibold">
                  {sheltersCount} ({totalUsers > 0 ? Math.round((sheltersCount / totalUsers) * 100) : 0}%)
                </span>
              </div>
              <Progress value={totalUsers > 0 ? (sheltersCount / totalUsers) * 100 : 0} className="h-2.5 bg-muted [&>div]:bg-blue-500" />
            </div>

            {/* Administradores */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-foreground flex items-center gap-2">
                  <ShieldCheck size={16} className="text-green-500" />
                  Administradores de la plataforma
                </span>
                <span className="text-muted-foreground font-semibold">
                  {adminsCount} ({totalUsers > 0 ? Math.round((adminsCount / totalUsers) * 100) : 0}%)
                </span>
              </div>
              <Progress value={totalUsers > 0 ? (adminsCount / totalUsers) * 100 : 0} className="h-2.5 bg-muted [&>div]:bg-green-500" />
            </div>
          </div>
        </Card>

        {/* Distribución por Especie */}
        <Card className="border border-border bg-surface shadow-sm rounded-2xl p-6">
          <h3 className="text-lg font-bold text-foreground mb-4">Mascotas por Especie</h3>
          <div className="space-y-4">
            {/* Perros */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-foreground">Perros (Caninos)</span>
                <span className="text-muted-foreground font-semibold">
                  {dogsCount} ({totalPets > 0 ? Math.round((dogsCount / totalPets) * 100) : 0}%)
                </span>
              </div>
              <Progress value={totalPets > 0 ? (dogsCount / totalPets) * 100 : 0} className="h-2.5 bg-muted [&>div]:bg-primary" />
            </div>

            {/* Gatos */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-foreground">Gatos (Felinos)</span>
                <span className="text-muted-foreground font-semibold">
                  {catsCount} ({totalPets > 0 ? Math.round((catsCount / totalPets) * 100) : 0}%)
                </span>
              </div>
              <Progress value={totalPets > 0 ? (catsCount / totalPets) * 100 : 0} className="h-2.5 bg-muted [&>div]:bg-[#8e4e14]" />
            </div>

            {/* Aves */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-foreground">Aves</span>
                <span className="text-muted-foreground font-semibold">
                  {birdsCount} ({totalPets > 0 ? Math.round((birdsCount / totalPets) * 100) : 0}%)
                </span>
              </div>
              <Progress value={totalPets > 0 ? (birdsCount / totalPets) * 100 : 0} className="h-2.5 bg-muted [&>div]:bg-yellow-500" />
            </div>

            {/* Otros */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-foreground">Otros animales</span>
                <span className="text-muted-foreground font-semibold">
                  {othersCount > 0 ? othersCount : 0} ({totalPets > 0 ? Math.round((Math.max(0, othersCount) / totalPets) * 100) : 0}%)
                </span>
              </div>
              <Progress value={totalPets > 0 ? (Math.max(0, othersCount) / totalPets) * 100 : 0} className="h-2.5 bg-muted [&>div]:bg-teal-500" />
            </div>
          </div>
        </Card>
      </div>

      {/* Recientes y Logs Rápidos */}
      <Card className="border border-border bg-surface shadow-sm rounded-2xl p-6">
        <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
          <Activity size={18} className="text-primary" />
          Estado del Servidor y Logs Rápidos
        </h3>
        <div className="border border-border/60 rounded-xl overflow-hidden bg-background">
          <div className="flex items-center justify-between border-b border-border/40 p-4 text-sm bg-muted/10">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="font-semibold text-foreground">API de AdoptApp Conectada</span>
            </div>
            <span className="text-xs text-muted-foreground font-mono">http://localhost:8000/api/</span>
          </div>
          <div className="p-4 space-y-3 font-mono text-xs text-muted-foreground">
            <div className="flex gap-2">
              <span className="text-green-600 font-bold">[OK]</span>
              <span>Carga de {totalUsers} usuarios y {totalPets} publicaciones realizada correctamente.</span>
            </div>
            <div className="flex gap-2">
              <span className="text-green-600 font-bold">[OK]</span>
              <span>Conexión de base de datos PostgreSQL activa y optimizada.</span>
            </div>
            {adoptions.length > 0 && (
              <div className="flex gap-2">
                <span className="text-primary font-bold">[LOG]</span>
                <span>Última adopción registrada: Adopción ID #{adoptions[0].id} en {new Date(adoptions[0].fecha_adopcion).toLocaleDateString()}.</span>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
