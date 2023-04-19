import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { ExceptionCode } from 'src/core/const/enum';
import route from 'src/core/const/route.path';
import { ApiError } from 'src/core/type/ApiError';
import { fetchPuzzles } from '../api';
import { PUZZLES_KEY } from '../key';
import { Puzzles } from '../types';

export const usePuzzles = (userId: string, options?: UseQueryOptions<Puzzles, ApiError>) => {
  const router = useRouter();

  return useQuery<Puzzles, ApiError>([PUZZLES_KEY], () => fetchPuzzles(userId), {
    ...options,
    onSuccess: (data) => {
      if (data?.code === ExceptionCode.invalidUser) {
        router.push(route.NotFound);
      }
      if (options?.onSuccess instanceof Function) {
        options.onSuccess(data);
      }
    },
  });
};
