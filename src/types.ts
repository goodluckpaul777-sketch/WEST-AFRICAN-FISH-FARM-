export enum WaterType {
  Freshwater = "Freshwater",
  Marine = "Marine",
  Brackish = "Brackish",
}

export enum Temperament {
  Peaceful = "Peaceful",
  SemiAggressive = "Semi-Aggressive",
  Aggressive = "Aggressive",
}

export enum CareLevel {
  Easy = "Easy",
  Moderate = "Moderate",
  Expert = "Expert",
}

export enum StockStatus {
  InStock = "In Stock",
  LowStock = "Low Stock",
  OutOfStock = "Out of Stock",
  ComingSoon = "Coming Soon",
}

export interface FishSpecies {
  id: string;
  name: string;
  scientificName: string;
  price?: number;
  waterType: WaterType;
  temperament: Temperament;
  careLevel: CareLevel;
  minTankSize: number; // in gallons
  diet: string;
  tempRange: string; // e.g., "75-82°F"
  phRange: string; // e.g., "6.0-7.5"
  status: StockStatus;
  description: string;
  origin: string;
  image: string;
  isFeatured?: boolean;
}

export interface CartItem {
  species: FishSpecies;
  quantity: number;
}

export interface ContactInquiry {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface CustomOrder {
  name: string;
  email: string;
  fishRequested: string;
  aquariumDetails: string;
  budget?: string;
  notes?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  readTime: string;
  category: string;
  image: string;
}

export type TabType = "home" | "livestock" | "about" | "contact" | "terms" | "gallery";
