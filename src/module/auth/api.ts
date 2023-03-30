import api from 'src/core/api/api';
import { LoginRequest, Token } from './types';

export async function login(provider: LoginRequest): Promise<Token> {
  const { data } = await api({
    url: `/auth/login/${provider}`,
    method: 'get',
  }).then(async () => {
    const { data } = await api({ url: '/auth/callback', method: 'get' });
    return data;
  });
  return data;
}
