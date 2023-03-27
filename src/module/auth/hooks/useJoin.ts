import { useMutation } from '@tanstack/react-query';
import { ApiError } from 'src/core/type/ApiError';
import { MutationOptions } from 'src/core/type/react-query-types';
import { login } from '../api';
import { Token, Provider } from '../types';

export const useJoin = (provider: Provider, options: MutationOptions<unknown, ApiError, Token> = {}) => {
  return useMutation<unknown, ApiError, Token>(() => login(provider), options);
};
