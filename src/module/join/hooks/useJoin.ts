import { useMutation } from '@tanstack/react-query';
import { ApiError } from 'src/core/type/ApiError';
import { MutationOptions } from 'src/core/type/react-query-types';
import { postJoin } from '../api';
import { UserInfo } from '../types';

export const useJoin = (param: UserInfo, options: MutationOptions<unknown, ApiError, UserInfo> = {}) => {
  return useMutation<unknown, ApiError, UserInfo>((param: UserInfo) => postJoin(param), options);
};
