'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Dog, Heart, LogOut, PawPrint, Users, LayoutDashboard, ArrowLeft } from 'lucide-react';
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

const adminNavigationItems = [
    { name: 'Resumen', href: '/admin', icon: LayoutDashboard },
    { name: 'Usuarios', href: '/admin/users', icon: Users },
    { name: 'Mascotas', href: '/admin/pets', icon: PawPrint },
    { name: 'Adopciones', href: '/admin/adoptions', icon: Heart },
];

export function AdminSidebar() {
    const pathname = usePathname();
    const { session } = useSessionContext();

    const user = session?.user;
    
    const displayName = user?.name 
        ? (user.name.includes('@') ? user.name.split('@')[0] : user.name) 
        : 'Administrador';
        
    const formattedName = displayName.charAt(0).toUpperCase() + displayName.slice(1);

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map((n) => n[0])
            .slice(0, 2)
            .join('')
            .toUpperCase() || 'A';
    };

    const initials = getInitials(formattedName);

    return (
        <Sidebar collapsible="offcanvas" className="border-r border-border bg-background text-foreground">
            <SidebarHeader className="gap-4 px-4 py-5">
                <Link href="/admin" className="flex items-center gap-3 rounded-xl px-2 py-1.5">
                    <div className="flex size-10 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
                        <Dog size={20} />
                    </div>
                    <div className="grid">
                        <span className="text-base font-semibold tracking-tight text-foreground">AdoptApp Admin</span>
                        <span className="text-xs text-primary font-medium">Panel Administrativo</span>
                    </div>
                </Link>
            </SidebarHeader>

            <SidebarSeparator />

            <SidebarContent>
                <SidebarGroup className="px-3 py-4">
                    <SidebarGroupLabel className="px-3 text-xs uppercase tracking-[0.24em] text-muted-foreground">
                        Administración
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu className="gap-1">
                            {adminNavigationItems.map((item) => {
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

                <SidebarSeparator className="my-2" />

                <SidebarGroup className="px-3 py-2">
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    render={<Link href="/dashboard/home" />}
                                    className="h-11 px-3 text-muted-foreground hover:text-foreground"
                                >
                                    <ArrowLeft size={16} />
                                    <span>Volver al portal</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarSeparator />

            <SidebarFooter className="p-4">
                <div className="rounded-2xl border border-border bg-surface p-4 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="flex size-10 items-center justify-center rounded-full bg-primary-container/20 text-sm font-semibold text-primary">
                            {initials}
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-semibold text-foreground">{formattedName}</p>
                            <p className="truncate text-xs text-primary font-medium">Administrador</p>
                        </div>
                    </div>
                    <Button
                        variant="ghost"
                        className="mt-4 h-10 w-full justify-start px-3 text-muted-foreground hover:text-foreground"
                        onClick={() => signOut({ callbackUrl: '/login' })}
                    >
                        <LogOut size={16} />
                        <span>Cerrar sesión</span>
                    </Button>
                </div>
            </SidebarFooter>
        </Sidebar>
    );
}
