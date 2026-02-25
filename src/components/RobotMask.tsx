import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const MaskContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;
  height: 400px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Canvas = styled.canvas`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 1;
`;

const SVGContainer = styled.svg`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 2;
  filter: drop-shadow(0 0 15px rgba(0, 240, 255, 0.5));
`;

const GlowOverlay = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: radial-gradient(circle at 50% 50%, rgba(0, 240, 255, 0.2), transparent 70%);
  filter: blur(20px);
  z-index: 0;
`;

const RobotMask: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Устанавливаем размер canvas равным размеру контейнера
    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (container) {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Создаем энергетические частицы
    const particles: {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      life: number;
    }[] = [];

    // Инициализируем частицы
    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 2 + Math.random() * 4,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        color: `rgba(${Math.random() > 0.5 ? '0, 240, 255' : '255, 0, 255'}, ${0.3 + Math.random() * 0.3})`,
        life: 0.5 + Math.random() * 0.5,
      });
    }

    const animate = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Центр канваса
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Рисуем энергетическое поле (градиент от центра)
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, canvas.width / 2);
      gradient.addColorStop(0, 'rgba(0, 240, 255, 0.1)');
      gradient.addColorStop(0.5, 'rgba(153, 0, 255, 0.05)');
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Рисуем и обновляем частицы
      particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;

        // Отскок от границ
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;

        // Рисуем частицу
        ctx.shadowColor = p.color.includes('240') ? '#00f0ff' : '#ff00ff';
        ctx.shadowBlur = 15;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        
        const particleGradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
        particleGradient.addColorStop(0, p.color);
        particleGradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = particleGradient;
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <MaskContainer>
      <Canvas ref={canvasRef} />
      <GlowOverlay
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <SVGContainer viewBox="0 0 400 400" preserveAspectRatio="xMidYMid meet">
        {/* Основная маска с плавными линиями */}
        <motion.g
          animate={{
            filter: [
              "drop-shadow(0 0 5px #00f0ff) drop-shadow(0 0 10px #ff00ff)",
              "drop-shadow(0 0 10px #ff00ff) drop-shadow(0 0 20px #00f0ff)",
              "drop-shadow(0 0 5px #00f0ff) drop-shadow(0 0 10px #ff00ff)",
            ],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* Внешний контур маски - плавные линии */}
          <motion.path
            d="M 100,120 
               C 80,140 70,170 80,200 
               C 70,230 80,260 100,280 
               L 300,280 
               C 320,260 330,230 320,200 
               C 330,170 320,140 300,120 
               L 100,120"
            fill="none"
            stroke="#00f0ff"
            strokeWidth="3"
            strokeLinecap="round"
            animate={{
              strokeOpacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Внутренняя подсветка контура */}
          <motion.path
            d="M 100,120 
               C 80,140 70,170 80,200 
               C 70,230 80,260 100,280 
               L 300,280 
               C 320,260 330,230 320,200 
               C 330,170 320,140 300,120 
               L 100,120"
            fill="none"
            stroke="#ff00ff"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray="5 10"
            animate={{
              strokeDashoffset: [0, 15, 0],
              strokeOpacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Левый глаз - плавный овал */}
          <motion.ellipse
            cx="140"
            cy="180"
            rx="25"
            ry="20"
            fill="none"
            stroke="#00f0ff"
            strokeWidth="2.5"
            animate={{
              rx: [25, 28, 25],
              ry: [20, 22, 20],
              strokeOpacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          {/* Свечение левого глаза */}
          <motion.circle
            cx="140"
            cy="180"
            r="8"
            fill="#00f0ff"
            filter="url(#glow)"
            animate={{
              r: [8, 12, 8],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Правый глаз */}
          <motion.ellipse
            cx="260"
            cy="180"
            rx="25"
            ry="20"
            fill="none"
            stroke="#00f0ff"
            strokeWidth="2.5"
            animate={{
              rx: [25, 28, 25],
              ry: [20, 22, 20],
              strokeOpacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.3,
            }}
          />
          
          {/* Свечение правого глаза */}
          <motion.circle
            cx="260"
            cy="180"
            r="8"
            fill="#00f0ff"
            filter="url(#glow)"
            animate={{
              r: [8, 12, 8],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.3,
            }}
          />

          {/* Энергетическая линия на лбу - плавная */}
          <motion.path
            d="M 120,130 Q 160,110 200,110 Q 240,110 280,130"
            fill="none"
            stroke="#ff00ff"
            strokeWidth="2"
            strokeLinecap="round"
            animate={{
              d: [
                "M 120,130 Q 160,110 200,110 Q 240,110 280,130",
                "M 120,125 Q 160,105 200,105 Q 240,105 280,125",
                "M 120,130 Q 160,110 200,110 Q 240,110 280,130",
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Скуловые линии - плавные */}
          <motion.path
            d="M 90,200 Q 110,190 120,200"
            fill="none"
            stroke="#00f0ff"
            strokeWidth="1.5"
            animate={{
              strokeOpacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.path
            d="M 310,200 Q 290,190 280,200"
            fill="none"
            stroke="#00f0ff"
            strokeWidth="1.5"
            animate={{
              strokeOpacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          />

          {/* Рот - плавная линия */}
          <motion.path
            d="M 150,250 Q 200,270 250,250"
            fill="none"
            stroke="#ff00ff"
            strokeWidth="2.5"
            strokeLinecap="round"
            animate={{
              d: [
                "M 150,250 Q 200,270 250,250",
                "M 150,250 Q 200,275 250,250",
                "M 150,250 Q 200,270 250,250",
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Боковые светодиоды */}
          <motion.circle
            cx="80"
            cy="200"
            r="5"
            fill="#ff00ff"
            filter="url(#glow)"
            animate={{
              r: [5, 8, 5],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.circle
            cx="320"
            cy="200"
            r="5"
            fill="#ff00ff"
            filter="url(#glow)"
            animate={{
              r: [5, 8, 5],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.7,
            }}
          />
        </motion.g>

        {/* Определения для фильтров */}
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          
          <linearGradient id="cyberGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#ff00ff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#00f0ff" stopOpacity="0.8" />
          </linearGradient>
        </defs>
      </SVGContainer>
    </MaskContainer>
  );
};

export default RobotMask;