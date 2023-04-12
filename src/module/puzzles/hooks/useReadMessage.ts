import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ReadMessageReq } from '../types';
import { MutationOptions } from 'src/core/type/react-query-types';
import { readMessage } from '../api';
import { ApiError } from 'src/core/type/ApiError';
import { KEY_INFO_KEY } from 'src/module/keyInfo';
import { PUZZLES_KEY } from '../key';

// 메세지 읽고 키 차감
export const useReadMessage = (options: MutationOptions<number, ApiError, ReadMessageReq> = {}) => {
  const queryClient = useQueryClient();

  return useMutation<number, ApiError, ReadMessageReq>((param: ReadMessageReq) => readMessage(param), {
    ...options,
    onSuccess: (...args) => {
      queryClient.invalidateQueries([KEY_INFO_KEY]);
      queryClient.invalidateQueries([PUZZLES_KEY]);

      if (options?.onSuccess instanceof Function) {
        options.onSuccess(...args);
      }
    },
  });
};
