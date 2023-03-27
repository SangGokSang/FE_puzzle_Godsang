import { useMutation } from '@tanstack/react-query';
import { ApiError } from 'next/dist/server/api-utils';
import { MutationOptions } from 'src/core/type/react-query-types';
import { postDM } from '../api';
import { SendMessage } from '../types';

export const useSendDM = (
  puzzleId: number,
  param: SendMessage,
  options: MutationOptions<unknown, ApiError, SendMessage> = {},
) => {
  return useMutation<unknown, ApiError, SendMessage>((param: SendMessage) => postDM(puzzleId, param), options);
};
