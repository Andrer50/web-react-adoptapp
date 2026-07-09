'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Calendar, Palette, Ruler, ChevronLeft, ChevronRight, Heart, MapPin } from 'lucide-react';
import { Mascota } from '@/core/pets/interfaces';
import { getRelativeImageUrl } from '@/lib/utils';


interface PetCardProps {
    pet: Mascota;
    isFavorite: boolean;
    onToggleFavorite: (id: number) => void;
}

export function PetCard({ pet, isFavorite, onToggleFavorite }: PetCardProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const hasMultipleImages = pet.fotos && pet.fotos.length > 1;

    // Efecto de cambio automático de imagen
    useEffect(() => {
        if (!hasMultipleImages || isHovered) return;

        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev === pet.fotos.length - 1 ? 0 : prev + 1));
        }, 3500); // Rotar cada 3.5 segundos

        return () => clearInterval(interval);
    }, [hasMultipleImages, isHovered, pet.fotos?.length]);

    return (
        <div 
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group/card relative flex flex-col overflow-hidden rounded-[24px] bg-white border border-border/10 shadow-[0_8px_30px_rgb(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_32px_rgba(159,64,45,0.08)]"
        >
            {/* Contenedor de la Imagen */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-t-[24px]">
                {pet.fotos && pet.fotos.length > 0 ? (
                    pet.fotos.map((foto, index) => (
                        <Image 
                            key={foto.id || index}
                            src={getRelativeImageUrl(foto.url_imagen)} 
                            alt={`${pet.nombre} - Foto ${index + 1}`} 
                            fill 
                            className={`object-cover transition-all duration-500 ease-in-out ${
                                index === currentImageIndex 
                                    ? 'opacity-100 scale-100 group-hover/card:scale-105' 
                                    : 'opacity-0 scale-95 pointer-events-none'
                            }`} 
                            sizes="(max-width: 768px) 100vw, 360px"
                            priority={index === 0}
                        />
                    ))
                ) : (
                    <Image 
                        src="/dog_toby.png" 
                        alt={pet.nombre} 
                        fill 
                        className="object-cover transition-transform duration-500 ease-out group-hover/card:scale-105" 
                        sizes="(max-width: 768px) 100vw, 360px" 
                    />
                )}
                
                {/* Badge de Estado */}
                <span className={`absolute left-4 top-4 border-0 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider shadow-sm backdrop-blur-sm transition-all duration-300 ${
                    pet.estado === 'DISPONIBLE'
                        ? 'bg-primary/95 text-white'
                        : 'bg-[#ffab69]/90 text-[#783d01]'
                }`}>
                    {pet.estado}
                </span>

                {/* Botón de Favorito */}
                <button
                    type="button"
                    aria-label={isFavorite ? `Quitar a ${pet.nombre} de favoritos` : `Agregar a ${pet.nombre} a favoritos`}
                    onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(pet.id);
                    }}
                    className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-foreground shadow-md backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-90 hover:bg-white cursor-pointer z-10"
                >
                    <Heart
                        className={`transition-all duration-300 ${
                            isFavorite
                                ? 'fill-primary text-primary scale-110'
                                : 'text-muted-foreground hover:text-primary'
                        }`}
                        size={18}
                    />
                </button>

                {/* Flechas de navegación para múltiples fotos */}
                {hasMultipleImages && (
                    <>
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                setCurrentImageIndex((prev) => (prev === 0 ? pet.fotos.length - 1 : prev - 1));
                            }}
                            className="absolute left-3 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 hover:bg-white text-foreground shadow-md backdrop-blur-xs opacity-0 group-hover/card:opacity-100 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer z-10"
                            aria-label="Foto anterior"
                        >
                            <ChevronLeft size={16} />
                        </button>
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                setCurrentImageIndex((prev) => (prev === pet.fotos.length - 1 ? 0 : prev + 1));
                            }}
                            className="absolute right-3 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 hover:bg-white text-foreground shadow-md backdrop-blur-xs opacity-0 group-hover/card:opacity-100 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer z-10"
                            aria-label="Siguiente foto"
                        >
                            <ChevronRight size={16} />
                        </button>
                    </>
                )}

                {/* Indicadores de fotos */}
                {hasMultipleImages && (
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10 bg-black/20 backdrop-blur-xs px-2 py-1 rounded-full">
                        {pet.fotos.map((_, index) => (
                            <button
                                key={index}
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    setCurrentImageIndex(index);
                                }}
                                className={`h-1.5 rounded-full transition-all duration-300 ${
                                    index === currentImageIndex ? 'w-3 bg-white' : 'w-1.5 bg-white/50 hover:bg-white/80'
                                }`}
                                aria-label={`Ir a foto ${index + 1}`}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Contenido */}
            <div className="flex flex-col flex-1 p-6 space-y-4 bg-white">
                {/* Nombre y Especie/Raza */}
                <div>
                    <h3 className="font-display text-2xl font-bold tracking-tight text-foreground transition-colors duration-300 group-hover/card:text-primary">
                        {pet.nombre}
                    </h3>
                    <p className="mt-1 text-sm font-semibold text-muted-foreground/80">
                        {pet.raza} <span className="mx-1.5 text-muted-foreground/40">•</span> {pet.especie}
                    </p>
                </div>

                {/* Etiquetas de características con iconos */}
                <div className="flex flex-wrap gap-2">
                    {pet.edad && (
                        <span className="inline-flex items-center gap-1 bg-primary/8 text-primary border border-primary/10 rounded-full py-1 px-3 text-[11px] font-bold transition-colors hover:bg-primary/12">
                            <Calendar size={12} className="opacity-80" />
                            {pet.edad}
                        </span>
                    )}
                    {pet.tamano && (
                        <span className="inline-flex items-center gap-1 bg-[#ffab69]/15 text-[#783d01] border border-[#ffab69]/20 rounded-full py-1 px-3 text-[11px] font-bold transition-colors hover:bg-[#ffab69]/20">
                            <Ruler size={12} className="opacity-80" />
                            {pet.tamano}
                        </span>
                    )}
                    {pet.color && (
                        <span className="inline-flex items-center gap-1 bg-[#f0eded] text-[#56423e] border border-[#e4e2e1]/30 rounded-full py-1 px-3 text-[11px] font-bold transition-colors hover:bg-[#eae7e7]">
                            <Palette size={12} className="opacity-80" />
                            {pet.color}
                        </span>
                    )}
                </div>

                {/* Descripción */}
                {pet.descripcion && (
                    <p className="text-[13px] leading-relaxed text-muted-foreground/90 font-normal line-clamp-2">
                        {pet.descripcion}
                    </p>
                )}

                {/* Pie de Página */}
                <div className="border-t border-border/40 pt-4 mt-auto flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[13px] font-semibold text-muted-foreground">
                        <MapPin size={15} className="text-primary animate-pulse" />
                        <span>Publicada en AdoptApp</span>
                    </div>
                    <span className="flex items-center text-xs font-bold text-primary opacity-0 group-hover/card:opacity-100 transition-all duration-300 -translate-x-2 group-hover/card:translate-x-0">
                        Adoptar <ChevronRight size={14} className="ml-0.5 transition-transform duration-300 group-hover/card:translate-x-0.5" />
                    </span>
                </div>
            </div>
        </div>
    );
}


