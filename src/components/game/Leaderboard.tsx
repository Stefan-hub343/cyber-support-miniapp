import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Player } from './types';

const LeaderboardContainer = styled.div`
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid #00f0ff;
  border-radius: 15px;
  padding: 20px;
`;

const Tabs = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  border-bottom: 1px solid rgba(0, 240, 255, 0.3);
  padding-bottom: 10px;
`;

const Tab = styled.button<{ active: boolean }>`
  background: ${props => props.active ? 'rgba(0, 240, 255, 0.2)' : 'transparent'};
  border: 1px solid #00f0ff;
  color: ${props => props.active ? '#ff00ff' : '#00f0ff'};
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  flex: 1;
  
  &:hover {
    background: rgba(0, 240, 255, 0.1);
  }
`;

const LeaderboardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: 400px;
  overflow-y: auto;
`;

const LeaderboardItem = styled(motion.div)<{ rank: number }>`
  display: flex;
  align-items: center;
  padding: 10px;
  background: rgba(0, 240, 255, 0.05);
  border: 1px solid 
    ${props => 
      props.rank === 1 ? '#ff00ff' : 
      props.rank === 2 ? '#00f0ff' : 
      props.rank === 3 ? '#00ff00' : 
      'rgba(0, 240, 255, 0.2)'
    };
  border-radius: 10px;
`;

const Rank = styled.div<{ rank: number }>`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: bold;
  margin-right: 15px;
  background: ${props => 
    props.rank === 1 ? 'linear-gradient(135deg, #ff00ff, #00f0ff)' :
    props.rank === 2 ? 'linear-gradient(135deg, #00f0ff, #ff00ff)' :
    props.rank === 3 ? 'linear-gradient(135deg, #00ff00, #00f0ff)' :
    'rgba(0, 240, 255, 0.2)'
  };
  border-radius: 50%;
  color: #0a0a0f;
`;

const UserInfo = styled.div`
  flex: 1;
  
  .name {
    font-size: 16px;
    font-weight: bold;
    color: #00f0ff;
  }
  
  .username {
    font-size: 12px;
    color: #8899aa;
  }
  
  .score {
    font-size: 12px;
    color: #8899aa;
    margin-top: 2px;
  }
`;

const Score = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #ff00ff;
`;

interface LeaderboardProps {
  player: Player;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ player }) => {
  const [activeTab, setActiveTab] = useState<'overall' | 'casts' | 'collector'>('overall');
  const [tgUser, setTgUser] = useState<any>(null);

  useEffect(() => {
    // Получаем данные пользователя Telegram
    if (window.Telegram?.WebApp) {
      const user = window.Telegram.WebApp.initDataUnsafe?.user;
      setTgUser(user);
    }
  }, []);

  // Пока только текущий игрок (после добавления Firebase будут все)
  const leaderboardData = [
    {
      id: 1,
      name: tgUser?.first_name || player.firstName || 'Вы',
      username: tgUser?.username || player.username,
      score: activeTab === 'overall' ? player.coins :
             activeTab === 'casts' ? player.stats.totalCasts :
             player.aquarium.fishes.length
    }
  ];

  const getScoreLabel = () => {
    switch(activeTab) {
      case 'overall': return '💰 монет';
      case 'casts': return '🎣 забросов';
      case 'collector': return '🐠 рыб';
    }
  };

  return (
    <LeaderboardContainer>
      <Tabs>
        <Tab active={activeTab === 'overall'} onClick={() => setActiveTab('overall')}>
          🏆 Богатство
        </Tab>
        <Tab active={activeTab === 'casts'} onClick={() => setActiveTab('casts')}>
          🎣 Опыт
        </Tab>
        <Tab active={activeTab === 'collector'} onClick={() => setActiveTab('collector')}>
          🐠 Коллекция
        </Tab>
      </Tabs>

      <LeaderboardList>
        <LeaderboardItem
          rank={1}
          whileHover={{ scale: 1.02 }}
        >
          <Rank rank={1}>1</Rank>
          <UserInfo>
            <div className="name">
              {tgUser?.first_name || player.firstName || 'Игрок'}
              {tgUser?.username && <span style={{ color: '#8899aa' }}> @{tgUser.username}</span>}
            </div>
            <div className="score">{getScoreLabel()}</div>
          </UserInfo>
          <Score>{leaderboardData[0].score}</Score>
        </LeaderboardItem>
      </LeaderboardList>

      <div style={{ 
        marginTop: '20px', 
        padding: '10px', 
        background: 'rgba(0, 240, 255, 0.1)',
        borderRadius: '10px',
        textAlign: 'center',
        color: '#8899aa',
        fontSize: '12px'
      }}>
        ⚡ Рейтинг обновляется в реальном времени
      </div>
    </LeaderboardContainer>
  );
};

export default Leaderboard;