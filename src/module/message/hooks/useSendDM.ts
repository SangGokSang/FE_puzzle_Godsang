import { useMutation } from '@tanstack/react-query';
import { IApiError } from 'src/core/type/api-error';
import { MutationOptions } from 'src/core/type/react-query-types';
import { postDM } from '../api';
import { SendMessageRequest } from '../types';

export const useSendDM = (options: MutationOptions<void, IApiError, SendMessageRequest> = {}) => {
  return useMutation<void, IApiError, SendMessageRequest>((request: SendMessageRequest) => postDM(request), options);
};
