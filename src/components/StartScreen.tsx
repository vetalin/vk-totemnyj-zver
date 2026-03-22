import { Button, Card, CardGrid, Headline, Text, Title } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

interface StartScreenProps {
  onStart: () => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div style={{ padding: '16px', textAlign: 'center' }}>
      <Title level="1" style={{ marginBottom: '8px', fontSize: '28px' }}>
        🦁 Твой тотемный зверь 🦁
      </Title>
      <Headline level="2" style={{ marginBottom: '24px', opacity: 0.7 }}>
        Узнай, какое животное символизирует твой дух
      </Headline>
      
      <CardGrid style={{ marginBottom: '24px' }}>
        <Card style={{ padding: '16px' }}>
          <Text>
            Пройди короткий тест из 5 вопросов и открой для себя своё тотемное животное — 
            то, что отражает твой характер и внутренний мир.
          </Text>
        </Card>
      </CardGrid>

      <div style={{ fontSize: '64px', marginBottom: '24px' }}>
        🐺 🐻 🦅 🐬
      </div>

      <Button 
        size="l" 
        stretched 
        mode="primary"
        onClick={onStart}
        style={{ maxWidth: '280px', margin: '0 auto' }}
      >
        Узнать тотемного зверя
      </Button>
    </div>
  );
}
