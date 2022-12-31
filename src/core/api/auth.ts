import cookieStorage from '../lib/cookie-storage';

export const AUTH_KEY = 'auth';
export const DEFAULT_AUTH = {
  token: '',
  refreshToken: '',
  user: {
    username: '',
  },
};

enum TKey {
  token = 'token',
  refreshToken = 'refreshToken',
}

function getToken(key: TKey, bearer: boolean) {
  const prefix = bearer ? 'Bearer ' : '';
  let cookieToken;
  try {
    const cookie = JSON.parse(cookieStorage.getItem(AUTH_KEY) as string) || {
      token: '',
      refreshToken: '',
    };
    cookieToken = cookie[AUTH_KEY][key];
  } catch {
    cookieToken = undefined;
  }
  const token: string | undefined = cookieToken;
  return token ? `${prefix}${token}` : token;
}

function setToken(key: TKey, token: string) {
  try {
    const auth = JSON.parse(cookieStorage.getItem(AUTH_KEY) as string);

    clearTokens();
    cookieStorage.setItem(
      AUTH_KEY,
      JSON.stringify({
        [AUTH_KEY]: {
          ...auth[AUTH_KEY],
          [key]: token,
        },
      }),
    );
  } catch (error) {
    console.log(error);
  }
}

export function getAccessToken({ bearer } = { bearer: false }): string | undefined {
  return getToken(TKey.token, bearer);
}

export function setAccessToken(token: string): void {
  setToken(TKey.token, token);
}

export function getRefreshToken({ bearer } = { bearer: false }): string | undefined {
  return getToken(TKey.refreshToken, bearer);
}

export function setRefreshToken(refreshToken: string): void {
  setToken(TKey.refreshToken, refreshToken);
}

export function setTokens(token: string, refreshToken: string) {
  setToken(TKey.token, token);
  setToken(TKey.refreshToken, refreshToken);
}

export function clearTokens(): void {
  cookieStorage.setItem(AUTH_KEY, '');
}

// api level에서 로그아웃 처리
export function logout() {
  clearTokens();
  // eslint-disable-next-line max-len
  location.href = `${process.env.REACT_APP_AUTH_API_BASE_URL}${process.env.REACT_APP_AUTH_CONTEXT_PATH}/console/login`;
}
