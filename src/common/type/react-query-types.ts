import { UseMutationOptions } from '@tanstack/react-query';

export type MutationOptions<TResponse, TError, TParam> = Omit<
  UseMutationOptions<TResponse, TError, TParam>,
  'mutationFn'
>;
