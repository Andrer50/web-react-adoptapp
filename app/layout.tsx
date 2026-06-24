import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "AdoptApp - Encuentra a tu compañero perfecto",
  description: "Conectamos corazones dispuestos a dar amor con animales que buscan un hogar. Nuestra misión es fomentar la adopción responsable y crear lazos inquebrantables.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className="h-full antialiased font-sans"
    >
      <body className="min-h-full flex flex-col bg-background text-on-background">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
