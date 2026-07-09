'use client';

import Image from 'next/image';
import { Edit3, Trash2 } from 'lucide-react';
import { Card, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Mascota } from '@/core/pets/interfaces';
import { getRelativeImageUrl } from '@/lib/utils';

interface MyPublicationCardProps {
    pet: Mascota;
    onEdit?: (id: number) => void;
    onDelete?: (id: number) => void;
}

export function MyPublicationCard({ pet, onEdit, onDelete }: MyPublicationCardProps) {
    const imageUrl = getRelativeImageUrl(pet.fotos?.[0]?.url_imagen) || '/dog_toby.png';


    return (
        <Card className="relative overflow-hidden border border-outline-variant/20 bg-surface shadow-sm">
            <div className="relative aspect-[4/3] overflow-hidden">
                <Image src={imageUrl} alt={pet.nombre} fill className="object-cover" sizes="(max-width: 768px) 100vw, 360px" />
                <Badge className="absolute left-4 top-4 border-0 px-3 py-1 text-[11px] font-bold uppercase tracking-wide bg-primary text-white">
                    {pet.estado}
                </Badge>

                <div className="absolute right-4 top-4 flex gap-2">
                    <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        aria-label={`Editar ${pet.nombre}`}
                        onClick={() => onEdit?.(pet.id)}
                        className="h-9 w-9 rounded-full bg-white/90 text-foreground shadow-sm"
                    >
                        <Edit3 size={16} />
                    </Button>

                    <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        aria-label={`Eliminar ${pet.nombre}`}
                        onClick={() => onDelete?.(pet.id)}
                        className="h-9 w-9 rounded-full bg-white/90 text-foreground shadow-sm"
                    >
                        <Trash2 size={16} />
                    </Button>
                </div>
            </div>

            <CardContent className="space-y-3 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="text-lg font-semibold text-foreground">{pet.nombre}</CardTitle>
                        <CardDescription className="text-sm text-muted-foreground">{pet.raza} • {pet.especie}</CardDescription>
                    </div>
                </div>

                {/* Etiquetas de características */}
                <div className="flex flex-wrap gap-1.5">
                    {pet.edad && (
                        <Badge variant="secondary" className="bg-[#b75037]/10 text-[#b75037] hover:bg-[#b75037]/15 border-0 text-[10px] px-2 py-0.5 font-semibold">
                            {pet.edad}
                        </Badge>
                    )}
                    {pet.tamano && (
                        <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/15 border-0 text-[10px] px-2 py-0.5 font-semibold">
                            {pet.tamano}
                        </Badge>
                    )}
                    {pet.color && (
                        <Badge variant="secondary" className="bg-muted text-muted-foreground hover:bg-muted/80 border-0 text-[10px] px-2 py-0.5 font-semibold">
                            {pet.color}
                        </Badge>
                    )}
                </div>

                {pet.descripcion && (
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                        {pet.descripcion}
                    </p>
                )}

                <div className="flex items-center justify-between text-sm text-muted-foreground pt-1 border-t border-border/50">
                    <span>Publicada en AdoptApp</span>
                    <span className="font-medium text-foreground">{pet.estado}</span>
                </div>
            </CardContent>
        </Card>
    );
}
