import { useMutation } from '@tanstack/react-query';
import { ApiError } from 'src/core/type/ApiError';
import { MutationOptions } from 'src/core/type/react-query-types';
import { restore } from '../api';
import { LoginResponse } from '../types';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import auth from 'src/recoil/auth/atom';
import route from 'src/core/const/route.path';

export const useRestore = (options: MutationOptions<LoginResponse, ApiError, void> = {}) => {
  const router = useRouter();
  const setUser = useSetRecoilState(auth);
  return useMutation<LoginResponse, ApiError, void>(() => restore(), {
    ...options,
    onSuccess: (data) => {
      alert('다시 오신걸 환영해요! \n다시 오실줄 알고 퍼즐을 다시 불러왔어요 🥰');
      setUser({
        userId: data.userId,
        nickname: data.nickname,
        birthdate: data.birthdate,
        isSignUp: data.isSignUp,
        isWithdrawUser: data.isWithdrawUser,
        provider: data.provider,
        email: data.email,
      });
      setTimeout(() => {
        router.push({ pathname: route.List, query: { userId: data.userId } });
      }, 300);
    },
  });
};
