"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSession, signOut } from "next-auth/react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { PawIcon, SearchIcon } from "./Icons";
import Link from "next/link";

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { data: session, status } = useSession();

  const isAuthenticated = status === "authenticated";
  const user = session?.user;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const initial = user?.name ? user.name.charAt(0).toUpperCase() : "U";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-outline-variant/10 bg-surface/80 backdrop-blur-md transition-all duration-300">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo de marca */}
        <Link
          href="/"
          className="group flex items-center gap-2 font-display text-2xl font-bold text-on-surface transition-colors hover:text-primary"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
            <PawIcon size={22} />
          </div>
          <span className="tracking-tight">
            Adopt<span className="text-primary font-extrabold">App</span>
          </span>
        </Link>

        {/* Navegacion de escritorio */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/catalog"
            className="font-sans text-[15px] font-semibold text-on-surface-variant hover:text-primary transition-colors"
          >
            Catalogo
          </Link>
          <Link
            href="#"
            className="font-sans text-[15px] font-semibold text-on-surface-variant hover:text-primary transition-colors"
          >
            Mis Mascotas
          </Link>
          <Link
            href="/post-pet"
            className="font-sans text-[15px] font-semibold text-on-surface-variant hover:text-primary transition-colors"
          >
            Publicar Mascota
          </Link>
          <Link
            href="/admin"
            className="font-sans text-[15px] font-semibold text-on-surface-variant hover:text-primary transition-colors"
          >
            Panel Admin
          </Link>
        </nav>

        {/* Acciones de escritorio */}
        <div className="hidden md:flex items-center gap-5">
          <button
            aria-label="Buscar"
            className="flex h-10 w-10 items-center justify-center rounded-full text-on-surface-variant hover:bg-outline-variant/10 hover:text-primary transition-all duration-300"
          >
            <SearchIcon size={20} />
          </button>
          {isAuthenticated ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 rounded-full border border-outline-variant/30 p-1.5 pr-4 hover:bg-surface-container-low transition-all duration-200 cursor-pointer shadow-sm bg-surface"
              >
                <Avatar size="sm" className="bg-primary/10 text-primary font-bold">
                  <AvatarFallback>{initial}</AvatarFallback>
                </Avatar>
                <span className="text-sm font-bold text-on-surface select-none">
                  {user?.name?.split(' ')[0]}
                </span>
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-2xl border border-border bg-surface p-2 shadow-lg ring-1 ring-foreground/5 z-50">
                  <Link
                    href={user?.role === 'ADMIN' ? '/admin' : '/dashboard/home'}
                    className="flex w-full items-center rounded-xl px-3.5 py-2.5 text-sm text-foreground hover:bg-surface-container font-semibold transition-colors"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    {user?.role === 'ADMIN' ? 'Panel Admin' : 'Mi Panel'}
                  </Link>
                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      signOut({ callbackUrl: '/' });
                    }}
                    className="flex w-full items-center rounded-xl px-3.5 py-2.5 text-sm text-destructive hover:bg-red-50 dark:hover:bg-red-950/20 font-bold transition-colors cursor-pointer"
                  >
                    Cerrar Sesión
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="inline-flex h-11 items-center justify-center rounded-full bg-primary px-6 font-sans text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:bg-primary-hover hover:shadow-primary-hover/30 hover:-translate-y-0.5 active:translate-y-0"
            >
              Iniciar Sesion
            </Link>
          )}
        </div>

        {/* Menu movil / Acciones */}
        <div className="flex md:hidden items-center gap-3">
          <button
            aria-label="Buscar"
            className="flex h-10 w-10 items-center justify-center rounded-full text-on-surface-variant hover:bg-outline-variant/10 hover:text-primary transition-all"
          >
            <SearchIcon size={20} />
          </button>
          
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full text-on-surface hover:bg-outline-variant/10 transition-all"
            aria-expanded={isMobileMenuOpen}
            aria-label="Alternar menu de navegacion"
          >
            <span
              className={`h-0.5 w-5 bg-current rounded-full transition-transform duration-300 ${
                isMobileMenuOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`h-0.5 w-5 bg-current rounded-full transition-opacity duration-300 ${
                isMobileMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-0.5 w-5 bg-current rounded-full transition-transform duration-300 ${
                isMobileMenuOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Panel de menu movil */}
      <div
        className={`fixed inset-x-0 top-20 z-40 md:hidden border-b border-outline-variant/10 bg-surface shadow-xl transition-all duration-300 ease-in-out origin-top ${
          isMobileMenuOpen
            ? "translate-y-0 opacity-100 scale-y-100 visible"
            : "-translate-y-4 opacity-0 scale-y-95 invisible"
        }`}
      >
        <div className="space-y-1 px-4 pb-6 pt-3">
          <a
            href="#"
            className="block rounded-lg px-3 py-2 text-base font-semibold text-on-surface-variant hover:bg-primary/5 hover:text-primary transition-all"
          >
            Catalogo
          </a>
          <a
            href="#"
            className="block rounded-lg px-3 py-2 text-base font-semibold text-on-surface-variant hover:bg-primary/5 hover:text-primary transition-all"
          >
            Mis Mascotas
          </a>
          <a
            href="#"
            className="block rounded-lg px-3 py-2 text-base font-semibold text-on-surface-variant hover:bg-primary/5 hover:text-primary transition-all"
          >
            Publicar Mascota
          </a>
          <a
            href="#"
            className="block rounded-lg px-3 py-2 text-base font-semibold text-on-surface-variant hover:bg-primary/5 hover:text-primary transition-all"
          >
            Panel Admin
          </a>
          {isAuthenticated ? (
            <div className="space-y-2 pt-3 border-t border-outline-variant/10 mt-4">
              <div className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Sesión: {user?.name}
              </div>
              <Link
                href={user?.role === 'ADMIN' ? '/admin' : '/dashboard/home'}
                className="block rounded-lg px-3 py-2 text-base font-semibold text-on-surface-variant hover:bg-primary/5 hover:text-primary transition-all"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {user?.role === 'ADMIN' ? 'Panel Admin' : 'Mi Panel'}
              </Link>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  signOut({ callbackUrl: '/' });
                }}
                className="flex w-full items-center justify-center h-11 rounded-full border border-destructive text-destructive font-sans text-sm font-bold hover:bg-red-50 dark:hover:bg-red-950/20 transition-all cursor-pointer"
              >
                Cerrar Sesión
              </button>
            </div>
          ) : (
            <div className="mt-4 border-t border-outline-variant/10 pt-4">
              <Link
                href="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex w-full h-11 items-center justify-center rounded-full bg-primary font-sans text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-hover"
              >
                Iniciar Sesion
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
