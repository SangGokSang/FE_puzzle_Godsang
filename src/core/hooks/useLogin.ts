import jwtDecode from 'jwt-decode';
import { signIn, useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import auth from 'src/recoil/auth/atom';
import { User } from 'src/recoil/auth/type';
import { setApiJwt } from '../api/api';
import { Provider } from '../type/provider';
import { useRouter } from 'next/router';
import { Pathname } from '../const/enum';

export default function useLogin() {
  const session = useSession();
  const router = useRouter();
  const setAuth = useSetRecoilState(auth);

  useEffect(() => {
    if (session.status === 'authenticated') {
      const {
        data: {
          user: { accessToken },
        },
      } = session;
      const { nickname, birthdate, isDeleted }: User = jwtDecode(accessToken);
      setAuth({ nickname, birthdate, isDeleted });
      setApiJwt(accessToken);
      router.push(Pathname.list);
    }
  }, [session, router, setAuth]);
  return (provider: Provider) => signIn(provider);
}
