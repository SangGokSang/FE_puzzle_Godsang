import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PuzzleReq } from '../types';
import { MutationOptions } from 'src/core/type/react-query-types';
import { addPuzzle } from '../api';
import { ApiError } from 'src/core/type/ApiError';
import { PUZZLES_KEY } from '../key';

export const useAddPuzzle = (options: MutationOptions<unknown, ApiError, PuzzleReq> = {}) => {
  const queryClient = useQueryClient();

  return useMutation<unknown, ApiError, PuzzleReq>((param: PuzzleReq) => addPuzzle(param), {
    ...options,
    onSuccess: (...args) => {
      queryClient.invalidateQueries([PUZZLES_KEY]);

      if (options?.onSuccess instanceof Function) {
        options.onSuccess(...args);
      }
    },
  });
};
