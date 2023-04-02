import api from 'src/core/api/api';
import { LoginPayload, LoginResponse } from './types';

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  const { data } = await api({
    url: '/user/login',
    method: 'post',
    data: payload,
  });
  return data;
}
