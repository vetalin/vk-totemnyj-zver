import { useState, useEffect } from 'react';
import { Button, Card, Title, Text, CardGrid, Separator } from '@vkontakte/vkui';
import bridge from '@vkontakte/vk-bridge';
import type { TotemAnimal, ElementType, Rank } from '../types';

interface ResultScreenProps {
  animal: TotemAnimal;
  rank: Rank;
  answers: ElementType[];
  onRestart: () => void;
}

type RevealPhase = 'countdown' | 'revealed';

export function ResultScreen({ animal, rank, onRestart }: ResultScreenProps) {
  const [revealPhase, setRevealPhase] = useState<RevealPhase>('countdown');
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 600);
      return () => clearTimeout(timer);
    } else if (revealPhase === 'countdown') {
      setRevealPhase('revealed');
      try {
        bridge.send('VKWebAppFlashSetLevel', { level: 2 });
      } catch (e) {
        // Haptic not available
      }
    }
  }, [countdown, revealPhase]);

  const handleShare = async () => {
    try {
      await bridge.send('VKWebAppShare', {
        link: `https://vk.com/app${import.meta.env.VITE_VK_APP_ID || 54498046}`,
      });
    } catch (e) {
      console.log('Share not available');
    }
  };

  return (
    <div style={{ padding: '16px', textAlign: 'center' }}>
      <Title level="1" style={{ marginBottom: '8px', fontSize: '24px' }}>
        Твой тотемный зверь
      </Title>
      
      <Separator style={{ margin: '16px 0' }} />
      
      {revealPhase === 'countdown' ? (
        <div 
          key={countdown}
          className="animate-countdownPulse"
          style={{ 
            fontSize: '120px', 
            fontWeight: 'bold',
            color: 'var(--vkui--color_text_accent)',
            height: '200px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {countdown || '🐾'}
        </div>
      ) : (
        <>
          <div 
            className="animate-scaleIn"
            style={{ fontSize: '96px', marginBottom: '16px' }}
          >
            {animal.emoji}
          </div>
          
          <Title level="2" style={{ marginBottom: '8px' }}>
            {animal.name}
          </Title>
          
          <Text 
            style={{ 
              display: 'block', 
              marginBottom: '16px',
              color: 'var(--vkui--color_text_accent)'
            }}
          >
            {rank.rank} • {rank.subtitle}
          </Text>

          <CardGrid style={{ marginBottom: '24px' }}>
            <Card style={{ padding: '16px' }}>
              <Text>
                {animal.description}
              </Text>
            </Card>
          </CardGrid>

          <CardGrid>
            <Button
              size="l"
              stretched
              mode="secondary"
              onClick={handleShare}
            >
              Поделиться результатом
            </Button>
            
            <Button
              size="l"
              stretched
              mode="primary"
              onClick={onRestart}
            >
              Пройти снова
            </Button>
          </CardGrid>
        </>
      )}
    </div>
  );
}
