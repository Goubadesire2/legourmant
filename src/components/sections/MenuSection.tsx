'use client';

import { Sparkles, Utensils, Wine, Cake, Apple, Leaf, AlertCircle } from 'lucide-react';
import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MENU_ITEMS } from '@/lib/data/menu';
import { MenuItem, MenuCategory } from '@/types';

export function MenuSection() {
  const categories: { id: MenuCategory; label: string; icon: any }[] = [
    { id: 'starters', label: 'Entrées', icon: Apple },
    { id: 'mains', label: 'Plats Principaux', icon: Utensils },
    { id: 'desserts', label: 'Desserts', icon: Cake },
    { id: 'drinks', label: 'Vins & Bouteilles', icon: Wine },
  ];

  const getCategoryItems = (category: MenuCategory) => {
    return MENU_ITEMS.filter((item) => item.category === category);
  };

  return (
    <section id="menu" className="py-24 bg-background relative overflow-hidden">
      
      {/* Halo lumineux en arrière-plan */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* En-tête */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <Badge variant="outline" className="border-primary/40 text-primary px-4 py-1 rounded-full text-xs font-semibold tracking-widest uppercase">
            Savoir-Faire & Gastronomie
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-serif-title font-normal text-foreground">
            La Carte de <span className="gold-gradient italic font-serif-title">Saison</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base font-light leading-relaxed">
            Une sélection rigoureuse d'ingrédients nobles travaillés avec précision par notre Chef et sa brigade.
          </p>
        </div>

        {/* Encadré d'appel : Menu Dégustation */}
        <div className="mb-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-primary font-bold">
              <Sparkles className="w-3.5 h-3.5" /> Formule Privilège
            </div>
            <h3 className="text-2xl font-serif-title font-medium text-foreground">
              Menu Dégustation en 5 Temps
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Un voyage culinaire orchestré par le Chef avec accord mets & vins en option.
            </p>
          </div>
          <div className="text-right shrink-0">
            <span className="text-3xl font-serif-title font-bold text-primary">68 €</span>
            <span className="block text-[10px] text-muted-foreground uppercase tracking-wider">Par personne</span>
          </div>
        </div>

        {/* Tabs Onglets */}
        <Tabs defaultValue="starters" className="w-full">
          
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto p-1.5 bg-card/60 border border-border/50 backdrop-blur-md rounded-2xl mb-12 max-w-3xl mx-auto">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <TabsTrigger
                  key={cat.id}
                  value={cat.id}
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-medium tracking-wide transition-all data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg"
                >
                  <Icon className="w-4 h-4" />
                  <span>{cat.label}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {/* Grille des plats */}
          {categories.map((cat) => (
            <TabsContent key={cat.id} value={cat.id} className="focus-visible:outline-none">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {getCategoryItems(cat.id).map((item) => (
                  <MenuItemCard key={item.id} item={item} />
                ))}
              </div>
            </TabsContent>
          ))}

        </Tabs>

        {/* Note légale / allergènes */}
        <div className="mt-16 text-center text-xs text-muted-foreground italic border-t border-border/30 pt-8 flex items-center justify-center gap-2 flex-wrap">
          <AlertCircle className="w-3.5 h-3.5 text-primary" />
          <span>
            Nos viandes sont d&apos;origine française contrôlée. Prix nets en euros, service compris. N&apos;hésitez pas à informer notre équipe de vos allergies.
          </span>
        </div>

      </div>
    </section>
  );
}

function MenuItemCard({ item }: { item: MenuItem & { image?: string; isVegetarian?: boolean } }) {
  return (
    <Card className="bg-card/40 border-border/40 backdrop-blur-sm hover:border-primary/40 transition-all duration-300 group overflow-hidden">
      <CardContent className="p-6">
        <div className="flex gap-4 items-start">
          
          {/* Image du plat (si disponible) */}
          {item.image && (
            <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-border/60">
              <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
          )}

          <div className="flex-1 min-w-0">
            {/* Ligne En-tête : Titre + Ligne pointillée + Prix */}
            <div className="flex items-baseline justify-between gap-2 mb-2">
              <div className="flex items-center gap-2 flex-wrap min-w-0">
                <h3 className="text-lg font-serif-title font-medium text-foreground group-hover:text-primary transition-colors truncate">
                  {item.name}
                </h3>
                {item.isChefSpecial && (
                  <Badge className="bg-primary/20 text-primary border-primary/30 text-[10px] px-2 py-0.5 gap-1 rounded-md shrink-0">
                    <Sparkles className="w-3 h-3" /> Signature
                  </Badge>
                )}
                {item.isVegetarian && (
                  <Badge variant="outline" className="text-emerald-500 border-emerald-500/30 text-[10px] px-1.5 py-0.2 gap-1 rounded-md shrink-0">
                    <Leaf className="w-2.5 h-2.5" /> Végétarien
                  </Badge>
                )}
              </div>

              {/* Ligne pointillés style menu chic */}
              <div className="hidden sm:block flex-1 border-b border-dotted border-border/60 mx-2" />

              <div className="text-lg font-bold text-primary font-serif-title whitespace-nowrap">
                {item.price} €
              </div>
            </div>

            <p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed mb-3">
              {item.description}
            </p>

            {/* Allergènes */}
            {item.allergens && item.allergens.length > 0 && (
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground/60 font-semibold">
                  Allergènes :
                </span>
                {item.allergens.map((allergen, idx) => (
                  <span key={idx} className="text-[10px] text-muted-foreground/80 bg-muted/40 px-2 py-0.5 rounded-md border border-border/20">
                    {allergen}
                  </span>
                ))}
              </div>
            )}
          </div>

        </div>
      </CardContent>
    </Card>
  );
}