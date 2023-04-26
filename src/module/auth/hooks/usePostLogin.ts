import { useMutation } from '@tanstack/react-query';
import { ApiError } from 'src/core/type/ApiError';
import { MutationOptions } from 'src/core/type/react-query-types';
import { login } from '../api';
import { LoginPayload, LoginResponse } from '../types';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import auth from 'src/recoil/auth/atom';
import { setApiJwt } from 'src/core/api';
import route from 'src/core/const/route.path';
import { useRestore } from './useRestore';

export const usePostLogin = (options: MutationOptions<LoginResponse, ApiError, LoginPayload> = {}) => {
  const router = useRouter();
  const setAuth = useSetRecoilState(auth);
  const restore = useRestore();
  return useMutation<LoginResponse, ApiError, LoginPayload>((payload: LoginPayload) => login(payload), {
    ...options,
    onSuccess: (data) => {
      setApiJwt(data.accessToken);
      setAuth({
        userId: data.userId,
        nickname: data.nickname,
        birthdate: data.birthdate,
        isSignUp: data.isSignUp,
        isWithdrawUser: data.isWithdrawUser,
        email: data.email,
        provider: data.provider,
      });
      if (data.isWithdrawUser) {
        restore.mutate();
      } else if (data.isSignUp) {
        router.push(route.HowToUse);
      } else {
        router.push({ pathname: route.List, query: { userId: data.userId } });
      }
    },
  });
};
