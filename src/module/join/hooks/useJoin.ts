import { useMutation } from '@tanstack/react-query';
import { ApiError } from 'src/core/type/ApiError';
import { MutationOptions } from 'src/core/type/react-query-types';
import { postJoin } from '../api';
import { InfoEditResponse, UserReq } from '../types';

export const useJoin = (options: MutationOptions<InfoEditResponse, ApiError, UserReq> = {}) => {
  return useMutation<InfoEditResponse, ApiError, UserReq>((param: UserReq) => postJoin(param), {
    ...options,
  });
};
