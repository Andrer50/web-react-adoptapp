'use client';

import Image from 'next/image';
import { Edit3, Trash2 } from 'lucide-react';
import { Card, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Pet } from '@/core/pets/interfaces';

interface MyPublicationCardProps {
    pet: Pet;
    onEdit?: (id: string) => void;
    onDelete?: (id: string) => void;
}

export function MyPublicationCard({ pet, onEdit, onDelete }: MyPublicationCardProps) {
    return (
        <Card className="relative overflow-hidden border border-outline-variant/20 bg-surface shadow-sm">
            <div className="relative aspect-[4/3] overflow-hidden">
                <Image src={pet.image} alt={pet.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 360px" />
                <Badge className="absolute left-4 top-4 border-0 px-3 py-1 text-[11px] font-bold uppercase tracking-wide bg-primary text-white">
                    {pet.badge}
                </Badge>

                <div className="absolute right-4 top-4 flex gap-2">
                    <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        aria-label={`Editar ${pet.name}`}
                        onClick={() => onEdit?.(pet.id)}
                        className="h-9 w-9 rounded-full bg-white/90 text-foreground shadow-sm"
                    >
                        <Edit3 size={16} />
                    </Button>

                    <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        aria-label={`Eliminar ${pet.name}`}
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
                        <CardTitle className="text-lg font-semibold text-foreground">{pet.name}</CardTitle>
                        <CardDescription className="text-sm text-muted-foreground">{pet.breed} • {pet.age === 'PUPPY' ? 'Cachorro' : pet.age === 'YOUNG' ? 'Joven' : pet.age === 'ADULT' ? 'Adulto' : 'Mayor'}</CardDescription>
                    </div>
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{pet.location}</span>
                    <span className="font-medium text-foreground">{pet.distance}</span>
                </div>
            </CardContent>
        </Card>
    );
}
