import cookieStorage from '../lib/cookie-storage';

export const AUTH_KEY = 'auth';
export const DEFAULT_AUTH = {
  token: '',
};

enum TKey {
  token = 'token',
}

function getToken(key: TKey, bearer: boolean) {
  const prefix = bearer ? 'Bearer ' : '';
  let cookieToken;
  try {
    const cookie = JSON.parse(cookieStorage.getItem(AUTH_KEY) as string) || {
      token: '',
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
    clearTokens();
    cookieStorage.setItem(
      AUTH_KEY,
      JSON.stringify({
        [AUTH_KEY]: {
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

export function setTokens(token: string) {
  setToken(TKey.token, token);
}

export function clearTokens(): void {
  cookieStorage.setItem(AUTH_KEY, '');
}

// api level에서 로그아웃 처리
export function logout() {
  clearTokens();
  location.href =
    process.env.NODE_ENV === 'production'
      ? 'https://dearmy2023.click/login'
      : process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000/login'
      : '';
}
