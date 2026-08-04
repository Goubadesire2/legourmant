'use client';

import { useState } from 'react';
import { Calendar as CalendarIcon, Users, Clock, Award, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';


interface HeroProps {
  onOpenReservationWithDetails?: (details: {
    guests: string;
    date: Date | undefined;
    time: string;
  }) => void;
}

export function Hero({ onOpenReservationWithDetails }: HeroProps) {
  const [guests, setGuests] = useState<string>('2');
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState<string>('20:00');

  const handleSearch = () => {
    if (onOpenReservationWithDetails) {
      onOpenReservationWithDetails({ guests, date, time });
    }
  };

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center pt-12 pb-20 overflow-hidden">
      {/* Arrière-plan subtil avec halo lumineux */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-background to-background" />

      <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
        
        {/* Badge Distinction */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold tracking-widest uppercase mb-8">
          <Award className="w-4 h-4" />
          <span>Haute Gastronomie • 3 Étoiles</span>
        </div>

        {/* Titre Principal */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif-title font-normal tracking-tight text-foreground mb-6 leading-tight">
          Une expérience gustative <br />
          <span className="gold-gradient italic font-serif-title">
            inoubliable & raffinée
          </span>
        </h1>

        {/* Sous-titre */}
        <p className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light leading-relaxed">
          Sublimez vos moments d&apos;exception. Découvrez une cuisine créative où chaque plat raconte une histoire de passion et de terroir.
        </p>

        {/* Widget de Recherche & Réservation Rapide */}
        <div className="max-w-3xl mx-auto rounded-2xl border border-border/60 bg-card/80 p-4 md:p-6 backdrop-blur-xl shadow-2xl">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            
            {/* 1. Nombre de convives */}
            <div className="flex flex-col text-left space-y-1.5">
              <label className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-primary" /> Convives
              </label>
              <Select value={guests} onValueChange={(val) => setGuests(val || '')}>
                <SelectTrigger className="w-full bg-background/50 border-border/50">
                  <SelectValue placeholder="Nombre de personnes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Personne</SelectItem>
                  <SelectItem value="2">2 Personnes</SelectItem>
                  <SelectItem value="3">3 Personnes</SelectItem>
                  <SelectItem value="4">4 Personnes</SelectItem>
                  <SelectItem value="5">5 Personnes</SelectItem>
                  <SelectItem value="6">6 Personnes et +</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* 2. Date avec Popover + Calendar shadcn */}
            <div className="flex flex-col text-left space-y-1.5">
              <label className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <CalendarIcon className="w-3.5 h-3.5 text-primary" /> Date
              </label>
              <Popover>
                <PopoverTrigger>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal bg-background/50 border-border/50"
                  >
                    {date ? (
                      date.toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })
                    ) : (
                      <span>Choisir une date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* 3. Choix de l'horaire */}
            <div className="flex flex-col text-left space-y-1.5">
              <label className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-primary" /> Service
              </label>
              <Select value={time} onValueChange={(val) => setGuests(val || '')}>
                <SelectTrigger className="w-full bg-background/50 border-border/50">
                  <SelectValue placeholder="Choisir l'heure" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="12:30">12:30 - Déjeuner</SelectItem>
                  <SelectItem value="13:00">13:00 - Déjeuner</SelectItem>
                  <SelectItem value="19:30">19:30 - Dîner</SelectItem>
                  <SelectItem value="20:00">20:00 - Dîner</SelectItem>
                  <SelectItem value="21:00">21:00 - Dîner</SelectItem>
                </SelectContent>
              </Select>
            </div>

          </div>

          <Button
            onClick={handleSearch}
            className="w-full py-6 font-bold uppercase tracking-wider text-xs sm:text-sm rounded-xl gap-2 shadow-lg shadow-primary/25"
          >
            <Sparkles className="w-4 h-4" />
            Trouver une table disponible
          </Button>
        </div>

      </div>
    </section>
  );
}