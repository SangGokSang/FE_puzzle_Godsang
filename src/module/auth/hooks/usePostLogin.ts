import { useMutation } from '@tanstack/react-query';
import { ApiError } from 'src/core/type/ApiError';
import { MutationOptions } from 'src/core/type/react-query-types';
import { login } from '../api';
import { LoginPayload, LoginResponse } from '../types';
import { useRouter } from 'next/router';
import { User } from 'src/recoil/auth/type';
import jwtDecode from 'jwt-decode';
import { useSetRecoilState } from 'recoil';
import auth from 'src/recoil/auth/atom';
import { setApiJwt } from 'src/core/api/api';
import { Pathname } from 'src/core/const/enum';

export const usePostLogin = (options: MutationOptions<LoginResponse, ApiError, LoginPayload> = {}) => {
  const router = useRouter();
  const setAuth = useSetRecoilState(auth);
  return useMutation<LoginResponse, ApiError, LoginPayload>((payload: LoginPayload) => login(payload), {
    ...options,
    onSuccess: (data) => {
      const { nickname, birthdate, isDeleted }: User = jwtDecode(data);

      setAuth({ nickname, birthdate, isDeleted });
      setApiJwt(data);
      router.push(Pathname.list);
    },
  });
};
