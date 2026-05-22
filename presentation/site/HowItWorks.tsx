import React from "react";
import { CompassIcon, HandshakeIcon, HomeIcon } from "./Icons";

interface Step {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export const HowItWorks: React.FC = () => {
  const steps: Step[] = [
    {
      number: "1",
      title: "1. Explora",
      description: "Filtra por raza, edad, tamaño y personalidad para encontrar a tu mascota ideal en nuestra amplia base de datos.",
      icon: <CompassIcon size={24} className="text-secondary" />,
    },
    {
      number: "2",
      title: "2. Conoce",
      description: "Programa una visita o videollamada con el refugio para conocer a tu futuro compañero y asegurar una buena conexión.",
      icon: <HandshakeIcon size={24} className="text-secondary" />,
    },
    {
      number: "3",
      title: "3. Adopta",
      description: "Completa el papeleo de adopción, prepara tu hogar y da la bienvenida a tu nuevo mejor amigo con nuestro soporte.",
      icon: <HomeIcon size={24} className="text-secondary" />,
    },
  ];

  return (
    <section id="how-it-works" className="relative py-16 lg:py-24 bg-surface-container-low/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado de seccion */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-display text-3xl font-bold tracking-tight text-on-surface sm:text-4xl">
            Cómo Funciona
          </h2>
          <p className="mt-4 font-sans text-base leading-relaxed text-on-surface-variant">
            Tu viaje hacia la adopción es simple, seguro y lleno de acompañamiento en cada paso.
          </p>
        </div>

        {/* Cuadricula de pasos */}
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-md shadow-on-surface/5 border border-outline-variant/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-on-surface/10"
            >
              {/* Numero grande flotante del paso */}
              <span className="absolute -top-4 -right-2 font-display text-[120px] font-black text-outline-variant/10 select-none pointer-events-none transition-transform duration-500 group-hover:scale-110 group-hover:-translate-x-2">
                {step.number}
              </span>

              {/* Contenedor de icono */}
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary-container/20 transition-all duration-300 group-hover:scale-110 group-hover:bg-secondary group-hover:text-white">
                <span className="transition-colors duration-300 group-hover:text-white [&_svg]:group-hover:text-white">
                  {step.icon}
                </span>
              </div>

              {/* Titulo y descripcion */}
              <h3 className="mt-8 font-display text-xl font-bold tracking-tight text-on-surface">
                {step.title}
              </h3>
              <p className="mt-3 font-sans text-[15px] leading-relaxed text-on-surface-variant">
                {step.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
