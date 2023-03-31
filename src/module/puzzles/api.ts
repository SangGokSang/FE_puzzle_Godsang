import api from 'src/core/api/api';
import { Puzzle, PuzzleReq } from './types';

// fetch puzzles
export async function fetchPuzzles(): Promise<Puzzle[]> {
  const { data } = await api({
    url: `/puzzles`,
    method: 'get',
  });
  return data;
}

// // add puzzle
export async function addPuzzle(param: PuzzleReq) {
  await api({
    url: '/puzzles',
    method: 'post',
    data: param,
  });
}
