import { useMutation, useQueryClient } from '@tanstack/react-query';
import { IApiError } from 'src/core/type/api-error';
import { MutationOptions } from 'src/core/type/react-query-types';
import { PUZZLES_KEY } from 'src/module/puzzles';
import { postDM } from '../api';
import { SendMessageRequest } from '../types';

export const useSendDM = (options: MutationOptions<void, IApiError, SendMessageRequest> = {}) => {
  const queryClient = useQueryClient();

  return useMutation<void, IApiError, SendMessageRequest>((request: SendMessageRequest) => postDM(request), {
    ...options,
    onSuccess: (...args) => {
      queryClient.invalidateQueries([PUZZLES_KEY]);

      if (options?.onSuccess instanceof Function) {
        options.onSuccess(...args);
      }
    },
  });
};
