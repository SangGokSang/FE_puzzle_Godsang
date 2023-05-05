import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { ApiError } from 'next/dist/server/api-utils';
import { getUserCount } from '../api';
import { USER_COUNT_KEY } from '../key';

// admin
export const useGetUserCount = (options?: UseQueryOptions<number, ApiError>) => {
  return useQuery<number, ApiError>([USER_COUNT_KEY], () => getUserCount(), options);
};
