import { useMutation } from '@tanstack/react-query';
import { ApiError } from 'next/dist/server/api-utils';
import { MutationOptions } from 'src/core/type/react-query-types';
import { patchKey } from '../api';
import { KeyInfo } from '../types';

export const useTheKey = (
  puzzleId: number,
  messageId: number,
  options: MutationOptions<unknown, ApiError, KeyInfo> = {},
) => {
  return useMutation<unknown, ApiError, KeyInfo>(() => patchKey(puzzleId, messageId), options);
};
