// Типы рыб
export type FishSize = 'small' | 'medium' | 'large';
export type FishRarity = 'common' | 'rare' | 'epic' | 'legendary';

export interface Fish {
  id: string;
  name: string;
  size: FishSize;
  rarity: FishRarity;
  image: string;
  baseChance: number;
  sellPrice: number;
  description: string;
  alreadyHas?: boolean;
}

export interface CaughtFish {
  fishId: string;
  caughtAt: number;
}

// Игрок
export interface Player {
  id?: string;
  username?: string;
  firstName?: string;
  coins: number;
  gems: number;
  energy: number;
  maxEnergy: number;
  level: number;
  experience: number;
  
  aquarium: {
    level: number;
    capacity: number;
    fishes: CaughtFish[];
  };
  
  stats: {
    totalCasts: number;
    totalCatches: number;
    fishByRarity: Record<FishRarity, number>;
  };
  
  equipment: {
    currentRod: string;
    ownedRods: string[];
    currentBait: string | null;
    baitUsesLeft: number;
  };
  
  subscription: {
    active: boolean;
    type: 'monthly' | 'quarterly' | 'lifetime' | null;
    expiresAt: number | null;
  };
  
  lastEnergyRefresh: number;
}

// Удочка
export interface Rod {
  id: string;
  name: string;
  castSpeed: number; // в секундах
  rarityBonus: number; // +% к шансу редкой рыбы
  priceCoins?: number;
  priceGems?: number;
  description: string;
  image: string;
}

// Наживка
export interface Bait {
  id: string;
  name: string;
  effect: string;
  bonus: number; // +% к шансу
  uses: number;
  priceCoins?: number;
  priceGems?: number;
  description: string;
}

// Подписка
export interface Subscription {
  type: 'monthly' | 'quarterly' | 'lifetime';
  priceGems: number;
  energyBonus: number;
  rarityBonus: number;
  duration: number; // в днях
  description: string;
}