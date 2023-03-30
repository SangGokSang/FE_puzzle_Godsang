export type Puzzle = {
  id: number;
  category: string;
  title: string;
  message: PuzzleMSG[];
};

export type PuzzleMSG = {
  id: number;
  content: string;
  from: string;
  to: string;
  isOpened: boolean;
};
