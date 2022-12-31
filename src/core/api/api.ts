import axios, { AxiosRequestConfig } from 'axios';
import qs from 'qs';
import { getAccessToken, getRefreshToken, logout, setTokens } from './auth';

const API_BASE_URL = process.env.REACT_APP_CUSTOM_NODE_ENV;

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

/**
 * set base url for api
 * @param baseUrl string
 */
function setBaseUrl(baseUrl: string): void {
  api.defaults.baseURL = baseUrl;
  apiReturnsResponse.defaults.baseURL = baseUrl;
}

export const api = createApiInstance(getAccessToken({ bearer: true }));

api.interceptors.response.use(
  (result) => result,
  async (error) => {
    // Server does not response
    if (error === undefined) throw error;

    if (error.response?.status === 401 && !getAccessToken()) {
      logout();
      return;
    }

    if (error.response?.status === 401 && !error.request?.responseURL?.endsWith('/api/auth/login')) {
      // 401 Unauthorized
      try {
        // Get next access token
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

// Cloned error interceptor.
apiReturnsResponse.interceptors.response.use(
  (result) => result,
  async (error) => {
    // Server does not response
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

async function useRefresh(): Promise<{ token: string; refreshToken: string }> {
  /** The API instance for refreshing; Refresh token fetched from cookies. */
  const refreshApi = createApiInstance(getRefreshToken({ bearer: true }), {
    baseURL: '',
  });

  try {
    const result = await refreshApi({
      url: `${API_BASE_URL}/api/auth/refresh-token`,
      method: 'get',
    });
    const { token, refreshToken } = result.data;
    setTokens(token, refreshToken);
    return result.data;
  } catch (error) {
    logout();
    console.log(error); // 임시 처리
    throw error;
  }
}

/**
 * Set bearer token to the API.
 * @param token A JWT. Not bearer.
 */
function setApiJwt(token: string): void {
  const bearerToken = `Bearer ${token}`;
  api.defaults.headers.common.Authorization = bearerToken;
  apiReturnsResponse.defaults.headers.common.Authorization = bearerToken;
}

export { API_BASE_URL, setBaseUrl, setApiJwt };

export default api;
