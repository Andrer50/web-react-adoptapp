'use client';

import Image from 'next/image';
import { Heart, MapPin, Mars, Venus } from 'lucide-react';
import { Card, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Mascota } from '@/core/pets/interfaces';

interface PetCardProps {
    pet: Mascota;
    isFavorite: boolean;
    onToggleFavorite: (id: number) => void;
}

const badgeStyles: Record<string, string> = {
    'DISPONIBLE': 'bg-[#b75037] text-white',
    'ADOPTADO': 'bg-[#f2a65e] text-[#4f2606]',
};

export function PetCard({ pet, isFavorite, onToggleFavorite }: PetCardProps) {
    const imageUrl = pet.fotos?.[0]?.url_imagen || '/dog_toby.png';

    return (
        <Card className="overflow-hidden border border-outline-variant/20 bg-surface shadow-[0_14px_30px_rgba(69,35,20,0.08)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(69,35,20,0.12)]">
            <div className="relative aspect-[4/3] overflow-hidden">
                <Image src={imageUrl} alt={pet.nombre} fill className="object-cover" sizes="(max-width: 768px) 100vw, 360px" />
                <Badge className={`absolute left-4 top-4 border-0 px-3 py-1 text-[11px] font-bold uppercase tracking-wide ${badgeStyles[pet.estado] ?? 'bg-primary text-white'}`}>
                    {pet.estado}
                </Badge>
                <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    aria-label={`Mark ${pet.nombre} as favorite`}
                    onClick={() => onToggleFavorite(pet.id)}
                    className="absolute right-4 top-4 h-10 w-10 rounded-full bg-white/95 text-foreground shadow-md backdrop-blur-md hover:bg-white"
                >
                    <Heart className={isFavorite ? 'fill-primary text-primary' : 'text-foreground'} size={18} />
                </Button>
            </div>

            <CardContent className="space-y-5 p-5">
                <div className="flex items-start justify-between gap-3">
                    <div>
                        <CardTitle className="scroll-m-20 text-2xl font-semibold tracking-tight text-foreground">{pet.nombre}</CardTitle>
                        <CardDescription className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                            <span>{pet.raza}</span>
                            <span>•</span>
                            <span>{pet.especie}</span>
                        </CardDescription>
                    </div>
                </div>

                <div className="border-t border-border pt-4">
                    <p className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                        <MapPin size={16} className="text-primary" />
                        <span>Publicada en AdoptApp</span>
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
