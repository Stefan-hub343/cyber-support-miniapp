import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const GameOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(10px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const GameContainer = styled(motion.div)`
  background: rgba(10, 10, 15, 0.95);
  border: 2px solid #00f0ff;
  border-radius: 20px;
  padding: 30px;
  max-width: 600px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 0 50px rgba(0, 240, 255, 0.3);
  position: relative;
`;

const GameHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(0, 240, 255, 0.3);
`;

const GameTitle = styled.h2`
  color: #00f0ff;
  font-family: 'Courier New', monospace;
  letter-spacing: 2px;
  margin: 0;
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
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: rgba(255, 0, 255, 0.2);
  }
`;

const ResourceBar = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
  padding: 15px;
  background: rgba(0, 240, 255, 0.1);
  border-radius: 10px;
  border: 1px solid rgba(0, 240, 255, 0.3);
`;

const Resource = styled.div`
  flex: 1;
  text-align: center;
  color: #00f0ff;
  font-family: 'Courier New', monospace;
  
  .label {
    font-size: 12px;
    opacity: 0.7;
    margin-bottom: 5px;
  }
  
  .value {
    font-size: 24px;
    font-weight: bold;
    text-shadow: 0 0 10px #00f0ff;
  }
`;

const FarmGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
  margin-bottom: 30px;
`;

const FarmCell = styled(motion.div)<{ isPlanted?: boolean }>`
  aspect-ratio: 1;
  background: ${props => props.isPlanted 
    ? 'linear-gradient(135deg, #00f0ff, #ff00ff)' 
    : 'rgba(0, 240, 255, 0.1)'};
  border: 2px solid ${props => props.isPlanted ? '#ff00ff' : '#00f0ff'};
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 30px;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 20px rgba(0, 240, 255, 0.5);
  }
`;

const ShopSection = styled.div`
  background: rgba(0, 240, 255, 0.05);
  border-radius: 10px;
  padding: 20px;
  border: 1px solid rgba(0, 240, 255, 0.2);
`;

const ShopTitle = styled.h3`
  color: #ff00ff;
  font-family: 'Courier New', monospace;
  margin-top: 0;
  margin-bottom: 15px;
  font-size: 16px;
`;

const ShopItems = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
`;

const ShopItem = styled.div`
  background: rgba(0, 240, 255, 0.1);
  border: 1px solid #00f0ff;
  border-radius: 8px;
  padding: 10px;
  text-align: center;
  cursor: pointer;
  
  &:hover {
    background: rgba(0, 240, 255, 0.2);
  }
  
  .icon {
    font-size: 24px;
    margin-bottom: 5px;
  }
  
  .name {
    color: #00f0ff;
    font-size: 12px;
    margin-bottom: 5px;
  }
  
  .price {
    color: #ff00ff;
    font-size: 11px;
  }
`;

interface GameFarmProps {
  onClose: () => void;
}

const GameFarm: React.FC<GameFarmProps> = ({ onClose }) => {
  const [resources, setResources] = useState({
    coins: 1000,
    gems: 50,
    seeds: 5
  });

  const [farmCells, setFarmCells] = useState(Array(8).fill(false));
  const [selectedSeed, setSelectedSeed] = useState<string | null>(null);

  // Симуляция пассивного дохода
  useEffect(() => {
    const interval = setInterval(() => {
      setResources(prev => ({
        ...prev,
        coins: prev.coins + Math.floor(Math.random() * 5)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleCellClick = (index: number) => {
    if (selectedSeed && resources.seeds > 0) {
      const newCells = [...farmCells];
      newCells[index] = true;
      setFarmCells(newCells);
      setResources(prev => ({
        ...prev,
        seeds: prev.seeds - 1
      }));
      setSelectedSeed(null);
    }
  };

  const handleShopItem = (item: string, cost: number) => {
    if (resources.coins >= cost) {
      setResources(prev => ({
        ...prev,
        coins: prev.coins - cost,
        seeds: prev.seeds + 1
      }));
    }
  };

  return (
    <GameOverlay
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <GameContainer
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 50 }}
        onClick={(e) => e.stopPropagation()}
      >
        <GameHeader>
          <GameTitle>🌾 КИБЕР-ФЕРМА v0.1</GameTitle>
          <CloseButton onClick={onClose}>✕</CloseButton>
        </GameHeader>

        <ResourceBar>
          <Resource>
            <div className="label">МОНЕТЫ</div>
            <div className="value">{resources.coins}</div>
          </Resource>
          <Resource>
            <div className="label">КРИСТАЛЛЫ</div>
            <div className="value">{resources.gems}</div>
          </Resource>
          <Resource>
            <div className="label">СЕМЕНА</div>
            <div className="value">{resources.seeds}</div>
          </Resource>
        </ResourceBar>

        <FarmGrid>
          {farmCells.map((isPlanted, index) => (
            <FarmCell
              key={index}
              isPlanted={isPlanted}
              onClick={() => handleCellClick(index)}
              whileTap={{ scale: 0.95 }}
            >
              {isPlanted ? '🌱' : ''}
            </FarmCell>
          ))}
        </FarmGrid>

        <ShopSection>
          <ShopTitle>🛒 МАГАЗИН СЕМЯН</ShopTitle>
          <ShopItems>
            <ShopItem onClick={() => handleShopItem('seed', 100)}>
              <div className="icon">🌿</div>
              <div className="name">Обычное семя</div>
              <div className="price">100 монет</div>
            </ShopItem>
            <ShopItem onClick={() => handleShopItem('rare_seed', 300)}>
              <div className="icon">✨</div>
              <div className="name">Редкое семя</div>
              <div className="price">300 монет</div>
            </ShopItem>
            <ShopItem onClick={() => handleShopItem('magic_seed', 10)}>
              <div className="icon">🔮</div>
              <div className="name">Магическое</div>
              <div className="price">10 кристаллов</div>
            </ShopItem>
          </ShopItems>
        </ShopSection>

        <div style={{ 
          textAlign: 'center', 
          marginTop: '20px', 
          color: '#666',
          fontSize: '12px',
          fontFamily: 'Courier New'
        }}>
          🚧 В разработке • Скоро будут редкие предметы и рейтинги
        </div>
      </GameContainer>
    </GameOverlay>
  );
};

export default GameFarm;