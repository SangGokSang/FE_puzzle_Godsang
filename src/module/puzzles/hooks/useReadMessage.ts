import { useMutation } from '@tanstack/react-query';
import { Puzzles, ReadMessageReq } from '../types';
import { MutationOptions } from 'src/core/type/react-query-types';
import { readMessage } from '../api';
import { ApiError } from 'src/core/type/ApiError';

// 메세지 읽고 키 차감
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
};
