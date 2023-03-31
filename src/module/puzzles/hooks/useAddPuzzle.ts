import { useMutation } from '@tanstack/react-query';
import { PuzzleReq } from '../types';
import { IApiError } from 'src/core/type/api-error';
import { MutationOptions } from 'src/core/type/react-query-types';
import { addPuzzle } from '../api';

export const useAddPuzzle = (options: MutationOptions<unknown, IApiError, PuzzleReq> = {}) => {
  return useMutation<unknown, IApiError, PuzzleReq>((param: PuzzleReq) => addPuzzle(param), options);
};
