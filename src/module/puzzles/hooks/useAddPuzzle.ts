import { useMutation } from '@tanstack/react-query';
import { PuzzleReq, Puzzles } from '../types';
import { MutationOptions } from 'src/core/type/react-query-types';
import { addPuzzle } from '../api';
import { ApiError } from 'src/core/type/ApiError';

export const useAddPuzzle = (options: MutationOptions<Puzzles, ApiError, PuzzleReq> = {}) => {
  return useMutation<Puzzles, ApiError, PuzzleReq>((param: PuzzleReq) => addPuzzle(param), options);
};
