"use client";

import React, { useState } from "react";
import Image from "next/image";
import { HeartIcon, ArrowRightIcon, PawIcon } from "./Icons";

export const FeaturedPets: React.FC = () => {
  const [favorites, setFavorites] = useState<{ [key: string]: boolean }>({
    max: false,
    luna: false,
    toby: false,
  });

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="catalog" className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado de seccion */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div className="max-w-xl">
            <h2 className="font-display text-3xl font-bold tracking-tight text-on-surface sm:text-4xl">
              Mascotas Destacadas
            </h2>
            <p className="mt-3 font-sans text-base leading-relaxed text-on-surface-variant">
              Ellos están esperando una segunda oportunidad. ¿Serás tú quien se la dé?
            </p>
          </div>
          <a
            href="#"
            className="group inline-flex items-center gap-1.5 font-sans text-[15px] font-bold text-primary transition-colors hover:text-primary-hover"
          >
            <span>Ver todos</span>
            <ArrowRightIcon size={18} className="transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        {/* Cuadricula de distribucion personalizada */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* IZQUIERDA: Tarjeta grande (Max) - Ocupa 7/12 columnas */}
          <div className="lg:col-span-7 flex">
            <div className="flex flex-col w-full overflow-hidden rounded-[24px] bg-white shadow-md shadow-on-surface/5 border border-outline-variant/10 group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-on-surface/10">
              
              {/* Contenedor de imagen */}
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src="/puppy_max.png"
                  alt="Cachorro Max"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 700px"
                />
                
                {/* Insignia de estado */}
                <span className="absolute top-4 left-4 inline-flex items-center rounded-full bg-primary/10 px-3 py-1 font-sans text-xs font-bold text-primary backdrop-blur-sm">
                  Recién Llegado
                </span>

                {/* Boton de favorito */}
                <button
                  onClick={() => toggleFavorite("max")}
                  className={`absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-sm border transition-all duration-300 ${
                    favorites.max
                      ? "bg-primary border-primary text-white scale-110"
                      : "bg-white/80 border-white/20 text-on-surface hover:bg-white hover:text-primary"
                  }`}
                  aria-label="Agregar Max a favoritos"
                >
                  <HeartIcon size={20} className={favorites.max ? "fill-white" : ""} />
                </button>
              </div>

              {/* Cuerpo de tarjeta */}
              <div className="flex flex-col flex-1 p-6 bg-surface-container-lowest">
                <h3 className="font-display text-2xl font-bold tracking-tight text-on-surface">
                  Max
                </h3>
                <p className="mt-1 font-sans text-sm font-semibold text-on-surface-variant">
                  Golden Retriever • 6 Meses
                </p>

                {/* Etiquetas de estado */}
                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="inline-flex rounded-full bg-outline-variant/10 px-3.5 py-1 font-sans text-xs font-bold text-on-surface-variant">
                    Juguetón
                  </span>
                  <span className="inline-flex rounded-full bg-outline-variant/10 px-3.5 py-1 font-sans text-xs font-bold text-on-surface-variant">
                    Amigable
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* DERECHA: Cuadricula de 2 tarjetas pequenas + banner de accion - Ocupa 5/12 columnas */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-8">
            
            {/* Fila superior: dos tarjetas pequenas lado a lado */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Tarjeta de Luna */}
              <div className="flex flex-col overflow-hidden rounded-[20px] bg-white shadow-md shadow-on-surface/5 border border-outline-variant/10 group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="relative aspect-square w-full overflow-hidden">
                  <Image
                    src="/cat_luna.png"
                    alt="Gata Luna"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 250px"
                  />
                  <span className="absolute top-3 left-3 inline-flex items-center rounded-full bg-[#fcf2e8] px-2.5 py-0.5 font-sans text-[10px] font-bold text-secondary backdrop-blur-sm">
                    Urgente
                  </span>
                  <button
                    onClick={() => toggleFavorite("luna")}
                    className={`absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-sm border transition-all ${
                      favorites.luna
                        ? "bg-primary border-primary text-white scale-110"
                        : "bg-white/80 border-white/20 text-on-surface hover:bg-white hover:text-primary"
                    }`}
                    aria-label="Agregar Luna a favoritos"
                  >
                    <HeartIcon size={16} className={favorites.luna ? "fill-white" : ""} />
                  </button>
                </div>
                <div className="p-4 bg-surface-container-lowest">
                  <h4 className="font-display text-lg font-bold text-on-surface">Luna</h4>
                  <p className="mt-0.5 font-sans text-xs font-semibold text-on-surface-variant">
                    Mestiza • 2 Años
                  </p>
                </div>
              </div>

              {/* Tarjeta de Toby */}
              <div className="flex flex-col overflow-hidden rounded-[20px] bg-white shadow-md shadow-on-surface/5 border border-outline-variant/10 group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="relative aspect-square w-full overflow-hidden">
                  <Image
                    src="/dog_toby.png"
                    alt="Perro Toby"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 250px"
                  />
                  <button
                    onClick={() => toggleFavorite("toby")}
                    className={`absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-sm border transition-all ${
                      favorites.toby
                        ? "bg-primary border-primary text-white scale-110"
                        : "bg-white/80 border-white/20 text-on-surface hover:bg-white hover:text-primary"
                    }`}
                    aria-label="Agregar Toby a favoritos"
                  >
                    <HeartIcon size={16} className={favorites.toby ? "fill-white" : ""} />
                  </button>
                </div>
                <div className="p-4 bg-surface-container-lowest">
                  <h4 className="font-display text-lg font-bold text-on-surface">Toby</h4>
                  <p className="mt-0.5 font-sans text-xs font-semibold text-on-surface-variant">
                    Terrier Mestizo • 4 Años
                  </p>
                </div>
              </div>

            </div>

            {/* Fila inferior: banner de accion */}
            <div className="flex flex-col items-center justify-center text-center rounded-[24px] bg-primary-container/10 border border-primary-container/20 p-8 shadow-sm transition-all duration-300 hover:scale-[1.01] hover:shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <PawIcon size={24} />
              </div>
              <h4 className="mt-5 font-display text-xl font-bold tracking-tight text-on-surface">
                Encuentra más amigos
              </h4>
              <p className="mt-2 max-w-sm font-sans text-[14px] leading-relaxed text-on-surface-variant">
                Explora cientos de perfiles de mascotas buscando un hogar amoroso.
              </p>
              <a
                href="#"
                className="mt-6 inline-flex h-11 items-center justify-center rounded-full border-2 border-primary/20 bg-white px-6 font-sans text-sm font-bold text-primary transition-all duration-300 hover:bg-primary/5 hover:border-primary hover:-translate-y-0.5 active:translate-y-0 shadow-sm shadow-primary/5"
              >
                Ver todo el catálogo
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
