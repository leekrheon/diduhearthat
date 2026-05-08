export interface Dialogue {
  type: 'normal' | 'ad' | 'quiz';
  text: string;
  adBrand?: string;
  quizOptions?: string[];
  quizAnswer?: number;
}

export interface Character {
  id: string;
  name: string;
  age: number;
  bio: string;
  image: string;
  bgImage: string;
  dialogues: Dialogue[];
}

export interface ScrapItem {
  id: string;
  characterId: string;
  characterName: string;
  characterAge: number;
  text: string;
  date: string;
}

export type View = 'home' | 'select' | 'chat' | 'credit' | 'scrap' | 'profile';
