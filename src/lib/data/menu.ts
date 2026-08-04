import { MenuItem } from '@/types';

export const MENU_ITEMS: MenuItem[] = [
  // --- ENTRÉES (Starters) ---
  {
    id: 'starter-1',
    name: 'Foie Gras de Canard Poêlé',
    description: 'Chutney de figues fraîches au vinaigre balsamique séculaire, brioche feuilletée tiède à la fleur de sel.',
    price: 32,
    category: 'starters',
    isChefSpecial: true,
    allergens: ['Gluten', 'Lactose'],
  },
  {
    id: 'starter-2',
    name: 'Carpaccio de Saint-Jacques',
    description: 'Fines lamelles de Saint-Jacques de plongée, huile d\'olive infusée au combawa, caviar d\'Aquitaine.',
    price: 38,
    category: 'starters',
    allergens: ['Mollusques'],
  },
  {
    id: 'starter-3',
    name: 'Velouté de Potimarron & Truffe Noire',
    description: 'Crème fouettée à la noisette du Piémont, chips de topinambour et brisures de truffe Melanosporum.',
    price: 28,
    category: 'starters',
    allergens: ['Lactose', 'Fruits à coque'],
  },

  // --- PLATS PRINCIPAUX (Mains) ---
  {
    id: 'main-1',
    name: 'Filet de Bœuf Rossini',
    description: 'Bœuf d\'Aubrac maturé, escalope de foie gras poêlée, jus réduit à la truffe noire et mousseline de pommes de terre de Noirmoutier.',
    price: 58,
    category: 'mains',
    isChefSpecial: true,
    allergens: ['Lactose'],
  },
  {
    id: 'main-2',
    name: 'Loup de Mer en Croûte d\'Herbes',
    description: 'Pêche sauvage, émulsion au beurre blanc épicé, ragoût de légumes oubliés au thym sauvage.',
    price: 46,
    category: 'mains',
    allergens: ['Poisson', 'Lactose'],
  },
  {
    id: 'main-3',
    name: 'Risotto de Petit Épeautre aux Morilles',
    description: 'Petit épeautre de Haute-Provence, morilles fraîches étuvées au vin jaune, copeaux de Parmesan 36 mois.',
    price: 39,
    category: 'mains',
    allergens: ['Gluten', 'Lactose'],
  },

  // --- DESSERTS (Desserts) ---
  {
    id: 'dessert-1',
    name: 'Soufflé Chaud au Grand Marnier',
    description: 'Soufflé aérien, glace à la vanille de Madagascar et zestes d\'oranges confites.',
    price: 22,
    category: 'desserts',
    isChefSpecial: true,
    allergens: ['Œufs', 'Lactose', 'Gluten'],
  },
  {
    id: 'dessert-2',
    name: 'Sphère Chocolat Grand Cru & Noisette',
    description: 'Chocolat noir 72% Guanaja, cœur coulant au praliné croustillant et sorbet cacao amer.',
    price: 24,
    category: 'desserts',
    allergens: ['Lactose', 'Fruits à coque', 'Gluten'],
  },
  {
    id: 'dessert-3',
    name: 'Mille-Feuille Intense à la Vanille',
    description: 'Pâte feuilletée caramélisée, crème diplomate aux trois vanilles d\'exception (Tahiti, Bourbon, Papouasie).',
    price: 20,
    category: 'desserts',
    allergens: ['Gluten', 'Lactose', 'Œufs'],
  },

  // --- BOISSONS & VINS (Drinks) ---
  {
    id: 'drink-1',
    name: 'Château Margaux Premier Grand Cru Classé (2015)',
    description: 'Vin rouge d\'exception aux notes de cassis, cèdre et violette. Un équilibre parfait.',
    price: 850,
    category: 'drinks',
    isChefSpecial: true,
    allergens: ['Sulfites'],
  },
  {
    id: 'drink-2',
    name: 'Dom Pérignon Vintage Champagne (2013)',
    description: 'Effervescence d\'une grande finesse, arômes de fruits secs et de brioche grillée.',
    price: 340,
    category: 'drinks',
    allergens: ['Sulfites'],
  },
  {
    id: 'drink-3',
    name: 'Meursault Premier Cru "Les Charmes" (2020)',
    description: 'Grand vin blanc de Bourgogne, texture onctueuse, notes de beurre frais et de noisette grillée.',
    price: 190,
    category: 'drinks',
    allergens: ['Sulfites'],
  },
];