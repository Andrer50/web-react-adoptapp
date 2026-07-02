'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Dog, Heart, House, LogOut, PawPrint, User } from 'lucide-react';
import { signOut } from 'next-auth/react';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarSeparator,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { useSessionContext } from '@/contexts/session-context';
import { useBuscarUsuarioPorEmailQuery } from '@/modules/users/domain/hooks/useUserQueries';

const navigationItems = [
    { name: 'Inicio', href: '/dashboard/home', icon: House },
    { name: 'Mis publicaciones', href: '/dashboard/my-publications', icon: PawPrint },
    { name: 'Mis adopciones', href: '/dashboard/my-adoptions', icon: Heart },
    { name: 'Mi perfil', href: '/dashboard/profile', icon: User },
];

export function DashboardSidebar() {
    const pathname = usePathname();
    const { session } = useSessionContext();

    const user = session?.user;

    const email = user?.email || '';
    const { data: userData } = useBuscarUsuarioPorEmailQuery(email, !!email);

    // Si el nombre contiene '@', extraemos la parte del nombre de usuario
    const displayName = userData
        ? `${userData.first_name || ''} ${userData.last_name || ''}`.trim() || userData.username
        : user?.name
            ? (user.name.includes('@') ? user.name.split('@')[0] : user.name)
            : 'Usuario';

    // Capitalizar el primer caracter del nombre para que se vea bien
    const formattedName = displayName.charAt(0).toUpperCase() + displayName.slice(1);

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map((n) => n[0])
            .slice(0, 2)
            .join('')
            .toUpperCase() || 'U';
    };

    const initials = getInitials(formattedName);

    const fotoPerfil = (userData?.datos_adicionales?.foto_perfil as string) || '';

    const getRoleName = (role?: string) => {
        if (role === 'ADMIN') return 'Administrador';
        if (role === 'ALBERGUE') return 'Albergue';
        return 'Adoptante';
    };

    const roleName = getRoleName(userData?.tipo_rol || user?.role);

    return (
        <Sidebar collapsible="offcanvas" className="border-r border-border bg-background text-foreground">
            <SidebarHeader className="gap-4 px-4 py-5">
                <Link href="/dashboard/home" className="flex items-center gap-3 rounded-xl px-2 py-1.5">
                    <div className="flex size-10 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
                        <Dog size={20} />
                    </div>
                    <div className="grid">
                        <span className="text-base font-semibold tracking-tight text-foreground">AdoptApp</span>
                        <span className="text-xs text-muted-foreground">Panel de administración</span>
                    </div>
                </Link>
            </SidebarHeader>

            <SidebarSeparator />

            <SidebarContent>
                <SidebarGroup className="px-3 py-4">
                    <SidebarGroupLabel className="px-3 text-xs uppercase tracking-[0.24em] text-muted-foreground">
                        Navegación
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu className="gap-1">
                            {navigationItems.map((item) => {
                                const active = pathname === item.href;
                                const Icon = item.icon;

                                return (
                                    <SidebarMenuItem key={item.href}>
                                        <SidebarMenuButton
                                            isActive={active}
                                            render={<Link href={item.href} />}
                                            className="h-11 px-3"
                                        >
                                            <Icon />
                                            <span>{item.name}</span>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarSeparator />

            <SidebarFooter className="p-4">
                <div className="rounded-2xl border border-border bg-surface p-4 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="relative flex size-10 items-center justify-center rounded-full bg-primary-container/20 text-sm font-semibold text-primary overflow-hidden">
                            {fotoPerfil ? (
                                <img
                                    src={fotoPerfil}
                                    alt="Foto de perfil"
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                initials
                            )}
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-semibold text-foreground">{formattedName}</p>
                            <p className="truncate text-xs text-muted-foreground">{roleName}</p>
                        </div>
                    </div>
                    <Button
                        variant="ghost"
                        className="mt-4 h-10 w-full justify-start px-3 text-muted-foreground hover:text-foreground"
                        onClick={() => signOut({ callbackUrl: '/login' })}
                    >
                        <LogOut />
                        <span>Cerrar sesión</span>
                    </Button>
                </div>
            </SidebarFooter>
        </Sidebar>
    );
}
