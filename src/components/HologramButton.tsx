import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ButtonContainer = styled(motion.button)`
  position: relative;
  padding: 18px 40px;
  background: transparent;
  border: none;
  cursor: pointer;
  overflow: hidden;
  outline: none;
`;

const ButtonGlow = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, #00f0ff, #ff00ff, #00f0ff);
  background-size: 200% 200%;
  filter: blur(10px);
  opacity: 0;
  transition: opacity 0.3s;
  
  ${ButtonContainer}:hover & {
    opacity: 1;
    animation: gradientShift 2s ease infinite;
  }
`;

const ButtonBorder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: 2px solid #00f0ff;
  box-shadow: 0 0 20px #00f0ff,
              inset 0 0 20px #00f0ff;
  
  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    border: 2px solid transparent;
    background: linear-gradient(45deg, #00f0ff, #ff00ff) border-box;
    -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
    mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    animation: borderRotate 4s linear infinite;
  }
`;

const ButtonText = styled.span`
  position: relative;
  color: #00f0ff;
  font-family: 'Courier New', monospace;
  font-size: 18px;
  font-weight: bold;
  letter-spacing: 4px;
  text-transform: uppercase;
  text-shadow: 0 0 10px #00f0ff;
  z-index: 1;
  
  ${ButtonContainer}:hover & {
    color: #ffffff;
    text-shadow: 0 0 20px #ff00ff;
  }
`;

interface HologramButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const HologramButton: React.FC<HologramButtonProps> = ({ onClick, children }) => {
  return (
    <ButtonContainer
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <ButtonGlow />
      <ButtonBorder />
      <ButtonText>{children}</ButtonText>
    </ButtonContainer>
  );
};

export default HologramButton;