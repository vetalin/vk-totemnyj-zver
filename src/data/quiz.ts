import type { Question, TotemAnimal, ElementType, Rank, AnimalId } from '../types';

export const questions: Question[] = [
  {
    id: 1,
    text: 'Пятница, вечер. У тебя нет планов. Что ты сделаешь?',
    subtitle: 'Первый инстинкт — самый честный',
    answers: [
      { text: 'Соберу друзей на спонтанное приключение', emoji: '🚀', element: 'fire' },
      { text: 'Приготовлю что-то вкусное и посмотрю фильм', emoji: '🍿', element: 'earth' },
      { text: 'Наконец дочитаю книгу или посмотрю документалку', emoji: '📖', element: 'air' },
      { text: 'Позвоню лучшему другу — давно не болтали', emoji: '📞', element: 'water' },
    ],
  },
  {
    id: 2,
    text: 'Ты в новой компании. Кто ты через 10 минут?',
    subtitle: 'Будь честен с собой',
    answers: [
      { text: 'Я уже в центре внимания и рассказываю историю', emoji: '🎭', element: 'fire' },
      { text: 'Спокойно общаюсь, но ни к кому не лезу', emoji: '🪨', element: 'earth' },
      { text: 'Наблюдаю и анализирую динамику группы', emoji: '🔭', element: 'air' },
      { text: 'Нашёл одного интересного человека и мы уже глубоко общаемся', emoji: '💫', element: 'water' },
    ],
  },
  {
    id: 3,
    text: 'Какая из этих фраз вызывает у тебя мурашки?',
    subtitle: 'Не думай — чувствуй',
    answers: [
      { text: '«Победителей не судят»', emoji: '🔥', element: 'fire' },
      { text: '«Тихая вода глубока»', emoji: '🏔️', element: 'earth' },
      { text: '«Знание — сила»', emoji: '⚡', element: 'air' },
      { text: '«Один за всех и все за одного»', emoji: '🤝', element: 'water' },
    ],
  },
  {
    id: 4,
    text: 'Тебе предлагают работу мечты, но в другом городе. Что решает?',
    subtitle: 'Что ты послушаешь?',
    answers: [
      { text: 'Лечу! Новые вызовы важнее зоны комфорта', emoji: '✈️', element: 'fire' },
      { text: 'Взвешу все за и против, составлю план', emoji: '📋', element: 'earth' },
      { text: 'Это шанс для роста — я точно попробую', emoji: '🌱', element: 'air' },
      { text: 'Сначала пойму, как это повлияет на близких', emoji: '💛', element: 'water' },
    ],
  },
  {
    id: 5,
    text: 'Друг пришёл к тебе с проблемой. Твой первый порыв?',
    subtitle: 'Что ты делаешь инстинктивно?',
    answers: [
      { text: 'Предлагаю конкретный план действий', emoji: '⚔️', element: 'fire' },
      { text: 'Выслушаю и помогу разложить по полочкам', emoji: '🧩', element: 'earth' },
      { text: 'Помогу посмотреть на ситуацию под другим углом', emoji: '🔮', element: 'air' },
      { text: 'Просто обниму и скажу, что всё будет хорошо', emoji: '🫂', element: 'water' },
    ],
  },
  {
    id: 6,
    text: 'Какой комплимент тебе приятнее всего?',
    subtitle: 'Прислушайся к себе',
    answers: [
      { text: '«Ты невероятно смелый»', emoji: '💪', element: 'fire' },
      { text: '«На тебя всегда можно положиться»', emoji: '🛡️', element: 'earth' },
      { text: '«С тобой всегда так интересно»', emoji: '🧠', element: 'air' },
      { text: '«Рядом с тобой тепло и спокойно»', emoji: '☀️', element: 'water' },
    ],
  },
  {
    id: 7,
    text: 'Если бы жизнь была фильмом, какой бы у тебя был жанр?',
    subtitle: 'Выбери историю, которая резонирует',
    answers: [
      { text: 'Эпический боевик с героем во главе', emoji: '🎬', element: 'fire' },
      { text: 'Мудрая драма с глубоким сюжетом', emoji: '🎞️', element: 'earth' },
      { text: 'Детектив с неожиданным финалом', emoji: '🕵️', element: 'air' },
      { text: 'Душевная история о дружбе и любви', emoji: '🎥', element: 'water' },
    ],
  },
  {
    id: 8,
    text: 'Последний вопрос. Выбери свой символ.',
    subtitle: 'Доверься интуиции — она знает ответ',
    answers: [
      { text: 'Пламя — оно не спрашивает разрешения', emoji: '🔥', element: 'fire' },
      { text: 'Гора — стоит веками и не шатается', emoji: '⛰️', element: 'earth' },
      { text: 'Ветер — свободен и везде одновременно', emoji: '🌪️', element: 'air' },
      { text: 'Океан — бесконечный и соединяет всё', emoji: '🌊', element: 'water' },
    ],
  },
];

export const totemAnimals: Record<AnimalId, TotemAnimal> = {
  wolf: {
    id: 'wolf',
    name: 'Волк',
    emoji: '🐺',
    element: 'fire',
    description: 'Волк — рождённый лидер стаи с обострённым чутьём. Ты ведёшь за собой не силой, а верностью. Когда весь мир сомневается — ты уже знаешь путь. За тобой идут, потому что верят.',
    traits: ['Лидерство', 'Преданность', 'Интуиция'],
    colors: ['#FF6B35', '#FF0844'],
    rarity: 'rare',
    strengths: 'Твоя интуиция работает как радар — ты считываешь людей и ситуации быстрее, чем они успевают заговорить. В кризисе ты тот, кто берёт штурвал.',
    weaknesses: 'Иногда ты забываешь, что не все готовы двигаться с твоей скоростью. Учись ждать тех, кого ведёшь.',
    motto: '«Стая идёт со скоростью вожака»',
    compatibility: { best: 'eagle', good: 'fox', challenge: 'owl' },
    dailyTips: [
      'Сегодня доверься первой интуиции — она не ошибётся.',
      'Кто-то из близких ждёт, что ты сделаешь первый шаг.',
      'Твоя стая чувствует твоё настроение. Покажи им уверенность.',
      'Не спорь там, где можно просто повести за собой.',
      'Сегодня день громких решений — ты знаешь, о чём речь.',
    ],
  },
  lion: {
    id: 'lion',
    name: 'Лев',
    emoji: '🦁',
    element: 'fire',
    description: 'Лев — благородный воин с несокрушимой волей. Ты не ищешь трон — он сам тебя находит. В тебе горит тихое пламя уверенности, которое чувствуют все вокруг.',
    traits: ['Смелость', 'Достоинство', 'Сила воли'],
    colors: ['#FF8C00', '#FFD700'],
    rarity: 'legendary',
    strengths: 'Ты источник силы для всех рядом. Где бы ты ни появился — ты задаёшь тон. Твоя смелость заразительна, а вера в себя непоколебима.',
    weaknesses: 'Гордость — и меч, и щит. Не бойся просить о помощи. Даже король иногда нуждается в советнике.',
    motto: '«Льву не нужно доказывать, что он лев»',
    compatibility: { best: 'dolphin', good: 'bear', challenge: 'leopard' },
    dailyTips: [
      'Сегодня можно говорить прямо — тебя услышат.',
      'Гордость — хороший советник, но плохой король. Помни.',
      'Самое смелое, что ты можешь сделать — попросить помощь.',
      'Твоё спокойствие вдохновляет сильнее любого крика.',
      'Сегодня — день благородного отказа от лишнего.',
    ],
  },
  bear: {
    id: 'bear',
    name: 'Медведь',
    emoji: '🐻',
    element: 'earth',
    description: 'Медведь — тихая мощь и надёжная опора. Твоё слово весит тонну, а твоё присутствие успокаивает. Ты тот скалистый берег, о который разбиваются любые штормы.',
    traits: ['Надёжность', 'Мудрость', 'Защита'],
    colors: ['#6B8E23', '#228B22'],
    rarity: 'common',
    strengths: 'Ты — тот человек, к которому все приходят в беде. Твоё спокойствие не слабость, а сила. Ты принимаешь решения раз — и навсегда.',
    weaknesses: 'Ты можешь слишком долго ждать, прежде чем действовать. Иногда мир требует не терпения, а первого шага.',
    motto: '«Настоящая сила не нуждается в шуме»',
    compatibility: { best: 'owl', good: 'lion', challenge: 'fox' },
    dailyTips: [
      'Сегодня можно ничего не делать — и это будет правильно.',
      'Кто-то рядом нуждается в твоём молчаливом присутствии.',
      'Не торопись с ответом. Твоё «нет» ценится именно потому, что его мало.',
      'Сделай что-то только для себя — без пользы, без цели.',
      'Сила в том, чтобы сохранить границу там, где её пытаются сдвинуть.',
    ],
  },
  fox: {
    id: 'fox',
    name: 'Лиса',
    emoji: '🦊',
    element: 'earth',
    description: 'Лиса всегда на три хода впереди. Твой острый ум читает людей как открытую книгу. Где другие видят тупик — ты видишь лазейку. Ты не играешь по правилам, ты создаёшь свои.',
    traits: ['Хитрость', 'Стратегия', 'Адаптация'],
    colors: ['#E65C00', '#F9D423'],
    rarity: 'rare',
    strengths: 'Ты мастер импровизации. Любая ситуация — это шахматная партия, и ты всегда знаешь свой следующий ход. Твоя гибкость — суперсила.',
    weaknesses: 'Иногда ты настолько увлекаешься стратегией, что забываешь про простые решения. Не всё нужно обдумывать — иногда нужно просто чувствовать.',
    motto: '«Умный найдёт выход из ситуации. Мудрый в неё не попадёт»',
    compatibility: { best: 'leopard', good: 'wolf', challenge: 'bear' },
    dailyTips: [
      'Сегодня прямой путь — скучный путь. Поищи обход.',
      'Твоя интуиция знает ответ раньше логики. Слушай её.',
      'Одна хорошая пауза важнее трёх быстрых решений.',
      'Кто-то готов открыть тебе карты — задай правильный вопрос.',
      'Не доказывай правоту — покажи результат.',
    ],
  },
  eagle: {
    id: 'eagle',
    name: 'Орёл',
    emoji: '🦅',
    element: 'air',
    description: 'Орёл парит над суетой и видит то, что скрыто от других. Ты мыслишь масштабно и не разменивашься на мелочи. Свобода для тебя — не каприз, а кислород.',
    traits: ['Дальновидность', 'Свобода', 'Величие'],
    colors: ['#4776E6', '#8E54E9'],
    rarity: 'legendary',
    strengths: 'Ты видишь картину целиком, когда остальные застряли в деталях. Твой масштаб мышления вдохновляет других мечтать больше.',
    weaknesses: 'Парить высоко — значит быть далеко. Не забывай спускаться к тем, кто тебя ждёт внизу.',
    motto: '«Кто смотрит вниз — видит землю. Кто смотрит вверх — видит небо»',
    compatibility: { best: 'wolf', good: 'dolphin', challenge: 'bear' },
    dailyTips: [
      'Сегодня посмотри шире — ты увяз в мелочах.',
      'То, что кажется стеной, — всего лишь ступень с другой высоты.',
      'Позволь себе мечтать крупнее, чем обычно.',
      'Спустись к тем, кто тебя ждёт. Большое начинается с близкого.',
      'Один шаг в сторону — и маршрут откроется весь.',
    ],
  },
  owl: {
    id: 'owl',
    name: 'Сова',
    emoji: '🦉',
    element: 'air',
    description: 'Сова видит то, что скрыто в тенях. Ты молчишь — но каждое твоё слово точнее выстрела снайпера. Хранитель знаний и наблюдатель, ты замечаешь, что скрыто от всех.',
    traits: ['Интеллект', 'Наблюдательность', 'Загадочность'],
    colors: ['#360033', '#0b8793'],
    rarity: 'rare',
    strengths: 'Ты анализируешь мир глубже, чем кто-либо. Твоя наблюдательность позволяет видеть мотивы людей ещё до того, как они сами их осознают.',
    weaknesses: 'Ты можешь замкнуться в мире анализа и забыть про действие. Знания ценны, когда они применяются.',
    motto: '«Мудрость — это знать, чего ты не знаешь»',
    compatibility: { best: 'bear', good: 'leopard', challenge: 'wolf' },
    dailyTips: [
      'Сегодня не анализируй — действуй. Хоть раз.',
      'Твои вопросы точнее любых советов. Задавай.',
      'Сделай шаг, не имея полной картины. Она сложится в пути.',
      'Тень, в которую ты смотришь, — твоя. Поэтому ты её видишь.',
      'Одна наблюдательная реплика стоит десяти разговоров.',
    ],
  },
  dolphin: {
    id: 'dolphin',
    name: 'Дельфин',
    emoji: '🐬',
    element: 'water',
    description: 'Дельфин — сердце любой компании и связующее звено между людьми. Ты несёшь свет и радость, а твоя эмпатия позволяет чувствовать то, что другие прячут за масками.',
    traits: ['Эмпатия', 'Обаяние', 'Радость'],
    colors: ['#0099F7', '#00C9FF'],
    rarity: 'common',
    strengths: 'Ты умеешь создавать атмосферу, в которой люди раскрываются. Рядом с тобой все становятся лучшей версией себя. Это редкий дар.',
    weaknesses: 'Ты так заботишься о других, что иногда забываешь про себя. Помни: наполни свою чашу прежде, чем наполнять чужие.',
    motto: '«Настоящая связь сильнее любого шторма»',
    compatibility: { best: 'lion', good: 'eagle', challenge: 'fox' },
    dailyTips: [
      'Сегодня наполни свою чашу прежде, чем чужую.',
      'Кто-то ждёт твоего «как ты?». Напиши первым.',
      'Откажи, когда хочется согласиться по инерции. Это не эгоизм.',
      'Твоя радость — не фон, она заразительна. Включай её громче.',
      'Одно искреннее объятие сегодня важнее любых слов.',
    ],
  },
  leopard: {
    id: 'leopard',
    name: 'Леопард',
    emoji: '🐆',
    element: 'water',
    description: 'Леопард — воплощение грации и непредсказуемости. Ты молниеносно адаптируешься к любой среде. Твоя сила в том, что тебя невозможно просчитать — ты всегда разный.',
    traits: ['Адаптивность', 'Грация', 'Страсть'],
    colors: ['#f953c6', '#b91d73'],
    rarity: 'legendary',
    strengths: 'Ты — хамелеон, который в любой ситуации чувствует себя как рыба в воде. Твоя скорость принятия решений поражает.',
    weaknesses: 'Непредсказуемость — дар, но и вызов. Людям рядом с тобой нужна стабильность. Иногда стоит замедлиться.',
    motto: '«Быстрый не тот, кто бежит быстрее — а тот, кто стартует первым»',
    compatibility: { best: 'fox', good: 'owl', challenge: 'lion' },
    dailyTips: [
      'Сегодня день резкого движения — не откладывай импульс.',
      'Смени среду, если чувствуешь, что вязнешь. Хоть комнату.',
      'Близким нужна твоя предсказуемость — побудь ею сегодня.',
      'Не гонись за всем сразу. Выбери одно — и добей.',
      'Твоя быстрая реакция — оружие. Но сначала сделай вдох.',
    ],
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

// Global distribution for rating (simulated)
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

// Compatibility descriptions
export const compatibilityDescriptions: Record<string, string> = {
  best: 'Идеальный тандем! Вы дополняете друг друга как инь и ян.',
  good: 'Отличная пара! Вместе вы можете свернуть горы.',
  challenge: 'Сложные, но интересные отношения. Вы заставляете друг друга расти.',
  neutral: 'Спокойная совместимость. Ни огня, ни конфликтов — ровное партнёрство.',
};

export function getCompatibilityLevel(
  animal1: AnimalId,
  animal2: AnimalId
): 'best' | 'good' | 'challenge' | 'neutral' {
  if (animal1 === animal2) return 'good';
  const a = totemAnimals[animal1];
  if (a.compatibility.best === animal2) return 'best';
  if (a.compatibility.good === animal2) return 'good';
  if (a.compatibility.challenge === animal2) return 'challenge';
  return 'neutral';
}

// Deterministic pick by day so the tip is stable across reopens the same date
export function getDailyTip(animal: TotemAnimal, date: Date = new Date()): string {
  const dayKey = date.getFullYear() * 1000 + date.getMonth() * 40 + date.getDate();
  const index = dayKey % animal.dailyTips.length;
  return animal.dailyTips[index];
}
