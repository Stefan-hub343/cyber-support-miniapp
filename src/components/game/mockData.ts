import { Fish, Rod, Bait, Player, Subscription } from './types';

// Каталог рыб
export const FISH_CATALOG: Fish[] = [
  // Маленькие - Обычные
  {
    id: 'small_common_1',
    name: 'Плотва',
    size: 'small',
    rarity: 'common',
    image: '🐟',
    baseChance: 0.6,
    sellPrice: 10,
    description: 'Обычная речная рыбка'
  },
  {
    id: 'small_common_2',
    name: 'Уклейка',
    size: 'small',
    rarity: 'common',
    image: '🐟',
    baseChance: 0.6,
    sellPrice: 8,
    description: 'Маленькая юркая рыбка'
  },
  {
    id: 'small_common_3',
    name: 'Пескарь',
    size: 'small',
    rarity: 'common',
    image: '🐟',
    baseChance: 0.6,
    sellPrice: 12,
    description: 'Донная рыбка'
  },

  // Маленькие - Редкие
  {
    id: 'small_rare_1',
    name: 'Золотая плотва',
    size: 'small',
    rarity: 'rare',
    image: '🌟',
    baseChance: 0.25,
    sellPrice: 50,
    description: 'Блестит как золото'
  },
  {
    id: 'small_rare_2',
    name: 'Радужная уклейка',
    size: 'small',
    rarity: 'rare',
    image: '🌟',
    baseChance: 0.25,
    sellPrice: 55,
    description: 'Переливается всеми цветами'
  },
  {
    id: 'small_rare_3',
    name: 'Серебряный пескарь',
    size: 'small',
    rarity: 'rare',
    image: '🌟',
    baseChance: 0.25,
    sellPrice: 45,
    description: 'Серебристая чешуя'
  },

  // Маленькие - Эпические
  {
    id: 'small_epic_1',
    name: 'Неоновая тетра',
    size: 'small',
    rarity: 'epic',
    image: '💎',
    baseChance: 0.12,
    sellPrice: 200,
    description: 'Светится в темноте'
  },
  {
    id: 'small_epic_2',
    name: 'Голографический гуппи',
    size: 'small',
    rarity: 'epic',
    image: '💎',
    baseChance: 0.12,
    sellPrice: 220,
    description: 'Создает голограммы'
  },
  {
    id: 'small_epic_3',
    name: 'Плазменный данио',
    size: 'small',
    rarity: 'epic',
    image: '💎',
    baseChance: 0.12,
    sellPrice: 180,
    description: 'Искрится плазмой'
  },

  // Маленькие - Легендарные
  {
    id: 'small_legendary_1',
    name: 'Кибер-гуппи',
    size: 'small',
    rarity: 'legendary',
    image: '👑',
    baseChance: 0.03,
    sellPrice: 1000,
    description: 'Легендарная кибер-рыбка'
  },
  {
    id: 'small_legendary_2',
    name: 'Квантовая тетра',
    size: 'small',
    rarity: 'legendary',
    image: '👑',
    baseChance: 0.03,
    sellPrice: 1200,
    description: 'Существует в двух местах одновременно'
  },
  {
    id: 'small_legendary_3',
    name: 'Сингулярный данио',
    size: 'small',
    rarity: 'legendary',
    image: '👑',
    baseChance: 0.03,
    sellPrice: 1100,
    description: 'Притягивает все вокруг'
  },

  // Средние - Обычные
  {
    id: 'medium_common_1',
    name: 'Окунь',
    size: 'medium',
    rarity: 'common',
    image: '🐠',
    baseChance: 0.6,
    sellPrice: 25,
    description: 'Полосатый хищник'
  },
  {
    id: 'medium_common_2',
    name: 'Плотва крупная',
    size: 'medium',
    rarity: 'common',
    image: '🐠',
    baseChance: 0.6,
    sellPrice: 30,
    description: 'Крупная плотва'
  },
  {
    id: 'medium_common_3',
    name: 'Густера',
    size: 'medium',
    rarity: 'common',
    image: '🐠',
    baseChance: 0.6,
    sellPrice: 28,
    description: 'Похожа на подлещика'
  },

  // Средние - Редкие
  {
    id: 'medium_rare_1',
    name: 'Зеркальный карп',
    size: 'medium',
    rarity: 'rare',
    image: '🌟',
    baseChance: 0.25,
    sellPrice: 100,
    description: 'Чешуя как зеркало'
  },
  {
    id: 'medium_rare_2',
    name: 'Янтарный окунь',
    size: 'medium',
    rarity: 'rare',
    image: '🌟',
    baseChance: 0.25,
    sellPrice: 90,
    description: 'Прозрачный как янтарь'
  },
  {
    id: 'medium_rare_3',
    name: 'Жемчужный лещ',
    size: 'medium',
    rarity: 'rare',
    image: '🌟',
    baseChance: 0.25,
    sellPrice: 95,
    description: 'Чешуя как жемчуг'
  },

  // Средние - Эпические
  {
    id: 'medium_epic_1',
    name: 'Голографический сом',
    size: 'medium',
    rarity: 'epic',
    image: '💎',
    baseChance: 0.12,
    sellPrice: 400,
    description: 'Переливается всеми цветами'
  },
  {
    id: 'medium_epic_2',
    name: 'Неоновый карп',
    size: 'medium',
    rarity: 'epic',
    image: '💎',
    baseChance: 0.12,
    sellPrice: 380,
    description: 'Светится в темноте'
  },
  {
    id: 'medium_epic_3',
    name: 'Плазменный окунь',
    size: 'medium',
    rarity: 'epic',
    image: '💎',
    baseChance: 0.12,
    sellPrice: 420,
    description: 'Плазменные разряды'
  },

  // Средние - Легендарные
  {
    id: 'medium_legendary_1',
    name: 'Телепорт-щука',
    size: 'medium',
    rarity: 'legendary',
    image: '👑',
    baseChance: 0.03,
    sellPrice: 2000,
    description: 'Может телепортироваться в аквариум'
  },
  {
    id: 'medium_legendary_2',
    name: 'Кибер-карп',
    size: 'medium',
    rarity: 'legendary',
    image: '👑',
    baseChance: 0.03,
    sellPrice: 2200,
    description: 'Кибернетический карп'
  },
  {
    id: 'medium_legendary_3',
    name: 'Хроно-щука',
    size: 'medium',
    rarity: 'legendary',
    image: '👑',
    baseChance: 0.03,
    sellPrice: 2100,
    description: 'Путешествует во времени'
  },

  // Крупные - Обычные
  {
    id: 'large_common_1',
    name: 'Сом',
    size: 'large',
    rarity: 'common',
    image: '🐡',
    baseChance: 0.6,
    sellPrice: 50,
    description: 'Усатый великан'
  },
  {
    id: 'large_common_2',
    name: 'Сазан',
    size: 'large',
    rarity: 'common',
    image: '🐡',
    baseChance: 0.6,
    sellPrice: 55,
    description: 'Крупный карп'
  },
  {
    id: 'large_common_3',
    name: 'Щука',
    size: 'large',
    rarity: 'common',
    image: '🐡',
    baseChance: 0.6,
    sellPrice: 60,
    description: 'Зубастый хищник'
  },

  // Крупные - Редкие
  {
    id: 'large_rare_1',
    name: 'Тигровая форель',
    size: 'large',
    rarity: 'rare',
    image: '🌟',
    baseChance: 0.25,
    sellPrice: 200,
    description: 'В полоску как тигр'
  },
  {
    id: 'large_rare_2',
    name: 'Мраморный сом',
    size: 'large',
    rarity: 'rare',
    image: '🌟',
    baseChance: 0.25,
    sellPrice: 220,
    description: 'Рисунок как мрамор'
  },
  {
    id: 'large_rare_3',
    name: 'Зеркальный сазан',
    size: 'large',
    rarity: 'rare',
    image: '🌟',
    baseChance: 0.25,
    sellPrice: 210,
    description: 'Чешуя как зеркала'
  },

  // Крупные - Эпические
  {
    id: 'large_epic_1',
    name: 'Светящийся осетр',
    size: 'large',
    rarity: 'epic',
    image: '💎',
    baseChance: 0.12,
    sellPrice: 800,
    description: 'Осетр с неоновой подсветкой'
  },
  {
    id: 'large_epic_2',
    name: 'Голографический сом',
    size: 'large',
    rarity: 'epic',
    image: '💎',
    baseChance: 0.12,
    sellPrice: 850,
    description: 'Создает голограммы'
  },
  {
    id: 'large_epic_3',
    name: 'Плазменный осетр',
    size: 'large',
    rarity: 'epic',
    image: '💎',
    baseChance: 0.12,
    sellPrice: 820,
    description: 'Плазменные разряды'
  },

  // Крупные - Легендарные
  {
    id: 'large_legendary_1',
    name: 'Кибер-акула',
    size: 'large',
    rarity: 'legendary',
    image: '🦈',
    baseChance: 0.03,
    sellPrice: 5000,
    description: 'Самая редкая рыба в игре'
  },
  {
    id: 'large_legendary_2',
    name: 'Квантовый осетр',
    size: 'large',
    rarity: 'legendary',
    image: '👑',
    baseChance: 0.03,
    sellPrice: 5500,
    description: 'Существует в квантовой суперпозиции'
  },
  {
    id: 'large_legendary_3',
    name: 'Сингулярный сом',
    size: 'large',
    rarity: 'legendary',
    image: '👑',
    baseChance: 0.03,
    sellPrice: 5200,
    description: 'Создает черные дыры'
  }
];

// Удочки
export const RODS: Rod[] = [
  {
    id: 'starter_rod',
    name: 'Начальная удочка',
    castSpeed: 2,
    rarityBonus: 0,
    priceCoins: 0,
    description: 'С чего-то надо начинать',
    image: '🎣'
  },
  {
    id: 'carbon_rod',
    name: 'Карбоновая удочка',
    castSpeed: 1.5,
    rarityBonus: 2,
    priceCoins: 1000,
    description: 'Легкая и быстрая',
    image: '🎣✨'
  },
  {
    id: 'neon_rod',
    name: 'Неоновая удочка',
    castSpeed: 1,
    rarityBonus: 5,
    priceCoins: 5000,
    description: 'Светится в темноте, привлекая редкую рыбу',
    image: '🎣💫'
  },
  {
    id: 'cyber_rod',
    name: 'Кибер-спиннинг',
    castSpeed: 0.7,
    rarityBonus: 10,
    priceGems: 50,
    description: 'Высокотехнологичная удочка',
    image: '🎣⚡'
  },
  {
    id: 'legendary_rod',
    name: 'Легендарная удочка',
    castSpeed: 0.5,
    rarityBonus: 20,
    priceGems: 200,
    description: 'Удочка из другого измерения',
    image: '🎣👑'
  }
];

// Наживка
export const BAITS: Bait[] = [
  {
    id: 'worm',
    name: 'Червячок',
    effect: '+3% к шансу редкой рыбы',
    bonus: 3,
    uses: 10,
    priceCoins: 100,
    description: 'Классическая наживка'
  },
  {
    id: 'spoon',
    name: 'Блесна',
    effect: '+7% к шансу эпической',
    bonus: 7,
    uses: 10,
    priceCoins: 500,
    description: 'Сверкает как чешуя'
  },
  {
    id: 'cyber_bait',
    name: 'Кибер-приманка',
    effect: '+15% к шансу легендарной',
    bonus: 15,
    uses: 5,
    priceGems: 10,
    description: 'Привлекает самую редкую рыбу'
  },
  {
    id: 'lucky_worm',
    name: 'Счастливый червь',
    effect: 'x2 к шансу любой редкой',
    bonus: 20,
    uses: 20,
    priceGems: 50,
    description: 'Очень редкая наживка'
  },
  {
    id: 'quantum_bait',
    name: 'Квантовая приманка',
    effect: 'x3 к шансу легендарной',
    bonus: 30,
    uses: 3,
    priceGems: 100,
    description: 'Привлекает квантовых рыб'
  }
];

// Подписки
export const SUBSCRIPTIONS: Subscription[] = [
  {
    type: 'monthly',
    priceGems: 10,
    energyBonus: 30,
    rarityBonus: 10,
    duration: 30,
    description: '+30 энергии в день, +10% к шансу'
  },
  {
    type: 'quarterly',
    priceGems: 25,
    energyBonus: 50,
    rarityBonus: 15,
    duration: 90,
    description: '+50 энергии, +15% к шансу, уникальный скин'
  },
  {
    type: 'lifetime',
    priceGems: 100,
    energyBonus: 90,
    rarityBonus: 25,
    duration: 36500,
    description: '+90 энергии, +25% к шансу, навсегда + легендарный скин'
  }
];

// Начальный игрок (для теста)
export const MOCK_PLAYER: Player = {
  id: 'test_user_123',
  username: 'Игрок',
  firstName: 'Тестовый',
  coins: 2500,
  gems: 50,
  energy: 90,
  maxEnergy: 90,
  level: 3,
  experience: 450,
  
  aquarium: {
    level: 2,
    capacity: 15,
    fishes: [
      { fishId: 'small_common_1', caughtAt: Date.now() - 86400000 * 2 },
      { fishId: 'small_common_2', caughtAt: Date.now() - 86400000 },
      { fishId: 'medium_common_1', caughtAt: Date.now() - 43200000 },
      { fishId: 'small_rare_1', caughtAt: Date.now() - 21600000 },
      { fishId: 'medium_rare_1', caughtAt: Date.now() - 10800000 }
    ]
  },
  
  stats: {
    totalCasts: 67,
    totalCatches: 48,
    fishByRarity: {
      common: 40,
      rare: 6,
      epic: 2,
      legendary: 0
    }
  },
  
  equipment: {
    currentRod: 'carbon_rod',
    ownedRods: ['starter_rod', 'carbon_rod'],
    currentBait: null,
    baitUsesLeft: 0
  },
  
  subscription: {
    active: false,
    type: null,
    expiresAt: null
  },
  
  lastEnergyRefresh: Date.now()
};