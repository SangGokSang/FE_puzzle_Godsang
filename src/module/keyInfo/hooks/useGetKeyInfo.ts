import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { ApiError } from 'next/dist/server/api-utils';
import { getKeyInfo } from '../api';
import { KEY_INFO_KEY } from '../key';
import { KeyInfo } from '../types';

export const useGetKeyInfo = (options?: UseQueryOptions<KeyInfo, ApiError>) => {
  return useQuery<KeyInfo, ApiError>([KEY_INFO_KEY], () => getKeyInfo(), options);
};
