import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { RODS, BAITS } from './mockData';
import { Rod, Bait, Player } from './types';

const ShopContainer = styled.div`
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid #00f0ff;
  border-radius: 15px;
  padding: 20px;
  color: #00f0ff;
`;

const Section = styled.div`
  margin-bottom: 30px;
`;

const SectionTitle = styled.h3`
  color: #ff00ff;
  margin-bottom: 15px;
  font-size: 18px;
  letter-spacing: 2px;
  border-bottom: 1px solid rgba(0, 240, 255, 0.3);
  padding-bottom: 5px;
`;

const ItemsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 15px;
`;

const ShopItem = styled(motion.div)`
  background: rgba(0, 240, 255, 0.1);
  border: 1px solid #00f0ff;
  border-radius: 10px;
  padding: 15px;
  cursor: pointer;
  
  &:hover {
    background: rgba(0, 240, 255, 0.2);
    box-shadow: 0 0 20px rgba(0, 240, 255, 0.3);
  }
`;

const ItemIcon = styled.div`
  font-size: 30px;
  text-align: center;
  margin-bottom: 10px;
`;

const ItemName = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #ff00ff;
  margin-bottom: 5px;
  text-align: center;
`;

const ItemDesc = styled.div`
  font-size: 12px;
  color: #8899aa;
  margin-bottom: 10px;
  text-align: center;
`;

const ItemPrice = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  font-size: 14px;
  
  .coins {
    color: #00f0ff;
  }
  
  .gems {
    color: #ff00ff;
  }
`;

const ItemBonus = styled.div`
  font-size: 12px;
  color: #00ff00;
  text-align: center;
  margin-top: 5px;
`;

interface ShopProps {
  player: Player;
  onBuyRod: (rod: Rod) => void;
  onBuyBait: (bait: Bait) => void;
  onBuySubscription: () => void;
}

const Shop: React.FC<ShopProps> = ({ player, onBuyRod, onBuyBait, onBuySubscription }) => {
  return (
    <ShopContainer>
      <Section>
        <SectionTitle>🎣 УДОЧКИ</SectionTitle>
        <ItemsGrid>
          {RODS.filter(rod => !player.equipment.ownedRods.includes(rod.id)).map(rod => (
            <ShopItem
              key={rod.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onBuyRod(rod)}
            >
              <ItemIcon>{rod.image}</ItemIcon>
              <ItemName>{rod.name}</ItemName>
              <ItemDesc>{rod.description}</ItemDesc>
              <ItemBonus>⚡ Скорость: {rod.castSpeed}с</ItemBonus>
              <ItemBonus>✨ +{rod.rarityBonus}% к редкой рыбе</ItemBonus>
              <ItemPrice>
                {rod.priceCoins && <span className="coins">{rod.priceCoins} 🪙</span>}
                {rod.priceGems && <span className="gems">{rod.priceGems} 💎</span>}
              </ItemPrice>
            </ShopItem>
          ))}
        </ItemsGrid>
      </Section>

      <Section>
        <SectionTitle>🪤 НАЖИВКА</SectionTitle>
        <ItemsGrid>
          {BAITS.map(bait => (
            <ShopItem
              key={bait.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onBuyBait(bait)}
            >
              <ItemIcon>🪱</ItemIcon>
              <ItemName>{bait.name}</ItemName>
              <ItemDesc>{bait.description}</ItemDesc>
              <ItemBonus>✨ +{bait.bonus}% к шансу</ItemBonus>
              <ItemBonus>📦 {bait.uses} забросов</ItemBonus>
              <ItemPrice>
                {bait.priceCoins && <span className="coins">{bait.priceCoins} 🪙</span>}
                {bait.priceGems && <span className="gems">{bait.priceGems} 💎</span>}
              </ItemPrice>
            </ShopItem>
          ))}
        </ItemsGrid>
      </Section>

      <Section>
        <SectionTitle>💎 ПОДПИСКА</SectionTitle>
        <ItemsGrid>
          <ShopItem
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBuySubscription}
          >
            <ItemIcon>👑</ItemIcon>
            <ItemName>Золотая удочка</ItemName>
            <ItemDesc>Премиум-подписка на 30 дней</ItemDesc>
            <ItemBonus>✨ +30 энергии в день</ItemBonus>
            <ItemBonus>✨ +10% к шансу редкой рыбы</ItemBonus>
            <ItemBonus>✨ Уникальный скин</ItemBonus>
            <ItemPrice>
              <span className="gems">10 💎</span>
            </ItemPrice>
          </ShopItem>
        </ItemsGrid>
      </Section>
    </ShopContainer>
  );
};

export default Shop;