/* eslint-disable no-debugger */
import qs from 'qs';
import axios, { AxiosRequestConfig } from 'axios';
import { signOut } from 'next-auth/react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const initialConfig: AxiosRequestConfig = Object.freeze({
  baseURL: API_BASE_URL,
  timeout: 0,
  paramsSerializer: {
    serialize: paramsSerializer,
  },
});

export const api = createApiInstance();

api.interceptors.response.use(
  (result) => result,
  async (error) => {
    if (error === undefined) throw error;
    if (error.response?.status === 401 && !error.request?.responseURL?.endsWith('/api/user/login')) {
      try {
        const token = await useRefresh();
        const retryConfig = {
          ...error.config,
          headers: { ...error.config.headers, Authorization: `Bearer ${token}` },
        };
        return api(retryConfig);
      } catch (error) {
        logout();
        return;
      }
      // 리스트일때 키를 조회해야한다면? (로그인이 안되어있는 상태는 패스해도 된다)
    } else if (
      error.response.status === 400 &&
      error.response.data.code === 'INVALID_TOKEN' &&
      !location.href.includes('list')
    ) {
      console.log(error.response.data.code);
      const token = await useRefresh();
      console.log(token);
      debugger;
      // try {
      //   const token = await useRefresh();
      //   debugger;
      //   const retryConfig = {
      //     ...error.config,
      //     headers: { ...error.config.headers, Authorization: `Bearer ${token}` },
      //   };
      //   return api(retryConfig);
      // } catch (error) {
      //   debugger;
      //   logout();
      //   return;
      // }
    } else if (error.response?.status === 401) {
      logout();
      return;
    } else if (error) {
      const e = { ...error.response?.data, status: error.response?.status };
      throw e;
    }

    throw error;
  },
);

function createApiInstance(bearerJwt = '', options: AxiosRequestConfig = {}) {
  const api = axios.create({
    ...initialConfig,
    ...options,
  });
  api.defaults.headers.common['Authorization'] = bearerJwt;
  return api;
}

async function useRefresh(): Promise<{ token: string; refreshToken: string }> {
  const refreshApi = createApiInstance();
  try {
    const { data: token } = await refreshApi({
      url: '/user/refresh-token',
      method: 'post',
    });
    console.log('data', token);
    debugger;
    return token;
  } catch (error) {
    console.log(error);
    debugger;
    logout();
    throw error;
  }
}

function paramsSerializer(params: unknown): string {
  return qs.stringify(params);
}

function setApiJwt(token: string): void {
  const bearerToken = `Bearer ${token}`;
  api.defaults.headers.common.Authorization = bearerToken;
}

function logout() {
  signOut();
  location.href =
    process.env.NODE_ENV === 'production'
      ? 'https://dearmy2023.click'
      : process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : '';
}

export { API_BASE_URL, setApiJwt, logout };
export default api;
