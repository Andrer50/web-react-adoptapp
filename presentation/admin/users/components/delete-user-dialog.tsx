import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ShieldAlert } from 'lucide-react';
import { Usuario } from '@/core/users/interfaces';
import { useDeleteUsuarioMutation } from '@/modules/users/domain/hooks/useUserMutations';
import { toast } from 'sonner';

interface DeleteUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: Usuario | null;
  onSuccess: () => void;
}

export function DeleteUserDialog({ open, onOpenChange, user, onSuccess }: DeleteUserDialogProps) {
  const deleteMutation = useDeleteUsuarioMutation();

  const handleDeleteUser = () => {
    if (!user) return;

    deleteMutation.mutate(user.id, {
      onSuccess: () => {
        toast.success('Usuario eliminado exitosamente');
        onSuccess();
        onOpenChange(false);
      },
      onError: (error) => {
        toast.error(error?.message || 'Error al eliminar el usuario');
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full sm:max-w-md bg-surface border border-border p-6 rounded-2xl">
        <DialogHeader className="flex flex-col items-center text-center">
          <div className="rounded-full bg-red-100 p-4 text-red-600 mb-4 animate-bounce">
            <ShieldAlert size={30} />
          </div>
          <DialogTitle className="text-xl font-bold text-foreground">
            ¿Eliminar Usuario?
          </DialogTitle>
        </DialogHeader>

        <div className="text-center py-2">
          <p className="text-sm text-muted-foreground">
            Estás a punto de eliminar permanentemente al usuario{' '}
            <strong className="text-foreground">@{user?.username}</strong>.
          </p>
          <p className="text-xs text-red-500 font-semibold mt-2 uppercase tracking-wide">
            ¡Esta acción no se puede deshacer!
          </p>
        </div>

        <DialogFooter className="mt-6 flex justify-center gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="h-11 rounded-xl border-border text-foreground hover:bg-muted flex-1"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleDeleteUser}
            disabled={deleteMutation.isPending}
            className="h-11 rounded-xl bg-red-600 text-white hover:bg-red-700 font-semibold flex-1"
          >
            {deleteMutation.isPending ? 'Eliminando...' : 'Sí, Eliminar'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
