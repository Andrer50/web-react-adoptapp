'use client';

import { useState } from 'react';
import { useFormik } from 'formik';
import { useQueryClient } from '@tanstack/react-query';
import { useSessionContext } from '@/contexts/session-context';
import { useBuscarUsuarioPorEmailQuery } from '@/modules/users/domain/hooks/useUserQueries';
import { useUpdateUsuarioMutation } from '@/modules/users/domain/hooks/useUserMutations';
import { updateProfileSchema } from '@/modules/users/features/validations';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import {
  User,
  Mail,
  Phone,
  Building2,
  MapPin,
  Globe,
  Calendar,
  ShieldCheck,
  AlertCircle,
  Save,
  Camera,
} from 'lucide-react';
import { TypographyH1, TypographyLead } from '@/components/ui/typography';
import { ChangePhotoProfileDialog } from './change-photo-profile-dialog';

interface ProfileFormValues {
  first_name: string;
  last_name: string;
  telefono: string;
  datos_adicionales: {
    ruc: string;
    ubicacion: string;
    web: string;
    foto_perfil: string;
  };
}

export function UserProfilePage() {
  const queryClient = useQueryClient();
  const { session, status } = useSessionContext();
  const email = session?.user?.email || '';
  const [isAvatarDialogOpen, setIsAvatarDialogOpen] = useState(false);

  const {
    data: userData,
    isLoading: isQueryLoading,
    isError,
    refetch,
  } = useBuscarUsuarioPorEmailQuery(email, !!email);

  const updateMutation = useUpdateUsuarioMutation();

  const formik = useFormik<ProfileFormValues>({
    initialValues: {
      first_name: userData?.first_name || '',
      last_name: userData?.last_name || '',
      telefono: userData?.telefono || '',
      datos_adicionales: {
        ruc: (userData?.datos_adicionales?.ruc as string) || '',
        ubicacion: (userData?.datos_adicionales?.ubicacion as string) || '',
        web: (userData?.datos_adicionales?.web as string) || '',
        foto_perfil: (userData?.datos_adicionales?.foto_perfil as string) || '',
      },
    },
    enableReinitialize: true,
    validationSchema: updateProfileSchema,
    onSubmit: (values) => {
      if (!userData) return;

      const payload = {
        id: userData.id,
        first_name: values.first_name,
        last_name: values.last_name,
        telefono: values.telefono,
        datos_adicionales: {
          ...userData.datos_adicionales,
          foto_perfil: values.datos_adicionales.foto_perfil,
          ...(userData.tipo_rol === 'ALBERGUE'
            ? {
              ruc: values.datos_adicionales.ruc,
              ubicacion: values.datos_adicionales.ubicacion,
              web: values.datos_adicionales.web,
            }
            : {}),
        },
      };

      updateMutation.mutate(payload, {
        onSuccess: () => {
          toast.success('Perfil actualizado correctamente');
          queryClient.invalidateQueries({ queryKey: ['usuario-buscar', email] });
        },
        onError: (error: { message?: string } | null) => {
          toast.error(error?.message || 'Error al actualizar el perfil');
        },
      });
    },
  });

  const isLoading = status === 'loading' || isQueryLoading;

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  if (isError || !userData) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center p-6 bg-surface border border-border rounded-2xl">
        <div className="mb-4 rounded-full bg-red-100 p-4 text-red-600">
          <AlertCircle size={32} />
        </div>
        <h3 className="mb-2 text-xl font-semibold text-foreground">
          No se pudieron cargar los datos de tu perfil
        </h3>
        <p className="max-w-md text-muted-foreground mb-6">
          Hubo un problema al conectar con el servidor. Por favor, vuelve a intentarlo.
        </p>
        <Button onClick={() => refetch()} className="h-11 rounded-xl font-semibold">
          Reintentar cargar
        </Button>
      </div>
    );
  }

  // Capitalizar iniciales para el avatar
  const getInitials = () => {
    const fn = userData.first_name || '';
    const ln = userData.last_name || '';
    return (fn.charAt(0) + ln.charAt(0)).toUpperCase() || 'U';
  };

  const formattedDate = userData.date_joined
    ? new Date(userData.date_joined).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
    : '';

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'ADMIN':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-800">
            <ShieldCheck size={14} /> Administrador
          </span>
        );
      case 'ALBERGUE':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800">
            <Building2 size={14} /> Albergue
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
            <User size={14} /> Adoptante
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
        <main className="space-y-8">
          <div className="max-w-2xl">
            <TypographyH1 className="mt-3 text-foreground">Mi Perfil</TypographyH1>
            <TypographyLead className="mt-4 text-muted-foreground">
              Gestiona tu información de contacto y detalles de tu cuenta de forma segura.
            </TypographyLead>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Columna izquierda - Resumen de Perfil */}
            <div className="lg:col-span-1 space-y-6">
              <Card className="overflow-hidden border-border bg-surface shadow-sm">
                <div className="h-28 w-full bg-gradient-to-r from-primary to-primary-container/80" />
                <CardContent className="relative pt-0 px-6 pb-6">
                  {/* Avatar */}
                  <div className="absolute -top-12 left-6 flex items-end gap-3">
                    <div className="relative group size-24 rounded-full border-4 border-surface bg-primary-container/30 text-2xl font-bold text-primary shadow-md overflow-hidden flex items-center justify-center">
                      {formik.values.datos_adicionales.foto_perfil ? (
                        <img
                          src={formik.values.datos_adicionales.foto_perfil}
                          alt="Foto de perfil"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        getInitials()
                      )}

                      <button
                        type="button"
                        onClick={() => setIsAvatarDialogOpen(true)}
                        className="absolute inset-0 bg-black/45 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer hidden sm:flex"
                        title="Cambiar foto de perfil"
                      >
                        <Camera size={18} />
                      </button>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setIsAvatarDialogOpen(true)}
                      className="h-8 rounded-lg text-xs gap-1 bg-surface hover:bg-surface-container-low border-border shadow-sm px-2.5"
                    >
                      <Camera size={13} />
                      Cambiar foto
                    </Button>
                  </div>

                  <div className="pt-16 space-y-4">
                    <div>
                      <h2 className="text-xl font-bold text-foreground">
                        {userData.first_name} {userData.last_name}
                      </h2>
                      <p className="text-sm text-muted-foreground">@{userData.username}</p>
                    </div>

                    <div className="flex flex-wrap gap-2">{getRoleBadge(userData.tipo_rol)}</div>

                    <div className="pt-4 border-t border-border space-y-3">
                      <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                        <Mail className="size-4" />
                        <span className="truncate">{userData.email}</span>
                      </div>
                      {userData.telefono && (
                        <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                          <Phone className="size-4" />
                          <span>{userData.telefono}</span>
                        </div>
                      )}
                      {formattedDate && (
                        <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                          <Calendar className="size-4" />
                          <span>Miembro desde: {formattedDate}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Columna derecha - Formulario de Edición */}
            <div className="lg:col-span-2">
              <Card className="border-border bg-surface shadow-sm">
                <CardHeader className="border-b border-border pb-4">
                  <CardTitle className="text-lg font-bold text-foreground">
                    Editar Información de Perfil
                  </CardTitle>
                  <CardDescription>
                    Actualiza tu información básica para que otros usuarios o adoptantes puedan contactarte.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <form onSubmit={formik.handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <Label htmlFor="first_name" className="text-sm font-semibold">
                          Nombre / Razón Social
                        </Label>
                        <div className="relative mt-1.5">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                            <User size={18} />
                          </span>
                          <Input
                            id="first_name"
                            name="first_name"
                            value={formik.values.first_name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="h-11 pl-10 rounded-xl bg-background border-border"
                          />
                        </div>
                        {formik.touched.first_name && formik.errors.first_name && (
                          <p className="text-xs text-red-500 mt-1">{formik.errors.first_name}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="last_name" className="text-sm font-semibold">
                          Apellido / Representante
                        </Label>
                        <div className="relative mt-1.5">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                            <User size={18} />
                          </span>
                          <Input
                            id="last_name"
                            name="last_name"
                            value={formik.values.last_name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="h-11 pl-10 rounded-xl bg-background border-border"
                          />
                        </div>
                        {formik.touched.last_name && formik.errors.last_name && (
                          <p className="text-xs text-red-500 mt-1">{formik.errors.last_name}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <Label htmlFor="email" className="text-sm font-semibold">
                          Correo Electrónico
                        </Label>
                        <div className="relative mt-1.5">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                            <Mail size={18} />
                          </span>
                          <Input
                            id="email"
                            value={userData.email}
                            disabled
                            className="h-11 pl-10 rounded-xl bg-muted/40 border-border cursor-not-allowed text-muted-foreground"
                          />
                        </div>
                        <p className="text-[10px] text-muted-foreground mt-1 px-1">
                          El correo no puede modificarse por motivos de seguridad.
                        </p>
                      </div>

                      <div>
                        <Label htmlFor="telefono" className="text-sm font-semibold">
                          Teléfono de Contacto (WhatsApp)
                        </Label>
                        <div className="relative mt-1.5">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                            <Phone size={18} />
                          </span>
                          <Input
                            id="telefono"
                            name="telefono"
                            value={formik.values.telefono}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="h-11 pl-10 rounded-xl bg-background border-border"
                            placeholder="+51 999 999 999"
                          />
                        </div>
                        {formik.touched.telefono && formik.errors.telefono && (
                          <p className="text-xs text-red-500 mt-1">{formik.errors.telefono}</p>
                        )}
                      </div>
                    </div>

                    {/* Campos adicionales para Albergue */}
                    {userData.tipo_rol === 'ALBERGUE' && (
                      <div className="rounded-2xl border border-outline-variant bg-surface-container-low p-5 space-y-4 animate-in fade-in duration-300">
                        <h3 className="text-sm font-bold text-primary uppercase tracking-wider">
                          Información adicional de Albergue
                        </h3>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <div>
                            <Label htmlFor="ruc" className="text-sm font-semibold text-on-surface">
                              Número de RUC
                            </Label>
                            <div className="relative mt-1.5">
                              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                                <Building2 size={18} />
                              </span>
                              <Input
                                id="ruc"
                                name="datos_adicionales.ruc"
                                value={formik.values.datos_adicionales?.ruc || ''}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="h-11 pl-10 rounded-xl bg-background border-border"
                                placeholder="Ej: 20123456789"
                              />
                            </div>
                          </div>

                          <div>
                            <Label htmlFor="web" className="text-sm font-semibold text-on-surface">
                              Página Web
                            </Label>
                            <div className="relative mt-1.5">
                              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                                <Globe size={18} />
                              </span>
                              <Input
                                id="web"
                                name="datos_adicionales.web"
                                value={formik.values.datos_adicionales?.web || ''}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="h-11 pl-10 rounded-xl bg-background border-border"
                                placeholder="Ej: https://mi-albergue.org"
                              />
                            </div>
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="ubicacion" className="text-sm font-semibold text-on-surface">
                            Ubicación Física
                          </Label>
                          <div className="relative mt-1.5">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                              <MapPin size={18} />
                            </span>
                            <Input
                              id="ubicacion"
                              name="datos_adicionales.ubicacion"
                              value={formik.values.datos_adicionales?.ubicacion || ''}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              className="h-11 pl-10 rounded-xl bg-background border-border"
                              placeholder="Ej: Av. Larco 123, Miraflores, Lima"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex justify-end pt-4 border-t border-border">
                      <Button
                        type="submit"
                        disabled={updateMutation.isPending}
                        className="h-11 rounded-xl px-6 bg-primary text-primary-foreground hover:bg-primary-hover font-semibold gap-2 shadow-sm"
                      >
                        <Save size={18} />
                        {updateMutation.isPending ? 'Guardando...' : 'Guardar cambios'}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>

      <ChangePhotoProfileDialog
        open={isAvatarDialogOpen}
        onOpenChange={setIsAvatarDialogOpen}
        currentPhotoUrl={formik.values.datos_adicionales.foto_perfil}
        onSuccess={(url) => {
          formik.setFieldValue('datos_adicionales.foto_perfil', url);
          if (!userData) return;

          const payload = {
            id: userData.id,
            first_name: formik.values.first_name,
            last_name: formik.values.last_name,
            telefono: formik.values.telefono,
            datos_adicionales: {
              ...userData.datos_adicionales,
              foto_perfil: url,
              ...(userData.tipo_rol === 'ALBERGUE'
                ? {
                    ruc: formik.values.datos_adicionales.ruc,
                    ubicacion: formik.values.datos_adicionales.ubicacion,
                    web: formik.values.datos_adicionales.web,
                  }
                : {}),
            },
          };

          updateMutation.mutate(payload, {
            onSuccess: () => {
              toast.success('Foto de perfil actualizada en el servidor');
              queryClient.invalidateQueries({ queryKey: ['usuario-buscar', email] });
            },
            onError: (error: { message?: string } | null) => {
              toast.error(error?.message || 'Error al guardar la foto de perfil en el servidor');
            },
          });
        }}
      />
    </div>
  );
}

function ProfileSkeleton() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-4">
          <Skeleton className="h-12 w-48 rounded-xl" />
          <Skeleton className="h-6 w-96 rounded-xl" />
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 mt-8">
          <div className="lg:col-span-1 space-y-6">
            <Card className="overflow-hidden border-border bg-surface">
              <Skeleton className="h-28 w-full" />
              <CardContent className="relative pt-12 px-6 pb-6 space-y-4">
                <Skeleton className="absolute -top-12 left-6 size-24 rounded-full" />
                <Skeleton className="h-6 w-3/4 rounded-xl" />
                <Skeleton className="h-4 w-1/2 rounded-xl" />
                <div className="pt-4 border-t border-border space-y-3">
                  <Skeleton className="h-4 w-full rounded-xl" />
                  <Skeleton className="h-4 w-2/3 rounded-xl" />
                  <Skeleton className="h-4 w-3/4 rounded-xl" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card className="border-border bg-surface p-6 space-y-6">
              <div className="space-y-2">
                <Skeleton className="h-6 w-1/3 rounded-xl" />
                <Skeleton className="h-4 w-2/3 rounded-xl" />
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-1/4 rounded-xl" />
                  <Skeleton className="h-11 w-full rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-1/4 rounded-xl" />
                  <Skeleton className="h-11 w-full rounded-xl" />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-1/4 rounded-xl" />
                  <Skeleton className="h-11 w-full rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-1/4 rounded-xl" />
                  <Skeleton className="h-11 w-full rounded-xl" />
                </div>
              </div>
              <div className="flex justify-end pt-4 border-t border-border">
                <Skeleton className="h-11 w-32 rounded-xl" />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
