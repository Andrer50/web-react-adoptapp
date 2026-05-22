import React from "react";
import Image from "next/image";
import { ArrowRightIcon, PlayIcon, HeartIcon } from "./Icons";

export const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden py-10 lg:py-16">
      {/* Formas decorativas de fondo */}
      <div className="absolute top-0 right-0 -z-10 h-[600px] w-[600px] rounded-full bg-secondary-container/20 blur-3xl opacity-60 translate-x-1/3 -translate-y-1/4" />
      <div className="absolute bottom-0 left-0 -z-10 h-[500px] w-[500px] rounded-full bg-primary-container/10 blur-3xl opacity-50 -translate-x-1/4 translate-y-1/4" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          
          {/* Columna de texto izquierda */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <h1 className="font-display text-4xl font-bold tracking-tight text-on-surface sm:text-5xl lg:text-6xl/tight">
              Encuentra a tu <br />
              <span className="text-primary relative inline-block">
                compañero perfecto
              </span>
            </h1>
            <p className="mt-6 max-w-lg font-sans text-lg leading-relaxed text-on-surface-variant">
              Conectamos corazones dispuestos a dar amor con animales que buscan
              un hogar. Nuestra misión es fomentar la adopción responsable y crear
              lazos inquebrantables.
            </p>

            {/* Botones de accion */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <a
                href="#catalog"
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 font-sans text-base font-bold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:bg-primary-hover hover:shadow-primary-hover/30 hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Explorar Catálogo</span>
                <ArrowRightIcon size={18} className="transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#how-it-works"
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-full border-2 border-outline-variant bg-transparent px-7 font-sans text-base font-bold text-primary transition-all duration-300 hover:bg-outline-variant/10 hover:border-outline hover:-translate-y-0.5 active:translate-y-0"
              >
                <PlayIcon size={18} />
                <span>Conoce cómo funciona</span>
              </a>
            </div>
          </div>

          {/* Columna de imagen derecha */}
          <div className="relative flex justify-center lg:justify-end">
            
            {/* Forma de fondo detras de la imagen */}
            <div className="absolute inset-0 -m-8 scale-95 rounded-[50px] bg-gradient-to-tr from-secondary-container/20 to-primary-container/20 blur-xl -z-10" />

            <div className="relative w-full max-w-[480px] aspect-[4/5] overflow-hidden rounded-[32px] shadow-2xl shadow-on-surface/5 border-8 border-white bg-white group hover:scale-[1.01] transition-transform duration-500">
              <Image
                src="/hero_dog.png"
                alt="Retrato de perro adorable"
                fill
                priority
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 480px"
              />
            </div>

            {/* Insignia flotante de estadisticas */}
            <div className="absolute -bottom-6 left-6 sm:-left-6 flex items-center gap-3 rounded-2xl bg-white/90 backdrop-blur-md p-4 shadow-xl shadow-on-surface/10 border border-white/40 transition-all duration-500 hover:scale-105 hover:-translate-y-1">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary-container/20 text-secondary">
                <HeartIcon size={24} className="fill-secondary/20" />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-[15px] font-bold text-on-surface">
                  500+ Adoptados
                </span>
                <span className="font-sans text-[11px] font-semibold text-on-surface-variant">
                  Familias felices
                </span>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};
