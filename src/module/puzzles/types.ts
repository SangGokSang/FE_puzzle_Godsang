import { Category } from 'src/core/const/enum';

export type Puzzle = {
  id: number;
  category: string;
  title: string;
  messages: PuzzleMSG[];
};

export type Puzzles = Puzzle[] & {
  code?: string;
};

export type PuzzleMSG = {
  id: number;
  displayOrder: number;
  content: string;
  from: string;
  to: string;
  isOpened: boolean;
};

export type PuzzleReq = {
  category: Category;
  title: string; // 길이 최소 4 글자 , 최대 20 공백 가능
};

export type ReadMessageReq = {
  puzzleId: number;
  messageId: number;
};
