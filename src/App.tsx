import React, { useEffect, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import RobotMask from './components/RobotMask';
import HologramButton from './components/HologramButton';
import PaymentModal from './components/PaymentModal';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    width: 100%;
    min-height: 100vh;
    background: linear-gradient(135deg, #0a0a0f 0%, #0d0b1a 100%);
    font-family: 'Courier New', monospace;
    color: #ffffff;
    overflow-x: hidden;
  }

  body {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  #root {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 400px;
  padding: 20px;
  gap: 15px;
  position: relative;
`;

const Header = styled.div`
  text-align: center;
  width: 100%;
  margin-bottom: 5px;
`;

const Title = styled.h1`
  font-size: 28px;
  color: #00f0ff;
  text-transform: uppercase;
  letter-spacing: 8px;
  margin-bottom: 8px;
  text-shadow: 0 0 10px #00f0ff;
  animation: textGlow 3s ease-in-out infinite;

  @keyframes textGlow {
    0%, 100% { text-shadow: 0 0 10px #00f0ff, 0 0 20px #00f0ff; }
    50% { text-shadow: 0 0 20px #ff00ff, 0 0 40px #ff00ff; }
  }
`;

const Subtitle = styled.div`
  font-size: 12px;
  color: #ff00ff;
  letter-spacing: 4px;
  opacity: 0.9;
  text-shadow: 0 0 5px #ff00ff;
`;

const StatusPanel = styled.div`
  background: rgba(0, 240, 255, 0.05);
  border: 1px solid rgba(0, 240, 255, 0.3);
  border-radius: 15px;
  padding: 15px 20px;
  backdrop-filter: blur(10px);
  box-shadow: 0 0 30px rgba(0, 240, 255, 0.2);
  width: 100%;
  max-width: 300px;
  margin: 5px 0;
`;

const StatusRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 8px 0;
  font-size: 14px;
  
  .label {
    color: #8899aa;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-size: 12px;
  }
  
  .value {
    color: #00f0ff;
    font-weight: bold;
    text-shadow: 0 0 10px #00f0ff;
    font-size: 14px;
  }
`;

const Footer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 5px;
`;

const SuccessMessage = styled(motion.div)`
  position: fixed;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 255, 0, 0.1);
  border: 2px solid #00ff00;
  border-radius: 10px;
  padding: 15px 25px;
  color: #00ff00;
  text-align: center;
  font-family: 'Courier New', monospace;
  font-size: 16px;
  letter-spacing: 2px;
  backdrop-filter: blur(10px);
  box-shadow: 0 0 30px rgba(0, 255, 0, 0.3);
  z-index: 1001;
  white-space: nowrap;
`;

const App: React.FC = () => {
  const [showPayment, setShowPayment] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [user, setUser] = useState<any>(null);
  
  useEffect(() => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.expand();
      
      const tgUser = window.Telegram.WebApp.initDataUnsafe?.user;
      setUser(tgUser);
    }
  }, []);
  
  const handlePaymentSuccess = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        <Header>
          <Title>Baldezhniki</Title>
          <Subtitle>▼ СИСТЕМА АКТИВНА ▼</Subtitle>
        </Header>
        
        <RobotMask />
        
        <StatusPanel>
          <StatusRow>
            <span className="label">ПИЛОТ:</span>
            <span className="value">{user?.first_name?.toUpperCase() || 'АНДРОИД'}</span>
          </StatusRow>
          <StatusRow>
            <span className="label">УРОВЕНЬ:</span>
            <span className="value">◉ ВЫСОКИЙ</span>
          </StatusRow>
          <StatusRow>
            <span className="label">ЭНЕРГИЯ:</span>
            <span className="value">████████░░ 80%</span>
          </StatusRow>
        </StatusPanel>
        
        <Footer>
          <HologramButton onClick={() => setShowPayment(true)}>
            ПОЖЕРТВОВАТЬ
          </HologramButton>
        </Footer>
        
        <AnimatePresence>
          {showSuccess && (
            <SuccessMessage
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
            >
              ⚡ ЭНЕРГИЯ ПЕРЕДАНА! СПАСИБО ⚡
            </SuccessMessage>
          )}
        </AnimatePresence>
        
        {showPayment && (
          <PaymentModal 
            onClose={() => setShowPayment(false)} 
            onSuccess={handlePaymentSuccess}
          />
        )}
      </Container>
    </>
  );
};

export default App;