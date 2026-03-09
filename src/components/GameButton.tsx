import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ButtonWrapper = styled(motion.div)`
  position: fixed;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  cursor: pointer;
`;

const GameIcon = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #00f0ff, #ff00ff);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  box-shadow: 0 0 20px rgba(0, 240, 255, 0.5);
  border: 2px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 0 30px rgba(255, 0, 255, 0.7);
  }
`;

const Tooltip = styled(motion.div)`
  position: absolute;
  left: 70px;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(10, 10, 15, 0.9);
  border: 1px solid #00f0ff;
  border-radius: 10px;
  padding: 8px 15px;
  color: #00f0ff;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  white-space: nowrap;
  backdrop-filter: blur(5px);
  pointer-events: none;
`;

interface GameButtonProps {
  onClick: () => void;
}

const GameButton: React.FC<GameButtonProps> = ({ onClick }) => {
  const [showTooltip, setShowTooltip] = React.useState(false);

  return (
    <ButtonWrapper
      onHoverStart={() => setShowTooltip(true)}
      onHoverEnd={() => setShowTooltip(false)}
      onClick={onClick}
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <GameIcon>
        <span>🎮</span>
      </GameIcon>
      {showTooltip && (
        <Tooltip
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
        >
          ИГРАТЬ
        </Tooltip>
      )}
    </ButtonWrapper>
  );
};

export default GameButton;