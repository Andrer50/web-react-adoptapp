import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ShieldAlert } from 'lucide-react';
import { Mascota } from '@/core/pets/interfaces';
import { useDeleteMascotaMutation } from '@/modules/pets/domain/hooks/usePetMutations';
import { toast } from 'sonner';

interface DeletePetDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pet: Mascota | null;
  onSuccess: () => void;
}

export function DeletePetDialog({ open, onOpenChange, pet, onSuccess }: DeletePetDialogProps) {
  const deleteMutation = useDeleteMascotaMutation();

  const handleDeletePet = () => {
    if (!pet) return;

    deleteMutation.mutate(pet.id, {
      onSuccess: () => {
        toast.success('Mascota eliminada exitosamente');
        onSuccess();
        onOpenChange(false);
      },
      onError: (error) => {
        toast.error(error?.message || 'Error al eliminar la mascota');
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
            ¿Eliminar Publicación de Mascota?
          </DialogTitle>
        </DialogHeader>

        <div className="text-center py-2">
          <p className="text-sm text-muted-foreground">
            Estás a punto de eliminar permanentemente el perfil de{' '}
            <strong className="text-foreground">{pet?.nombre}</strong>.
          </p>
          <p className="text-xs text-red-500 font-semibold mt-2 uppercase tracking-wide">
            ¡Esta acción es irrevocable!
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
            onClick={handleDeletePet}
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
