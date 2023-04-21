import { useMutation } from '@tanstack/react-query';
import { ApiError } from 'next/dist/server/api-utils';
import { MutationOptions } from 'src/core/type/react-query-types';
import { petchKey } from '../api';

export const usePetchKey = (options: MutationOptions<unknown, ApiError, void> = {}) => {
  return useMutation<unknown, ApiError, void>(() => petchKey(), options);
};
