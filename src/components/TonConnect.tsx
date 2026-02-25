import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useTonWallet, useTonConnectUI } from '@tonconnect/ui-react'; // Удален неиспользуемый TonConnectButton

const WalletContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
`;

const WalletInfo = styled.div`
  background: rgba(0, 240, 255, 0.1);
  border: 1px solid #00f0ff;
  border-radius: 10px;
  padding: 15px;
  width: 100%;
  text-align: center;
  color: #00f0ff;
  font-family: 'Courier New', monospace;
`;

const PaymentButton = styled.button<{ disabled?: boolean }>`
  background: transparent;
  border: 2px solid ${props => props.disabled ? '#666' : '#ff00ff'};
  color: ${props => props.disabled ? '#666' : '#ff00ff'};
  padding: 15px 30px;
  font-size: 18px;
  font-family: 'Courier New', monospace;
  letter-spacing: 2px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  width: 100%;
  transition: all 0.3s;
  
  &:hover:not(:disabled) {
    background: #ff00ff;
    color: #0a0a0f;
    box-shadow: 0 0 30px #ff00ff;
  }
`;

const Input = styled.input`
  background: rgba(0, 240, 255, 0.1);
  border: 1px solid #00f0ff;
  color: #00f0ff;
  padding: 12px;
  width: 100%;
  font-size: 16px;
  font-family: 'Courier New', monospace;
  border-radius: 5px;
  
  &:focus {
    outline: none;
    box-shadow: 0 0 20px #00f0ff;
  }
  
  &::placeholder {
    color: rgba(0, 240, 255, 0.3);
  }
`;

const CloseButton = styled.button`
  background: transparent;
  border: 1px solid #666;
  color: #666;
  padding: 10px 20px;
  margin-top: 20px;
  cursor: pointer;
  font-family: 'Courier New', monospace;
  width: 100%;
  
  &:hover {
    border-color: #ff00ff;
    color: #ff00ff;
  }
`;

const ConnectButton = styled.button`
  background: linear-gradient(45deg, #00f0ff, #ff00ff);
  border: none;
  color: #0a0a0f;
  padding: 15px 30px;
  font-size: 18px;
  font-family: 'Courier New', monospace;
  letter-spacing: 2px;
  cursor: pointer;
  width: 100%;
  font-weight: bold;
  text-transform: uppercase;
  border-radius: 5px;
  transition: all 0.3s;
  
  &:hover {
    transform: scale(1.02);
    box-shadow: 0 0 30px rgba(255, 0, 255, 0.5);
  }
`;

interface TonConnectProps {
  onClose: () => void;
  onSuccess?: () => void;
}

const TonConnect: React.FC<TonConnectProps> = ({ onClose, onSuccess }) => {
  const wallet = useTonWallet();
  const [tonConnectUI] = useTonConnectUI();
  const [amount, setAmount] = useState('1');
  const [sending, setSending] = useState(false);
  const [connectionRestored, setConnectionRestored] = useState(false);

  // ВНИМАНИЕ: ЗАМЕНИ НА СВОЙ АДРЕС КОШЕЛЬКА
  const RECIPIENT_ADDRESS = 'EQD...твой_кошелек_ton';

  useEffect(() => {
    console.log('👛 Wallet state:', wallet);
    if (wallet) {
      console.log('📝 Wallet details:', {
        address: wallet.account?.address,
        appName: wallet.device?.appName,
        chain: wallet.account?.chain
      });
    }
  }, [wallet]);

  useEffect(() => {
    console.log('🔧 TON Connect UI initialized');
    // @ts-ignore - получаем manifestUrl из конфига
    console.log('📋 Manifest URL:', tonConnectUI.options?.manifestUrl);
    
    const checkConnection = async () => {
      try {
        // @ts-ignore
        const restored = await tonConnectUI.connectionRestored;
        setConnectionRestored(true);
        console.log('🔌 Connection restored:', restored);
      } catch (error) {
        console.error('Connection check error:', error);
      }
    };
    
    checkConnection();
  }, [tonConnectUI]);

  const handleConnect = () => {
    console.log('🖱️ Connect clicked, opening modal...');
    // @ts-ignore
    console.log('🔗 Using manifest URL:', tonConnectUI.options?.manifestUrl);
    tonConnectUI.openModal();
  };

  const sendPayment = async () => {
    if (!wallet) {
      alert('Сначала подключи кошелек!');
      return;
    }

    try {
      setSending(true);
      // Конвертируем TON в наноTON (1 TON = 1,000,000,000 наноTON)
      const amountInNano = (parseFloat(amount) * 1000000000).toString();
      
      const transaction = {
        validUntil: Math.floor(Date.now() / 1000) + 600, // 10 минут
        messages: [
          {
            address: RECIPIENT_ADDRESS,
            amount: amountInNano,
          }
        ]
      };

      console.log('💸 Sending transaction:', transaction);
      
      // @ts-ignore
      const result = await wallet.sendTransaction(transaction);
      console.log('✅ Transaction result:', result);
      
      alert('Спасибо за поддержку! Транзакция отправлена.');
      
      if (onSuccess) {
        onSuccess();
      }
      
      setTimeout(onClose, 2000);
      
    } catch (error: any) {
      console.error('❌ Ошибка отправки:', error);
      
      // Проверяем, не отменил ли пользователь транзакцию
      if (error?.message?.includes('rejected') || error?.message?.includes('cancelled')) {
        alert('Транзакция отклонена в кошельке.');
      } else if (error?.message?.includes('balance')) {
        alert('Недостаточно средств на балансе кошелька.');
      } else {
        alert('Ошибка при отправке транзакции. Попробуй снова.');
      }
    } finally {
      setSending(false);
    }
  };

  return (
    <WalletContainer>
      {!wallet ? (
        <>
          <ConnectButton onClick={handleConnect}>
            🔮 ПОДКЛЮЧИТЬ КОШЕЛЕК
          </ConnectButton>
          <div style={{ fontSize: '12px', color: '#666', textAlign: 'center' }}>
            {!connectionRestored ? '⏳ Восстановление соединения...' : '✅ Нажми кнопку для подключения'}
          </div>
        </>
      ) : (
        <>
          <WalletInfo>
            <div style={{ color: '#ff00ff', marginBottom: '8px' }}>
              {wallet.device?.appName === 'telegram-wallet' ? '✅ TON Space' : '✅ КОШЕЛЕК ПОДКЛЮЧЕН'}
            </div>
            <div>{wallet.account?.address.slice(0, 6)}...{wallet.account?.address.slice(-4)}</div>
          </WalletInfo>

          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Сумма в TON"
            min="0.1"
            step="0.1"
          />

          <PaymentButton 
            onClick={sendPayment} 
            disabled={sending || !amount || parseFloat(amount) < 0.1}
          >
            {sending ? 'ОТПРАВКА...' : `ПОДДЕРЖАТЬ ${amount} TON`}
          </PaymentButton>
        </>
      )}

      <CloseButton onClick={onClose}>
        ЗАКРЫТЬ
      </CloseButton>
    </WalletContainer>
  );
};

export default TonConnect;