import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { ApiError } from 'src/core/type/ApiError';
import { fetchPuzzles } from '../api';
import { PUZZLES_KEY } from '../key';
import { Puzzle } from '../types';

export const useFetchPuzzles = (userId: string, options?: UseQueryOptions<Puzzle[], ApiError>) => {
  return useQuery<Puzzle[], ApiError>([PUZZLES_KEY], () => fetchPuzzles(userId), options);
};
