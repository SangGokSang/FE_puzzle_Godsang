import { useMutation } from '@tanstack/react-query';
import { ApiError } from 'src/core/type/ApiError';
import { MutationOptions } from 'src/core/type/react-query-types';
import { withdraw } from '../api';
import { useRouter } from 'next/router';
import route from 'src/core/const/route.path';

export const useWithdraw = (options: MutationOptions<void, ApiError, void> = {}) => {
  const router = useRouter();
  return useMutation<void, ApiError, void>(() => withdraw(), {
    ...options,
    onSuccess: () => {
      alert('다음에 또봐요! 😎');
      router.push(route.Landing);
    },
  });
};
