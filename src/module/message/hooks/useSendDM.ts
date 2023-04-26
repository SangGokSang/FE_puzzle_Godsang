import { useMutation } from '@tanstack/react-query';
import { IApiError } from 'src/core/type/api-error';
import { MutationOptions } from 'src/core/type/react-query-types';
import { postDM } from '../api';
import { SendMessageRequest } from '../types';
import { Puzzles } from 'src/module/puzzles';

export const useSendDM = (options: MutationOptions<Puzzles, IApiError, SendMessageRequest> = {}) => {
  return useMutation<Puzzles, IApiError, SendMessageRequest>((request: SendMessageRequest) => postDM(request), options);
};
