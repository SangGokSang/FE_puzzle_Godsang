import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MutationOptions } from 'src/core/type/react-query-types';
import { deletePuzzle } from '../api';
import { ApiError } from 'src/core/type/ApiError';
import { PUZZLES_KEY } from '../key';

export const useDeletePuzzle = (options: MutationOptions<unknown, ApiError, number> = {}) => {
  const queryClient = useQueryClient();

  return useMutation<unknown, ApiError, number>((puzzleId: number) => deletePuzzle(puzzleId), {
    ...options,
    onSuccess: (...args) => {
      queryClient.invalidateQueries([PUZZLES_KEY]);

      if (options?.onSuccess instanceof Function) {
        options.onSuccess(...args);
      }
    },
  });
};
