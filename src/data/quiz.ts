import type { Question, TotemAnimal, ElementType } from '../types';

export const questions: Question[] = [
  {
    id: 1,
    text: 'Как ты ведёшь себя в сложной ситуации?',
    answers: [
      { text: 'Атакую', element: 'fire' },
      { text: 'Думаю', element: 'earth' },
      { text: 'Жду', element: 'air' },
      { text: 'Бегу', element: 'water' },
    ],
  },
  {
    id: 2,
    text: 'Что для тебя важнее в дружбе?',
    answers: [
      { text: 'Верность', element: 'fire' },
      { text: 'Честность', element: 'earth' },
      { text: 'Поддержка', element: 'air' },
      { text: 'Приключения', element: 'water' },
    ],
  },
  {
    id: 3,
    text: 'Какой ты в команде?',
    answers: [
      { text: 'Лидер', element: 'fire' },
      { text: 'Советник', element: 'earth' },
      { text: 'Исполнитель', element: 'air' },
      { text: 'Вдохновитель', element: 'water' },
    ],
  },
  {
    id: 4,
    text: 'Что ты делаешь в свободное время?',
    answers: [
      { text: 'Учусь', element: 'fire' },
      { text: 'Общаюсь', element: 'earth' },
      { text: 'Создаю', element: 'air' },
      { text: 'Путешествую', element: 'water' },
    ],
  },
  {
    id: 5,
    text: 'Как ты принимаешь решения?',
    answers: [
      { text: 'Быстро и решительно', element: 'fire' },
      { text: 'После долгих размышлений', element: 'earth' },
      { text: 'Интуитивно', element: 'air' },
      { text: 'Советуюсь с другими', element: 'water' },
    ],
  },
];

export const totemAnimals: Record<ElementType, TotemAnimal> = {
  fire: {
    id: 'wolf',
    name: 'Волк',
    emoji: '🐺',
    description: 'Страстный, смелый лидер. Ты не боишься идти впереди и вдохновляешь других на подвиги.',
  },
  earth: {
    id: 'bear',
    name: 'Медведь',
    emoji: '🐻',
    description: 'Надёжный, сильный защитник. На тебя всегда можно положиться в трудную минуту.',
  },
  air: {
    id: 'eagle',
    name: 'Орёл',
    emoji: '🦅',
    description: 'Свободный, мудрый и дальновидный. Ты видишь то, чего не замечают другие.',
  },
  water: {
    id: 'dolphin',
    name: 'Дельфин',
    emoji: '🐬',
    description: 'Дружелюбный, умный и коммуникабельный. Ты объединяешь людей и создаёшь гармонию.',
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

  const maxElement = Object.entries(counts).reduce((a, b) =>
    a[1] > b[1] ? a : b
  )[0] as ElementType;

  return totemAnimals[maxElement];
}
