export type ElementType = 'fire' | 'earth' | 'air' | 'water';

export type AnimalId = 'wolf' | 'lion' | 'bear' | 'fox' | 'eagle' | 'owl' | 'dolphin' | 'leopard';

export interface Answer {
  text: string;
  element: ElementType;
  emoji?: string;
}

export interface Question {
  id: number;
  text: string;
  subtitle?: string;
  answers: Answer[];
}

export interface TotemAnimal {
  id: AnimalId;
  name: string;
  emoji: string;
  element: ElementType;
  description: string;
  traits: string[];
  colors: [string, string]; // gradient from, to
  rarity: 'common' | 'rare' | 'legendary';
  // Extended profile (unlockable)
  strengths: string;
  weaknesses: string;
  motto: string;
  compatibility: {
    best: AnimalId;
    good: AnimalId;
    challenge: AnimalId;
  };
}

export interface QuizState {
  currentQuestion: number;
  answers: ElementType[];
}

export interface Rank {
  rank: string;
  subtitle: string;
  icon: string;
}
