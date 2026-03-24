import { Button, Card, Progress, Title, Text, CardGrid } from '@vkontakte/vkui';
import bridge from '@vkontakte/vk-bridge';
import type { Question, ElementType } from '../types';

interface QuizScreenProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  lastElement?: ElementType;
  onAnswer: (element: ElementType) => void;
}

const ELEMENT_COLORS: Record<ElementType, string> = {
  fire: '#FF6B35',
  earth: '#6B8E23',
  air: '#87CEEB',
  water: '#1E90FF',
};

export function QuizScreen({ question, currentIndex, totalQuestions, lastElement, onAnswer }: QuizScreenProps) {
  const progress = ((currentIndex + 1) / totalQuestions) * 100;
  const progressColor = lastElement ? ELEMENT_COLORS[lastElement] : ELEMENT_COLORS[question.answers[0]?.element as ElementType] || '#6B8E23';

  const handleAnswer = (element: ElementType) => {
    try {
      bridge.send('VKWebAppFlashSetLevel', { level: 1 });
    } catch (e) {
      // Haptic not available
    }
    onAnswer(element);
  };

  return (
    <div style={{ padding: '16px' }}>
      <div style={{ marginBottom: '16px' }}>
        <Progress 
          value={progress} 
          style={{ 
            '--vkui_internal_progress_color': progressColor,
          } as React.CSSProperties}
        />
      </div>
      
      <Text style={{ textAlign: 'center', display: 'block', marginBottom: '8px', opacity: 0.7 }}>
        Вопрос {currentIndex + 1} из {totalQuestions}
      </Text>
      
      <Title level="2" style={{ textAlign: 'center', marginBottom: '24px', display: 'block' }}>
        {question.text}
      </Title>

      <CardGrid>
        {question.answers.map((answer, index) => (
          <Card 
            key={index} 
            style={{ padding: '16px' }}
          >
            <Button
              size="l"
              stretched
              mode="primary"
              onClick={() => handleAnswer(answer.element)}
              style={{ minHeight: '56px' }}
            >
              {answer.text}
            </Button>
          </Card>
        ))}
      </CardGrid>
    </div>
  );
}
