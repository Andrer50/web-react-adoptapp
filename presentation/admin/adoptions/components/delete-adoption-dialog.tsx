import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ShieldAlert } from 'lucide-react';
import { Adopcion } from '@/core/adoptions/interfaces';
import { useDeleteAdopcionMutation } from '@/modules/adoptions/domain/hooks/useAdoptionMutations';
import { toast } from 'sonner';

interface DeleteAdoptionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  adoption: Adopcion | null;
  onSuccess: () => void;
}

export function DeleteAdoptionDialog({ open, onOpenChange, adoption, onSuccess }: DeleteAdoptionDialogProps) {
  const deleteMutation = useDeleteAdopcionMutation();

  const handleDeleteAdoption = () => {
    if (!adoption) return;

    deleteMutation.mutate(adoption.id, {
      onSuccess: () => {
        toast.success('Registro de adopción eliminado/revertido exitosamente');
        onSuccess();
        onOpenChange(false);
      },
      onError: (error) => {
        toast.error(error?.message || 'Error al deshacer la adopción');
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
            ¿Eliminar / Revertir Adopción?
          </DialogTitle>
        </DialogHeader>

        <div className="text-center py-2">
          <p className="text-sm text-muted-foreground">
            Estás a punto de eliminar el registro de adopción para la mascota{' '}
            <strong className="text-foreground">
              {adoption?.mascota_detalle?.nombre || 'la mascota seleccionada'}
            </strong>{' '}
            por parte de{' '}
            <strong className="text-foreground">
              {adoption?.adoptante_detalle?.username || 'el adoptante'}
            </strong>.
          </p>
          <p className="text-xs text-red-500 font-semibold mt-2 uppercase tracking-wide">
            La mascota volverá a figurar como disponible para adopción.
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
            onClick={handleDeleteAdoption}
            disabled={deleteMutation.isPending}
            className="h-11 rounded-xl bg-red-600 text-white hover:bg-red-700 font-semibold flex-1"
          >
            {deleteMutation.isPending ? 'Deshaciendo...' : 'Revertir Adopción'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
