import { useMutation } from '@tanstack/react-query';
import { ApiError } from 'next/dist/server/api-utils';
import { MutationOptions } from 'src/core/type/react-query-types';
import { postDM } from '../api';
import { SendMessageRequest } from '../types';

export const useSendDM = (options: MutationOptions<void, ApiError, SendMessageRequest> = {}) => {
  return useMutation<void, ApiError, SendMessageRequest>((request: SendMessageRequest) => postDM(request), {
    ...options,
  });
};
