import { useMutation } from '@tanstack/react-query';
import { ApiError } from 'src/core/type/ApiError';
import { MutationOptions } from 'src/core/type/react-query-types';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import auth from 'src/recoil/auth/atom';
import { Pathname } from 'src/core/const/enum';
import { clearTokens } from 'src/core/api/auth';
import { signOut } from 'next-auth/react';
import { logout } from '../api';

export const usePostLogout = (options: MutationOptions<void, ApiError, void> = {}) => {
  const router = useRouter();
  const setAuth = useSetRecoilState(auth);
  return useMutation<void, ApiError, void>(() => logout(), {
    ...options,
    onSuccess: () => {
      const resetValue = {
        nickname: '',
        birthdate: 0,
        isDeleted: false,
      };

      signOut({ redirect: false });
      setAuth(resetValue);
      clearTokens();
      router.push(Pathname.login);
    },
  });
};
