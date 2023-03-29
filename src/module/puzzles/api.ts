import api from 'src/core/api/api';
import { Puzzle } from './types';

// fetch puzzles
export async function fetchPuzzles(): Promise<Puzzle[]> {
  const { data } = await api({
    url: `/api/puzzles`,
    method: 'get',
  });
  return data;
}