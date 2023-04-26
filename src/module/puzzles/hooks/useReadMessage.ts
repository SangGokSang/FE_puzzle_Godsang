import { useMutation } from '@tanstack/react-query';
import { Puzzles, ReadMessageReq } from '../types';
import { MutationOptions } from 'src/core/type/react-query-types';
import { readMessage } from '../api';
import { ApiError } from 'src/core/type/ApiError';

// 메세지 읽고 키 차감
<<<<<<< HEAD
<<<<<<< Updated upstream
export const useReadMessage = (options: MutationOptions<number, ApiError, ReadMessageReq> = {}) => {
  const queryClient = useQueryClient();
  const { userId } = useSyncRecoil<User>({ atom: auth, defaultValue: authDefaultValue });

  return useMutation<number, ApiError, ReadMessageReq>((param: ReadMessageReq) => readMessage(param), {
    ...options,
    onSuccess: (...args) => {
      queryClient.invalidateQueries([PUZZLES_KEY, `${userId}`]);
      queryClient.invalidateQueries([KEY_INFO_KEY]);

      if (options?.onSuccess instanceof Function) {
        options.onSuccess(...args);
      }
    },
  });
=======
export const useReadMessage = (
  options: MutationOptions<{ keyCount: number; list: Puzzles }, ApiError, ReadMessageReq> = {},
) => {
  return useMutation<{ keyCount: number; list: Puzzles }, ApiError, ReadMessageReq>(
    (param: ReadMessageReq) => readMessage(param),
    options,
  );
>>>>>>> Stashed changes
=======
export const useReadMessage = (
  options: MutationOptions<{ keyCount: number; list: Puzzles }, ApiError, ReadMessageReq> = {},
) => {
  return useMutation<{ keyCount: number; list: Puzzles }, ApiError, ReadMessageReq>(
    (param: ReadMessageReq) => readMessage(param),
    {
      ...options,
      onSuccess: (...args) => {
        if (options?.onSuccess instanceof Function) {
          options.onSuccess(...args);
        }
      },
    },
  );
>>>>>>> 78be383ee8c7cc36247e5d1995bf2d52fdbb6a96
};
