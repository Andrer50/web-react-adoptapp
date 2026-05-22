import type { Metadata } from "next";
import { Quicksand, Nunito_Sans, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Providers } from "./providers";

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800"],
});

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
      className={cn("h-full", "antialiased", quicksand.variable, nunitoSans.variable, "font-sans", geist.variable)}
    >
      <body className="min-h-full flex flex-col bg-background text-on-background">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
