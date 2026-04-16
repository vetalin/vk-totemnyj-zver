import { useState } from 'react';
import { Text, Title } from '@vkontakte/vkui';
import bridge from '@vkontakte/vk-bridge';
import type { Question, ElementType } from '../types';

interface QuizScreenProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  onAnswer: (element: ElementType) => void;
  onGoBack: () => void;
}

const ELEMENT_GRADIENTS: Record<ElementType, [string, string]> = {
  fire: ['#FF6B35', '#FF0844'],
  earth: ['#56ab2f', '#a8e063'],
  air: ['#4776E6', '#8E54E9'],
  water: ['#0099F7', '#00C9FF'],
};

const ELEMENT_COLORS: Record<ElementType, string> = {
  fire: '#FF6B35',
  earth: '#56ab2f',
  air: '#4776E6',
  water: '#0099F7',
};

const ELEMENT_BACKGROUNDS: Record<ElementType, string> = {
  fire: 'rgba(255, 107, 53, 0.12)',
  earth: 'rgba(86, 171, 47, 0.12)',
  air: 'rgba(71, 118, 230, 0.12)',
  water: 'rgba(0, 153, 247, 0.12)',
};

export function QuizScreen({ question, currentIndex, totalQuestions, onAnswer, onGoBack }: QuizScreenProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const progress = ((currentIndex + 1) / totalQuestions) * 100;

  const handleBack = () => {
    if (isAnimating || currentIndex === 0) return;
    try {
      bridge.send('VKWebAppTapticImpactOccurred', { style: 'light' });
    } catch {
      // haptic not available
    }
    onGoBack();
  };

  const handleAnswer = (element: ElementType, index: number) => {
    if (isAnimating) return;
    setSelectedIndex(index);
    setIsAnimating(true);

    try {
      bridge.send('VKWebAppTapticNotificationOccurred', { type: 'success' });
    } catch (e) {
      try {
        bridge.send('VKWebAppFlashSetLevel', { level: 0 });
      } catch (_) {
        // Haptic not available
      }
    }

    setTimeout(() => {
      setSelectedIndex(null);
      setIsAnimating(false);
      onAnswer(element);
    }, 250);
  };

  // Color for progress bar based on question index cycling through elements
  const progressElement: ElementType = (['fire', 'earth', 'air', 'water'] as ElementType[])[
    currentIndex % 4
  ];
  const [gradFrom, gradTo] = ELEMENT_GRADIENTS[progressElement];

  return (
    <div className="screen-enter" style={{ padding: '16px 16px 32px' }}>
      {/* Progress bar */}
      <div className="quiz-progress-wrapper">
        <div
          className="quiz-progress-fill"
          style={{
            width: `${progress}%`,
            background: `linear-gradient(90deg, ${gradFrom}, ${gradTo})`,
          }}
        />
      </div>

      {/* Question counter */}
      <Text
        style={{
          textAlign: 'center',
          display: 'block',
          marginBottom: '8px',
          opacity: 0.5,
          fontSize: '13px',
          fontWeight: '600',
          letterSpacing: '0.5px',
          textTransform: 'uppercase',
        }}
      >
        Вопрос {currentIndex + 1} / {totalQuestions}
      </Text>

      {/* Question text */}
      <Title
        level="2"
        style={{
          textAlign: 'center',
          marginBottom: question.subtitle ? '8px' : '28px',
          display: 'block',
          fontSize: '20px',
          fontWeight: '700',
          lineHeight: 1.4,
          padding: '0 8px',
        }}
      >
        {question.text}
      </Title>

      {/* Subtitle */}
      {question.subtitle && (
        <Text
          style={{
            textAlign: 'center',
            display: 'block',
            marginBottom: '24px',
            opacity: 0.4,
            fontSize: '13px',
            fontStyle: 'italic',
          }}
        >
          {question.subtitle}
        </Text>
      )}

      {/* Back to previous question */}
      {currentIndex > 0 && (
        <button
          type="button"
          onClick={handleBack}
          disabled={isAnimating}
          className="quiz-back-btn"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 14px',
            marginBottom: '14px',
            background: 'rgba(128,128,128,0.1)',
            border: 'none',
            borderRadius: '12px',
            cursor: isAnimating ? 'default' : 'pointer',
            opacity: isAnimating ? 0.4 : 1,
            fontSize: '13px',
            fontWeight: '600',
            color: 'var(--vkui--color_text_secondary)',
            transition: 'all 0.15s ease',
          }}
          aria-label="Вернуться к предыдущему вопросу"
        >
          <span style={{ fontSize: '14px', lineHeight: 1 }}>←</span>
          <span>К предыдущему</span>
        </button>
      )}

      {/* Answers */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {question.answers.map((answer, index) => {
          const isSelected = selectedIndex === index;
          const elemColor = ELEMENT_COLORS[answer.element];
          const elemBg = ELEMENT_BACKGROUNDS[answer.element];
          const [gFrom, gTo] = ELEMENT_GRADIENTS[answer.element];

          return (
            <button
              key={index}
              className="quiz-answer-card"
              onClick={() => handleAnswer(answer.element, index)}
              disabled={isAnimating}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '16px 18px',
                border: `2px solid ${isSelected ? elemColor : 'rgba(128,128,128,0.15)'}`,
                borderRadius: '16px',
                background: isSelected
                  ? `linear-gradient(135deg, ${gFrom}22, ${gTo}22)`
                  : elemBg,
                cursor: 'pointer',
                width: '100%',
                textAlign: 'left',
                transition: 'all 0.15s ease',
                transform: isSelected ? 'scale(0.97)' : 'scale(1)',
              }}
            >
              {answer.emoji && (
                <span
                  style={{
                    fontSize: '28px',
                    lineHeight: 1,
                    minWidth: '36px',
                    textAlign: 'center',
                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
                  }}
                >
                  {answer.emoji}
                </span>
              )}
              <span
                style={{
                  fontSize: '15px',
                  fontWeight: '600',
                  color: isSelected ? elemColor : 'var(--vkui--color_text_primary)',
                  lineHeight: 1.3,
                  flex: 1,
                }}
              >
                {answer.text}
              </span>
              {isSelected && (
                <span style={{ fontSize: '18px', animation: 'scaleIn 200ms ease-out' }}>✓</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
