# Дизайн-спецификация: Твой тотемный зверь

> Конкретные визуальные и UX решения для Developer. Основано на SPEC.md.

---

## 1. Цветовая система

### 1.1 Элементные градиенты

Каждый элемент — это `linear-gradient` под углом **135deg** (left-to-right diagonal):

```css
/* 🔥 Fire — красно-оранжевый */
--totem-fire: linear-gradient(135deg, #FF6B35 0%, #FF2D2D 50%, #C41E3A 100%);
--totem-fire-solid: #FF4500;

/* 🌍 Earth — коричнево-зелёный */
--totem-earth: linear-gradient(135deg, #8B7355 0%, #6B8E23 50%, #556B2F 100%);
--totem-earth-solid: #6B8E23;

/* 💨 Air — голубой/белый */
--totem-air: linear-gradient(135deg, #87CEEB 0%, #B0E0E6 50%, #E0F7FA 100%);
--totem-air-solid: #87CEEB;

/* 💧 Water — синий/бирюзовый */
--totem-water: linear-gradient(135deg, #1E90FF 0%, #00CED1 50%, #20B2AA 100%);
--totem-water-solid: #00CED1;
```

### 1.2 Где применяются градиенты

| Место | Какой градиент | Применение |
|-------|---------------|------------|
| **ResultScreen карточка** | Градиент доминирующего элемента | `background: var(--totem-{element})` |
| **Progress bar (QuizScreen)** | Градиент элемента ответа | Заливка прогресс-бара |
| **StartScreen фон** | Subtle градиент всех 4х элементов | `background: linear-gradient(135deg, rgba(255,107,53,0.08) 0%, rgba(135,206,235,0.08) 50%, rgba(30,144,255,0.08) 100%)` |
| **StartScreen emoji row** | Свечение за каждым эмодзи | `box-shadow: 0 0 20px {element-color}40` |

### 1.3 Цветовая схема VKUI

```tsx
// App.tsx — используем СИСТЕМНУЮ тему (НЕ захардкоженную dark)
<ConfigProvider>
  {/* Автоматически: appearance из VK Bridge */}
</ConfigProvider>

// CSS переменные для кастомизации
:root {
  /* Тёмная тема */
  --vkui--color_background: #0D0D0D;
  --vkui--color_surface: #1A1A1A;
  --vkui--color_card_background: #232323;
  --vkui--color_text_primary: #FFFFFF;
  --vkui--color_text_secondary: #909499;
  
  /* Акцент */
  --vkui--color_accent: #FF6B35;
  
  /* Итоговый градиент для карточек */
  --totem-gradient-preview: var(--totem-fire); /* подставляется динамически */
}
```

---

## 2. Типографика

### 2.1 VKUI Title levels по экранам

```tsx
// StartScreen
<Title level="1" weight="1">Твой тотемный зверь</Title>  // 96px → 24px в VKUI
<Headline weight="3">Узнай, какое животное символизирует твой дух</Headline>

// QuizScreen
<Title level="2" weight="2">Вопрос 1 из 5</Title>  // 20px
<Text weight="2">Как ты ведёшь себя в сложной ситуации?</Text>  // 16px, читаемый

// ResultScreen
<Title level="1" weight="1">{animalName}</Title>  // 96px → 24px, крупно
<Headline weight="3">{rank}</Headline>  // rank: "Чистый Волк"
<Text weight="2">{animal.description}</Text>  // описание
```

### 2.2 Размеры текста

```css
/* Заголовок экрана (StartScreen) */
font-size: 24px;
line-height: 28px;
letter-spacing: -0.5px;

/* Текст вопроса (QuizScreen) */
font-size: 18px;
line-height: 24px;
font-weight: 500;

/* Описание ответа (QuizScreen card text) */
font-size: 15px;
line-height: 20px;
font-weight: 400;
color: var(--vkui--color_text_secondary);

/* Результат — название животного */
font-size: 32px;
line-height: 36px;
font-weight: 700;

/* Результат — описание */
font-size: 16px;
line-height: 22px;
```

---

## 3. Анимации

### 3.1 Переход StartScreen → QuizScreen

```css
/* Slide вправо (VKUI default) */
transition: transform 300ms cubic-bezier(0.4, 0.0, 0.2, 1);

/* ИЛИ fade + scale для более "магического" ощущения */
.start-exit {
  animation: fadeSlideOut 250ms ease-out forwards;
}
.quiz-enter {
  animation: fadeSlideIn 300ms ease-out forwards;
  animation-delay: 200ms;
  opacity: 0;
}

@keyframes fadeSlideOut {
  from { opacity: 1; transform: translateX(0) scale(1); }
  to   { opacity: 0; transform: translateX(-30px) scale(0.95); }
}
@keyframes fadeSlideIn {
  from { opacity: 0; transform: translateX(30px) scale(0.95); }
  to   { opacity: 1; transform: translateX(0) scale(1); }
}
```

### 3.2 Появление вопроса (QuizScreen)

```css
/* Fade-in + slight scale */
.question-enter {
  animation: questionReveal 400ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  opacity: 0;
}

@keyframes questionReveal {
  from { opacity: 0; transform: scale(0.9) translateY(10px); }
  to   { opacity: 1; transform: scale(1) translateY(0); }
}

/* Staggered появление ответов (card 0,1,2,3 с задержкой 80ms) */
.answer-card:nth-child(1) { animation-delay: 0ms; }
.answer-card:nth-child(2) { animation-delay: 80ms; }
.answer-card:nth-child(3) { animation-delay: 160ms; }
.answer-card:nth-child(4) { animation-delay: 240ms; }
```

### 3.3 Выбор ответа

```css
/* Клик по answer card */
.answer-card {
  transition: transform 150ms ease, box-shadow 150ms ease;
}

.answer-card:active {
  transform: scale(0.97);
}

/* Highlight выбранного */
.answer-card--selected {
  animation: selectPulse 300ms ease-out;
  box-shadow: 0 0 0 3px var(--element-color);
}

@keyframes selectPulse {
  0%   { transform: scale(1); }
  50%  { transform: scale(1.02); }
  100% { transform: scale(1); }
}

/* Fade-out вопроса перед следующим */
.question-exit {
  animation: questionFadeOut 200ms ease-in forwards;
}

@keyframes questionFadeOut {
  from { opacity: 1; }
  to   { opacity: 0; }
}
```

### 3.4 Раскрытие результата (ResultScreen)

```css
/* 3-2-1 countdown → reveal */
.result-container {
  animation: resultReveal 800ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  opacity: 0;
}

@keyframes resultReveal {
  0%   { opacity: 0; transform: scale(0.3) rotate(-10deg); }
  60%  { opacity: 1; transform: scale(1.1) rotate(3deg); }
  100% { opacity: 1; transform: scale(1) rotate(0deg); }
}

/* Emoji пульсация после reveal */
.emoji-revealed {
  animation: emojiPulse 2s ease-in-out infinite;
  animation-delay: 800ms;
}

@keyframes emojiPulse {
  0%, 100% { transform: scale(1); }
  50%      { transform: scale(1.08); }
}

/* Rank badge появление */
.rank-badge {
  animation: rankSlideIn 500ms ease-out forwards;
  animation-delay: 400ms;
  opacity: 0;
}

@keyframes rankSlideIn {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

### 3.5 Progress bar анимация

```css
/* Плавное заполнение */
.progress-bar-fill {
  transition: width 400ms cubic-bezier(0.4, 0.0, 0.2, 1);
}

/* Glow эффект при достижении 100% */
.progress-bar-fill--complete {
  animation: progressGlow 1s ease-in-out infinite alternate;
}

@keyframes progressGlow {
  from { filter: brightness(1); }
  to   { filter: brightness(1.3); }
}
```

---

## 4. Ранговая система

### 4.1 Формула

```typescript
const dominantRatio = maxCount / totalAnswers; // 5/5=1.0, 3/5=0.6, 2/5=0.4

if (dominantRatio >= 0.8) → tier = 'pure'      // "Чистый"
if (dominantRatio >= 0.6) → tier = 'alpha'    // "Вожак"
if (dominantRatio >= 0.4) → tier = 'seeker'   // "Искатель"
if (dominantRatio < 0.4)  → tier = 'chameleon' // "Душа-хамелеон"
```

### 4.2 Визуальное отображение ранга

| Ранг | Формулировка | Эмодзи | Визуал |
|------|-------------|--------|--------|
| `pure` | Чистый {Животное} | ⭐ | Золотая рамка карточки, 3 золотые звезды |
| `alpha` | {Животное}-вожак | 👑 | Серебряная рамка, корона |
| `seeker` | {Животное}-искатель | 🔮 | Лёгкое свечение элемента |
| `chameleon` | Душа-хамелеон | 🦎 | Радужный градиент рамки |

### 4.3 CSS для рангов

```css
/* Золотая рамка — Чистый */
.card--pure {
  border: 2px solid #FFD700;
  box-shadow: 0 0 20px #FFD70060, inset 0 0 30px #FFD70020;
}

/* Серебро — Вожак */
.card--alpha {
  border: 2px solid #C0C0C0;
  box-shadow: 0 0 15px #C0C0C060;
}

/* Свечение — Искатель */
.card--seeker {
  box-shadow: 0 0 12px var(--element-color);
}

/* Радужный — Хамелеон */
.card--chameleon {
  border: 2px solid transparent;
  background: linear-gradient(#1A1A1A, #1A1A1A) padding-box,
              linear-gradient(45deg, #FF6B35, #6B8E23, #87CEEB, #1E90FF) border-box;
  animation: rainbowBorder 3s linear infinite;
}

@keyframes rainbowBorder {
  0%   { filter: hue-rotate(0deg); }
  100% { filter: hue-rotate(360deg); }
}
```

### 4.4 Ранговая формула — подробно

```
dominantRatio = max(answers) / 5

 Чистый [Тотем]      dominantRatio >= 0.8    (5/5 или 4/4 answers)
 [Тотем]-вожак       dominantRatio >= 0.6    (3/5 answers)
 [Тотем]-искатель    dominantRatio >= 0.4    (2/5 answers)  
 Душа-хамелеон       dominantRatio < 0.4     (1/5 или все разные)
```

---

## 5. Компонент-спецификации

### 5.1 StartScreen

```tsx
// Layout (VKUI Panel, VK Mini App viewport: 100vw x 100dvh)
<Panel id="start">
  <div className="start-screen">
    
    {/* Hero area — центрированный контент */}
    <div className="hero-area">
      {/* Emoji — большой, с glow */}
      <div className="hero-emoji">🦁</div>
      
      {/* Заголовок */}
      <Title level="1" weight="1">Твой тотемный зверь</Title>
      
      {/* Подзаголовок */}
      <Headline weight="3" className="hero-subtitle">
        Узнай, какое животное символизирует твой дух
      </Headline>
    </div>
    
    {/* Emoji ряд — 4 тотема */}
    <div className="totem-row">
      <span className="totem-emoji" data-element="fire">🐺</span>
      <span className="totem-emoji" data-element="earth">🐻</span>
      <span className="totem-emoji" data-element="air">🦅</span>
      <span className="totem-emoji" data-element="water">🐬</span>
    </div>
    
    {/* CTA Button */}
    <Button 
      mode="primary" 
      size="l" 
      className="cta-button"
    >
      Узнать тотемного зверя
    </Button>
    
  </div>
</Panel>
```

```css
/* StartScreen CSS */
.start-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100dvh;
  padding: 24px 16px;
  box-sizing: border-box;
  background: linear-gradient(
    135deg,
    rgba(255,107,53,0.08) 0%,
    rgba(135,206,235,0.08) 50%,
    rgba(30,144,255,0.08) 100%
  );
}

.hero-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  margin-bottom: 32px;
}

.hero-emoji {
  font-size: 80px;
  line-height: 1;
  filter: drop-shadow(0 4px 20px rgba(255,107,53,0.4));
  animation: heroFloat 3s ease-in-out infinite;
}

@keyframes heroFloat {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-8px); }
}

.hero-subtitle {
  color: var(--vkui--color_text_secondary);
  text-align: center;
  max-width: 280px;
}

.totem-row {
  display: flex;
  gap: 16px;
  margin-bottom: 48px;
}

.totem-emoji {
  font-size: 36px;
  transition: transform 200ms ease;
}

.totem-emoji[data-element="fire"] {
  filter: drop-shadow(0 0 10px rgba(255,107,53,0.5));
}
.totem-emoji[data-element="earth"] {
  filter: drop-shadow(0 0 10px rgba(107,142,35,0.5));
}
.totem-emoji[data-element="air"] {
  filter: drop-shadow(0 0 10px rgba(135,206,235,0.5));
}
.totem-emoji[data-element="water"] {
  filter: drop-shadow(0 0 10px rgba(30,144,255,0.5));
}

.cta-button {
  width: 100%;
  max-width: 320px;
  animation: ctaAppear 600ms ease-out 300ms backwards;
}

@keyframes ctaAppear {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

### 5.2 QuizScreen

```tsx
// Layout
<Panel id="quiz">
  <div className="quiz-screen">
    
    {/* Progress section */}
    <div className="progress-section">
      <Text weight="2" className="question-counter">Вопрос 1 из 5</Text>
      <div className="progress-track">
        <div 
          className="progress-fill" 
          style={{ 
            width: '20%',
            background: 'var(--totem-fire)' 
          }}
        />
      </div>
    </div>
    
    {/* Question */}
    <div className="question-container">
      <Title level="2" weight="2">Как ты ведёшь себя в сложной ситуации?</Title>
    </div>
    
    {/* Answer cards */}
    <div className="answers-grid">
      {answers.map((answer, i) => (
        <Card 
          key={i}
          className="answer-card"
          onClick={() => handleAnswer(answer.element)}
        >
          <div className="answer-content">
            <span className="answer-emoji">{answer.emoji}</span>
            <Text weight="2">{answer.text}</Text>
          </div>
        </Card>
      ))}
    </div>
    
  </div>
</Panel>
```

```css
/* QuizScreen CSS */
.quiz-screen {
  display: flex;
  flex-direction: column;
  padding: 16px;
  min-height: 100dvh;
}

/* Progress section */
.progress-section {
  margin-bottom: 24px;
}

.question-counter {
  font-size: 14px;
  color: var(--vkui--color_text_secondary);
  margin-bottom: 8px;
}

.progress-track {
  height: 6px;
  background: var(--vkui--color_background);
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  border-radius: 3px;
  transition: width 400ms cubic-bezier(0.4, 0.0, 0.2, 1),
              background 300ms ease;
}

/* Question */
.question-container {
  margin-bottom: 24px;
  padding: 0 8px;
}

.question-container Title {
  font-size: 18px;
  line-height: 24px;
}

/* Answer cards */
.answers-grid {
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
}

.answer-card {
  padding: 16px;
  border-radius: 16px;
  background: var(--vkui--color_card_background);
  cursor: pointer;
  transition: transform 150ms ease,
              box-shadow 150ms ease,
              background 150ms ease;
}

.answer-card:active {
  transform: scale(0.97);
  background: var(--vkui--color_accent--alpha);
}

.answer-content {
  display: flex;
  align-items: center;
  gap: 12px;
}

.answer-emoji {
  font-size: 28px;
  flex-shrink: 0;
}

/* Staggered animation */
.answer-card {
  animation: answerAppear 400ms cubic-bezier(0.34, 1.56, 0.64, 1) backwards;
}
.answer-card:nth-child(1) { animation-delay: 0ms; }
.answer-card:nth-child(2) { animation-delay: 80ms; }
.answer-card:nth-child(3) { animation-delay: 160ms; }
.answer-card:nth-child(4) { animation-delay: 240ms; }

@keyframes answerAppear {
  from { opacity: 0; transform: translateY(20px) scale(0.95); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}
```

### 5.3 ResultScreen

```tsx
// Layout
<Panel id="result">
  <div className="result-screen">
    
    {/* Result card with element gradient */}
    <Card 
      className="result-card"
      style={{ background: 'var(--totem-fire)' }}
    >
      {/* Emoji */}
      <div className="result-emoji">🐺</div>
      
      {/* Rank badge */}
      <div className="rank-badge">
        <span className="rank-icon">⭐</span>
        <Headline weight="3">Чистый Волк</Headline>
      </div>
      
      {/* Animal name */}
      <Title level="1" weight="1" className="result-name">Волк</Title>
      
      {/* Description */}
      <Text weight="2" className="result-description">
        Страстный, смелый лидер. Ты не боишься идти вперёд 
        и вдохновляешь других на подвиги.
      </Text>
    </Card>
    
    {/* Action buttons */}
    <div className="result-actions">
      <Button mode="secondary" size="l">
        Поделиться результатом
      </Button>
      <Button mode="primary" size="l">
        Пройти снова
      </Button>
    </div>
    
  </div>
</Panel>
```

```css
/* ResultScreen CSS */
.result-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100dvh;
  padding: 24px 16px;
  box-sizing: border-box;
}

/* Result card */
.result-card {
  width: 100%;
  max-width: 360px;
  padding: 32px 24px;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 16px;
  margin-bottom: 32px;
  
  /* Gradient background from element */
  color: white;
  text-shadow: 0 1px 2px rgba(0,0,0,0.2);
}

.result-emoji {
  font-size: 96px;
  line-height: 1;
  animation: resultReveal 800ms cubic-bezier(0.34, 1.56, 0.64, 1) backwards;
  filter: drop-shadow(0 4px 12px rgba(0,0,0,0.3));
}

.rank-badge {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 16px;
  background: rgba(255,255,255,0.2);
  border-radius: 20px;
  backdrop-filter: blur(8px);
  animation: rankSlideIn 500ms ease-out 400ms backwards;
}

.rank-icon {
  font-size: 16px;
}

.result-name {
  font-size: 32px;
  line-height: 36px;
  margin: 0;
}

.result-description {
  font-size: 16px;
  line-height: 22px;
  opacity: 0.9;
}

/* Action buttons */
.result-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  max-width: 320px;
}

.result-actions Button {
  width: 100%;
}

/* Animations */
@keyframes resultReveal {
  0%   { opacity: 0; transform: scale(0.3) rotate(-10deg); }
  60%  { opacity: 1; transform: scale(1.1) rotate(3deg); }
  100% { opacity: 1; transform: scale(1) rotate(0deg); }
}

@keyframes rankSlideIn {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

---

## 6. Haptic Feedback (Vibration)

### 6.1 Когда триггерить

| Действие | VK Bridge method | Описание |
|----------|-----------------|----------|
| Клик по answer card | `VKWebAppFlashSetLevel` `{ level: 1 }` | Короткая вибрация — подтверждение выбора |
| Завершение квиза (переход к результату) | `VKWebAppFlashSetLevel` `{ level: 2 }` | Средняя вибрация — успех |
| Клик "Пройти снова" | `VKWebAppFlashSetLevel` `{ level: 1 }` | Короткая вибрация |
| Клик "Поделиться" | `VKWebAppFlashSetLevel` `{ level: 1 }` | Короткая вибрация |

### 6.2 Implementation

```typescript
// haptics.ts — утилита для haptic feedback
import bridge from '@vkontakte/vk-bridge';

export const hapticLight = () => {
  bridge.send('VKWebAppFlashSetLevel', { level: 1 });
};

export const hapticMedium = () => {
  bridge.send('VKWebAppFlashSetLevel', { level: 2 });
};

export const hapticHeavy = () => {
  bridge.send('VKWebAppFlashSetLevel', { level: 3 });
};

// Использование:
<Card onClick={() => { handleAnswer(answer.element); hapticLight(); }}>
```

### 6.3 Fallback

```typescript
// Если VK Bridge не поддерживает FlashSetLevel
export const hapticLight = () => {
  try {
    bridge.send('VKWebAppFlashSetLevel', { level: 1 });
  } catch {
    // Fallback: vibration API
    if ('vibrate' in navigator) {
      navigator.vibrate(10);
    }
  }
};
```

---

## 7. Итоговые значения для Developer

### Ключевые константы

```typescript
// colors.ts
export const ELEMENT_GRADIENTS = {
  fire: 'linear-gradient(135deg, #FF6B35 0%, #FF2D2D 50%, #C41E3A 100%)',
  earth: 'linear-gradient(135deg, #8B7355 0%, #6B8E23 50%, #556B2F 100%)',
  air: 'linear-gradient(135deg, #87CEEB 0%, #B0E0E6 50%, #E0F7FA 100%)',
  water: 'linear-gradient(135deg, #1E90FF 0%, #00CED1 50%, #20B2AA 100%)',
} as const;

// animation.ts
export const ANIMATION = {
  screenTransition: 300,       // ms
  questionReveal: 400,         // ms
  answerStagger: 80,           // ms delay between items
  resultReveal: 800,           // ms
  progressFill: 400,            // ms
} as const;

// layout.ts
export const LAYOUT = {
  screenPadding: 16,           // px
  cardPadding: 16,             // px
  cardRadius: 16,              // px
  cardGap: 12,                 // px
  heroEmojiSize: 80,          // px
  resultEmojiSize: 96,         // px
  answerEmojiSize: 28,         // px
} as const;
```

---

## 8. Чеклист для Developer

- [ ] Подключить CSS переменные `--totem-{fire,earth,air,water}`
- [ ] Реализовать динамический `background` для ResultCard
- [ ] Добавить CSS keyframes: `fadeSlideOut`, `fadeSlideIn`, `questionReveal`, `answerAppear`, `resultReveal`, `rankSlideIn`, `heroFloat`
- [ ] Реализовать staggered animation для answer cards (nth-child delays)
- [ ] Подключить haptic feedback через `VKWebAppFlashSetLevel`
- [ ] Реализовать ранговую систему: badge, border, shadow по tier
- [ ] Progress bar менять цвет в зависимости от последнего ответа
- [ ] StartScreen: subtle gradient background + floating emoji animation
- [ ] ResultScreen: countdown → reveal animation sequence
