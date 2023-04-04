import api from 'src/core/api/api';
import { Puzzle, PuzzleReq } from './types';

// fetch puzzles
export async function fetchPuzzles(): Promise<Puzzle[]> {
  const { data } = await api({
    url: `/puzzles`,
    method: 'get',
  });

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
