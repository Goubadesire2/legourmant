'use client';

import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/sections/Hero';
import { MenuSection } from '@/components/sections/MenuSection';
import { ReservationModal } from '@/components/reservation/ReservationModal';
import { GallerySection } from '@/components/sections/GallerySection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { ChefSection } from '@/components/sections/ChefSection';
import { ReservationDetails } from '@/types';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDetails, setSelectedDetails] = useState<Partial<ReservationDetails>>({});

  // Ouverture classique via la Navbar
  const handleOpenModal = () => {
    setSelectedDetails({});
    setIsModalOpen(true);
  };

  // Ouverture depuis le widget Hero avec pré-remplissage des données (Convives, Date, Heure)
  const handleOpenWithDetails = (details: {
    guests: string;
    date: Date | undefined;
    time: string;
  }) => {
    setSelectedDetails(details);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background font-sans antialiased selection:bg-primary selection:text-primary-foreground">
      {/* Barre de navigation */}
      <Navbar onOpenReservation={handleOpenModal} />

      {/* Contenu principal */}
      <main>
        {/* Section d'accroche principale & widget rapide */}
        <Hero onOpenReservationWithDetails={handleOpenWithDetails} />

        {/* Section Carte & Menu de saison avec filtres Shadcn */}
        <MenuSection />
        <ChefSection />
        <GallerySection />
        <TestimonialsSection />
      </main>

      {/* Pied de page */}
      <footer className="border-t border-border/40 bg-card/40 py-12 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6 text-center text-xs text-muted-foreground">
          <p className="font-serif-title text-base font-semibold text-foreground mb-2">
            LE GOURMANT
          </p>
          <p className="mb-4">12 Rue des start, 75008 Abidjan • 05 00 80 20 28</p>
          <p>© {new Date().getFullYear()} © 2026 Le Gourmand. Tous droits réservés.</p>
        </div>
      </footer>

      {/* Modale de Réservation en 3 étapes */}
      <ReservationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialDetails={selectedDetails}
      />
    </div>
  );
}