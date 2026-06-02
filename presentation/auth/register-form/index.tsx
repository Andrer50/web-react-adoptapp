'use client';
import { useFormik } from 'formik';
import { Button } from '@/components/ui/button';
import { AppInputGroup } from '@/components/ui/InputGroup';
import { useRegister } from '@/modules/auth/domain/hooks/useRegister';
import { registerSchema } from '@/modules/auth/features/validations';
import { RegisterRequest } from '@/core/auth/interfaces';
import { ChevronDownIcon, User, Phone, Mail, Lock, Building2, Globe, MapPin } from 'lucide-react';

export function RegisterForm({ onSuccess }: { onSuccess?: () => void }) {
    const registerMutation = useRegister();

    const formik = useFormik<RegisterRequest>({
        initialValues: {
            first_name: '',
            last_name: '',
            telefono: '',
            email: '',
            password: '',
            tipo_rol: 'USER',
            datos_adicionales: {
                ruc: '',
                web: '',
                ubicacion: '',
            },
        },
        validationSchema: registerSchema,
        onSubmit: async (values, helpers) => {
            try {
                // Si el rol es USER, limpiamos datos_adicionales antes de enviar
                const payload = {
                    ...values,
                    datos_adicionales: values.tipo_rol === 'USER' ? {} : values.datos_adicionales
                };
                await registerMutation.mutateAsync(payload);
                helpers.resetForm();
                if (onSuccess) onSuccess();
            } catch (err) {
                // TODO: manejar errores y mostrar feedback
                console.error(err);
            }
        },
    });

    const touchedAdicionales = formik.touched.datos_adicionales as { ruc?: boolean; web?: boolean; ubicacion?: boolean } | undefined;
    const errorsAdicionales = formik.errors.datos_adicionales as { ruc?: string; web?: string; ubicacion?: string } | undefined;

    const RoleIcon = formik.values.tipo_rol === 'ALBERGUE' ? Building2 : User;

    return (
        <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div className="w-full space-y-2">
                <label htmlFor="tipo_rol" className="text-sm font-semibold text-on-surface">
                    Tipo de cuenta
                </label>
                <div className="relative w-full">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant z-10">
                        <RoleIcon className="h-5 w-5" strokeWidth={1.5} />
                    </div>
                    <select
                        id="tipo_rol"
                        name="tipo_rol"
                        value={formik.values.tipo_rol}
                        onChange={(e) => {
                            formik.handleChange(e);
                            if (e.target.value === 'ALBERGUE') {
                                formik.setFieldValue('datos_adicionales', { ruc: '', web: '', ubicacion: '' });
                            } else {
                                formik.setFieldValue('datos_adicionales', {});
                            }
                        }}
                        onBlur={formik.handleBlur}
                        className="w-full bg-surface border border-outline-variant rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/20 h-12 shadow-sm pl-10 pr-10 outline-none appearance-none text-sm font-bold transition-all text-on-surface"
                    >
                        <option value="USER">Adoptante / Usuario común</option>
                        <option value="ALBERGUE">Albergue</option>
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant">
                        <ChevronDownIcon className="size-4" />
                    </div>
                </div>
            </div>

            <AppInputGroup
                label={formik.values.tipo_rol === 'ALBERGUE' ? 'Nombre del Albergue / Razón Social' : 'Nombre'}
                icon={<User className="h-5 w-5" strokeWidth={1.5} />}
                inputProps={{ id: 'first_name', name: 'first_name', placeholder: 'Nombre', value: formik.values.first_name, onChange: formik.handleChange, onBlur: formik.handleBlur }}
            />
            {formik.touched.first_name && formik.errors.first_name ? (
                <p className="text-sm mt-1 text-red-600">{formik.errors.first_name}</p>
            ) : null}

            <AppInputGroup
                label={formik.values.tipo_rol === 'ALBERGUE' ? 'Apellido del Representante' : 'Apellido'}
                icon={<User className="h-5 w-5" strokeWidth={1.5} />}
                inputProps={{ id: 'last_name', name: 'last_name', placeholder: 'Apellido', value: formik.values.last_name, onChange: formik.handleChange, onBlur: formik.handleBlur }}
            />
            {formik.touched.last_name && formik.errors.last_name ? (
                <p className="text-sm mt-1 text-red-600">{formik.errors.last_name}</p>
            ) : null}

            <AppInputGroup
                label="Teléfono"
                icon={<Phone className="h-5 w-5" strokeWidth={1.5} />}
                inputProps={{ id: 'telefono', name: 'telefono', placeholder: '+51 999 999 999', value: formik.values.telefono, onChange: formik.handleChange, onBlur: formik.handleBlur }}
            />
            {formik.touched.telefono && formik.errors.telefono ? (
                <p className="text-sm mt-1 text-red-600">{formik.errors.telefono}</p>
            ) : null}

            <AppInputGroup
                label="Correo electrónico"
                icon={<Mail className="h-5 w-5" strokeWidth={1.5} />}
                inputProps={{ id: 'email', name: 'email', type: 'email', placeholder: 'correo@ejemplo.com', value: formik.values.email, onChange: formik.handleChange, onBlur: formik.handleBlur }}
            />
            {formik.touched.email && formik.errors.email ? (
                <p className="text-sm mt-1 text-red-600">{formik.errors.email}</p>
            ) : null}

            <AppInputGroup
                label="Contraseña"
                icon={<Lock className="h-5 w-5" strokeWidth={1.5} />}
                inputProps={{ id: 'password', name: 'password', type: 'password', placeholder: '********', value: formik.values.password, onChange: formik.handleChange, onBlur: formik.handleBlur }}
            />
            {formik.touched.password && formik.errors.password ? (
                <p className="text-sm mt-1 text-red-600">{formik.errors.password}</p>
            ) : null}

            {formik.values.tipo_rol === 'ALBERGUE' && (
                <div className="p-4 bg-surface-container-low rounded-2xl border border-outline-variant/40 space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
                    <p className="text-xs font-bold text-primary uppercase tracking-wider mb-2">Información del Albergue</p>

                    <AppInputGroup
                        label="RUC"
                        icon={<Building2 className="h-5 w-5" strokeWidth={1.5} />}
                        inputProps={{ id: 'datos_adicionales.ruc', name: 'datos_adicionales.ruc', placeholder: '20123456789', value: formik.values.datos_adicionales?.ruc || '', onChange: formik.handleChange, onBlur: formik.handleBlur }}
                    />
                    {touchedAdicionales?.ruc && errorsAdicionales?.ruc ? (
                        <p className="text-sm mt-1 text-red-600">{errorsAdicionales.ruc}</p>
                    ) : null}

                    <AppInputGroup
                        label="Ubicación"
                        icon={<MapPin className="h-5 w-5" strokeWidth={1.5} />}
                        inputProps={{ id: 'datos_adicionales.ubicacion', name: 'datos_adicionales.ubicacion', placeholder: 'Ej. Av. Larco 123, Lima', value: formik.values.datos_adicionales?.ubicacion || '', onChange: formik.handleChange, onBlur: formik.handleBlur }}
                    />
                    {touchedAdicionales?.ubicacion && errorsAdicionales?.ubicacion ? (
                        <p className="text-sm mt-1 text-red-600">{errorsAdicionales.ubicacion}</p>
                    ) : null}

                    <AppInputGroup
                        label="Página web"
                        icon={<Globe className="h-5 w-5" strokeWidth={1.5} />}
                        inputProps={{ id: 'datos_adicionales.web', name: 'datos_adicionales.web', placeholder: 'https://mi-albergue.org', value: formik.values.datos_adicionales?.web || '', onChange: formik.handleChange, onBlur: formik.handleBlur }}
                    />
                    {touchedAdicionales?.web && errorsAdicionales?.web ? (
                        <p className="text-sm mt-1 text-red-600">{errorsAdicionales.web}</p>
                    ) : null}
                </div>
            )}

            <div className="pt-4">
                <Button
                    type="submit"
                    size="xl"
                    className="w-full"
                    loading={registerMutation.isPending}
                >
                    {registerMutation.isPending ? 'Registrando...' : 'Crear cuenta'}
                </Button>
            </div>
        </form>
    );
}
