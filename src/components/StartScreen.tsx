import { Button, Headline, Text, Title } from '@vkontakte/vkui';

interface StartScreenProps {
  onStart: () => void;
}

const FLOATING_ANIMALS = [
  { emoji: '🐺', label: 'Волк' },
  { emoji: '🦁', label: 'Лев' },
  { emoji: '🦅', label: 'Орёл' },
  { emoji: '🐬', label: 'Дельфин' },
  { emoji: '🐻', label: 'Медведь' },
  { emoji: '🦊', label: 'Лиса' },
  { emoji: '🦉', label: 'Сова' },
  { emoji: '🐆', label: 'Леопард' },
];

export function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="start-screen screen-enter">
      {/* Floating animals */}
      <div className="start-animals-row" style={{ marginBottom: '24px' }}>
        {FLOATING_ANIMALS.slice(0, 4).map((a, i) => (
          <div
            key={a.emoji}
            className="start-animal-item"
            style={{ animationDelay: `${i * 0.3}s` }}
          >
            {a.emoji}
          </div>
        ))}
      </div>

      <div className="start-animals-row">
        {FLOATING_ANIMALS.slice(4).map((a, i) => (
          <div
            key={a.emoji}
            className="start-animal-item"
            style={{ animationDelay: `${(i + 4) * 0.3}s` }}
          >
            {a.emoji}
          </div>
        ))}
      </div>

      {/* Title */}
      <div style={{ textAlign: 'center', marginBottom: '12px', marginTop: '24px' }}>
        <Title level="1" style={{ fontSize: '32px', fontWeight: '900', lineHeight: 1.2, marginBottom: '8px' }}>
          Твой тотемный зверь
        </Title>
        <Headline level="2" style={{ opacity: 0.6, fontWeight: '400' }}>
          Узнай, какое животное<br />символизирует твой дух
        </Headline>
      </div>

      {/* Stats chips */}
      <div className="start-stats" style={{ marginTop: '24px' }}>
        <div className="start-stat-chip">
          <span>⚡</span>
          <span>8 вопросов</span>
        </div>
        <div className="start-stat-chip">
          <span>🐾</span>
          <span>8 тотемов</span>
        </div>
        <div className="start-stat-chip">
          <span>⏱</span>
          <span>~2 минуты</span>
        </div>
      </div>

      {/* Description */}
      <div
        style={{
          margin: '20px 0 32px',
          padding: '16px 20px',
          background: 'rgba(128, 128, 128, 0.1)',
          borderRadius: '16px',
          textAlign: 'center',
          maxWidth: '360px',
          width: '100%',
        }}
      >
        <Text style={{ opacity: 0.8, lineHeight: 1.6 }}>
          Ответь честно — и мы откроем твоего духовного зверя. Волк, Лев, Орёл, Сова... кто ты?
        </Text>
      </div>

      {/* CTA Button */}
      <Button
        size="l"
        stretched
        mode="primary"
        onClick={onStart}
        style={{
          maxWidth: '320px',
          width: '100%',
          height: '52px',
          fontSize: '16px',
          fontWeight: '700',
          borderRadius: '16px',
        }}
      >
        Узнать тотемного зверя 🐾
      </Button>
    </div>
  );
}
