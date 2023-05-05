import api from 'src/core/api';
import { LoginPayload, LoginResponse } from './types';

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  const { data } = await api({
    url: '/user/login',
    method: 'post',
    data: payload,
  });
  return data;
}

export async function logout() {
  await api({
    url: '/user/logout',
    method: 'post',
  });
}

export async function restore(): Promise<LoginResponse> {
  const { data } = await api({
    url: '/user/restore',
    method: 'patch',
  });
  return data;
}

export async function withdraw(): Promise<void> {
  await api({
    url: '/user/withdraw',
    method: 'patch',
  });
}

// admin
export async function getUserCount(): Promise<number> {
  const { data } = await api({
    url: '/user',
    method: 'get',
  });
  return data;
}
