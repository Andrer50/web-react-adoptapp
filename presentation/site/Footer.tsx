import React from "react";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-outline-variant/10 bg-surface py-12 mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          
          {/* Columna izquierda: detalles de marca */}
          <div className="flex flex-col gap-2">
            <span className="font-display text-lg font-bold text-on-surface">
              Adopt<span className="text-primary font-extrabold">App</span>
            </span>
            <p className="font-sans text-xs font-semibold text-on-surface-variant">
              &copy; {currentYear} AdoptApp. Dedicados a la compania con proposito.
            </p>
          </div>

          {/* Columna derecha: enlaces */}
          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <a
              href="#"
              className="font-sans text-xs font-bold text-on-surface-variant hover:text-primary transition-colors"
            >
              Sobre Nosotros
            </a>
            <a
              href="#"
              className="font-sans text-xs font-bold text-on-surface-variant hover:text-primary transition-colors"
            >
              Contactar Soporte
            </a>
            <a
              href="#"
              className="font-sans text-xs font-bold text-on-surface-variant hover:text-primary transition-colors"
            >
              Politica de Privacidad
            </a>
            <a
              href="#"
              className="font-sans text-xs font-bold text-on-surface-variant hover:text-primary transition-colors"
            >
              Terminos del Servicio
            </a>
          </nav>

        </div>
      </div>
    </footer>
  );
};
