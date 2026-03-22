import { Button, Card, Progress, Title, Text, CardGrid } from '@vkontakte/vkui';
import type { Question, ElementType } from '../types';

interface QuizScreenProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  onAnswer: (element: ElementType) => void;
}

export function QuizScreen({ question, currentIndex, totalQuestions, onAnswer }: QuizScreenProps) {
  const progress = ((currentIndex + 1) / totalQuestions) * 100;

  return (
    <div style={{ padding: '16px' }}>
      <div style={{ marginBottom: '16px' }}>
        <Progress value={progress} />
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
              onClick={() => onAnswer(answer.element)}
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
