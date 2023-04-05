import { useMutation } from '@tanstack/react-query';
import { ApiError } from 'src/core/type/ApiError';
import { MutationOptions } from 'src/core/type/react-query-types';
import { restore } from '../api';
import { LoginResponse } from '../types';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import auth from 'src/recoil/auth/atom';
import { setApiJwt } from 'src/core/api/api';
import route from 'src/core/const/route.path';

export const useRestore = (options: MutationOptions<LoginResponse, ApiError, void> = {}) => {
  const router = useRouter();
  const setAuth = useSetRecoilState(auth);
  return useMutation<LoginResponse, ApiError, void>(() => restore(), {
    ...options,
    onSuccess: (data) => {
      setAuth(data);
      setApiJwt(data.accessToken);
      router.push({ pathname: route.List, query: { userId: data.userId } });
    },
  });
};
