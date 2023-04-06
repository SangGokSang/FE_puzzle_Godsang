import api from 'src/core/api';
import { getAccessToken } from 'src/core/api/auth';
import { Puzzle, PuzzleReq } from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const accessToken = getAccessToken({ bearer: true }) || '';

// fetch puzzles
export async function fetchPuzzles(userId: string): Promise<Puzzle[]> {
  const response = await fetch(
    `${API_BASE_URL}/puzzles?` +
      new URLSearchParams({
        userId,
      }),
    {
      method: 'GET',
      headers: {
        Authorization: accessToken as string,
      },
    },
  );
  const data = await response.json();

  // const data = await new Promise<Puzzle[]>((resolve) => {
  //   resolve([
  //     {
  //       id: 0,
  //       category: 'af',
  //       title: '파이팅',
  //       messages: [
  //         {
  //           id: 2,
  //           content: 'hi',
  //           from: '정현',
  //           to: '동희',
  //           isOpened: false,
  //         },
  //         {
  //           id: 2,
  //           content: 'hi',
  //           from: '정현',
  //           to: '동희',
  //           isOpened: false,
  //         },
  //         {
  //           id: 2,
  //           content: 'hi',
  //           from: '정현',
  //           to: '동희',
  //           isOpened: false,
  //         },
  //         {
  //           id: 2,
  //           content: 'hi',
  //           from: '정현',
  //           to: '동희',
  //           isOpened: false,
  //         },
  //         {
  //           id: 2,
  //           content: 'hi',
  //           from: '정현',
  //           to: '동희',
  //           isOpened: false,
  //         },
  //         {
  //           id: 2,
  //           content: 'hi',
  //           from: '정현',
  //           to: '동희',
  //           isOpened: false,
  //         },
  //         {
  //           id: 2,
  //           content: 'hi',
  //           from: '정현',
  //           to: '동희',
  //           isOpened: false,
  //         },
  //         {
  //           id: 2,
  //           content: 'hi',
  //           from: '정현',
  //           to: '동희',
  //           isOpened: false,
  //         },
  //         {
  //           id: 2,
  //           content: 'hi',
  //           from: '정현',
  //           to: '동희',
  //           isOpened: false,
  //         },
  //       ],
  //     },
  //     {
  //       id: 0,
  //       category: 'af',
  //       title: '파이팅',
  //       messages: [
  //         {
  //           id: 2,
  //           content: 'hi',
  //           from: '정현',
  //           to: '동희',
  //           isOpened: false,
  //         },
  //       ],
  //     },
  //   ]);
  // });

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
