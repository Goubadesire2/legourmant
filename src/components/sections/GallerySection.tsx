'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Sparkles, Maximize2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';

interface GalleryItem {
  id: string;
  title: string;
  category: 'salle' | 'terrasse' | 'chef';
  categoryLabel: string;
  imageUrl: string;
  aspect: string; // Pour varier les ratios dans la grille
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: '1',
    title: 'La Grande Salle',
    category: 'salle',
    categoryLabel: 'Grande Salle',
    imageUrl: '/image/resto1.avif',
    aspect: 'aspect-square sm:aspect-[4/3]',
  },
  {
    id: '2',
    title: 'La Table Privée du Chef',
    category: 'chef',
    categoryLabel: 'Cuisine & Chef',
    imageUrl: '/image/resto2.avif',
    aspect: 'aspect-square sm:aspect-[3/4]',
  },
  {
    id: '3',
    title: 'La Terrasse Soirée',
    category: 'terrasse',
    categoryLabel: 'Terrasse',
    imageUrl: '/image/resto3.avif',
    aspect: 'aspect-square sm:aspect-[4/3]',
  },
  {
    id: '4',
    title: 'Dressage & Haute Gastronomie',
    category: 'chef',
    categoryLabel: 'Cuisine & Chef',
    imageUrl: '/image/resto4.avif',
    aspect: 'aspect-square',
  },
  {
    id: '5',
    title: 'Bar & Cocktails Signatures',
    category: 'salle',
    categoryLabel: 'Grande Salle',
    imageUrl: '/image/resto5.avif',
    aspect: 'aspect-square sm:aspect-[4/3]',
  },
  {
    id: '6',
    title: 'Espace Véranda & Jardin',
    category: 'terrasse',
    categoryLabel: 'Terrasse',
    imageUrl: '/image/resto6.avif',
    aspect: 'aspect-square',
  },
];

const CATEGORIES = [
  { id: 'all', label: 'Toutes les vues' },
  { id: 'salle', label: 'Grande Salle' },
  { id: 'terrasse', label: 'Terrasse & Jardin' },
  { id: 'chef', label: 'Cuisine & Chef' },
];

export function GallerySection() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const filteredItems = activeCategory === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <section id="ambiance" className="py-24 bg-background relative overflow-hidden">
      
      {/* Halo lumineux décoratif */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* En-tête de section */}
        <div className="text-center space-y-4 max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>L'Expérience Visuelle</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-title font-normal tracking-tight text-foreground">
            L'Ambiance & Le Décor
          </h2>
          
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Plongez dans l'univers de notre établissement, entre espace feutré, terrasse ombragée et effervescence culinaire.
          </p>
        </div>

        {/* Filtres de catégorie */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {CATEGORIES.map((cat) => (
            <Button
              key={cat.id}
              variant={activeCategory === cat.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveCategory(cat.id)}
              className="rounded-full text-xs font-medium transition-all duration-300"
            >
              {cat.label}
            </Button>
          ))}
        </div>

        {/* Grille de photos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className={`group relative overflow-hidden rounded-2xl border border-border/60 bg-muted/30 cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 ${item.aspect}`}
            >
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Overlay dégradé au survol */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-primary mb-1">
                  {item.categoryLabel}
                </span>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-serif-title text-white font-medium">
                    {item.title}
                  </h3>
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox / Modal d'agrandissement */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-black/95 border-border/20 backdrop-blur-2xl">
          <DialogTitle className="sr-only">
            {selectedImage?.title || 'Agrandissement de la photo'}
          </DialogTitle>
          {selectedImage && (
            <div className="relative w-full h-[75vh] flex items-center justify-center">
              <Image
                src={selectedImage.imageUrl}
                alt={selectedImage.title}
                fill
                className="object-contain"
                priority
              />
              <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black/90 to-transparent text-white flex items-center justify-between">
                <div>
                  <span className="text-xs uppercase tracking-wider text-primary font-medium">
                    {selectedImage.categoryLabel}
                  </span>
                  <h3 className="text-xl font-serif-title font-medium mt-0.5">
                    {selectedImage.title}
                  </h3>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedImage(null)}
                  className="text-white hover:bg-white/20 rounded-full"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

    </section>
  );
}