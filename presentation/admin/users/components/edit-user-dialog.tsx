import { useEffect } from 'react';
import { useFormik } from 'formik';
import { updateUsuarioSchema } from '@/modules/users/features/validations';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useUpdateUsuarioMutation } from '@/modules/users/domain/hooks/useUserMutations';
import { toast } from 'sonner';
import { Usuario } from '@/core/users/interfaces';

interface EditUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: Usuario | null;
  onSuccess: () => void;
}

export function EditUserDialog({ open, onOpenChange, user, onSuccess }: EditUserDialogProps) {
  const updateMutation = useUpdateUsuarioMutation();

  const formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      telefono: '',
      tipo_rol: 'USER' as 'ADMIN' | 'ALBERGUE' | 'USER',
      is_active: true,
    },
    validationSchema: updateUsuarioSchema,
    onSubmit: (values) => {
      if (!user) return;

      updateMutation.mutate(
        {
          id: user.id,
          first_name: values.first_name,
          last_name: values.last_name,
          telefono: values.telefono,
          tipo_rol: values.tipo_rol,
          is_active: values.is_active,
        },
        {
          onSuccess: () => {
            toast.success('Usuario actualizado exitosamente');
            onSuccess();
            onOpenChange(false);
          },
          onError: (error) => {
            toast.error(error?.message || 'Error al actualizar el usuario');
          },
        }
      );
    },
  });

  // Cargar valores del usuario en el formulario cuando cambie la selección
  useEffect(() => {
    if (user && open) {
      formik.setValues({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        telefono: user.telefono || '',
        tipo_rol: user.tipo_rol,
        is_active: user.is_active,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full sm:max-w-md bg-surface border border-border p-6 rounded-2xl">
        <DialogHeader className="border-b border-border pb-4 mb-4">
          <DialogTitle className="text-xl font-bold text-foreground">
            Editar Usuario
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="username" className="text-sm font-semibold">Nombre de Usuario</Label>
            <Input
              id="username"
              value={user?.username || ''}
              disabled
              className="mt-1.5 h-11 bg-muted/50 border-border rounded-xl cursor-not-allowed"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="first_name" className="text-sm font-semibold">Nombre</Label>
              <Input
                id="first_name"
                name="first_name"
                value={formik.values.first_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mt-1.5 h-11 bg-background border-border rounded-xl focus:ring-primary"
              />
              {formik.touched.first_name && formik.errors.first_name ? (
                <p className="text-xs text-red-500 mt-1">{formik.errors.first_name}</p>
              ) : null}
            </div>
            <div>
              <Label htmlFor="last_name" className="text-sm font-semibold">Apellido</Label>
              <Input
                id="last_name"
                name="last_name"
                value={formik.values.last_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mt-1.5 h-11 bg-background border-border rounded-xl focus:ring-primary"
              />
              {formik.touched.last_name && formik.errors.last_name ? (
                <p className="text-xs text-red-500 mt-1">{formik.errors.last_name}</p>
              ) : null}
            </div>
          </div>

          <div>
            <Label htmlFor="telefono" className="text-sm font-semibold">Teléfono de Contacto (Wsp)</Label>
            <Input
              id="telefono"
              name="telefono"
              value={formik.values.telefono}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="mt-1.5 h-11 bg-background border-border rounded-xl focus:ring-primary"
            />
            {formik.touched.telefono && formik.errors.telefono ? (
              <p className="text-xs text-red-500 mt-1">{formik.errors.telefono}</p>
            ) : null}
          </div>

          <div>
            <Label htmlFor="role" className="text-sm font-semibold">Rol Asignado</Label>
            <div className="mt-1.5">
              <Select value={formik.values.tipo_rol} onValueChange={(val) => { if (val) formik.setFieldValue('tipo_rol', val); }}>
                <SelectTrigger className="h-11 w-full rounded-xl border-border bg-background focus:ring-primary">
                  <SelectValue placeholder="Selecciona un Rol" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-border">
                  <SelectItem value="USER">Adoptante / Publicador común</SelectItem>
                  <SelectItem value="ALBERGUE">Albergue de animales</SelectItem>
                  <SelectItem value="ADMIN">Administrador general</SelectItem>
                </SelectContent>
              </Select>
              {formik.touched.tipo_rol && formik.errors.tipo_rol ? (
                <p className="text-xs text-red-500 mt-1">{formik.errors.tipo_rol}</p>
              ) : null}
            </div>
          </div>

          <div className="flex items-center gap-3.5 pt-2">
            <Checkbox
              id="is_active"
              name="is_active"
              checked={formik.values.is_active}
              onCheckedChange={(checked: boolean) => formik.setFieldValue('is_active', checked)}
              className="h-5 w-5 rounded-md border-border text-primary focus:ring-primary"
            />
            <div className="grid gap-1.5 leading-none">
              <Label htmlFor="is_active" className="text-sm font-semibold cursor-pointer">Usuario Activo</Label>
              <p className="text-xs text-muted-foreground">Desmarcar esta casilla bloquea el acceso del usuario.</p>
            </div>
          </div>
        </div>

        <DialogFooter className="mt-6 border-t border-border pt-4 flex gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="h-11 rounded-xl border-border text-foreground hover:bg-muted"
          >
            Cancelar
          </Button>
          <Button
            onClick={() => formik.handleSubmit()}
            disabled={updateMutation.isPending}
            className="h-11 rounded-xl bg-primary text-primary-foreground hover:bg-primary-hover font-semibold px-6"
          >
            {updateMutation.isPending ? 'Guardando...' : 'Guardar Cambios'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
