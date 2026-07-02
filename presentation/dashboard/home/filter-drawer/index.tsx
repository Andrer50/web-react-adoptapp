'use client';

import { ageFilters, sizeFilters } from '@/modules/pets/features/constants';
import { Filter } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { TypographySmall, TypographyH3 } from '@/components/ui/typography';

interface FiltersDrawerProps {
  selectedSpecies: string[];
  selectedAge: string | null;
  selectedSize: string;
  onResetFilters: () => void;
  onToggleSpecies: (species: string) => void;
  onSelectAge: (age: string) => void;
  onSelectSize: (size: string) => void;
}

export function FiltersDrawer({
  selectedSpecies,
  selectedAge,
  selectedSize,
  onResetFilters,
  onToggleSpecies,
  onSelectAge,
  onSelectSize,
}: FiltersDrawerProps) {
  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button
            variant="secondary"
            className="h-12 flex-1 rounded-xl bg-surface px-4 shadow-sm lg:flex-none border border-border text-foreground font-semibold"
          />
        }
      >
        <Filter size={18} className="text-primary" />
        Filtros
      </SheetTrigger>

      <SheetContent className="bg-surface text-foreground p-0 flex flex-col sm:max-w-md w-full border-l border-border">
        <SheetHeader className="flex flex-row items-center justify-between gap-3 border-b border-border px-6 py-4 mt-0 space-y-0">
          <SheetTitle className="scroll-m-20 text-2xl font-semibold tracking-tight text-foreground">Filtros</SheetTitle>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-primary-container/20 text-primary">
              Catálogo
            </Badge>
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto space-y-7 py-6 px-6">
          <section className="space-y-4">
            <TypographySmall className="block uppercase tracking-[0.22em] text-muted-foreground">Especie</TypographySmall>
            <div className="space-y-3">
              {[
                { id: 'dogs', label: 'Perros' },
                { id: 'cats', label: 'Gatos' },
                { id: 'birds', label: 'Aves' }
              ].map((species) => {
                const id = species.id;
                return (
                  <div key={id} className="flex items-center space-x-2">
                    <Checkbox
                      id={id}
                      checked={selectedSpecies.includes(id)}
                      onCheckedChange={() => onToggleSpecies(id)}
                    />
                    <label
                      htmlFor={id}
                      className="text-sm font-medium leading-none text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {species.label}
                    </label>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="space-y-4">
            <TypographySmall className="block uppercase tracking-[0.22em] text-muted-foreground">Edad</TypographySmall>
            <div className="flex flex-wrap gap-2">
              {ageFilters.map((age) => {
                const selected = selectedAge === age.id;
                return (
                  <Button
                    key={age.id}
                    type="button"
                    size="sm"
                    onClick={() => onSelectAge(age.id)}
                    className={selected ? 'border-primary bg-primary-container/15 text-primary border hover:bg-primary-container/25' : 'border-border bg-surface text-foreground border hover:bg-surface-container'}
                  >
                    {age.label}
                  </Button>
                );
              })}
            </div>
          </section>

          <section className="space-y-4">
            <TypographySmall className="block uppercase tracking-[0.22em] text-muted-foreground">Tamaño</TypographySmall>
            <Select
              value={selectedSize}
              onValueChange={(val: string | null) => {
                onSelectSize(val === null ? 'all' : val);
              }}
            >
              <SelectTrigger className="h-12 w-full rounded-xl border-border bg-surface text-foreground focus:ring-primary shadow-sm">
                <span className="truncate text-left flex-1">
                  {sizeFilters.find((s) => s.id === selectedSize)?.label || 'Seleccionar tamaño'}
                </span>
              </SelectTrigger>
              <SelectContent className="rounded-md border-border">
                {sizeFilters.map((size) => (
                  <SelectItem key={size.id} value={size.id} className="rounded-md focus:bg-primary/10">
                    {size.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </section>
        </div>

        <SheetFooter className="border-t border-border px-6 py-4 sm:justify-start">
          <SheetClose
            render={
              <Button
                type="button"
                variant="outline"
                className="w-full h-12 rounded-xl border-border text-foreground hover:bg-surface-container font-semibold"
                onClick={onResetFilters}
              >
                Restablecer y aplicar
              </Button>
            }
          />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
