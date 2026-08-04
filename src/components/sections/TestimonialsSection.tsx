'use client';

import { Star, Quote, CheckCircle, Award } from 'lucide-react';
import Image from 'next/image';

interface Testimonial {
  id: string;
  author: string;
  role: string;
  avatar: string;
  rating: number;
  date: string;
  source: 'Toit rouge' | 'TripAdvisor' | 'Guide Michelin';
  content: string;
  highlight: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    author: 'Taoré lucie.',
    role: 'Clients réguliers',
    avatar: '/image/avatar1.avif',
    rating: 5,
    date: 'Il y a 2 semaines',
    source: 'Toit rouge',
    highlight: 'Une expérience culinaire inoubliable',
    content: 'Nous avons célébré notre anniversaire de mariage à la Table du Chef. Le service était d’une délicatesse rare et les accords mets-vins proposés par le sommelier étaient tout simplement parfaits.',
  },
  {
    id: '2',
    author: 'Alexandre Gautier',
    role: 'Critique Gastronomique Indépendant',
    avatar: '/image/avatar2.avif',
    rating: 5,
    date: 'Il y a 1 mois',
    source: 'Guide Michelin',
    highlight: 'Raffinement et authenticité',
    content: 'Une cuisine qui honore les produits locaux avec une précision chirurgicale. La cuisson de la pièce de bœuf maturée et la finesse de la sauce au poivre de Sichuan sont mémorables.',
  },
  {
    id: '3',
    author: 'Élodie Dupré',
    role: 'Voyageuse & Epicurienne',
    avatar: '/image/avatar3.avif',
    rating: 5,
    date: 'Il y a 3 jours',
    source: 'TripAdvisor',
    highlight: 'Le cadre en terrasse est magique',
    content: 'Dîner sous les lampions de la terrasse arborée offre une parenthèse enchantée en plein cœur de la ville. Pensez à réserver à l’avance, l’établissement est victime de son succès !',
  },
];

const METRICS = [
  { value: '4.9/5', label: 'Note moyenne sur +500 avis' },
  { value: '98%', label: 'De clients recommandent le lieu' },
  { value: '15k+', label: 'Couverts servis avec passion' },
];

export function TestimonialsSection() {
  return (
    <section id="avis" className="py-24 bg-muted/20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* En-tête */}
        <div className="text-center space-y-4 max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" />
            <span>Témoignages & Avis</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-title font-normal tracking-tight text-foreground">
            Ce que disent nos hôtes
          </h2>

          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            La satisfaction de nos convives est notre plus belle récompense. Découvrez leurs retours d'expérience authentiques.
          </p>
        </div>

        {/* Chiffres clés / Preuve sociale */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-4xl mx-auto">
          {METRICS.map((metric, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-card border border-border/60 text-center shadow-sm space-y-1"
            >
              <div className="text-3xl font-serif-title font-bold text-primary">
                {metric.value}
              </div>
              <div className="text-xs text-muted-foreground font-medium">
                {metric.label}
              </div>
            </div>
          ))}
        </div>

        {/* Grille d'avis */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="flex flex-col justify-between p-8 rounded-2xl bg-card border border-border/60 shadow-sm hover:shadow-md transition-all duration-300 relative group"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-primary/10 group-hover:text-primary/20 transition-colors" />

              <div className="space-y-4">
                {/* Note en étoiles */}
                <div className="flex items-center gap-1">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>

                {/* Titre & Contenu */}
                <div>
                  <h3 className="font-serif-title font-semibold text-foreground text-lg mb-2">
                    "{item.highlight}"
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.content}
                  </p>
                </div>
              </div>

              {/* Auteur & Source */}
              <div className="flex items-center justify-between pt-6 mt-6 border-t border-border/40">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border border-border">
                    <Image
                      src={item.avatar}
                      alt={item.author}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-foreground flex items-center gap-1">
                      {item.author}
                      <CheckCircle className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <div className="text-[11px] text-muted-foreground">
                      {item.role}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="inline-block text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-muted text-muted-foreground">
                    {item.source}
                  </span>
                  <span className="block text-[10px] text-muted-foreground mt-0.5">
                    {item.date}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}