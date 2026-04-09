import type { Question, TotemAnimal, ElementType, Rank, AnimalId } from '../types';

export const questions: Question[] = [
  {
    id: 1,
    text: 'Ты на вечеринке, где никого не знаешь. Что делаешь?',
    answers: [
      { text: 'Подхожу знакомиться первым', emoji: '🤝', element: 'fire' },
      { text: 'Изучаю обстановку и наблюдаю', emoji: '👀', element: 'earth' },
      { text: 'Нахожу интересного собеседника', emoji: '💬', element: 'air' },
      { text: 'Легко вливаюсь в любую компанию', emoji: '🎉', element: 'water' },
    ],
  },
  {
    id: 2,
    text: 'Идеальный отпуск — это...',
    answers: [
      { text: 'Экстрим: горы, сёрфинг, парашют', emoji: '🏔️', element: 'fire' },
      { text: 'Уютный домик в лесу', emoji: '🌲', element: 'earth' },
      { text: 'Новая страна и культура', emoji: '✈️', element: 'air' },
      { text: 'На море с любимыми людьми', emoji: '🌊', element: 'water' },
    ],
  },
  {
    id: 3,
    text: 'Тебе говорят «это невозможно». Ты...',
    answers: [
      { text: 'Докажу, что возможно', emoji: '💪', element: 'fire' },
      { text: 'Найду обходной путь', emoji: '🗺️', element: 'earth' },
      { text: 'Переосмыслю задачу по-новому', emoji: '💡', element: 'air' },
      { text: 'Попрошу помощи нужных людей', emoji: '🤲', element: 'water' },
    ],
  },
  {
    id: 4,
    text: 'Что тебя заряжает энергией?',
    answers: [
      { text: 'Победа и достижения', emoji: '🏆', element: 'fire' },
      { text: 'Хорошо сделанная работа', emoji: '⚒️', element: 'earth' },
      { text: 'Новые знания и открытия', emoji: '🔭', element: 'air' },
      { text: 'Близкие и тёплое общение', emoji: '❤️', element: 'water' },
    ],
  },
  {
    id: 5,
    text: 'Твоя главная суперсила?',
    answers: [
      { text: 'Смелость и решимость', emoji: '⚡', element: 'fire' },
      { text: 'Надёжность и выдержка', emoji: '🛡️', element: 'earth' },
      { text: 'Острый ум и наблюдательность', emoji: '🧠', element: 'air' },
      { text: 'Умение понять и поддержать', emoji: '🌸', element: 'water' },
    ],
  },
  {
    id: 6,
    text: 'Как ты ведёшь себя в конфликте?',
    answers: [
      { text: 'Отстаиваю позицию до конца', emoji: '🔥', element: 'fire' },
      { text: 'Ищу справедливое решение', emoji: '⚖️', element: 'earth' },
      { text: 'Держусь в стороне и анализирую', emoji: '🔍', element: 'air' },
      { text: 'Стараюсь примирить стороны', emoji: '🕊️', element: 'water' },
    ],
  },
  {
    id: 7,
    text: 'О чём ты чаще всего думаешь?',
    answers: [
      { text: 'О целях и как их достичь', emoji: '🎯', element: 'fire' },
      { text: 'О том, как всё устроено', emoji: '⚙️', element: 'earth' },
      { text: 'О смыслах и «а что если...»', emoji: '🌌', element: 'air' },
      { text: 'О людях и отношениях', emoji: '👥', element: 'water' },
    ],
  },
  {
    id: 8,
    text: 'Близкие скажут о тебе...',
    answers: [
      { text: 'Бесстрашный и прямой', emoji: '⚔️', element: 'fire' },
      { text: 'Основательный и надёжный', emoji: '🪨', element: 'earth' },
      { text: 'Умный и немного загадочный', emoji: '🌙', element: 'air' },
      { text: 'Тёплый и всегда поддержит', emoji: '☀️', element: 'water' },
    ],
  },
];

export const totemAnimals: Record<AnimalId, TotemAnimal> = {
  wolf: {
    id: 'wolf',
    name: 'Волк',
    emoji: '🐺',
    element: 'fire',
    description: 'Волк — рождённый лидер с острым инстинктом. Ты знаешь, когда вести стаю, а когда молчать. Преданность и страсть — твоё главное оружие. За тобой идут, потому что доверяют, не потому что боятся.',
    traits: ['Лидерство', 'Преданность', 'Интуиция'],
    colors: ['#FF6B35', '#FF0844'],
    rarity: 'rare',
  },
  lion: {
    id: 'lion',
    name: 'Лев',
    emoji: '🦁',
    element: 'fire',
    description: 'Лев — благородный воин с несокрушимым духом. Ты не ищешь конфликтов, но никогда не отступаешь. В тебе горит огонь победителя — уверенность, которую чувствуют все вокруг.',
    traits: ['Смелость', 'Достоинство', 'Сила воли'],
    colors: ['#FF8C00', '#FFD700'],
    rarity: 'legendary',
  },
  bear: {
    id: 'bear',
    name: 'Медведь',
    emoji: '🐻',
    element: 'earth',
    description: 'Медведь — молчаливый страж и мудрый советник. Его слово — закон. Ты источник спокойствия и силы для всех вокруг. На тебя всегда можно положиться, особенно в трудную минуту.',
    traits: ['Надёжность', 'Мудрость', 'Защита'],
    colors: ['#6B8E23', '#228B22'],
    rarity: 'common',
  },
  fox: {
    id: 'fox',
    name: 'Лиса',
    emoji: '🦊',
    element: 'earth',
    description: 'Лиса всегда на шаг впереди. Твой острый ум и умение читать людей делают тебя незаменимым стратегом. Там, где другие видят тупик, ты видишь возможность.',
    traits: ['Хитрость', 'Стратегия', 'Адаптация'],
    colors: ['#E65C00', '#F9D423'],
    rarity: 'rare',
  },
  eagle: {
    id: 'eagle',
    name: 'Орёл',
    emoji: '🦅',
    element: 'air',
    description: 'Орёл парит выше суеты и видит картину целиком. Пока другие теряются в деталях, ты уже знаешь, что будет завтра. Свобода и широкий взгляд на мир — твоя природа.',
    traits: ['Дальновидность', 'Свобода', 'Мудрость'],
    colors: ['#4776E6', '#8E54E9'],
    rarity: 'legendary',
  },
  owl: {
    id: 'owl',
    name: 'Сова',
    emoji: '🦉',
    element: 'air',
    description: 'Сова молчит, пока не готова говорить. Зато каждое твоё слово — точный выстрел. Ты хранитель знаний и тайн, наблюдатель, который замечает то, что скрыто от других.',
    traits: ['Интеллект', 'Наблюдательность', 'Тайна'],
    colors: ['#360033', '#0b8793'],
    rarity: 'rare',
  },
  dolphin: {
    id: 'dolphin',
    name: 'Дельфин',
    emoji: '🐬',
    element: 'water',
    description: 'Дельфин — душа любой компании и объединитель людей. Ты наполняешь пространство вокруг радостью и светом. Твоя эмпатия позволяет чувствовать, что нужно каждому.',
    traits: ['Эмпатия', 'Общительность', 'Радость'],
    colors: ['#0099F7', '#00C9FF'],
    rarity: 'common',
  },
  leopard: {
    id: 'leopard',
    name: 'Леопард',
    emoji: '🐆',
    element: 'water',
    description: 'Леопард действует там, где другие колеблются. Непредсказуемый и молниеносный — ты меняешься в зависимости от обстановки. Твоя сила в том, чтобы быть разным и всегда оставаться собой.',
    traits: ['Адаптивность', 'Стремительность', 'Страсть'],
    colors: ['#f953c6', '#b91d73'],
    rarity: 'legendary',
  },
};

export function calculateResult(answers: ElementType[]): TotemAnimal {
  const counts: Record<ElementType, number> = {
    fire: 0,
    earth: 0,
    air: 0,
    water: 0,
  };

  answers.forEach((answer) => {
    counts[answer]++;
  });

  // Sort elements by count descending
  const sorted = (Object.entries(counts) as [ElementType, number][]).sort(
    (a, b) => b[1] - a[1]
  );

  const dominant = sorted[0][0];
  const secondary = sorted[1][0];

  // Active elements: fire and air (energy, motion)
  // Stable elements: earth and water (groundedness, depth)
  const isSecondaryActive = secondary === 'fire' || secondary === 'air';

  const animalMap: Record<ElementType, AnimalId> = {
    fire: isSecondaryActive ? 'wolf' : 'lion',
    earth: isSecondaryActive ? 'fox' : 'bear',
    air: isSecondaryActive ? 'eagle' : 'owl',
    water: isSecondaryActive ? 'leopard' : 'dolphin',
  };

  const animalId = animalMap[dominant];
  return totemAnimals[animalId];
}

export function getRank(answers: ElementType[]): Rank {
  const counts = answers.reduce<Record<ElementType, number>>(
    (acc, answer) => {
      acc[answer] = (acc[answer] || 0) + 1;
      return acc;
    },
    { fire: 0, earth: 0, air: 0, water: 0 }
  );

  const dominantCount = Math.max(...Object.values(counts));
  const ratio = dominantCount / answers.length;

  if (ratio >= 0.75) return { rank: 'Чистая стихия', subtitle: 'Идеальное совпадение', icon: '✨' };
  if (ratio >= 0.6) return { rank: 'Вожак', subtitle: 'Ярко выраженный тип', icon: '👑' };
  if (ratio >= 0.45) return { rank: 'Искатель', subtitle: 'Гармоничная личность', icon: '🌿' };
  return { rank: 'Душа-хамелеон', subtitle: 'Редкий и уникальный тип', icon: '🌈' };
}

// Global distribution for friends rating (simulated)
export const globalDistribution: Array<{ animal: TotemAnimal; percent: number }> = [
  { animal: totemAnimals.dolphin, percent: 22 },
  { animal: totemAnimals.wolf, percent: 19 },
  { animal: totemAnimals.bear, percent: 16 },
  { animal: totemAnimals.eagle, percent: 14 },
  { animal: totemAnimals.fox, percent: 12 },
  { animal: totemAnimals.lion, percent: 8 },
  { animal: totemAnimals.owl, percent: 6 },
  { animal: totemAnimals.leopard, percent: 3 },
];
