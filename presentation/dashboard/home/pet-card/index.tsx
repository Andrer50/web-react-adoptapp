'use client';

import Image from 'next/image';
import { Heart, MapPin, Mars, Venus } from 'lucide-react';
import { Card, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Pet } from '@/core/pets/interfaces';

interface PetCardProps {
    pet: Pet;
    isFavorite: boolean;
    onToggleFavorite: (id: string) => void;
}

const badgeStyles: Record<string, string> = {
    'Nueva llegada': 'bg-[#b75037] text-white',
    'Necesidades especiales': 'bg-[#f2a65e] text-[#4f2606]',
    Especial: 'bg-[#c38f3a] text-white',
};

export function PetCard({ pet, isFavorite, onToggleFavorite }: PetCardProps) {
    return (
        <Card className="overflow-hidden border border-outline-variant/20 bg-surface shadow-[0_14px_30px_rgba(69,35,20,0.08)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(69,35,20,0.12)]">
            <div className="relative aspect-[4/3] overflow-hidden">
                <Image src={pet.image} alt={pet.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 360px" />
                <Badge className={`absolute left-4 top-4 border-0 px-3 py-1 text-[11px] font-bold uppercase tracking-wide ${badgeStyles[pet.badge] ?? 'bg-primary text-white'}`}>
                    {pet.badge}
                </Badge>
                <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    aria-label={`Mark ${pet.name} as favorite`}
                    onClick={() => onToggleFavorite(pet.id)}
                    className="absolute right-4 top-4 h-10 w-10 rounded-full bg-white/95 text-foreground shadow-md backdrop-blur-md hover:bg-white"
                >
                    <Heart className={isFavorite ? 'fill-primary text-primary' : 'text-foreground'} size={18} />
                </Button>
            </div>

            <CardContent className="space-y-5 p-5">
                <div className="flex items-start justify-between gap-3">
                    <div>
                        <CardTitle className="scroll-m-20 text-2xl font-semibold tracking-tight text-foreground">{pet.name}</CardTitle>
                        <CardDescription className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                            <span className="text-base leading-none">{pet.gender === 'male' ? <Mars className="text-[#9d4b2f]" size={16} /> : <Venus className="text-[#9d4b2f]" size={16} />}</span>
                            <span>{pet.breed}</span>
                            <span>•</span>
                            <span>{pet.age === 'PUPPY' ? 'Cachorro' : pet.age === 'YOUNG' ? 'Joven' : pet.age === 'ADULT' ? 'Adulto' : 'Mayor'}</span>
                        </CardDescription>
                    </div>
                </div>

                <div className="border-t border-border pt-4">
                    <p className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                        <MapPin size={16} className="text-primary" />
                        <span>{pet.location}</span>
                        <span>({pet.distance})</span>
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
