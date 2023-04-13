import { useMutation } from '@tanstack/react-query';
import { ApiError } from 'src/core/type/ApiError';
import { MutationOptions } from 'src/core/type/react-query-types';
import { withdraw } from '../api';
import { usePostLogout } from './usePostLogout';

export const useWithdraw = (options: MutationOptions<void, ApiError, void> = {}) => {
  const logout = usePostLogout();
  return useMutation<void, ApiError, void>(() => withdraw(), {
    ...options,
    onSuccess: () => {
      logout.mutate();
      alert('다음에 또봐요! 😎');
    },
  });
};
