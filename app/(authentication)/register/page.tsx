'use client';

import Image from 'next/image';
import Link from 'next/link';
import { RegisterForm } from '@/presentation/auth/register-form';
import { TypographyH1, TypographyLead, TypographyH2, TypographyMuted } from '@/components/ui/typography';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen w-full flex bg-background">
      {/* Columna izquierda - Imagen */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-end p-12 overflow-hidden">
        <Image
          src="/hero_dog.png"
          alt="Perro feliz en el campo"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
        <div className="relative z-20 text-white max-w-lg mb-8">
          <TypographyH1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-white">Únete a nuestra comunidad</TypographyH1>
          <TypographyLead className="text-lg md:text-xl text-gray-200">
            Crea una cuenta para publicar mascotas en adopción o encontrar a tu nuevo mejor amigo.
          </TypographyLead>
        </div>
      </div>

      {/* Columna derecha - Formulario */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-surface overflow-y-auto">
        <div className="w-full max-w-md flex flex-col items-center my-auto py-8">
          {/* Encabezado */}
          <div className="text-center mb-6 w-full">
            <TypographyH2 className="text-4xl font-bold text-primary mb-2 tracking-tight border-none pb-0">AdoptApp</TypographyH2>
            <TypographyMuted className="font-medium">Crear una nueva cuenta</TypographyMuted>
          </div>

          {/* Formulario */}
          <div className="w-full">
            <RegisterForm onSuccess={() => router.push('/login')} />
          </div>

          <div className="mt-8 text-center text-sm text-muted-foreground">
            ¿Ya tienes una cuenta?{' '}
            <Link href="/login" className="font-bold text-primary hover:text-primary-hover transition-colors">
              Inicia sesión
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}