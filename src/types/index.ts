export type MenuCategory = 'starters' | 'mains' | 'desserts' | 'drinks';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: MenuCategory;
  isChefSpecial?: boolean;
  allergens?: string[];
  imageUrl?: string;
}

export interface ReservationDetails {
  guests: string;
  date: Date | undefined;
  time: string;
  zone?: string;
  fullName?: string;
  email?: string;
  phone?: string;
  specialRequests?: string;
}