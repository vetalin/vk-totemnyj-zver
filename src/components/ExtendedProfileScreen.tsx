import { useState, useEffect } from 'react';
import { Button, Text, Title } from '@vkontakte/vkui';
import bridge from '@vkontakte/vk-bridge';
import type { TotemAnimal, Rank } from '../types';
import { totemAnimals } from '../data/quiz';

interface ExtendedProfileScreenProps {
  animal: TotemAnimal;
  rank: Rank;
  onBack: () => void;
}

export function ExtendedProfileScreen({ animal, rank, onBack }: ExtendedProfileScreenProps) {
  const [sectionsVisible, setSectionsVisible] = useState([false, false, false, false]);

  useEffect(() => {
    [0, 1, 2, 3].forEach((i) => {
      setTimeout(() => {
        setSectionsVisible((prev) => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
      }, 200 + i * 150);
    });
  }, []);

  const bestMatch = totemAnimals[animal.compatibility.best];
  const goodMatch = totemAnimals[animal.compatibility.good];
  const challengeMatch = totemAnimals[animal.compatibility.challenge];
  const [gradFrom, gradTo] = animal.colors;

  const handleShareProfile = async () => {
    try {
      await bridge.send('VKWebAppShowWallPostBox', {
        message: `🐾 Мой подробный тотемный профиль:\n\n${animal.emoji} ${animal.name}\n${rank.icon} ${rank.rank}\n\n💪 Сильная сторона: ${animal.strengths}\n\n${animal.motto}\n\n❤️ Идеальный партнёр: ${bestMatch.emoji} ${bestMatch.name}\n\n🔮 Узнай свой тотем и сравни!\n\n#ТотемныйЗверь #МойТотем`,
        attachments: `https://vk.com/app${import.meta.env.VITE_VK_APP_ID || '54500031'}`,
      } as never);
    } catch (e) {
      try {
        await bridge.send('VKWebAppShare', {
          link: `https://vk.com/app${import.meta.env.VITE_VK_APP_ID || '54500031'}`,
        });
      } catch (_) { /* */ }
    }
  };

  const sectionStyle = (index: number): React.CSSProperties => ({
    opacity: sectionsVisible[index] ? 1 : 0,
    transform: sectionsVisible[index] ? 'translateY(0)' : 'translateY(15px)',
    transition: 'all 0.4s ease',
  });

  return (
    <div className="screen-enter" style={{ padding: '12px 16px 40px' }}>
      {/* Mini card header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          padding: '16px 18px',
          borderRadius: '20px',
          background: `linear-gradient(135deg, ${gradFrom}, ${gradTo})`,
          marginBottom: '16px',
        }}
      >
        <span style={{ fontSize: '48px', lineHeight: 1 }}>{animal.emoji}</span>
        <div>
          <Title level="2" style={{ color: 'white', fontWeight: '800', fontSize: '22px', marginBottom: '2px' }}>
            {animal.name}
          </Title>
          <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: '13px' }}>
            {rank.icon} {rank.rank} • {animal.traits.join(' • ')}
          </Text>
        </div>
      </div>

      {/* Strengths */}
      <div style={{ ...sectionStyle(0), marginBottom: '12px' }}>
        <div className="profile-section">
          <div className="profile-section-header">
            <span style={{ fontSize: '20px' }}>💪</span>
            <Text style={{ fontWeight: '700', fontSize: '15px' }}>Сильные стороны</Text>
          </div>
          <Text style={{ lineHeight: 1.7, opacity: 0.85 }}>
            {animal.strengths}
          </Text>
        </div>
      </div>

      {/* Weaknesses */}
      <div style={{ ...sectionStyle(1), marginBottom: '12px' }}>
        <div className="profile-section">
          <div className="profile-section-header">
            <span style={{ fontSize: '20px' }}>🎭</span>
            <Text style={{ fontWeight: '700', fontSize: '15px' }}>Зона роста</Text>
          </div>
          <Text style={{ lineHeight: 1.7, opacity: 0.85 }}>
            {animal.weaknesses}
          </Text>
        </div>
      </div>

      {/* Motto */}
      <div style={{ ...sectionStyle(2), marginBottom: '12px' }}>
        <div
          style={{
            padding: '18px',
            borderRadius: '16px',
            background: `linear-gradient(135deg, ${gradFrom}12, ${gradTo}12)`,
            border: `1px solid ${gradFrom}25`,
            textAlign: 'center',
          }}
        >
          <Text style={{ fontSize: '11px', opacity: 0.5, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px', display: 'block' }}>
            Девиз
          </Text>
          <Text style={{ fontSize: '16px', fontWeight: '700', lineHeight: 1.5, fontStyle: 'italic' }}>
            {animal.motto}
          </Text>
        </div>
      </div>

      {/* Compatibility quick view */}
      <div style={{ ...sectionStyle(3), marginBottom: '20px' }}>
        <div className="profile-section">
          <div className="profile-section-header">
            <span style={{ fontSize: '20px' }}>❤️</span>
            <Text style={{ fontWeight: '700', fontSize: '15px' }}>Совместимость</Text>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <CompatRow emoji={bestMatch.emoji} name={bestMatch.name} label="Идеальная пара" icon="💕" />
            <CompatRow emoji={goodMatch.emoji} name={goodMatch.name} label="Хорошая пара" icon="💚" />
            <CompatRow emoji={challengeMatch.emoji} name={challengeMatch.name} label="Сложно, но интересно" icon="⚡" />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <Button
          size="l"
          stretched
          mode="primary"
          onClick={handleShareProfile}
          style={{ height: '48px', borderRadius: '14px', fontWeight: '700' }}
        >
          Поделиться профилем 📣
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

function CompatRow({ emoji, name, label, icon }: {
  emoji: string;
  name: string;
  label: string;
  icon: string;
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <span style={{ fontSize: '24px' }}>{emoji}</span>
      <div style={{ flex: 1 }}>
        <Text style={{ fontWeight: '600', fontSize: '14px' }}>{name}</Text>
        <Text style={{ fontSize: '12px', opacity: 0.5 }}>{label}</Text>
      </div>
      <span style={{ fontSize: '16px' }}>{icon}</span>
    </div>
  );
}
