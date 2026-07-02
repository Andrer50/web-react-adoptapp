'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useUploadImageMutation } from '@/modules/pets/domain/hooks/usePetMutations';
import { Upload, Check, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface ChangePhotoProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentPhotoUrl?: string;
  onSuccess: (url: string) => void;
}

export function ChangePhotoProfileDialog({
  open,
  onOpenChange,
  currentPhotoUrl,
  onSuccess,
}: ChangePhotoProfileDialogProps) {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const uploadImageMutation = useUploadImageMutation();

  // Reset local state when dialog is closed
  if (!open && (file !== null || previewUrl !== null)) {
    setFile(null);
    setPreviewUrl(null);
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  const handleUpload = () => {
    if (!file) return;

    uploadImageMutation.mutate(file, {
      onSuccess: (res) => {
        onSuccess(res.url);
        toast.success('Imagen subida correctamente');
        onOpenChange(false);
      },
      onError: (err) => {
        toast.error(err?.message || 'Error al subir la imagen');
      },
    });
  };

  const isUploading = uploadImageMutation.isPending;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-2xl bg-surface border border-border">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-foreground">Cambiar foto de perfil</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center justify-center py-6 space-y-6">
          {/* Vista previa */}
          <div className="relative group flex items-center justify-center size-32 rounded-full border-4 border-primary/20 bg-muted overflow-hidden shadow-inner">
            {previewUrl ? (
              <img src={previewUrl} alt="Vista previa" className="h-full w-full object-cover" />
            ) : currentPhotoUrl ? (
              <img src={currentPhotoUrl} alt="Foto actual" className="h-full w-full object-cover" />
            ) : (
              <Upload className="size-10 text-muted-foreground" />
            )}
          </div>

          {/* Arrastrar o seleccionar */}
          <div className="w-full">
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border hover:border-primary rounded-xl cursor-pointer bg-background transition-colors duration-200">
              <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4 text-center">
                <Upload className="size-8 text-muted-foreground mb-2" />
                <p className="text-sm font-semibold text-foreground">
                  {file ? file.name : 'Selecciona una imagen'}
                </p>
                <p className="text-xs text-muted-foreground mt-1">PNG, JPG, JPEG o WEBP (Máx. 5MB)</p>
              </div>
              <input
                type="file"
                className="hidden"
                accept="image/png, image/jpeg, image/jpg, image/webp"
                onChange={handleFileChange}
              />
            </label>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isUploading}
            className="rounded-xl"
          >
            Cancelar
          </Button>
          <Button
            type="button"
            onClick={handleUpload}
            disabled={!file || isUploading}
            className="rounded-xl gap-2 font-semibold"
          >
            {isUploading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Subiendo...
              </>
            ) : (
              <>
                <Check className="size-4" />
                Guardar foto
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
