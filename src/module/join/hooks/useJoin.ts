import { useMutation } from '@tanstack/react-query';
import { ApiError } from 'src/core/type/ApiError';
import { MutationOptions } from 'src/core/type/react-query-types';
import { postJoin } from '../api';
import { UserReq } from '../types';

export const useJoin = (options: MutationOptions<unknown, ApiError, UserReq> = {}) => {
  return useMutation<unknown, ApiError, UserReq>((param: UserReq) => postJoin(param), options);
};
