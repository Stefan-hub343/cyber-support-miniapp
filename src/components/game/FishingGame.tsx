import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { MOCK_PLAYER, FISH_CATALOG, RODS, BAITS, SUBSCRIPTIONS } from './mockData';
import { Fish, Player, Rod, Bait } from './types';
import Shop from './Shop';
import Leaderboard from './Leaderboard';

// Анимации
const waveAnimation = keyframes`
  0% { transform: translateX(-100%) translateY(0); }
  50% { transform: translateX(0) translateY(-5px); }
  100% { transform: translateX(100%) translateY(0); }
`;

const floatKeyframes = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

// Стилизованные компоненты
const GameContainer = styled.div`
  background: linear-gradient(180deg, #0a0a1f 0%, #1a1a3a 100%);
  border: 2px solid #00f0ff;
  border-radius: 20px;
  padding: 20px;
  color: #00f0ff;
  font-family: 'Courier New', monospace;
  position: relative;
  overflow: hidden;
  box-shadow: 0 0 30px rgba(0, 240, 255, 0.3);
  max-height: 90vh;
  overflow-y: auto;
`;

// Фон с неоновыми волнами
const BeachBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  overflow: hidden;
`;

const Water = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60%;
  background: linear-gradient(180deg, #0066aa 0%, #003366 100%);
  opacity: 0.6;
`;

const NeonWave = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100px;
  background: repeating-linear-gradient(
    transparent 0px,
    transparent 20px,
    rgba(0, 240, 255, 0.3) 20px,
    rgba(255, 0, 255, 0.3) 40px
  );
  animation: ${waveAnimation} 8s linear infinite;
`;

const GridOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    linear-gradient(rgba(0, 240, 255, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 0, 255, 0.1) 1px, transparent 1px);
  background-size: 50px 50px;
  z-index: 1;
`;

const FloatingParticles = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 2;
  
  &::before, &::after {
    content: '';
    position: absolute;
    width: 5px;
    height: 5px;
    background: #00f0ff;
    border-radius: 50%;
    box-shadow: 0 0 10px #00f0ff;
    animation: ${floatKeyframes} 3s ease-in-out infinite;
  }
  
  &::before { top: 20%; left: 30%; }
  &::after { top: 70%; right: 20%; }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(0, 240, 255, 0.3);
  position: relative;
  z-index: 10;
`;

const Title = styled.h2`
  color: #ff00ff;
  margin: 0;
  font-size: 20px;
  letter-spacing: 2px;
  text-shadow: 0 0 10px #ff00ff;
`;

const CloseButton = styled.button`
  background: transparent;
  border: 1px solid #ff00ff;
  color: #ff00ff;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 20px;
  position: relative;
  z-index: 10;
  
  &:hover {
    background: rgba(255, 0, 255, 0.2);
    box-shadow: 0 0 20px #ff00ff;
  }
`;

const StatsBar = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-bottom: 20px;
  padding: 15px;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 240, 255, 0.3);
  border-radius: 10px;
  position: relative;
  z-index: 10;
`;

const StatItem = styled.div`
  text-align: center;
  
  .label {
    font-size: 11px;
    color: #8899aa;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
  
  .value {
    font-size: 18px;
    font-weight: bold;
    color: #00f0ff;
    text-shadow: 0 0 10px #00f0ff;
  }
`;

const EnergyBar = styled.div<{ percent: number }>`
  height: 10px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  margin: 15px 0;
  overflow: hidden;
  position: relative;
  z-index: 10;
  
  &::after {
    content: '';
    display: block;
    width: ${props => props.percent}%;
    height: 100%;
    background: linear-gradient(90deg, #00f0ff, #ff00ff);
    border-radius: 5px;
    transition: width 0.3s;
    box-shadow: 0 0 20px #00f0ff;
  }
`;

const FishingArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
  position: relative;
  z-index: 10;
  min-height: 400px;
`;

const FishingRod = styled(motion.div)`
  position: relative;
  width: 200px;
  height: 200px;
  margin-bottom: 20px;
`;

const RodImage = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 10px;
  height: 150px;
  background: linear-gradient(90deg, #8899aa, #ffffff);
  transform-origin: bottom center;
  transform: translateX(-50%) rotate(-20deg);
  border-radius: 5px 5px 0 0;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    width: 20px;
    height: 20px;
    background: radial-gradient(circle, #ff00ff, #9900ff);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 20px #ff00ff;
  }
`;

const FishingLine = styled(motion.div)`
  position: absolute;
  top: 10px;
  left: 50%;
  width: 2px;
  height: 200px;
  background: linear-gradient(180deg, #ffffff, transparent);
  transform-origin: top center;
`;

const FishingHook = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 8px;
  height: 8px;
  background: #ff00ff;
  border-radius: 50%;
  transform: translateX(-50%);
  box-shadow: 0 0 10px #ff00ff;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    width: 2px;
    height: 10px;
    background: #ff00ff;
    transform: translateX(-50%);
  }
`;

const FishJump = styled(motion.div)`
  position: absolute;
  font-size: 30px;
  filter: drop-shadow(0 0 10px #00f0ff);
  pointer-events: none;
`;

const CastButton = styled(motion.button)`
  background: transparent;
  border: 2px solid #00f0ff;
  color: #00f0ff;
  padding: 20px 40px;
  font-size: 24px;
  font-family: 'Courier New', monospace;
  cursor: pointer;
  border-radius: 50px;
  letter-spacing: 4px;
  margin: 20px 0;
  position: relative;
  z-index: 10;
  backdrop-filter: blur(5px);
  
  &:hover {
    background: rgba(0, 240, 255, 0.1);
    box-shadow: 0 0 30px #00f0ff;
  }
  
  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

const CastProgress = styled(motion.div)`
  width: 100%;
  height: 20px;
  background: rgba(0, 240, 255, 0.1);
  border-radius: 10px;
  overflow: hidden;
  margin: 10px 0;
  border: 1px solid rgba(0, 240, 255, 0.3);
`;

const ProgressFill = styled(motion.div)`
  height: 100%;
  background: linear-gradient(90deg, #00f0ff, #ff00ff);
  border-radius: 10px;
  box-shadow: 0 0 20px #00f0ff;
`;

const FishResult = styled(motion.div)<{ 'data-rarity'?: string }>`
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  border: 2px solid ${props => {
    switch(props['data-rarity']) {
      case 'legendary': return '#ff00ff';
      case 'epic': return '#00f0ff';
      case 'rare': return '#00ff00';
      default: return '#ffffff';
    }
  }};
  border-radius: 15px;
  padding: 15px;
  margin: 10px 0;
  display: flex;
  align-items: center;
  gap: 15px;
  position: relative;
  z-index: 10;
  width: 100%;
  box-shadow: 0 0 30px ${props => {
    switch(props['data-rarity']) {
      case 'legendary': return 'rgba(255, 0, 255, 0.3)';
      case 'epic': return 'rgba(0, 240, 255, 0.3)';
      case 'rare': return 'rgba(0, 255, 0, 0.3)';
      default: return 'rgba(255, 255, 255, 0.1)';
    }
  }};
`;

const FishEmoji = styled.span<{ rarity: string }>`
  font-size: 40px;
  filter: drop-shadow(0 0 10px 
    ${props => 
      props.rarity === 'legendary' ? '#ff00ff' :
      props.rarity === 'epic' ? '#00f0ff' :
      props.rarity === 'rare' ? '#00ff00' : '#ffffff'
    });
`;

const FishInfo = styled.div`
  flex: 1;
  
  .name {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  .rarity {
    font-size: 12px;
    color: #8899aa;
    margin-bottom: 5px;
  }
  
  .sell {
    font-size: 14px;
    color: #ff00ff;
  }
  
  .escape {
    font-size: 16px;
    color: #ff4444;
    text-transform: uppercase;
    letter-spacing: 2px;
  }
`;

const Tabs = styled.div`
  display: flex;
  gap: 10px;
  margin: 20px 0;
  border-bottom: 1px solid rgba(0, 240, 255, 0.3);
  padding-bottom: 10px;
  position: relative;
  z-index: 10;
  flex-wrap: wrap;
`;

const Tab = styled.button<{ active: boolean }>`
  background: ${props => props.active ? 'rgba(0, 240, 255, 0.2)' : 'transparent'};
  border: 1px solid #00f0ff;
  color: ${props => props.active ? '#ff00ff' : '#00f0ff'};
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  backdrop-filter: blur(5px);
  font-family: 'Courier New', monospace;
  
  &:hover {
    background: rgba(0, 240, 255, 0.1);
    box-shadow: 0 0 20px #00f0ff;
  }
`;

interface FishingGameProps {
  onClose: () => void;
}

const FishingGame: React.FC<FishingGameProps> = ({ onClose }) => {
  const [player, setPlayer] = useState<Player>(MOCK_PLAYER);
  const [activeTab, setActiveTab] = useState<'fishing' | 'aquarium' | 'shop' | 'leaderboard'>('fishing');
  const [isCasting, setIsCasting] = useState(false);
  const [lastCatch, setLastCatch] = useState<Fish | null>(null);
  const [lastEscape, setLastEscape] = useState(false);
  const [castProgress, setCastProgress] = useState(0);
  const [showFishJump, setShowFishJump] = useState(false);
  const [fishJumpPosition, setFishJumpPosition] = useState({ x: 0, y: 0 });
  const [showSellConfirm, setShowSellConfirm] = useState<Fish | null>(null);

  const currentRod = RODS.find(r => r.id === player.equipment.currentRod) || RODS[0];

  // Проверка подписки
  useEffect(() => {
    if (player.subscription.active && player.subscription.expiresAt) {
      if (Date.now() > player.subscription.expiresAt) {
        setPlayer(prev => ({
          ...prev,
          maxEnergy: prev.maxEnergy - 30,
          subscription: {
            active: false,
            type: null,
            expiresAt: null
          }
        }));
      }
    }
  }, []);

  const handleCast = async () => {
    if (player.energy < 1 || isCasting) return;

    setIsCasting(true);
    setCastProgress(0);
    setLastCatch(null);
    setLastEscape(false);
    
    // Анимация заброса
    const interval = setInterval(() => {
      setCastProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + (100 / (currentRod.castSpeed * 10));
      });
    }, 100);

    // Ждем время заброса
    await new Promise(resolve => setTimeout(resolve, currentRod.castSpeed * 1000));

    // Шанс срыва: 70%
    const escapeChance = 0.70;
    const escaped = Math.random() < escapeChance;
    
    setLastEscape(escaped);
    
    if (escaped) {
      // Показываем анимацию рыбы
      setShowFishJump(true);
      setFishJumpPosition({
        x: Math.random() * 200 - 100,
        y: Math.random() * 100 - 150
      });
      
      setTimeout(() => setShowFishJump(false), 1000);
    } else {
      // Определяем, что поймали
      const random = Math.random();
      let caughtFish: Fish | undefined;
      
      // Учитываем бонусы от удочки и наживки
      let rarityBonus = currentRod.rarityBonus;
      
      if (player.equipment.currentBait) {
        const bait = BAITS.find(b => b.id === player.equipment.currentBait);
        if (bait) {
          rarityBonus += bait.bonus;
          
          // Уменьшаем использование наживки
          setPlayer(prev => ({
            ...prev,
            equipment: {
              ...prev.equipment,
              baitUsesLeft: prev.equipment.baitUsesLeft - 1,
              currentBait: prev.equipment.baitUsesLeft <= 1 ? null : prev.equipment.currentBait
            }
          }));
        }
      }

      // Вероятности вылова
      if (random < 0.03 + rarityBonus/100) {
        caughtFish = FISH_CATALOG.filter(f => f.rarity === 'legendary')[
          Math.floor(Math.random() * 3)
        ];
      } else if (random < 0.09 + rarityBonus/100) {
        caughtFish = FISH_CATALOG.filter(f => f.rarity === 'epic')[
          Math.floor(Math.random() * 3)
        ];
      } else if (random < 0.20 + rarityBonus/100) {
        caughtFish = FISH_CATALOG.filter(f => f.rarity === 'rare')[
          Math.floor(Math.random() * 3)
        ];
      } else {
        caughtFish = FISH_CATALOG.filter(f => f.rarity === 'common')[
          Math.floor(Math.random() * 3)
        ];
      }

      setLastCatch(caughtFish);
    }

    setCastProgress(0);
    setIsCasting(false);
  };

  const handleKeepFish = (fish: Fish) => {
    setPlayer(prev => ({
      ...prev,
      aquarium: {
        ...prev.aquarium,
        fishes: [...prev.aquarium.fishes, { fishId: fish.id, caughtAt: Date.now() }]
      },
      stats: {
        ...prev.stats,
        totalCatches: prev.stats.totalCatches + 1,
        fishByRarity: {
          ...prev.stats.fishByRarity,
          [fish.rarity]: prev.stats.fishByRarity[fish.rarity] + 1
        }
      }
    }));
    setLastCatch(null);
  };

  const handleSellFish = (fish: Fish) => {
    setPlayer(prev => ({
      ...prev,
      coins: prev.coins + fish.sellPrice,
      stats: {
        ...prev.stats,
        totalCatches: prev.stats.totalCatches + 1,
        fishByRarity: {
          ...prev.stats.fishByRarity,
          [fish.rarity]: prev.stats.fishByRarity[fish.rarity] + 1
        }
      }
    }));
    setLastCatch(null);
  };

  const handleBuyRod = (rod: Rod) => {
    if (rod.priceCoins && player.coins < rod.priceCoins) {
      alert('Недостаточно монет!');
      return;
    }
    if (rod.priceGems && player.gems < rod.priceGems) {
      alert('Недостаточно кристаллов!');
      return;
    }

    setPlayer(prev => ({
      ...prev,
      coins: prev.coins - (rod.priceCoins || 0),
      gems: prev.gems - (rod.priceGems || 0),
      equipment: {
        ...prev.equipment,
        ownedRods: [...prev.equipment.ownedRods, rod.id],
        currentRod: rod.id
      }
    }));
  };

  const handleBuyBait = (bait: Bait) => {
    if (bait.priceCoins && player.coins < bait.priceCoins) {
      alert('Недостаточно монет!');
      return;
    }
    if (bait.priceGems && player.gems < bait.priceGems) {
      alert('Недостаточно кристаллов!');
      return;
    }

    setPlayer(prev => ({
      ...prev,
      coins: prev.coins - (bait.priceCoins || 0),
      gems: prev.gems - (bait.priceGems || 0),
      equipment: {
        ...prev.equipment,
        currentBait: bait.id,
        baitUsesLeft: bait.uses
      }
    }));
  };

  const handleBuySubscription = () => {
    const sub = SUBSCRIPTIONS[0]; // месячная подписка
    if (player.gems < sub.priceGems) {
      alert('Недостаточно кристаллов!');
      return;
    }

    setPlayer(prev => ({
      ...prev,
      gems: prev.gems - sub.priceGems,
      maxEnergy: prev.maxEnergy + sub.energyBonus,
      subscription: {
        active: true,
        type: 'monthly',
        expiresAt: Date.now() + sub.duration * 24 * 60 * 60 * 1000
      }
    }));
  };

  const handleSellFromAquarium = (fish: Fish) => {
    setPlayer(prev => ({
      ...prev,
      coins: prev.coins + fish.sellPrice,
      aquarium: {
        ...prev.aquarium,
        fishes: prev.aquarium.fishes.filter(f => f.fishId !== fish.id)
      }
    }));
    setShowSellConfirm(null);
  };

  const handleUpgradeAquarium = () => {
    const cost = player.aquarium.level * 500;
    if (player.coins < cost) {
      alert('Недостаточно монет!');
      return;
    }

    setPlayer(prev => ({
      ...prev,
      coins: prev.coins - cost,
      aquarium: {
        ...prev.aquarium,
        level: prev.aquarium.level + 1,
        capacity: prev.aquarium.capacity + 5
      }
    }));
  };

  return (
    <GameContainer>
      <BeachBackground>
        <Water />
        <NeonWave />
        <GridOverlay />
        <FloatingParticles />
      </BeachBackground>

      <Header>
        <Title>🎣 КИБЕР-РЫБАЛКА</Title>
        <CloseButton onClick={onClose}>✕</CloseButton>
      </Header>

      <StatsBar>
        <StatItem>
          <div className="label">Монеты</div>
          <div className="value">{player.coins}</div>
        </StatItem>
        <StatItem>
          <div className="label">Кристаллы</div>
          <div className="value">{player.gems}</div>
        </StatItem>
        <StatItem>
          <div className="label">Уровень</div>
          <div className="value">{player.level}</div>
        </StatItem>
      </StatsBar>

      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
          <span style={{ color: '#00f0ff' }}>Энергия: {player.energy}/{player.maxEnergy}</span>
          <span style={{ color: '#ff00ff' }}>🎣 {player.stats.totalCasts} забросов</span>
        </div>
        <EnergyBar percent={(player.energy / player.maxEnergy) * 100} />
      </div>

      <Tabs>
        <Tab active={activeTab === 'fishing'} onClick={() => setActiveTab('fishing')}>
          🎣 Рыбалка
        </Tab>
        <Tab active={activeTab === 'aquarium'} onClick={() => setActiveTab('aquarium')}>
          🐠 Аквариум
        </Tab>
        <Tab active={activeTab === 'shop'} onClick={() => setActiveTab('shop')}>
          🛒 Магазин
        </Tab>
        <Tab active={activeTab === 'leaderboard'} onClick={() => setActiveTab('leaderboard')}>
          🏆 Рейтинг
        </Tab>
      </Tabs>

      <AnimatePresence mode="wait">
        {activeTab === 'fishing' && (
          <motion.div
            key="fishing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <FishingArea>
              <FishingRod>
                <RodImage
                  animate={{
                    rotate: isCasting ? [-20, -30, -20] : -20
                  }}
                  transition={{
                    duration: currentRod.castSpeed,
                    repeat: isCasting ? Infinity : 0
                  }}
                />
                <FishingLine
                  animate={{
                    height: isCasting ? [200, 300, 200] : 200
                  }}
                  transition={{
                    duration: currentRod.castSpeed,
                    repeat: isCasting ? Infinity : 0
                  }}
                >
                  <FishingHook
                    animate={{
                      y: isCasting ? [0, -100, 0] : 0
                    }}
                    transition={{
                      duration: currentRod.castSpeed,
                      repeat: isCasting ? Infinity : 0
                    }}
                  />
                </FishingLine>

                <AnimatePresence>
                  {showFishJump && (
                    <FishJump
                      initial={{ opacity: 0, scale: 0, x: fishJumpPosition.x, y: fishJumpPosition.y }}
                      animate={{ opacity: 1, scale: 1, x: fishJumpPosition.x, y: fishJumpPosition.y - 50 }}
                      exit={{ opacity: 0, scale: 0 }}
                      transition={{ duration: 1 }}
                    >
                      🐟
                    </FishJump>
                  )}
                </AnimatePresence>
              </FishingRod>

              <div style={{ marginBottom: '10px', color: '#8899aa' }}>
                Удочка: {currentRod.name} ({currentRod.castSpeed}с)
                {player.equipment.currentBait && (
                  <span style={{ marginLeft: '10px', color: '#ff00ff' }}>
                    + наживка ({player.equipment.baitUsesLeft} забросов)
                  </span>
                )}
              </div>
              
              <CastButton
                onClick={handleCast}
                disabled={isCasting || player.energy < 1}
                whileTap={{ scale: 0.95 }}
              >
                {isCasting ? 'ЗАБРАСЫВАЮ...' : 'ЗАБРОСИТЬ'}
              </CastButton>

              {isCasting && (
                <CastProgress>
                  <ProgressFill style={{ width: `${castProgress}%` }} />
                </CastProgress>
              )}

              <AnimatePresence>
                {lastEscape && (
                  <FishResult
                    data-rarity="common"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                  >
                    <FishEmoji rarity="common">💨</FishEmoji>
                    <FishInfo>
                      <div className="escape">РЫБА СОРВАЛАСЬ!</div>
                      <div className="rarity">Повезет в следующий раз</div>
                    </FishInfo>
                  </FishResult>
                )}

                {lastCatch && !lastEscape && (
                  <FishResult
                    data-rarity={lastCatch.rarity}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                  >
                    <FishEmoji rarity={lastCatch.rarity}>
                      {lastCatch.image}
                    </FishEmoji>
                    <FishInfo>
                      <div className="name">{lastCatch.name}</div>
                      <div className="rarity">
                        {lastCatch.rarity === 'common' && '🟢 Обычная'}
                        {lastCatch.rarity === 'rare' && '🔵 Редкая'}
                        {lastCatch.rarity === 'epic' && '🟣 Эпическая'}
                        {lastCatch.rarity === 'legendary' && '🟡 Легендарная'}
                      </div>
                      
                      <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          style={{
                            flex: 1,
                            background: '#00f0ff',
                            border: 'none',
                            color: '#0a0a0f',
                            padding: '8px',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontFamily: 'Courier New'
                          }}
                          onClick={() => handleKeepFish(lastCatch)}
                        >
                          🏠 В аквариум
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          style={{
                            flex: 1,
                            background: '#ff00ff',
                            border: 'none',
                            color: '#0a0a0f',
                            padding: '8px',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontFamily: 'Courier New'
                          }}
                          onClick={() => handleSellFish(lastCatch)}
                        >
                          💰 Продать ({lastCatch.sellPrice} 🪙)
                        </motion.button>
                      </div>
                    </FishInfo>
                  </FishResult>
                )}
              </AnimatePresence>
            </FishingArea>
          </motion.div>
        )}

        {activeTab === 'aquarium' && (
          <motion.div
            key="aquarium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div style={{ position: 'relative', zIndex: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                <h3 style={{ color: '#ff00ff', margin: 0 }}>
                  🐠 АКВАРИУМ (ур. {player.aquarium.level})
                </h3>
                <button
                  onClick={handleUpgradeAquarium}
                  style={{
                    background: 'transparent',
                    border: '1px solid #00f0ff',
                    color: '#00f0ff',
                    padding: '5px 15px',
                    borderRadius: '20px',
                    cursor: 'pointer',
                    fontFamily: 'Courier New'
                  }}
                >
                  Улучшить ({player.aquarium.level * 500} 🪙)
                </button>
              </div>
              
              <div style={{ 
                background: 'rgba(0, 0, 0, 0.5)',
                backdropFilter: 'blur(5px)',
                border: '1px solid rgba(0, 240, 255, 0.3)',
                borderRadius: '15px',
                padding: '15px'
              }}>
                <div style={{ marginBottom: '10px', color: '#00f0ff' }}>
                  Мест: {player.aquarium.fishes.length}/{player.aquarium.capacity}
                </div>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
                  gap: '10px',
                  maxHeight: '400px',
                  overflowY: 'auto'
                }}>
                  {player.aquarium.fishes.length === 0 ? (
                    <div style={{ 
                      gridColumn: '1/-1', 
                      textAlign: 'center', 
                      padding: '40px',
                      color: '#8899aa',
                      fontSize: '16px'
                    }}>
                      🐟 Аквариум пуст. Поймай свою первую рыбу!
                    </div>
                  ) : (
                    player.aquarium.fishes.map((caughtFish, index) => {
                      const fish = FISH_CATALOG.find(f => f.id === caughtFish.fishId);
                      if (!fish) return null;
                      
                      return (
                        <motion.div
                          key={index}
                          style={{
                            background: 'rgba(0, 240, 255, 0.1)',
                            border: '1px solid #00f0ff',
                            borderRadius: '10px',
                            padding: '10px',
                            textAlign: 'center',
                            cursor: 'pointer'
                          }}
                          whileHover={{ scale: 1.05, boxShadow: '0 0 20px #00f0ff' }}
                          onClick={() => setShowSellConfirm(fish)}
                        >
                          <div style={{ fontSize: '30px' }}>
                            {fish.image}
                          </div>
                          <div style={{ fontSize: '11px', marginTop: '5px', color: '#00f0ff' }}>{fish.name}</div>
                          <div style={{ fontSize: '10px', color: '#ff00ff' }}>{fish.sellPrice} 🪙</div>
                        </motion.div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'shop' && (
          <motion.div
            key="shop"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Shop
              player={player}
              onBuyRod={handleBuyRod}
              onBuyBait={handleBuyBait}
              onBuySubscription={handleBuySubscription}
            />
          </motion.div>
        )}

        {activeTab === 'leaderboard' && (
          <motion.div
            key="leaderboard"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Leaderboard player={player} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Модалка подтверждения продажи из аквариума */}
      <AnimatePresence>
        {showSellConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.9)',
              backdropFilter: 'blur(10px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000
            }}
            onClick={() => setShowSellConfirm(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              style={{
                background: '#0a0a0f',
                border: '2px solid #ff00ff',
                borderRadius: '20px',
                padding: '30px',
                maxWidth: '400px',
                textAlign: 'center'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ fontSize: '50px', marginBottom: '20px' }}>{showSellConfirm.image}</div>
              <h3 style={{ color: '#00f0ff', marginBottom: '10px' }}>Продать {showSellConfirm.name}?</h3>
              <p style={{ color: '#8899aa', marginBottom: '20px' }}>
                Вы получите {showSellConfirm.sellPrice} монет
              </p>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => handleSellFromAquarium(showSellConfirm)}
                  style={{
                    flex: 1,
                    background: '#ff00ff',
                    border: 'none',
                    color: '#0a0a0f',
                    padding: '10px',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    fontFamily: 'Courier New',
                    fontSize: '16px'
                  }}
                >
                  Продать
                </button>
                <button
                  onClick={() => setShowSellConfirm(null)}
                  style={{
                    flex: 1,
                    background: 'transparent',
                    border: '1px solid #00f0ff',
                    color: '#00f0ff',
                    padding: '10px',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    fontFamily: 'Courier New',
                    fontSize: '16px'
                  }}
                >
                  Отмена
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </GameContainer>
  );
};

export default FishingGame;