'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSessionContext } from '@/contexts/session-context';
import { AdminShell } from '@/presentation/admin/admin-shell';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { session, isLoading, isAuthenticated } = useSessionContext();
  const router = useRouter();

  const isUserAdmin = session?.user?.role === 'ADMIN';

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        toast.error('Debes iniciar sesión para acceder al panel de administración.');
        router.push('/');
      } else if (!isUserAdmin) {
        toast.error('Acceso denegado: Se requieren permisos de administrador.');
        router.push('/dashboard/home');
      }
    }
  }, [isLoading, isAuthenticated, isUserAdmin, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">
          Verificando credenciales...
        </p>
      </div>
    );
  }

  if (!isAuthenticated || !isUserAdmin) {
    return null;
  }

  return <AdminShell>{children}</AdminShell>;
}
