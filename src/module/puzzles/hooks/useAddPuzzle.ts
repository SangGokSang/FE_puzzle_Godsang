import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PuzzleReq } from '../types';
import { MutationOptions } from 'src/core/type/react-query-types';
import { addPuzzle } from '../api';
import { ApiError } from 'src/core/type/ApiError';
import { PUZZLES_KEY } from '../key';
import { useSyncRecoil } from 'src/core/hooks/useSyncRecoil';
import { User } from 'src/recoil/auth/type';
import auth from 'src/recoil/auth';
import { authDefaultValue } from 'src/recoil/auth/atom';

export const useAddPuzzle = (options: MutationOptions<unknown, ApiError, PuzzleReq> = {}) => {
  const queryClient = useQueryClient();
  const { userId } = useSyncRecoil<User>({ atom: auth, defaultValue: authDefaultValue });

  return useMutation<unknown, ApiError, PuzzleReq>((param: PuzzleReq) => addPuzzle(param), {
    ...options,
    onSuccess: (...args) => {
      queryClient.invalidateQueries([PUZZLES_KEY, userId]);

      if (options?.onSuccess instanceof Function) {
        options.onSuccess(...args);
      }
    },
  });
};
