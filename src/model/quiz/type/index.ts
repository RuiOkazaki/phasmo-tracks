import { difficultiesNames } from '@/model/quiz/constants/index';

export type DifficultyJaName =
  (typeof difficultiesNames)[keyof typeof difficultiesNames];

export type DifficultyEnName = keyof typeof difficultiesNames;

export type Difficulty = {
  jaName: DifficultyJaName;
  description: string;
};

export type Difficulties = {
  [Key in keyof typeof difficultiesNames]: Difficulty;
};
