import React from "react";
import { DashboardShell } from "@/presentation/dashboard/dashboard-shell";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardShell>{children}</DashboardShell>
  );
}
