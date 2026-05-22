'use client';
import { useFormik } from 'formik';
import { Button } from '@/components/ui/button';
import { AppInputGroup } from '@/components/ui/InputGroup';
import { useRegister } from '@/modules/auth/domain/hooks/useRegister';
import { registerSchema } from '@/modules/auth/features/validations';
import { RegisterRequest } from '@/core/auth/interfaces';

export function RegisterForm({ onSuccess }: { onSuccess?: () => void }) {
    const registerMutation = useRegister();

    const formik = useFormik<RegisterRequest>({
        initialValues: {
            first_name: '',
            last_name: '',
            telefono: '',
            email: '',
            password: '',
        },
        validationSchema: registerSchema,
        onSubmit: async (values, helpers) => {
            try {
                await registerMutation.mutateAsync(values);
                helpers.resetForm();
                if (onSuccess) onSuccess();
            } catch (err) {
                // TODO: manejar errores y mostrar feedback
                console.error(err);
            }
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} className="space-y-4">
            <AppInputGroup
                label="Nombre"
                inputProps={{ id: 'first_name', name: 'first_name', placeholder: 'Nombre', value: formik.values.first_name, onChange: formik.handleChange, onBlur: formik.handleBlur }}
            />
            {formik.touched.first_name && formik.errors.first_name ? (
                <p className="text-sm mt-1 text-red-600">{formik.errors.first_name}</p>
            ) : null}

            <AppInputGroup
                label="Apellido"
                inputProps={{ id: 'last_name', name: 'last_name', placeholder: 'Apellido', value: formik.values.last_name, onChange: formik.handleChange, onBlur: formik.handleBlur }}
            />
            {formik.touched.last_name && formik.errors.last_name ? (
                <p className="text-sm mt-1 text-red-600">{formik.errors.last_name}</p>
            ) : null}

            <AppInputGroup
                label="Teléfono"
                inputProps={{ id: 'telefono', name: 'telefono', placeholder: '+34 600 000 000', value: formik.values.telefono, onChange: formik.handleChange, onBlur: formik.handleBlur }}
            />
            {formik.touched.telefono && formik.errors.telefono ? (
                <p className="text-sm mt-1 text-red-600">{formik.errors.telefono}</p>
            ) : null}

            <AppInputGroup
                label="Correo electrónico"
                inputProps={{ id: 'email', name: 'email', type: 'email', placeholder: 'correo@ejemplo.com', value: formik.values.email, onChange: formik.handleChange, onBlur: formik.handleBlur }}
            />
            {formik.touched.email && formik.errors.email ? (
                <p className="text-sm mt-1 text-red-600">{formik.errors.email}</p>
            ) : null}

            <AppInputGroup
                label="Contraseña"
                inputProps={{ id: 'password', name: 'password', type: 'password', placeholder: '********', value: formik.values.password, onChange: formik.handleChange, onBlur: formik.handleBlur }}
            />
            {formik.touched.password && formik.errors.password ? (
                <p className="text-sm mt-1 text-red-600">{formik.errors.password}</p>
            ) : null}

            <div className="pt-4">
                <Button type="submit" className="w-full h-12 rounded-xl bg-primary text-primary-foreground">
                    {registerMutation.isPending ? 'Registrando...' : 'Crear cuenta'}
                </Button>
            </div>
        </form>
    );
}
