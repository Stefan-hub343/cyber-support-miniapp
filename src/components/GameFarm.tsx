import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import FishingGame from './game/FishingGame';

const GameWrapper = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(10px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  overflow-y: auto;
  padding: 20px;
`;

const GameContent = styled(motion.div)`
  width: 100%;
  max-width: 500px;
`;

interface GameFarmProps {
  onClose: () => void;
}

const GameFarm: React.FC<GameFarmProps> = ({ onClose }) => {
  return (
    <GameWrapper
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <GameContent
        initial={{ scale: 0.9, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 50 }}
        onClick={(e) => e.stopPropagation()}
      >
        <FishingGame onClose={onClose} />
      </GameContent>
    </GameWrapper>
  );
};

export default GameFarm;