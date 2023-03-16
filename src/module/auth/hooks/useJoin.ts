import { useMutation } from '@tanstack/react-query';
import { ApiError } from 'src/common/type/ApiError';
import { MutationOptions } from 'src/common/type/react-query-types';
import { login } from '../api';
import { Token, Provider } from '../types';

export const useJoin = (provider: Provider, options: MutationOptions<unknown, ApiError, Token> = {}) => {
  return useMutation<unknown, ApiError, Token>(() => login(provider), options);
};
