import { signIn, useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { Provider } from '../type/provider';
import { isEmpty } from 'lodash';
import { LoginPayload, usePostLogin } from 'src/module/auth';

export default function useLogin() {
  const session = useSession();
  const postLogin = usePostLogin();

  useEffect(() => {
    if (session.status === 'authenticated') {
      const {
        data: {
          user: { providerId, email, name },
        },
      } = session;
      if (!isEmpty(session.data.user)) {
        const localStorageProvider = localStorage.getItem('provider');
        const payload: LoginPayload = {
          provider: localStorageProvider as Provider,
          providerId,
          email,
          nickname: name?.slice(0, 10) || '',
        };
        postLogin.mutate(payload);
      }
    }
  }, [session]);

  return (param: Provider) => {
    localStorage.setItem('provider', param);
    signIn(param);
  };
}
