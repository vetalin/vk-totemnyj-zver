import { Button, Card, Title, Text, CardGrid, Separator } from '@vkontakte/vkui';
import type { TotemAnimal } from '../types';

interface ResultScreenProps {
  animal: TotemAnimal;
  onRestart: () => void;
}

export function ResultScreen({ animal, onRestart }: ResultScreenProps) {
  const handleShare = async () => {
    try {
      // @ts-ignore - VK API
      if (window.VK && window.VK.Share) {
        // @ts-ignore
        window.VK.Share.click();
      }
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
      
      <div style={{ fontSize: '96px', marginBottom: '16px' }}>
        {animal.emoji}
      </div>
      
      <Title level="2" style={{ marginBottom: '16px' }}>
        {animal.name}
      </Title>

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
    </div>
  );
}
