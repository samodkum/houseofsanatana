export interface PoojaKitItem {
  name: string;
  significance: string;
  origin: string;
  icon?: string;
}

export interface PoojaKit {
  id: string;
  title: string;
  subtitle: string;
  category: 'daily' | 'festival' | 'havan' | 'meditation' | 'protection' | string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewsCount: number;
  image: string;
  badge?: string;
  consecratedAt?: string;
  shortDesc: string;
  itemsIncluded: PoojaKitItem[];
  idealFor: string;
  weightGrams?: number;
  variantId?: string;
}

export interface YatraDayPlan {
  day: number;
  title: string;
  description: string;
  stay: string;
}

export interface YatraPackage {
  id: string;
  title: string;
  subtitle: string;
  shortDesc?: string;
  circuit: 'himalayas' | 'jyotirlinga' | 'heritage' | 'ganga' | 'east' | 'shaktipeeth' | 'braj' | string;
  durationDays: number;
  durationNights: number;
  pricePerPerson: number;
  price?: string | number;
  rating: number;
  reviewsCount: number;
  image: string;
  badge?: string;
  startLocation: string;
  nextBatches: string[];
  inclusions: string[];
  itinerary: YatraDayPlan[];
  highlights: string[];
  variantId?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  role?: string;
  type: 'kit' | 'yatra';
  rating: number;
  date: string;
  comment: string;
  productOrTripTitle: string;
  avatar?: string;
}

export interface CartItem {
  kit: PoojaKit;
  quantity: number;
}
