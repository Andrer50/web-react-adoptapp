"use client";

import { SessionProvider } from 'next-auth/react';
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryProvider } from "./query-provider";
import { Toaster } from "@/components/ui/sonner";

export interface ProvidersProps {
    children: React.ReactNode;
}
export function Providers({ children }: ProvidersProps) {
    return (
        <SessionProvider>
            <QueryProvider>
                <TooltipProvider>
                    {children}
                    <Toaster position="top-right" />
                </TooltipProvider>
            </QueryProvider>
        </SessionProvider>
    );
}
