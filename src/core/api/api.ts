import qs from 'qs';
import axios, { AxiosRequestConfig } from 'axios';
import { getAccessToken, logout, setAccessToken, setTokens } from './auth';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

function paramsSerializer(params: unknown): string {
  return qs.stringify(params);
}

const initialConfig: AxiosRequestConfig = Object.freeze({
  baseURL: API_BASE_URL,
  timeout: 0,
  paramsSerializer: {
    serialize: paramsSerializer,
  },
});

export const api = createApiInstance(getAccessToken({ bearer: true }));

api.interceptors.response.use(
  (result) => result,
  async (error) => {
    console.log(error);
    if (error === undefined) throw error;

    if (error.response?.status === 401 && !getAccessToken()) {
      logout();
      return;
    }

    if (error.response?.status === 401 && !error.request?.responseURL?.endsWith('/api/auth/login')) {
      try {
        const { token } = await useRefresh();

        // Retry failed request
        const retryConfig = {
          ...error.config,
          headers: { ...error.config.headers, Authorization: `Bearer ${token}` },
        };
        return apiReturnsResponse(retryConfig);
      } catch (error) {
        logout();
        return;
      }
    } else if (error) {
      const e = { ...error.response?.data, status: error.response?.status };
      throw e;
    }

    throw error;
  },
);

export const apiReturnsResponse = createApiInstance(getAccessToken({ bearer: true }));

apiReturnsResponse.interceptors.response.use(
  (result) => result,
  async (error) => {
    if (error === undefined) throw error;

    if (error.response?.status === 401) {
      logout();
      return;
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

// 로직 처리해야함
async function useRefresh(): Promise<{ token: string; refreshToken: string }> {
  const refreshApi = createApiInstance();
  try {
    const result = await refreshApi({
      url: '/user/refresh-token',
      method: 'post',
    });
    const { token } = result.data;
    setTokens(token);
    return result.data;
  } catch (error) {
    logout();
    throw error;
  }
}

/**
 * Set bearer token to the API.
 * @param token A JWT. Not bearer.
 */
function setApiJwt(token: string): void {
  const bearerToken = `Bearer ${token}`;
  setAccessToken(token);
  api.defaults.headers.common.Authorization = bearerToken;
  apiReturnsResponse.defaults.headers.common.Authorization = bearerToken;
}

export { API_BASE_URL, setApiJwt };

export default api;
