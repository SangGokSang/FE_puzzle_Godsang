import { useMutation } from '@tanstack/react-query';
import { PuzzleReq } from '../types';
import { MutationOptions } from 'src/core/type/react-query-types';
import { addPuzzle } from '../api';
import { ApiError } from 'src/core/type/ApiError';

export const useAddPuzzle = (options: MutationOptions<unknown, ApiError, PuzzleReq> = {}) => {
  return useMutation<unknown, ApiError, PuzzleReq>((param: PuzzleReq) => addPuzzle(param), options);
};
