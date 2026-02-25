import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import TonConnect from './TonConnect';

const Overlay = styled(motion.div)`
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
`;

const Modal = styled(motion.div)`
  background: rgba(10, 10, 15, 0.95);
  border: 2px solid #00f0ff;
  border-radius: 20px;
  padding: 30px;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 0 50px rgba(0, 240, 255, 0.3);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, #00f0ff, #ff00ff, #00f0ff);
    background-size: 200% 200%;
    opacity: 0.3;
    animation: gradientShift 3s ease infinite;
    z-index: -1;
  }

  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
`;

const Title = styled.h2`
  color: #00f0ff;
  text-align: center;
  margin-bottom: 20px;
  font-family: 'Courier New', monospace;
  letter-spacing: 4px;
  text-shadow: 0 0 10px #00f0ff;
`;

interface PaymentModalProps {
  onClose: () => void;
  onSuccess?: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ onClose, onSuccess }) => {
  // === ТВОЯ РАБОЧАЯ ССЫЛКА НА МАНИФЕСТ ===
  const manifestUrl = 'https://gist.githubusercontent.com/Stefan-hub343/fd12e2cb7e39098f2e7ad2e3e32ff926/raw/0525f45a9e74190d2adbb27bdfc4d45e30c60fad/tonconnect-manifest.json';
  
  const botUsername = 'baldezhniki_support_bot';
  const twaReturnUrl = `https://t.me/${botUsername}/app` as `${string}://${string}`;

  useEffect(() => {
    console.log('🔄 PaymentModal mounted');
    console.log('📋 Используется Gist манифест:', manifestUrl);
    console.log('📋 Return URL:', twaReturnUrl);
    
    // Проверяем доступность манифеста
    fetch(manifestUrl)
      .then(response => {
        console.log('📥 Статус загрузки манифеста:', response.status);
        return response.json();
      })
      .then(data => console.log('📥 Данные манифеста:', data))
      .catch(error => console.error('📥 Ошибка загрузки манифеста:', error));
      
  }, []);

  return (
    <AnimatePresence>
      <Overlay
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <Modal
          initial={{ scale: 0.8, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.8, y: 50 }}
          onClick={(e) => e.stopPropagation()}
        >
          <Title>ПОДКЛЮЧЕНИЕ ЭНЕРГИИ</Title>
          
          <TonConnectUIProvider 
            manifestUrl={manifestUrl}
            actionsConfiguration={{
              twaReturnUrl: twaReturnUrl
            }}
          >
            <TonConnect 
              onClose={onClose} 
              onSuccess={onSuccess}  
            />
          </TonConnectUIProvider>
        </Modal>
      </Overlay>
    </AnimatePresence>
  );
};

export default PaymentModal;