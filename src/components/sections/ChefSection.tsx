'use client';

import Image from 'next/image';
import { ChefHat, Award, Heart, UtensilsCrossed } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const VALUES = [
  {
    icon: Award,
    title: 'Excellence & Rigueur',
    description: 'Une recherche constante de la perfection dans le geste, la cuisson et le dressage.',
  },
  {
    icon: Heart,
    title: 'Produits du Terroir',
    description: 'Partenariats directs avec des producteurs et maraîchers locaux passionnés.',
  },
  {
    icon: UtensilsCrossed,
    title: 'Tradition & Modernité',
    description: 'Une cuisine ancrée dans la tradition française, réinventée avec audace.',
  },
];

export function ChefSection() {
  return (
    <section id="chef" className="py-24 bg-card/30 relative overflow-hidden">
      
      {/* Halo lumineux décoratif */}
      <div className="absolute top-1/2 -right-40 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Colonne Gauche : Composition d'images */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Image Principale (Le Chef) */}
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-border/60 shadow-2xl">
                <Image
                  src="/image/chef.avif"
                  alt="Le Chef en cuisine"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>

              {/* Badge flottant d'expérience */}
              <div className="absolute -bottom-6 -right-4 sm:right-4 bg-background/90 backdrop-blur-md border border-primary/30 p-5 rounded-2xl shadow-xl space-y-1">
                <div className="text-3xl font-serif-title font-bold text-primary">
                  15+ ans
                </div>
                <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                  D&apos;Excellence Culinaire
                </div>
              </div>

              {/* Petit élément décoratif au dos */}
              <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-primary/40 rounded-tl-2xl pointer-events-none" />
            </div>
          </div>

          {/* Colonne Droite : Histoire & Philosophie */}
          <div className="lg:col-span-7 space-y-8">
            
            <div className="space-y-4">
              <Badge variant="outline" className="border-primary/40 text-primary px-4 py-1 rounded-full text-xs font-semibold tracking-widest uppercase gap-1.5">
                <ChefHat className="w-3.5 h-3.5" />
                L&apos;Ame de notre cuisine
              </Badge>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-title font-normal text-foreground leading-tight">
                Une passion transmise au fil des <span className="gold-gradient italic font-serif-title">saisons</span>
              </h2>

              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                Formé auprès des plus grands noms de la gastronomie française, notre Chef conçoit chaque assiette comme un hommage aux produits de saison. Sa philosophie ? sublimer le goût authentique des ingrédients bruts sans jamais les dénaturer.
              </p>
            </div>

            {/* Citation du Chef */}
            <blockquote className="p-6 rounded-2xl bg-muted/30 border-l-4 border-primary relative space-y-2">
              <p className="font-serif-title text-base sm:text-lg italic text-foreground leading-snug">
                « La cuisine n’est pas une démonstration de technique, c’est un acte de partage et une émotion gustative pure. »
              </p>
              <footer className="text-xs font-semibold uppercase tracking-wider text-primary">
                — Le Chef & Sa Brigade
              </footer>
            </blockquote>

            {/* Grille des piliers / valeurs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
              {VALUES.map((val, idx) => {
                const Icon = val.icon;
                return (
                  <div key={idx} className="space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-serif-title text-sm font-semibold text-foreground">
                      {val.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {val.description}
                    </p>
                  </div>
                );
              })}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}