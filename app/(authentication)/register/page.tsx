"use client";
import { RegisterForm } from '@/presentation/auth/register-form';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
    const router = useRouter();

    return (
        <main className="min-h-screen flex items-center justify-center bg-background">
            <div className="w-full max-w-md p-8">
                <h1 className="text-2xl font-bold mb-4">Crear cuenta</h1>
                <RegisterForm onSuccess={() => router.push('/login')} />
            </div>
        </main>
    );
}