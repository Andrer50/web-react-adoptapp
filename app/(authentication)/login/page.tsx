'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Mail, Lock } from 'lucide-react';
import { useFormik } from 'formik';
import { Button } from '@/components/ui/button';
import { AppInputGroup } from '@/components/ui/InputGroup';
import { TypographyH1, TypographyLead, TypographyH2, TypographyMuted } from '@/components/ui/typography';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { toast } from 'sonner';
import { loginSchema } from '@/modules/auth/features/validations';
import { LoginRequest } from '@/core/auth/interfaces';

export default function LoginPage() {
  const router = useRouter();
  const [authError, setAuthError] = useState<string | null>(null);
  const formik = useFormik<LoginRequest>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: async (values, helpers) => {
      setAuthError(null);

      const result = await signIn('credentials', {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      if (result?.error) {
        setAuthError(result.error);
        toast.error((result as any).error || 'Error al iniciar sesión');
        helpers.setSubmitting(false);
        return;
      }

      toast.success('Sesión iniciada');
      router.push('/dashboard/home');
    },
  });

  return (
    <div className="min-h-screen w-full flex bg-background">
      {/* Columna izquierda - Imagen (oculta en movil, visible en pantallas lg) */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-end p-12 overflow-hidden">
        <Image
          src="/login-hero.png"
          alt="Mujer abrazando a un golden retriever"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
        <div className="relative z-20 text-white max-w-lg mb-8">
          <TypographyH1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-white">Bienvenido de nuevo</TypographyH1>
          <TypographyLead className="text-lg md:text-xl text-gray-200">
            Continua tu camino para encontrar al companero perfecto.
          </TypographyLead>
        </div>
      </div>

      {/* Columna derecha - Formulario */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-surface">
        <div className="w-full max-w-md flex flex-col items-center">
          {/* Encabezado */}
          <div className="text-center mb-10 w-full">
            <TypographyH2 className="text-4xl font-bold text-primary mb-2 tracking-tight border-none pb-0">AdoptApp</TypographyH2>
            <TypographyMuted className="font-medium">Inicia sesion en tu cuenta</TypographyMuted>
          </div>

          {/* Formulario */}
          <form className="w-full space-y-5" onSubmit={formik.handleSubmit}>
            <AppInputGroup
              label="Correo electrónico"
              icon={<Mail className="h-5 w-5" strokeWidth={1.5} />}
              inputProps={{
                id: 'email',
                name: 'email',
                type: 'email',
                placeholder: 'correo@ejemplo.com',
                value: formik.values.email,
                onChange: formik.handleChange,
                onBlur: formik.handleBlur,
                required: true,
              }}
            />
            {formik.touched.email && formik.errors.email ? (
              <p className="text-sm mt-1 text-red-600">{formik.errors.email}</p>
            ) : null}

            <AppInputGroup
              label={
                <div className="flex justify-between items-center w-full gap-2">
                  <span>Contrasena</span>
                  <Link
                    href="#"
                    className="text-sm font-bold text-primary hover:text-primary-hover transition-colors"
                  >
                    Olvidaste tu contrasena?
                  </Link>
                </div>
              }
              icon={<Lock className="h-5 w-5" strokeWidth={1.5} />}
              inputProps={{
                id: 'password',
                name: 'password',
                type: 'password',
                placeholder: '••••••••',
                value: formik.values.password,
                onChange: formik.handleChange,
                onBlur: formik.handleBlur,
                className: 'tracking-widest',
                required: true,
              }}
            />
            {formik.touched.password && formik.errors.password ? (
              <p className="text-sm mt-1 text-red-600">{formik.errors.password}</p>
            ) : null}

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary-hover text-on-primary font-bold py-3.5 px-4 rounded-xl transition-colors focus:ring-4 focus:ring-primary/20 outline-none mt-4 shadow-sm"
            >
              Iniciar sesion
            </Button>
          </form>

          {authError ? (
            <p className="mt-4 w-full rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              {authError}
            </p>
          ) : null}

          {/* Separador */}
          <div className="w-full flex items-center my-8">
            <div className="flex-1 border-t border-border"></div>
            <span className="px-4 text-xs font-bold text-muted-foreground tracking-wider uppercase">
              O continua con
            </span>
            <div className="flex-1 border-t border-border"></div>
          </div>

          {/* Accesos sociales */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button type="button" className="flex items-center justify-center space-x-2 py-3 px-4 border border-outline-variant rounded-xl hover:bg-surface-container-low transition-colors font-bold text-sm text-on-surface shadow-sm">
              <svg className="h-5 w-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              <span>Google</span>
            </button>
            <button type="button" className="flex items-center justify-center space-x-2 py-3 px-4 border border-outline-variant rounded-xl hover:bg-surface-container-low transition-colors font-bold text-sm text-on-surface shadow-sm">
              <svg className="h-5 w-5" fill="#1877F2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span>Facebook</span>
            </button>
          </div>

          <div className="mt-8 text-center text-sm text-muted-foreground">
            No tienes una cuenta?{' '}
            <Link href="/register" className="font-bold text-primary hover:text-primary-hover transition-colors">
              Registrate
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}