import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useCreateAdopcionMutation } from '@/modules/adoptions/domain/hooks/useAdoptionMutations';
import { useBuscarUsuarioPorEmailQuery } from '@/modules/users/domain/hooks/useUserQueries';
import { Mascota } from '@/core/pets/interfaces';
import { Search, Loader2, UserCheck, HeartHandshake, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface MarkAdoptedDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pet: Mascota | null;
  onSuccess: () => void;
}

export function MarkAdoptedDialog({ open, onOpenChange, pet, onSuccess }: MarkAdoptedDialogProps) {
  const [emailInput, setEmailInput] = useState('');
  const [emailToSearch, setEmailToSearch] = useState('');
  const [searchTriggered, setSearchTriggered] = useState(false);
  const [localError, setLocalError] = useState('');

  const { data: searchedUser, isLoading: searching, error } = useBuscarUsuarioPorEmailQuery(
    emailToSearch,
    searchTriggered
  );

  const createAdopcionMutation = useCreateAdopcionMutation();

  const handleSearch = () => {
    if (!emailInput.trim()) {
      setLocalError('Por favor ingresa un correo electrónico.');
      setSearchTriggered(false);
      return;
    }
    setLocalError('');
    setEmailToSearch(emailInput.trim());
    setSearchTriggered(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailInput(e.target.value);
    setSearchTriggered(false);
    setLocalError('');
  };

  const handleClose = () => {
    onOpenChange(false);
    setEmailInput('');
    setEmailToSearch('');
    setSearchTriggered(false);
    setLocalError('');
  };

  const handleAssignAdoption = () => {
    if (!pet || !searchedUser) return;

    createAdopcionMutation.mutate(
      {
        mascota: pet.id,
        adoptante: searchedUser.id,
      },
      {
        onSuccess: () => {
          toast.success(`¡Mascota ${pet.nombre} adoptada con éxito por ${searchedUser.first_name || searchedUser.username}!`);
          onSuccess();
          handleClose();
        },
        onError: (err) => {
          toast.error(err?.message || 'Error al registrar la adopción');
        },
      }
    );
  };

  const errorMsg = localError || ((searchTriggered && error)
    ? (error.message || 'No se encontró ningún usuario con ese correo electrónico.')
    : '');

  return (
    <Dialog open={open} onOpenChange={(val) => {
      if (!val) {
        handleClose();
      } else {
        onOpenChange(true);
      }
    }}>
      <DialogContent className="w-full sm:max-w-md bg-surface border border-border p-6 rounded-2xl">
        <DialogHeader className="border-b border-border pb-4 mb-4">
          <DialogTitle className="text-xl font-bold text-foreground flex items-center gap-2">
            <HeartHandshake className="text-primary" />
            Marcar como Adoptado
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Registra al nuevo dueño de <strong className="text-foreground">{pet?.nombre}</strong> ingresando su correo electrónico.
          </p>

          <div className="space-y-1.5">
            <Label htmlFor="adopter-email" className="text-sm font-semibold">Correo del Adoptante</Label>
            <div className="flex gap-2">
              <Input
                id="adopter-email"
                type="email"
                placeholder="ejemplo@correo.com"
                value={emailInput}
                onChange={handleInputChange}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleSearch();
                  }
                }}
                className="h-11 bg-background border-border rounded-xl focus:ring-primary"
              />
              <Button
                type="button"
                onClick={handleSearch}
                disabled={searching}
                className="h-11 rounded-xl bg-primary text-primary-foreground hover:bg-primary-hover font-semibold px-4 gap-2 active:scale-95"
              >
                {searching ? (
                  <Loader2 className="animate-spin h-4 w-4" />
                ) : (
                  <Search size={16} />
                )}
                Buscar
              </Button>
            </div>
          </div>

          {/* Mensaje de Error */}
          {errorMsg && (
            <div className="flex items-center gap-2 p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl">
              <AlertCircle size={16} className="shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Información del Usuario Encontrado */}
          {searchedUser && !error && (
            <div className="p-4 border border-primary/20 bg-primary/5 rounded-xl space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-200">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-primary/10 rounded-full text-primary">
                  <UserCheck size={18} />
                </div>
                <div>
                  <div className="font-bold text-foreground">
                    {searchedUser.first_name || searchedUser.last_name
                      ? `${searchedUser.first_name || ''} ${searchedUser.last_name || ''}`.trim()
                      : searchedUser.username}
                  </div>
                  <div className="text-xs text-muted-foreground">@{searchedUser.username} • {searchedUser.email}</div>
                </div>
              </div>

              {searchedUser.telefono && (
                <div className="text-xs text-muted-foreground pl-10">
                  <strong>Contacto:</strong> {searchedUser.telefono}
                </div>
              )}
            </div>
          )}
        </div>

        <DialogFooter className="mt-6 border-t border-border pt-4 flex gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            className="h-11 rounded-xl border-border text-foreground hover:bg-muted"
          >
            Cancelar
          </Button>
          <Button
            type="button"
            onClick={handleAssignAdoption}
            disabled={!searchedUser || !!error || createAdopcionMutation.isPending}
            className="h-11 rounded-xl bg-primary text-primary-foreground hover:bg-primary-hover font-semibold px-6"
          >
            {createAdopcionMutation.isPending ? 'Procesando...' : 'Confirmar Adopción'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
