import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiError } from 'next/dist/server/api-utils';
import { MutationOptions } from 'src/core/type/react-query-types';
import { PUZZLES_KEY } from 'src/module/puzzles';
import { postDM } from '../api';
import { SendMessageRequest } from '../types';

export const useSendDM = (options: MutationOptions<void, ApiError, SendMessageRequest> = {}) => {
  const queryClient = useQueryClient();

  return useMutation<void, ApiError, SendMessageRequest>((request: SendMessageRequest) => postDM(request), {
    ...options,
    onSuccess: (...args) => {
      queryClient.invalidateQueries([PUZZLES_KEY]);

      if (options?.onSuccess instanceof Function) {
        options.onSuccess(...args);
      }
    },
  });
};
