import api from 'src/core/api/api';
import { Provider, Token } from './types';

export async function login(provider: Provider): Promise<Token> {
  const { data } = await api({
    url: `/api/auth/login/${provider}`,
    method: 'get',
  });
  return data;
}
