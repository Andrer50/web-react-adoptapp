import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { CreatePetForm } from '@/presentation/dashboard/my-publications/create-pet-form';
import { Mascota } from '@/core/pets/interfaces';

interface EditPetDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pet: Mascota | null;
  onSuccess: () => void;
}

export function EditPetDialog({ open, onOpenChange, pet, onSuccess }: EditPetDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full sm:max-w-lg overflow-y-auto max-h-[85vh] bg-surface border border-border p-0 rounded-2xl">
        <DialogHeader className="border-b border-border px-6 py-5 bg-background sticky top-0 z-10 rounded-t-2xl">
          <DialogTitle className="text-xl font-bold text-foreground">
            Editar Mascota (Modo Administrador)
          </DialogTitle>
        </DialogHeader>
        <div className="p-6">
          {pet && (
            <CreatePetForm
              pet={pet}
              onSuccess={() => {
                onSuccess();
                onOpenChange(false);
              }}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
