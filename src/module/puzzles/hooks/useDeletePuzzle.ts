import { useMutation } from '@tanstack/react-query';
import { MutationOptions } from 'src/core/type/react-query-types';
import { deletePuzzle } from '../api';
import { ApiError } from 'src/core/type/ApiError';
import { Puzzles } from '../types';

export const useDeletePuzzle = (options: MutationOptions<Puzzles, ApiError, number> = {}) => {
  return useMutation<Puzzles, ApiError, number>((puzzleId: number) => deletePuzzle(puzzleId), options);
};
