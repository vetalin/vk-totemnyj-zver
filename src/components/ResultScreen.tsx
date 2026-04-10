import { useState, useEffect } from 'react';
import { Button, Text, Title } from '@vkontakte/vkui';
import bridge from '@vkontakte/vk-bridge';
import type { TotemAnimal, ElementType, Rank } from '../types';
import { globalDistribution, totemAnimals } from '../data/quiz';

interface ResultScreenProps {
  animal: TotemAnimal;
  rank: Rank;
  answers: ElementType[];
  onRestart: () => void;
  onShowCompatibility: () => void;
  onShowExtended: () => void;
  extendedUnlocked: boolean;
  onUnlockExtended: () => void;
}

type Phase = 'countdown' | 'revealed';

const RARITY_LABELS: Record<string, string> = {
  common: 'Обычный',
  rare: '✦ Редкий',
  legendary: '★ Легендарный',
};

const RARITY_COLORS: Record<string, string> = {
  common: 'rgba(128,128,128,0.5)',
  rare: 'rgba(71, 118, 230, 0.6)',
  legendary: 'rgba(255, 215, 0, 0.6)',
};

export function ResultScreen({
  animal,
  rank,
  onRestart,
  onShowCompatibility,
  onShowExtended,
  extendedUnlocked,
  onUnlockExtended,
}: ResultScreenProps) {
  const [phase, setPhase] = useState<Phase>('countdown');
  const [countdown, setCountdown] = useState(3);
  const [showRating, setShowRating] = useState(false);
  const [traitsVisible, setTraitsVisible] = useState<boolean[]>([false, false, false]);
  const [adWatched, setAdWatched] = useState(extendedUnlocked);

  useEffect(() => {
    if (phase !== 'countdown') return;
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown((c) => c - 1), 700);
      return () => clearTimeout(timer);
    } else {
      setTimeout(() => {
        setPhase('revealed');
        try {
          bridge.send('VKWebAppTapticNotificationOccurred', { type: 'success' });
        } catch (e) {
          // ignore
        }

        // Stagger trait chips appearance
        [0, 1, 2].forEach((i) => {
          setTimeout(() => {
            setTraitsVisible((prev) => {
              const next = [...prev];
              next[i] = true;
              return next;
            });
          }, 600 + i * 180);
        });
      }, 200);
    }
  }, [countdown, phase]);

  // Wall post with rich text — viral mechanic
  const handleWallPost = async () => {
    try {
      await bridge.send('VKWebAppShowWallPostBox', {
        message: `🐾 Мой тотемный зверь — ${animal.emoji} ${animal.name}!\n\n${animal.description}\n\n${RARITY_LABELS[animal.rarity]} тотем\n${rank.icon} ${rank.rank}\n\n💬 А какой зверь скрыт в тебе? Пройди тест и узнай!\n\n#ТотемныйЗверь #Тотем${animal.name}`,
        attachments: `https://vk.com/app${import.meta.env.VITE_VK_APP_ID || '54498046'}`,
      } as never);
    } catch (e) {
      console.log('Wall post not available');
    }
  };

  // Share via VK native share dialog
  const handleShare = async () => {
    try {
      await bridge.send('VKWebAppShare', {
        link: `https://vk.com/app${import.meta.env.VITE_VK_APP_ID || '54498046'}`,
      });
    } catch (e) {
      console.log('Share not available');
    }
  };

  // Invite friends — viral mechanic
  const handleInviteFriends = async () => {
    try {
      await bridge.send('VKWebAppShowInviteBox', {} as never);
    } catch (e) {
      // Fallback: share
      handleShare();
    }
  };

  // Stories share
  const handleShareStories = async () => {
    try {
      await bridge.send('VKWebAppShowStoryBox', {
        background_type: 'gradient',
        first_gradient_color: animal.colors[0],
        second_gradient_color: animal.colors[1],
        stickers: [
          {
            sticker_type: 'renderable',
            sticker: {
              content_type: 'image',
              url: '',
              can_delete: false,
            },
          },
        ],
      } as never);
    } catch (e) {
      handleShare();
    }
  };

  // Rewarded ad for unlocking extended profile
  const handleWatchAd = async () => {
    try {
      await bridge.send('VKWebAppShowNativeAds', { ad_format: 'reward' } as never);
      setAdWatched(true);
      onUnlockExtended();
      try {
        bridge.send('VKWebAppTapticNotificationOccurred', { type: 'success' });
      } catch (_) { /* */ }
    } catch (e) {
      // Ad not available — unlock for free as fallback
      setAdWatched(true);
      onUnlockExtended();
    }
  };

  const [gradFrom, gradTo] = animal.colors;
  const bestMatch = totemAnimals[animal.compatibility.best];

  return (
    <div className="screen-enter" style={{ padding: '12px 16px 40px' }}>
      {phase === 'countdown' ? (
        /* COUNTDOWN PHASE */
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '60vh',
            gap: '16px',
          }}
        >
          <Text style={{ opacity: 0.6, fontSize: '14px', letterSpacing: '1px', textTransform: 'uppercase' }}>
            Анализируем твои ответы...
          </Text>
          <div
            key={countdown}
            className="animate-countdownPulse"
            style={{
              fontSize: '110px',
              fontWeight: '900',
              background: `linear-gradient(135deg, ${gradFrom}, ${gradTo})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              lineHeight: 1,
            }}
          >
            {countdown || '🐾'}
          </div>
        </div>
      ) : (
        /* REVEAL PHASE */
        <>
          {/* Animal card */}
          <div
            className="result-animal-card animate-fadeInUp"
            style={{
              background: `linear-gradient(135deg, ${gradFrom}, ${gradTo})`,
            }}
          >
            <div className="result-animal-bg">
              {/* Rarity badge */}
              <div
                className="result-rarity-badge"
                style={{ background: RARITY_COLORS[animal.rarity] }}
              >
                {RARITY_LABELS[animal.rarity]}
              </div>

              {/* Animal emoji */}
              <div
                className="animate-scaleInBounce"
                style={{
                  fontSize: '96px',
                  marginBottom: '8px',
                  filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.3))',
                  lineHeight: 1,
                }}
              >
                {animal.emoji}
              </div>

              {/* Animal name */}
              <Title
                level="1"
                style={{
                  color: 'white',
                  textAlign: 'center',
                  fontWeight: '900',
                  fontSize: '32px',
                  marginBottom: '8px',
                  textShadow: '0 2px 8px rgba(0,0,0,0.3)',
                }}
              >
                {animal.name}
              </Title>

              {/* Rank badge */}
              <div className="result-rank-badge">
                <span>{rank.icon}</span>
                <span>{rank.rank}</span>
                <span style={{ opacity: 0.7 }}>• {rank.subtitle}</span>
              </div>

              {/* Traits */}
              <div className="result-traits-row">
                {animal.traits.map((trait, i) => (
                  <div
                    key={trait}
                    className="result-trait-chip"
                    style={{
                      background: 'rgba(255,255,255,0.25)',
                      opacity: traitsVisible[i] ? 1 : 0,
                      transform: traitsVisible[i] ? 'scale(1) translateY(0)' : 'scale(0.8) translateY(10px)',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {trait}
                  </div>
                ))}
              </div>

              {/* Motto */}
              <Text
                style={{
                  color: 'rgba(255,255,255,0.85)',
                  fontStyle: 'italic',
                  textAlign: 'center',
                  fontSize: '14px',
                  lineHeight: 1.4,
                }}
              >
                {animal.motto}
              </Text>
            </div>
          </div>

          {/* Description */}
          <div
            className="animate-fadeInUp"
            style={{
              padding: '16px 18px',
              background: 'rgba(128,128,128,0.1)',
              borderRadius: '16px',
              marginBottom: '12px',
              animationDelay: '200ms',
            }}
          >
            <Text style={{ lineHeight: 1.7, opacity: 0.9 }}>
              {animal.description}
            </Text>
          </div>

          {/* === UNLOCK EXTENDED PROFILE — MONETIZATION === */}
          {!adWatched ? (
            <button
              onClick={handleWatchAd}
              className="unlock-card"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                width: '100%',
                padding: '14px 18px',
                background: `linear-gradient(135deg, ${gradFrom}18, ${gradTo}18)`,
                border: `1.5px dashed ${gradFrom}60`,
                borderRadius: '16px',
                cursor: 'pointer',
                marginBottom: '12px',
              }}
            >
              <span style={{ fontSize: '28px' }}>🔓</span>
              <div style={{ textAlign: 'left', flex: 1 }}>
                <Text style={{ fontWeight: '700', display: 'block', fontSize: '14px' }}>
                  Открой полный профиль
                </Text>
                <Text style={{ fontSize: '12px', opacity: 0.5, display: 'block' }}>
                  Сильные стороны, слабости, совместимость
                </Text>
              </div>
              <div
                style={{
                  padding: '6px 12px',
                  borderRadius: '12px',
                  background: `linear-gradient(135deg, ${gradFrom}, ${gradTo})`,
                  color: 'white',
                  fontSize: '11px',
                  fontWeight: '700',
                  whiteSpace: 'nowrap',
                }}
              >
                Бесплатно ▶
              </div>
            </button>
          ) : (
            <button
              onClick={onShowExtended}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                width: '100%',
                padding: '14px 18px',
                background: `linear-gradient(135deg, ${gradFrom}15, ${gradTo}15)`,
                border: `1.5px solid ${gradFrom}40`,
                borderRadius: '16px',
                cursor: 'pointer',
                marginBottom: '12px',
              }}
            >
              <span style={{ fontSize: '22px' }}>📊</span>
              <div style={{ textAlign: 'left', flex: 1 }}>
                <Text style={{ fontWeight: '700', display: 'block', fontSize: '14px' }}>
                  Полный профиль открыт
                </Text>
                <Text style={{ fontSize: '12px', opacity: 0.5, display: 'block' }}>
                  Сильные стороны, слабости и совет
                </Text>
              </div>
              <span style={{ opacity: 0.4, fontSize: '18px' }}>›</span>
            </button>
          )}

          {/* === COMPATIBILITY TEASER — VIRAL MECHANIC === */}
          <button
            onClick={onShowCompatibility}
            className="compat-teaser"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              width: '100%',
              padding: '14px 18px',
              background: 'rgba(128,128,128,0.08)',
              border: 'none',
              borderRadius: '16px',
              cursor: 'pointer',
              marginBottom: '12px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', fontSize: '24px' }}>
              {animal.emoji}
              <span style={{ fontSize: '16px', margin: '0 4px' }}>❤️</span>
              {bestMatch.emoji}
            </div>
            <div style={{ textAlign: 'left', flex: 1 }}>
              <Text style={{ fontWeight: '700', display: 'block', fontSize: '14px' }}>
                Совместимость тотемов
              </Text>
              <Text style={{ fontSize: '12px', opacity: 0.5, display: 'block' }}>
                Узнай, кто твой идеальный партнёр
              </Text>
            </div>
            <span style={{ opacity: 0.4, fontSize: '18px' }}>›</span>
          </button>

          {/* Rating */}
          {!showRating ? (
            <button
              onClick={() => setShowRating(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                padding: '14px 18px',
                background: 'rgba(128,128,128,0.08)',
                borderRadius: '16px',
                border: 'none',
                cursor: 'pointer',
                marginBottom: '16px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '22px' }}>🏆</span>
                <div style={{ textAlign: 'left' }}>
                  <Text style={{ fontWeight: '700', display: 'block' }}>
                    Рейтинг зверей
                  </Text>
                  <Text style={{ fontSize: '12px', opacity: 0.5, display: 'block' }}>
                    Кого выбирают другие?
                  </Text>
                </div>
              </div>
              <span style={{ opacity: 0.4, fontSize: '18px' }}>›</span>
            </button>
          ) : (
            <AnimalRating userAnimalId={animal.id} />
          )}

          {/* === VIRAL ACTIONS === */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {/* Primary viral CTA — Wall Post */}
            <Button
              size="l"
              stretched
              mode="primary"
              onClick={handleWallPost}
              style={{ height: '50px', borderRadius: '14px', fontWeight: '700' }}
            >
              Рассказать друзьям на стене 📣
            </Button>

            {/* Challenge friends — strong viral */}
            <Button
              size="l"
              stretched
              mode="secondary"
              onClick={handleInviteFriends}
              style={{ height: '48px', borderRadius: '14px', fontWeight: '600' }}
            >
              Вызвать друзей — а ты кто? 🎯
            </Button>

            {/* Share row */}
            <div style={{ display: 'flex', gap: '10px' }}>
              <Button
                size="l"
                stretched
                mode="tertiary"
                onClick={handleShare}
                style={{ height: '44px', borderRadius: '14px', flex: 1 }}
              >
                Поделиться 🔗
              </Button>
              <Button
                size="l"
                stretched
                mode="tertiary"
                onClick={handleShareStories}
                style={{ height: '44px', borderRadius: '14px', flex: 1 }}
              >
                В сторис 📸
              </Button>
            </div>

            <Button
              size="l"
              stretched
              mode="tertiary"
              onClick={onRestart}
              style={{ height: '44px', borderRadius: '14px' }}
            >
              Пройти снова
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

/* ===== ANIMAL RATING COMPONENT ===== */

function AnimalRating({ userAnimalId }: { userAnimalId: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="animate-fadeInUp"
      style={{
        background: 'rgba(128,128,128,0.08)',
        borderRadius: '16px',
        padding: '16px',
        marginBottom: '16px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
        <span style={{ fontSize: '20px' }}>🏆</span>
        <Text style={{ fontWeight: '700', fontSize: '15px' }}>Рейтинг тотемов</Text>
        <Text style={{ opacity: 0.4, fontSize: '12px', marginLeft: 'auto' }}>глобальный</Text>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {globalDistribution.map((item, index) => {
          const isUser = item.animal.id === userAnimalId;
          return (
            <div key={item.animal.id} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Text
                style={{
                  fontSize: '12px',
                  opacity: 0.4,
                  minWidth: '14px',
                  textAlign: 'right',
                  fontWeight: '600',
                }}
              >
                {index + 1}
              </Text>
              <span style={{ fontSize: '20px', minWidth: '24px', textAlign: 'center' }}>
                {item.animal.emoji}
              </span>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '4px',
                  }}
                >
                  <Text
                    style={{
                      fontSize: '13px',
                      fontWeight: isUser ? '700' : '500',
                      color: isUser ? `var(--vkui--color_text_accent)` : undefined,
                    }}
                  >
                    {item.animal.name}
                    {isUser && ' — ты!'}
                  </Text>
                  <Text style={{ fontSize: '12px', opacity: 0.6 }}>{item.percent}%</Text>
                </div>
                <div className="rating-bar-container">
                  <div
                    className="rating-bar-fill"
                    style={{
                      width: visible ? `${item.percent}%` : '0%',
                      background: `linear-gradient(90deg, ${item.animal.colors[0]}, ${item.animal.colors[1]})`,
                      opacity: isUser ? 1 : 0.65,
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <Text
        style={{
          fontSize: '11px',
          opacity: 0.35,
          display: 'block',
          textAlign: 'center',
          marginTop: '12px',
        }}
      >
        На основе данных пользователей
      </Text>
    </div>
  );
}
