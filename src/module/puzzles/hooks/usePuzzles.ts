import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { ApiError } from 'src/core/type/ApiError';
import { fetchPuzzles } from '../api';
import { PUZZLES_KEY } from '../key';
import { Puzzles } from '../types';

export const usePuzzles = (userId: string, options?: UseQueryOptions<Puzzles, ApiError>) => {
  return useQuery<Puzzles, ApiError>([PUZZLES_KEY, userId], () => fetchPuzzles(userId), options);
};
