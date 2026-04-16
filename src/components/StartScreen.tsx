import { useState, useEffect } from 'react';
import { Button, Headline, Text, Title } from '@vkontakte/vkui';
import type { SavedResult, TotemAnimal } from '../types';
import { getDailyTip } from '../data/quiz';

interface StartScreenProps {
  onStart: () => void;
  lastResult: SavedResult | null;
  lastAnimal: TotemAnimal | null;
  onViewLastResult: () => void;
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

// Fake social proof counter that increments
function useLiveCounter(base: number): number {
  const [count, setCount] = useState(base);
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((c) => c + Math.floor(Math.random() * 3) + 1);
    }, 4000 + Math.random() * 3000);
    return () => clearInterval(interval);
  }, []);
  return count;
}

export function StartScreen({ onStart, lastResult, lastAnimal, onViewLastResult }: StartScreenProps) {
  const passedCount = useLiveCounter(14832);
  const dailyTip = lastAnimal ? getDailyTip(lastAnimal) : null;
  const isReturning = Boolean(lastResult && lastAnimal);

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
          {isReturning ? 'С возвращением' : 'Твой тотемный зверь'}
        </Title>
        <Headline level="2" style={{ opacity: 0.6, fontWeight: '400' }}>
          {isReturning
            ? <>Твой тотем ждал тебя<br />— и у него есть совет</>
            : <>Узнай, какое животное<br />символизирует твой дух</>}
        </Headline>
      </div>

      {/* Returning user card: last totem + daily tip */}
      {isReturning && lastAnimal && dailyTip && (
        <button
          type="button"
          onClick={onViewLastResult}
          className="animate-fadeInUp returning-totem-card"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            width: '100%',
            maxWidth: '360px',
            padding: '16px 18px',
            margin: '12px 0 8px',
            background: `linear-gradient(135deg, ${lastAnimal.colors[0]}22, ${lastAnimal.colors[1]}22)`,
            border: `1.5px solid ${lastAnimal.colors[0]}55`,
            borderRadius: '18px',
            cursor: 'pointer',
            textAlign: 'left',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '42px', lineHeight: 1 }}>{lastAnimal.emoji}</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <Text style={{ fontSize: '11px', opacity: 0.55, letterSpacing: '0.8px', textTransform: 'uppercase', display: 'block' }}>
                Твой тотем
              </Text>
              <Text style={{ fontSize: '17px', fontWeight: '800', display: 'block', lineHeight: 1.2 }}>
                {lastAnimal.name}
              </Text>
              {lastResult && (
                <Text style={{ fontSize: '12px', opacity: 0.55, display: 'block', marginTop: '2px' }}>
                  {lastResult.rankIcon} {lastResult.rank}
                </Text>
              )}
            </div>
            <span style={{ opacity: 0.35, fontSize: '18px' }}>›</span>
          </div>

          <div
            style={{
              padding: '10px 12px',
              borderRadius: '12px',
              background: 'rgba(0,0,0,0.15)',
              borderLeft: `3px solid ${lastAnimal.colors[0]}`,
            }}
          >
            <Text style={{ fontSize: '11px', opacity: 0.5, display: 'block', marginBottom: '4px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
              💡 Совет дня
            </Text>
            <Text style={{ fontSize: '14px', lineHeight: 1.45, fontStyle: 'italic' }}>
              {dailyTip}
            </Text>
          </div>
        </button>
      )}

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

      {/* Social proof */}
      <div
        style={{
          margin: '20px 0 12px',
          padding: '12px 20px',
          background: 'rgba(128, 128, 128, 0.08)',
          borderRadius: '14px',
          textAlign: 'center',
          maxWidth: '360px',
          width: '100%',
        }}
      >
        <Text style={{ fontSize: '13px', opacity: 0.6 }}>
          🔥 Уже прошли <span style={{ fontWeight: '700', opacity: 1 }}>{passedCount.toLocaleString('ru-RU')}</span> человек
        </Text>
      </div>

      {/* Description */}
      <div
        style={{
          margin: '0 0 28px',
          padding: '16px 20px',
          background: 'rgba(128, 128, 128, 0.1)',
          borderRadius: '16px',
          textAlign: 'center',
          maxWidth: '360px',
          width: '100%',
        }}
      >
        <Text style={{ opacity: 0.8, lineHeight: 1.6 }}>
          8 вопросов раскроют твоего внутреннего зверя. Волк, Лев, Орёл или Леопард — кто скрыт в тебе?
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
          height: '54px',
          fontSize: '16px',
          fontWeight: '700',
          borderRadius: '16px',
        }}
      >
        {isReturning ? 'Пройти заново 🐾' : 'Узнать своего зверя 🐾'}
      </Button>

      {/* Viral hint */}
      <Text
        style={{
          marginTop: '16px',
          fontSize: '12px',
          opacity: 0.35,
          textAlign: 'center',
        }}
      >
        {isReturning ? 'А вдруг сегодня тотем поменяется?' : 'Потом сможешь сравнить результат с друзьями'}
      </Text>
    </div>
  );
}
