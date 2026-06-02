"use client";

import { SessionProvider } from 'next-auth/react';
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryProvider } from "./query-provider";
import { Toaster } from "@/components/ui/sonner";
import { SessionContextProvider } from '@/contexts/session-context';

export interface ProvidersProps {
    children: React.ReactNode;
}
export function Providers({ children }: ProvidersProps) {
    return (
        <SessionProvider>
            <SessionContextProvider>
                <QueryProvider>
                    <TooltipProvider>
                        {children}
                        <Toaster position="top-right" />
                    </TooltipProvider>
                </QueryProvider>
            </SessionContextProvider>
        </SessionProvider>
    );
}
