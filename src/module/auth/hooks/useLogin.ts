import { useMutation } from '@tanstack/react-query';
import { ApiError } from 'src/core/type/ApiError';
import { MutationOptions } from 'src/core/type/react-query-types';
import { login } from '../api';
import { Token, LoginRequest } from '../types';

export const useLogin = (options: MutationOptions<Token, ApiError, LoginRequest> = {}) => {
  return useMutation<Token, ApiError, LoginRequest>((req: LoginRequest) => login(req), options);
};
