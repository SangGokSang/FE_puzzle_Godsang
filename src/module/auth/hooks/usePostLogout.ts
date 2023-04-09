import { useMutation } from '@tanstack/react-query';
import { ApiError } from 'src/core/type/ApiError';
import { MutationOptions } from 'src/core/type/react-query-types';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import auth, { authDefaultValue } from 'src/recoil/auth/atom';
import { signOut } from 'next-auth/react';
import { logout } from '../api';
import route from 'src/core/const/route.path';
import { clearTokens } from 'src/core/api/auth';

export const usePostLogout = (options: MutationOptions<void, ApiError, void> = {}) => {
  const router = useRouter();
  const setAuth = useSetRecoilState(auth);
  return useMutation<void, ApiError, void>(() => logout(), {
    ...options,
    onSuccess: () => {
      signOut({ redirect: false });
      setAuth(authDefaultValue);
      clearTokens();
      setTimeout(() => {
        router.push(route.Landing);
      }, 300);
    },
  });
};
