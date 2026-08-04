'use client';

import Link from 'next/link';
import { UtensilsCrossed, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavbarProps {
  onOpenReservation?: () => void;
}

export function Navbar({ onOpenReservation }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        
        {/* Brand / Logo */}
        <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-90">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-primary">
            <UtensilsCrossed className="h-5 w-5" />
          </div>
          <span className="font-serif-title text-xl font-bold tracking-widest text-foreground">
            L&apos;ÉPICURIEN
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden items-center gap-8 text-sm font-medium tracking-wide text-muted-foreground md:flex">
          <Link href="#menu" className="transition-colors hover:text-primary">
            La Carte
          </Link>
          <Link href="#ambiance" className="transition-colors hover:text-primary">
            L&apos;Ambiance
          </Link>
          <Link href="#chef" className="transition-colors hover:text-primary">
            Le Chef
          </Link>
          <Link href="#contact" className="transition-colors hover:text-primary">
            Contact
          </Link>
        </nav>

        {/* Action Button */}
        <Button
          onClick={onOpenReservation}
          className="gap-2 rounded-full font-semibold uppercase tracking-wider shadow-lg shadow-primary/20"
        >
          <Calendar className="h-4 w-4" />
          Réserver une table
        </Button>

      </div>
    </header>
  );
}