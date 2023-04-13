import api from 'src/core/api';
import { getAccessToken } from 'src/core/api/auth';
import { Puzzle, PuzzleReq, ReadMessageReq } from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const accessToken = getAccessToken({ bearer: true }) || '';

// fetch puzzles
export async function fetchPuzzles(userId: string): Promise<Puzzle[]> {
  const data = await fetch(
    `${API_BASE_URL}/puzzlesas?` +
      new URLSearchParams({
        userId,
      }),
    {
      method: 'GET',
      headers: {
        Authorization: accessToken as string,
      },
    },
  ).then((res) => res.json());
  return data;
}

// add puzzle
export async function addPuzzle(param: PuzzleReq) {
  await api({
    url: '/puzzles',
    method: 'post',
    data: param,
  });
}

// Read Message and Use Key
export async function readMessage({ puzzleId, messageId }: ReadMessageReq): Promise<number> {
  const { data } = await api({
    url: `/puzzles/${puzzleId}/messages/${messageId}`,
    method: 'patch',
  });
  return data;
}
