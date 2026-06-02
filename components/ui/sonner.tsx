"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"
import { CircleCheckIcon, InfoIcon, TriangleAlertIcon, OctagonXIcon, Loader2Icon } from "lucide-react"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: (
          <CircleCheckIcon className="size-5 text-emerald-600 dark:text-emerald-400" />
        ),
        info: (
          <InfoIcon className="size-5 text-blue-600 dark:text-blue-400" />
        ),
        warning: (
          <TriangleAlertIcon className="size-5 text-amber-600 dark:text-amber-400" />
        ),
        error: (
          <OctagonXIcon className="size-5 text-red-600 dark:text-red-400" />
        ),
        loading: (
          <Loader2Icon className="size-5 animate-spin text-primary" />
        ),
      }}
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg rounded-xl font-semibold border text-sm flex items-center gap-3 p-4",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          success:
            "group-[.toaster]:!bg-emerald-50/90 group-[.toaster]:!text-emerald-950 group-[.toaster]:!border-emerald-200/60 dark:group-[.toaster]:!bg-emerald-950/20 dark:group-[.toaster]:!text-emerald-400 dark:group-[.toaster]:!border-emerald-800/50",
          error:
            "group-[.toaster]:!bg-red-50/90 group-[.toaster]:!text-red-950 group-[.toaster]:!border-red-200/60 dark:group-[.toaster]:!bg-red-950/20 dark:group-[.toaster]:!text-red-400 dark:group-[.toaster]:!border-red-800/50",
          info:
            "group-[.toaster]:!bg-blue-50/90 group-[.toaster]:!text-blue-950 group-[.toaster]:!border-blue-200/60 dark:group-[.toaster]:!bg-blue-950/20 dark:group-[.toaster]:!text-blue-400 dark:group-[.toaster]:!border-blue-800/50",
          warning:
            "group-[.toaster]:!bg-amber-50/90 group-[.toaster]:!text-amber-950 group-[.toaster]:!border-amber-200/60 dark:group-[.toaster]:!bg-amber-950/20 dark:group-[.toaster]:!text-amber-400 dark:group-[.toaster]:!border-amber-800/50",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
