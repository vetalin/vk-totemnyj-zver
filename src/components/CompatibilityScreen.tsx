import { useState } from 'react';
import { Button, Text, Title } from '@vkontakte/vkui';
import bridge from '../bridge';
import type { TotemAnimal, AnimalId } from '../types';
import { totemAnimals, getCompatibilityLevel, compatibilityDescriptions } from '../data/quiz';

interface CompatibilityScreenProps {
  animal: TotemAnimal;
  onBack: () => void;
}

const COMPAT_ICONS: Record<string, string> = {
  best: '💕',
  good: '💚',
  challenge: '⚡',
  neutral: '🤝',
};

const COMPAT_LABELS: Record<string, string> = {
  best: 'Идеальная пара',
  good: 'Отличная совместимость',
  challenge: 'Огонь и лёд',
  neutral: 'Нейтральная',
};

const COMPAT_PERCENTS: Record<string, number> = {
  best: 95,
  good: 78,
  neutral: 55,
  challenge: 35,
};

const allAnimalIds: AnimalId[] = ['wolf', 'lion', 'bear', 'fox', 'eagle', 'owl', 'dolphin', 'leopard'];

export function CompatibilityScreen({ animal, onBack }: CompatibilityScreenProps) {
  const [selectedId, setSelectedId] = useState<AnimalId | null>(null);

  const handleChallengeFriend = async () => {
    try {
      await bridge.send('VKWebAppShowWallPostBox', {
        message: `🐾 Я — ${animal.emoji} ${animal.name}!\n\n❤️ Мой идеальный тотемный партнёр — ${totemAnimals[animal.compatibility.best].emoji} ${totemAnimals[animal.compatibility.best].name}\n\n🎯 А кто подходит ТЕБЕ? Пройди тест и проверь нашу совместимость!\n\n#ТотемныйЗверь #Совместимость`,
        attachments: `https://vk.com/app${import.meta.env.VITE_VK_APP_ID || '54498046'}`,
      } as never);
    } catch (e) {
      try {
        await bridge.send('VKWebAppShare', {
          link: `https://vk.com/app${import.meta.env.VITE_VK_APP_ID || '54498046'}`,
        });
      } catch (_) { /* */ }
    }
  };

  const handleInvite = async () => {
    try {
      await bridge.send('VKWebAppShowInviteBox', {} as never);
    } catch (e) { /* */ }
  };

  const selected = selectedId ? totemAnimals[selectedId] : null;
  const level = selectedId ? getCompatibilityLevel(animal.id, selectedId) : null;

  return (
    <div className="screen-enter" style={{ padding: '12px 16px 40px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <div style={{ fontSize: '48px', marginBottom: '8px' }}>
          {animal.emoji}
        </div>
        <Title level="2" style={{ fontSize: '20px', fontWeight: '800', marginBottom: '4px' }}>
          Совместимость {animal.name}
        </Title>
        <Text style={{ opacity: 0.5, fontSize: '13px' }}>
          Выбери тотем друга и узнай, совместимы ли вы
        </Text>
      </div>

      {/* Animal grid */}
      <div className="compat-grid">
        {allAnimalIds.filter(id => id !== animal.id).map((id) => {
          const a = totemAnimals[id];
          const isSelected = selectedId === id;
          const compatLevel = getCompatibilityLevel(animal.id, id);
          return (
            <button
              key={id}
              onClick={() => setSelectedId(isSelected ? null : id)}
              className="compat-animal-btn"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '6px',
                padding: '14px 8px',
                borderRadius: '16px',
                border: isSelected
                  ? `2px solid ${a.colors[0]}`
                  : '2px solid rgba(128,128,128,0.12)',
                background: isSelected
                  ? `linear-gradient(135deg, ${a.colors[0]}15, ${a.colors[1]}15)`
                  : 'rgba(128,128,128,0.05)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                position: 'relative',
              }}
            >
              <span style={{ fontSize: '32px', lineHeight: 1 }}>{a.emoji}</span>
              <Text style={{ fontSize: '12px', fontWeight: '600' }}>{a.name}</Text>
              <Text style={{ fontSize: '10px', opacity: 0.5 }}>
                {COMPAT_ICONS[compatLevel]}
              </Text>
            </button>
          );
        })}
      </div>

      {/* Selected compatibility result */}
      {selected && level && (
        <div
          className="animate-fadeInUp"
          style={{
            marginTop: '16px',
            padding: '20px',
            borderRadius: '20px',
            background: `linear-gradient(135deg, ${animal.colors[0]}10, ${selected.colors[0]}10)`,
            border: '1px solid rgba(128,128,128,0.1)',
          }}
        >
          {/* Pair visual */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '16px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '44px', marginBottom: '4px' }}>{animal.emoji}</div>
              <Text style={{ fontSize: '12px', fontWeight: '600' }}>{animal.name}</Text>
            </div>
            <div style={{ fontSize: '28px' }}>{COMPAT_ICONS[level]}</div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '44px', marginBottom: '4px' }}>{selected.emoji}</div>
              <Text style={{ fontSize: '12px', fontWeight: '600' }}>{selected.name}</Text>
            </div>
          </div>

          {/* Compatibility bar */}
          <div style={{ marginBottom: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <Text style={{ fontWeight: '700', fontSize: '15px' }}>{COMPAT_LABELS[level]}</Text>
              <Text style={{ fontWeight: '700', fontSize: '15px', color: animal.colors[0] }}>
                {COMPAT_PERCENTS[level]}%
              </Text>
            </div>
            <div style={{ height: '8px', background: 'rgba(128,128,128,0.15)', borderRadius: '4px', overflow: 'hidden' }}>
              <div
                className="compat-bar-fill"
                style={{
                  height: '100%',
                  width: `${COMPAT_PERCENTS[level]}%`,
                  background: `linear-gradient(90deg, ${animal.colors[0]}, ${selected.colors[0]})`,
                  borderRadius: '4px',
                  transition: 'width 0.8s ease',
                }}
              />
            </div>
          </div>

          <Text style={{ lineHeight: 1.6, opacity: 0.8, fontSize: '14px' }}>
            {compatibilityDescriptions[level]}
          </Text>
        </div>
      )}

      {/* Viral CTAs */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
        <Button
          size="l"
          stretched
          mode="primary"
          onClick={handleChallengeFriend}
          style={{ height: '48px', borderRadius: '14px', fontWeight: '700' }}
        >
          Проверить совместимость с другом 💬
        </Button>

        <Button
          size="l"
          stretched
          mode="secondary"
          onClick={handleInvite}
          style={{ height: '46px', borderRadius: '14px', fontWeight: '600' }}
        >
          Позвать друзей пройти тест 🎯
        </Button>

        <Button
          size="l"
          stretched
          mode="tertiary"
          onClick={onBack}
          style={{ height: '44px', borderRadius: '14px' }}
        >
          ← Назад к результату
        </Button>
      </div>
    </div>
  );
}
