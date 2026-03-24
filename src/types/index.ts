export type ElementType = 'fire' | 'earth' | 'air' | 'water';

export interface Answer {
  text: string;
  element: ElementType;
}

export interface Question {
  id: number;
  text: string;
  answers: Answer[];
}

export interface TotemAnimal {
  id: string;
  name: string;
  emoji: string;
  description: string;
}

export interface QuizState {
  currentQuestion: number;
  answers: ElementType[];
}

export interface Rank {
  rank: string;
  subtitle: string;
}
