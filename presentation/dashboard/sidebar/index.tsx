'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Dog, Heart, House, LogOut, PawPrint } from 'lucide-react';
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

const navigationItems = [
    { name: 'Inicio', href: '/dashboard/home', icon: House },
    { name: 'Mis publicaciones', href: '/dashboard/my-publications', icon: PawPrint },
    { name: 'Mis adopciones', href: '/dashboard/my-adoptions', icon: Heart },
];

export function DashboardSidebar() {
    const pathname = usePathname();

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
                        <div className="flex size-10 items-center justify-center rounded-full bg-primary-container/20 text-sm font-semibold text-primary">
                            JD
                        </div>
                        <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-foreground">Jane Doe</p>
                            <p className="truncate text-xs text-muted-foreground">Administradora</p>
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
