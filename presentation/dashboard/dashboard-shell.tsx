'use client';

import type { ReactNode } from 'react';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { DashboardSidebar } from './sidebar';

interface DashboardShellProps {
  children: ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <SidebarProvider defaultOpen>
      <DashboardSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/95 px-4 backdrop-blur-sm sm:px-6">
          <SidebarTrigger />
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              Dashboard
            </p>
            <h1 className="truncate text-base font-semibold text-foreground">AdoptApp</h1>
          </div>
        </header>

        <div className="px-4 py-6 sm:px-6 lg:px-8">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
