import { useMutation } from '@tanstack/react-query';
import { ApiError } from 'src/core/type/ApiError';
import { MutationOptions } from 'src/core/type/react-query-types';
import { login } from '../api';
import { Token, Provider } from '../types';

export const useLogin = (options: MutationOptions<Token, ApiError, Provider> = {}) => {
  return useMutation<Token, ApiError, Provider>((provider: Provider) => login(provider), options);
};
